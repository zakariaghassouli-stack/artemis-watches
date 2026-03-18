import type { Product, ProductRange, ProductSpecs } from '@/types/product';

// ─── Static product imports ───────────────────────────────────
import rolexSubmarinerBlack from '@/data/products/rolex-submariner-date-black.json';
import rolexSubmarinerBlue from '@/data/products/rolex-submariner-date-blue.json';
import rolexDatejust41 from '@/data/products/rolex-datejust-41.json';
import rolexDatejust36 from '@/data/products/rolex-datejust-36.json';
import rolexGmt from '@/data/products/rolex-gmt-master-ii.json';
import rolexDaytona from '@/data/products/rolex-daytona.json';
import cartierSantosSilver from '@/data/products/cartier-santos-silver.json';
import cartierPanthere from '@/data/products/cartier-panthere.json';
import cartierSantosEssential from '@/data/products/cartier-santos-essential.json';
import apRoyalOakBlue from '@/data/products/ap-royal-oak-blue.json';
import apRoyalOakEssential from '@/data/products/ap-royal-oak-essential.json';
import patekNautilus from '@/data/products/patek-nautilus.json';
import patekAquanaut from '@/data/products/patek-aquanaut.json';

// ─── Master catalogue ─────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  rolexSubmarinerBlack,
  rolexSubmarinerBlue,
  rolexDatejust41,
  rolexDatejust36,
  rolexGmt,
  rolexDaytona,
  cartierSantosSilver,
  cartierPanthere,
  cartierSantosEssential,
  apRoyalOakBlue,
  apRoyalOakEssential,
  patekNautilus,
  patekAquanaut,
] as Product[];

// ─── Lookup helpers ───────────────────────────────────────────

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return ALL_PRODUCTS.filter((p) => p.brandSlug === brandSlug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return ALL_PRODUCTS.filter((p) => p.collectionSlug === collectionSlug);
}

