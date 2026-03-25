import type { Product, ProductBadge, ProductReview, ProductSpecs } from '@/types/product';
import {
  ALL_PRODUCTS,
  enrichProductCatalog,
  getHomepageEditProducts as getLocalHomepageEditProducts,
  getProductBySlug as getLocalProductBySlug,
  getProductsByBrand as getLocalProductsByBrand,
  getProductsByCollection as getLocalProductsByCollection,
  getProductsByRange as getLocalProductsByRange,
  isGenericMovementVariant,
} from '@/lib/products';
import { client, sanityEnabled, serverClient } from '@/lib/sanity';

type PortableTextBlock = {
  _type: 'block';
  children?: Array<{ _type: 'span'; text?: string }>;
};

type SanityReferencePreview = {
  _id: string;
  name?: string;
  slug?: string;
  brand?: string;
  collection?: string;
  range?: Product['range'];
  price?: number;
  image?: string | null;
};

type SanityProductDocument = {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  collection?: string;
  variant?: string;
  range: Product['range'];
  price: number;
  compareAtPrice?: number | null;
  inStock?: boolean;
  stockCount?: number;
  badge?: string | null;
  images?: string[];
  video?: string | null;
  shortDescription?: string;
  shortDescriptionFr?: string;
  longDescription?: PortableTextBlock[];
  longDescriptionFr?: PortableTextBlock[];
  highlights?: string[];
  highlightsFr?: string[];
  specs?: {
    movement?: string;
    caseDiameter?: string;
    caseThickness?: string;
    caseMaterial?: string;
    material?: string;
    dialColor?: string;
    crystal?: string;
    bracelet?: string;
    waterResistance?: string;
    bezel?: string;
    clasp?: string;
    lume?: string;
    powerReserve?: string;
  };
  availableSizes?: string[];
  availableColors?: string[];
  featured?: boolean;
  bestSeller?: boolean;
  essentialPrice?: number | null;
  boxAndPapersPrice?: number | null;
  shippingSpeed?: Product['shippingSpeed'];
  shippingEstimate?: string;
  seoTitle?: string;
  seoTitleFr?: string;
  seoDescription?: string;
  seoDescriptionFr?: string;
  reviews?: ProductReview[];
  relatedProducts?: SanityReferencePreview[];
};

export interface SiteSettings {
  announcementBar?: { enabled?: boolean; en?: string; fr?: string };
  heroHeadline?: { en?: string; fr?: string };
  heroSubtext?: { en?: string; fr?: string };
  welcomeDiscountPercent?: number;
  boxAndPapersPrice?: number;
  whatsappNumber?: string;
}

export interface PromoCodeDocument {
  code: string;
  discountPercent: number;
  active: boolean;
  expiresAt?: string;
  usageLimit?: number | null;
  usageCount?: number | null;
  createdFor?: string | null;
}

const PRODUCT_QUERY = `*[_type == "product"] | order(brand asc, price asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  brand,
  collection,
  variant,
  range,
  price,
  compareAtPrice,
  inStock,
  stockCount,
  badge,
  "images": images[].asset->url,
  "video": video.asset->url,
  shortDescription,
  shortDescriptionFr,
  longDescription,
  longDescriptionFr,
  highlights,
  highlightsFr,
  specs,
  availableSizes,
  availableColors,
  featured,
  bestSeller,
  essentialPrice,
  boxAndPapersPrice,
  shippingSpeed,
  shippingEstimate,
  seoTitle,
  seoTitleFr,
  seoDescription,
  seoDescriptionFr,
  reviews,
  "relatedProducts": relatedProducts[]->{
    _id,
    name,
    "slug": slug.current,
    brand,
    collection,
    range,
    price,
    "image": images[0].asset->url
  }
}`;

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  announcementBar,
  heroHeadline,
  heroSubtext,
  welcomeDiscountPercent,
  boxAndPapersPrice,
  whatsappNumber
}`;

const PROMO_CODE_QUERY = `*[_type == "promoCode" && code == $code && active == true][0]{
  code,
  discountPercent,
  active,
  expiresAt,
  usageLimit,
  usageCount,
  createdFor
}`;

const BRAND_SLUGS: Record<string, string> = {
  Rolex: 'rolex',
  Cartier: 'cartier',
  'Audemars Piguet': 'audemars-piguet',
  'Patek Philippe': 'patek-philippe',
};

const BADGE_MAP: Record<string, ProductBadge> = {
  'client-favourite': 'best-seller',
  'new-arrival': 'new-arrival',
  'versatile-pick': 'high-demand',
  'popular-gift': 'new-arrival',
  'best-seller': 'best-seller',
  'high-demand': 'high-demand',
  'just-restocked': 'just-restocked',
  'low-stock': 'low-stock',
};

const COLLECTION_SLUG_ALIASES: Record<string, string> = {
  'gmt-master': 'gmt-master-ii',
  'santos-de-cartier': 'santos',
  'panthere-de-cartier': 'panthere',
};

function slugifyCollection(collection?: string): string {
  if (!collection) return 'collection';

  const normalized = collection
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/ii/g, 'ii')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return COLLECTION_SLUG_ALIASES[normalized] ?? normalized;
}

function portableTextToPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks?.length) return '';

  return blocks
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? '')
        .join('')
        .trim()
    )
    .filter(Boolean)
    .join('\n\n');
}

function buildCollectionIndex(products: Product[]) {
  return products.reduce<Record<string, Product[]>>((acc, product) => {
    const key = `${product.brandSlug}:${product.collectionSlug}`;
    acc[key] = acc[key] ?? [];
    acc[key].push(product);
    return acc;
  }, {});
}

function normalizeSanityProducts(docs: SanityProductDocument[]): Product[] {
  const baseProducts = docs.map((doc) => {
    const brandSlug = BRAND_SLUGS[doc.brand] ?? doc.brand.toLowerCase().replace(/\s+/g, '-');
    const collectionSlug = slugifyCollection(doc.collection);
    const specs = doc.specs ?? {};
    const material = specs.material ?? specs.caseMaterial;

    return {
      id: doc._id,
      slug: doc.slug,
      brand: doc.brand,
      brandSlug,
      collection: doc.collection ?? 'Collection',
      collectionSlug,
      name: doc.name,
      variant: doc.variant ?? '',
      description: portableTextToPlainText(doc.longDescription),
      descriptionShort: doc.shortDescription ?? '',
      keyPoints: doc.highlights ?? [],
      range: doc.range,
      price: doc.price,
      compareAtPrice: doc.compareAtPrice ?? null,
      currency: 'CAD' as const,
      inStock: doc.inStock ?? true,
      stockCount: doc.stockCount ?? 0,
      badge: (doc.badge ? BADGE_MAP[doc.badge] : null) ?? null,
      images: doc.images ?? [],
      video: doc.video ?? null,
      specs: {
        ...specs,
        ...(material ? { material } : {}),
      } as ProductSpecs,
      availableSizes: doc.availableSizes ?? [],
      availableColors: doc.availableColors ?? [],
      hasEssentialVariant: false,
      hasPremiumVariant: false,
      essentialPrice: doc.essentialPrice ?? null,
      premiumPrice: doc.range === 'premium' ? doc.price : null,
      boxAndPapersPrice: doc.boxAndPapersPrice ?? (doc.range === 'premium' ? 0 : 49),
      shippingSpeed: doc.shippingSpeed,
      shippingEstimate: doc.shippingEstimate,
      relatedProducts: (doc.relatedProducts ?? []).map((item) => item._id),
      reviews: doc.reviews ?? [],
      featured: doc.featured ?? Boolean(doc.badge),
      bestSeller: doc.bestSeller ?? doc.badge === 'client-favourite',
      seoTitle: doc.seoTitle,
      seoDescription: doc.seoDescription,
      descriptionFr: portableTextToPlainText(doc.longDescriptionFr),
      descriptionShortFr: doc.shortDescriptionFr ?? '',
      keyPointsFr: doc.highlightsFr ?? [],
    } satisfies Product;
  });

  const byCollection = buildCollectionIndex(baseProducts);

  return enrichProductCatalog(baseProducts.map((product) => {
    const siblings = byCollection[`${product.brandSlug}:${product.collectionSlug}`] ?? [];
    const essentialSiblingPrices = siblings
      .filter((item) => item.range === 'essential')
      .map((item) => item.price);
    const sizes = siblings
      .flatMap((item) => item.availableSizes)
      .filter(Boolean);

    const normalizedProduct = {
      ...product,
      availableSizes: Array.from(new Set(sizes.length ? sizes : product.availableSizes)),
      hasEssentialVariant: essentialSiblingPrices.length > 0,
      essentialPrice:
        essentialSiblingPrices.length > 0 ? Math.min(...essentialSiblingPrices) : product.essentialPrice,
    };

    const localCanonical = ALL_PRODUCTS.find((localProduct) => localProduct.id === normalizedProduct.id);

    const shouldUseCanonicalVariant =
      !normalizedProduct.variant || isGenericMovementVariant(normalizedProduct.variant);

    const canonicalized = {
      ...normalizedProduct,
      name: normalizedProduct.name || localCanonical?.name || normalizedProduct.name,
      variant: shouldUseCanonicalVariant
        ? localCanonical?.variant ?? normalizedProduct.variant
        : normalizedProduct.variant,
      boxAndPapersPrice:
        normalizedProduct.range === 'premium'
          ? 0
          : normalizedProduct.boxAndPapersPrice ?? localCanonical?.boxAndPapersPrice ?? 49,
    };

    if (!localCanonical || localCanonical.slug === normalizedProduct.slug) {
      return canonicalized;
    }

    return {
      ...canonicalized,
      slug: localCanonical.slug,
      brand: localCanonical.brand,
      brandSlug: localCanonical.brandSlug,
      collection: localCanonical.collection,
      collectionSlug: localCanonical.collectionSlug,
      name: localCanonical.name,
      variant: localCanonical.variant,
      description: canonicalized.description || localCanonical.description,
      descriptionShort: canonicalized.descriptionShort || localCanonical.descriptionShort,
      keyPoints: canonicalized.keyPoints.length ? canonicalized.keyPoints : localCanonical.keyPoints,
      specs:
        Object.keys(canonicalized.specs ?? {}).length > 0
          ? canonicalized.specs
          : localCanonical.specs,
      availableSizes: canonicalized.availableSizes.length
        ? canonicalized.availableSizes
        : localCanonical.availableSizes,
      availableColors: canonicalized.availableColors.length
        ? canonicalized.availableColors
        : localCanonical.availableColors,
      relatedProducts: canonicalized.relatedProducts.length
        ? canonicalized.relatedProducts
        : localCanonical.relatedProducts,
      reviews: canonicalized.reviews.length ? canonicalized.reviews : localCanonical.reviews,
      seoTitle: canonicalized.seoTitle || localCanonical.seoTitle,
      seoDescription: canonicalized.seoDescription || localCanonical.seoDescription,
      descriptionFr: canonicalized.descriptionFr || localCanonical.descriptionFr,
      descriptionShortFr: canonicalized.descriptionShortFr || localCanonical.descriptionShortFr,
      keyPointsFr: canonicalized.keyPointsFr.length
        ? canonicalized.keyPointsFr
        : localCanonical.keyPointsFr,
    };
  }));
}

function dedupeSanityProducts(products: Product[]): Product[] {
  const localById = new Map(ALL_PRODUCTS.map((product) => [product.id, product]));
  const groups = new Map<string, Product[]>();

  for (const product of products) {
    const groupKey = product.id || product.slug;
    const bucket = groups.get(groupKey) ?? [];
    bucket.push(product);
    groups.set(groupKey, bucket);
  }

  return Array.from(groups.entries()).map(([groupKey, bucket]) => {
    const localMatch = localById.get(groupKey);
    if (!localMatch) {
      return bucket[0];
    }

    return bucket.find((product) => product.slug === localMatch.slug) ?? bucket[0];
  });
}

function mergeWithLocalFallback(products: Product[]): Product[] {
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  for (const localProduct of ALL_PRODUCTS) {
    if (!bySlug.has(localProduct.slug)) {
      bySlug.set(localProduct.slug, localProduct);
    }
  }

  return Array.from(bySlug.values());
}

async function fetchSanityProducts(sourceClient = client): Promise<Product[]> {
  if (!sourceClient || !sanityEnabled) {
    return ALL_PRODUCTS;
  }

  const docs = await sourceClient.fetch<SanityProductDocument[]>(PRODUCT_QUERY);
  if (!docs?.length) {
    return ALL_PRODUCTS;
  }

  return enrichProductCatalog(
    mergeWithLocalFallback(dedupeSanityProducts(normalizeSanityProducts(docs)))
  );
}

export async function getAllProducts(): Promise<Product[]> {
  return fetchSanityProducts();
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  const products = await fetchSanityProducts();
  return products.filter((product) => product.brandSlug === brandSlug);
}

export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  const products = await fetchSanityProducts();
  return products.filter((product) => product.collectionSlug === collectionSlug);
}

export async function getProductsByRange(range: Product['range']): Promise<Product[]> {
  const products = await fetchSanityProducts();
  return products.filter((product) => product.range === range);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await fetchSanityProducts();
  return products.find((product) => product.slug === slug);
}

export async function getProductBySlugFresh(slug: string): Promise<Product | undefined> {
  const products = await fetchSanityProducts(serverClient ?? client);
  return products.find((product) => product.slug === slug);
}

export async function getHomepageEditProducts(): Promise<Product[]> {
  const products = await fetchSanityProducts();
  if (products === ALL_PRODUCTS) {
    return getLocalHomepageEditProducts();
  }

  const preferredSlugs = [
    'submariner-date-black-dial',
    'submariner-black-no-date-essential',
    'santos-silver-essential',
    'gmt-master-ii-pepsi-essential',
  ];

  const preferred = preferredSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  if (preferred.length === preferredSlugs.length) {
    return preferred;
  }

  const premium = products
    .filter((product) => product.range === 'premium')
    .sort(
      (a, b) =>
        Number(b.bestSeller) - Number(a.bestSeller) ||
        Number(b.featured) - Number(a.featured)
    )
    .slice(0, 2);

  const essential = products
    .filter((product) => product.range === 'essential')
    .sort(
      (a, b) =>
        Number(b.bestSeller) - Number(a.bestSeller) ||
        Number(b.featured) - Number(a.featured) ||
        a.price - b.price
    )
    .slice(0, 2);

  return [...premium, ...essential];
}

export async function getProductCountByBrand(): Promise<Record<string, number>> {
  const products = await fetchSanityProducts();
  return products.reduce<Record<string, number>>((acc, product) => {
    acc[product.brandSlug] = (acc[product.brandSlug] ?? 0) + 1;
    return acc;
  }, {});
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client || !sanityEnabled) return null;

  const settings = await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  return settings ?? null;
}

export async function getSiteSettingsFresh(): Promise<SiteSettings | null> {
  const activeClient = serverClient ?? client;
  if (!activeClient || !sanityEnabled) return null;

  const settings = await activeClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  return settings ?? null;
}

export async function validatePromoCode(code: string): Promise<PromoCodeDocument | null> {
  if (!client || !sanityEnabled) return null;

  const normalizedCode = code.trim().toUpperCase();
  if (!normalizedCode) return null;

  const result = await client.fetch<PromoCodeDocument | null>(PROMO_CODE_QUERY, {
    code: normalizedCode,
  });

  return result ?? null;
}

export async function validatePromoCodeFresh(code: string): Promise<PromoCodeDocument | null> {
  const activeClient = serverClient ?? client;
  if (!activeClient || !sanityEnabled) return null;

  const normalizedCode = code.trim().toUpperCase();
  if (!normalizedCode) return null;

  const result = await activeClient.fetch<PromoCodeDocument | null>(PROMO_CODE_QUERY, {
    code: normalizedCode,
  });

  return result ?? null;
}

export function getLocalFallbackProducts() {
  return ALL_PRODUCTS;
}

export function getLocalFallbackProductBySlug(slug: string) {
  return getLocalProductBySlug(slug);
}

export function getLocalFallbackProductsByBrand(brandSlug: string) {
  return getLocalProductsByBrand(brandSlug);
}

export function getLocalFallbackProductsByCollection(collectionSlug: string) {
  return getLocalProductsByCollection(collectionSlug);
}

export function getLocalFallbackProductsByRange(range: Product['range']) {
  return getLocalProductsByRange(range);
}