export function getProductsByRange(range: ProductRange): Product[] {
  return ALL_PRODUCTS.filter((p) => p.range === range);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return ALL_PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export function getBestSellers(limit = 4): Product[] {
  return ALL_PRODUCTS.filter((p) => p.bestSeller).slice(0, limit);
}

/**
 * Returns related products for a given product using the priority logic from the brief:
 * 1. Same sub-collection, different variant
 * 2. Same brand, different sub-collection
 * 3. Same range, different brand
 * 4. Best sellers fallback
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  // Use explicit relatedProducts list first
  if (product.relatedProducts.length > 0) {
    const explicit = product.relatedProducts
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, limit);
    if (explicit.length >= limit) return explicit;
  }

  const results: Product[] = [];
  const exclude = new Set([product.id]);

  const add = (candidates: Product[]) => {
    for (const p of candidates) {
      if (!exclude.has(p.id) && results.length < limit) {
        results.push(p);
        exclude.add(p.id);
      }
    }
  };

  // 1. Same sub-collection
  add(ALL_PRODUCTS.filter((p) => p.collectionSlug === product.collectionSlug));
  // 2. Same brand
  add(ALL_PRODUCTS.filter((p) => p.brandSlug === product.brandSlug));
  // 3. Same range
  add(ALL_PRODUCTS.filter((p) => p.range === product.range));
  // 4. Best sellers fallback
  add(getBestSellers(8));

  return results.slice(0, limit);
}

// ─── Stats helpers ────────────────────────────────────────────

export function getProductCount(): number {
  return ALL_PRODUCTS.length;
}

export function getProductCountByBrand(): Record<string, number> {
  return ALL_PRODUCTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.brandSlug] = (acc[p.brandSlug] ?? 0) + 1;
    return acc;
  }, {});
}

// ─── Scarcity label ───────────────────────────────────────────

export type ScarcityState =
  | { type: 'low-stock'; count: number }
  | { type: 'best-seller' }
  | { type: 'high-demand' }
  | { type: 'just-restocked' }
  | { type: 'new-arrival' }
  | null;

export function getScarcityState(product: Product): ScarcityState {
  if (!product.inStock) return null;
  if (product.stockCount <= 2) return { type: 'low-stock', count: product.stockCount };
  if (product.badge === 'best-seller') return { type: 'best-seller' };
  if (product.badge === 'high-demand') return { type: 'high-demand' };
  if (product.badge === 'just-restocked') return { type: 'just-restocked' };
  if (product.badge === 'new-arrival') return { type: 'new-arrival' };
  return null;
}

// ─── Price formatting ─────────────────────────────────────────

export function formatPrice(amount: number, currency = 'CAD'): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getInstallmentPrice(price: number, installments = 4): number {
  return Math.ceil(price / installments);
}

const FR_VARIANT_MAP: Record<string, string> = {
  'Black Dial': 'Cadran noir',
  'Black Dial — Essential': 'Cadran noir',
  'Blue Dial': 'Cadran bleu',
  'Blue Dial · 41mm': 'Cadran bleu · 41 mm',
  'Blue/Black Dial': 'Cadran bleu/noir',
  'Gold Tone': 'Ton doré',
  'Pepsi — Red/Blue Bezel': 'Pepsi — lunette rouge/bleu',
  'Silver Dial': 'Cadran argent',
};

const FR_SPEC_VALUE_MAP: Record<string, string> = {
  'Bidirectional rotating, red/blue Cerachrom 24h': 'Tournante bidirectionnelle, Cerachrom rouge/bleu 24 h',
  'Fixed tachymeter': 'Tachymètre fixe',
  'Fixed with exposed screws': 'Fixe avec vis apparentes',
  'Fixed, polished gold tone': 'Fixe, finition ton doré polie',
  'Fixed, polished with exposed screws': 'Fixe, polie avec vis apparentes',
  'Octagonal with decorative screws': 'Octogonale avec vis décoratives',
  'Octagonal with rounded corners': 'Octogonale à angles arrondis',
  'Octagonal, 8 white gold screws': 'Octogonale, 8 vis en or blanc',
  'Rounded octagonal, brushed': 'Octogonale arrondie, brossée',
  'Smooth, polished': 'Lisse, polie',
  'Unidirectional rotating, 60-min Cerachrom': 'Tournante unidirectionnelle, Cerachrom 60 min',
  'Unidirectional rotating, 60-min blue Cerachrom': 'Tournante unidirectionnelle, Cerachrom bleu 60 min',
  'Integrated mesh, gold tone': 'Maille intégrée, ton doré',
  'Integrated steel': 'Acier intégré',
  'Integrated steel, alternating polished and brushed links': 'Acier intégré, maillons polis et brossés en alternance',
  'Integrated, alternating polished and brushed': 'Intégré, finitions polies et brossées en alternance',
  'Integrated, polished and satin-finished': 'Intégré, finitions polies et satinées',
  'Jubilee, five-piece links': 'Jubilé, cinq maillons',
  'Oyster, three-piece solid links': 'Oyster, trois maillons pleins',
  'Tropical composite strap': 'Bracelet composite tropical',
  '35mm': '35 mm',
  '36mm': '36 mm',
  '38mm': '38 mm',
  '39.8mm': '39,8 mm',
  '40mm': '40 mm',
  '41mm': '41 mm',
  'AP-signed fold-over clasp': 'Fermoir déployant signé AP',
  Crownclasp: 'Crownclasp',
  'Deployant buckle': 'Boucle déployante',
  'Deployant buckle with double push-button': 'Boucle déployante à double poussoir',
  'Fold-over clasp': 'Fermoir déployant',
  'Fold-over clasp with push-button release': 'Fermoir déployant à poussoirs',
  'Fold-over tang buckle': 'Boucle ardillon déployante',
  'Folding Oysterlock': 'Oysterlock repliable',
  'Oysterclasp with Easylink': 'Oysterclasp avec Easylink',
  'Oysterclasp with safety lock': 'Oysterclasp avec verrou de sécurité',
  Black: 'Noir',
  'Black (Tapisserie)': 'Noir (Tapisserie)',
  Blue: 'Bleu',
  'Blue (Grande Tapisserie)': 'Bleu (Grande Tapisserie)',
  'Blue (horizontally embossed)': 'Bleu (gaufrage horizontal)',
  'Blue/Black (embossed checkerboard)': 'Bleu/noir (damier gaufré)',
  Silver: 'Argent',
  'White (guilloche)': 'Blanc (guilloché)',
  'Applied hour markers': 'Index appliqués',
  'Applied luminescent hour markers': 'Index appliqués luminescents',
  'Chromalight (blue luminescence)': 'Chromalight (luminescence bleue)',
};

export function getLocalizedVariant(variant: string, locale: string): string {
  if (locale !== 'fr') return variant;
  return FR_VARIANT_MAP[variant] ?? variant;
}

export function getLocalizedSpecs(specs: ProductSpecs, locale: string): ProductSpecs {
  if (locale !== 'fr') return specs;

  return Object.fromEntries(
    Object.entries(specs).map(([key, value]) => [key, value ? FR_SPEC_VALUE_MAP[value] ?? value : value])
  ) as ProductSpecs;
}

export function localizeProduct(product: Product, locale: string): Product {
  if (locale !== 'fr') return product;

  return {
    ...product,
    variant: getLocalizedVariant(product.variant, locale),
    description: product.descriptionFr ?? product.description,
    descriptionShort: product.descriptionShortFr ?? product.descriptionShort,
    keyPoints: product.keyPointsFr ?? product.keyPoints,
    specs: getLocalizedSpecs(product.specs, locale),
  };
}

export function getProductImageAlt(
  product: Pick<Product, 'brand' | 'name' | 'variant'>,
  options?: { viewIndex?: number }
): string {
  const base = `${product.brand} ${product.name} ${product.variant} — Artemis Watches Montreal`;
  return options?.viewIndex ? `${base} — view ${options.viewIndex}` : base;
}
