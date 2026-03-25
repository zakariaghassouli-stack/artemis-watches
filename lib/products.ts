import type { Product, ProductRange, ProductSpecs } from '@/types/product';

// ─── Static product imports ───────────────────────────────────
// Legacy products (non-essential)
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

// ─── Essential range — Submariner ─────────────────────────────
import rolexSubmarinerBlackNodate from '@/data/products/rolex-submariner-black-nodate-essential.json';
import rolexSubmarinerBlackdate from '@/data/products/rolex-submariner-blackdate-essential.json';
import rolexSubmarinerBluesy from '@/data/products/rolex-submariner-bluesy-essential.json';
import rolexSubmarinerHulk from '@/data/products/rolex-submariner-hulk-essential.json';
import rolexSubmarinerSmurf from '@/data/products/rolex-submariner-smurf-essential.json';
import rolexSubmarinerStarbucks from '@/data/products/rolex-submariner-starbucks-essential.json';
import rolexSubmarinerLabelNoir from '@/data/products/rolex-submariner-label-noir-essential.json';

// ─── Essential range — Daytona ────────────────────────────────
import rolexDaytonaBlack from '@/data/products/rolex-daytona-black-essential.json';
import rolexDaytonaBlue from '@/data/products/rolex-daytona-blue-essential.json';
import rolexDaytonaPanda from '@/data/products/rolex-daytona-panda-essential.json';

// ─── Essential range — GMT-Master II ─────────────────────────
import rolexGmtBatgirl from '@/data/products/rolex-gmt-master-ii-batgirl-essential.json';
import rolexGmtBrucewayne from '@/data/products/rolex-gmt-master-ii-brucewayne-essential.json';
import rolexGmtPepsi from '@/data/products/rolex-gmt-master-ii-pepsi-essential.json';
import rolexGmtRootbeer from '@/data/products/rolex-gmt-master-ii-rootbeer-essential.json';
import rolexGmtSprite from '@/data/products/rolex-gmt-master-ii-sprite-essential.json';
import rolexGmtSpriteGreen from '@/data/products/rolex-gmt-master-ii-sprite-green-essential.json';
import rolexGmtZombie from '@/data/products/rolex-gmt-master-ii-zombie-essential.json';

// ─── Essential range — Datejust ───────────────────────────────
import rolexDj41Black from '@/data/products/rolex-datejust-41-black-essential.json';
import rolexDj41Blue from '@/data/products/rolex-datejust-41-blue-essential.json';
import rolexDj41Chocolate from '@/data/products/rolex-datejust-41-chocolate-essential.json';
import rolexDj41Green from '@/data/products/rolex-datejust-41-green-essential.json';
import rolexDj41Grey from '@/data/products/rolex-datejust-41-grey-essential.json';
import rolexDj41White from '@/data/products/rolex-datejust-41-white-essential.json';
import rolexDj41Wimbledon from '@/data/products/rolex-datejust-41-wimbledon-essential.json';
import rolexDj41WimbledonSmooth from '@/data/products/rolex-datejust-41-wimbledon-smooth-essential.json';
import rolexDjWimbledonGold from '@/data/products/rolex-datejust-wimbledon-gold-essential.json';
import rolexDj31Gold from '@/data/products/rolex-datejust-31-gold-essential.json';
import rolexDj2tone from '@/data/products/rolex-datejust-2tone-essential.json';
import rolexDj31Pink from '@/data/products/rolex-datejust-31-pink-essential.json';

// ─── Essential range — Day-Date ───────────────────────────────
import rolexDayDateBlue from '@/data/products/rolex-day-date-blue-essential.json';
import rolexDayDateBrown from '@/data/products/rolex-day-date-brown-essential.json';
import rolexDayDateGold from '@/data/products/rolex-day-date-gold-essential.json';
import rolexDayDateGreen from '@/data/products/rolex-day-date-green-essential.json';
import rolexDayDateGrey from '@/data/products/rolex-day-date-grey-essential.json';
import rolexDayDateOmbre from '@/data/products/rolex-day-date-ombre-essential.json';
import rolexDayDateRed from '@/data/products/rolex-day-date-red-essential.json';

// ─── Essential range — Explorer ───────────────────────────────
import rolexExplorerBlack from '@/data/products/rolex-explorer-black-essential.json';
import rolexExplorerIi from '@/data/products/rolex-explorer-ii-essential.json';

// ─── Essential range — Yacht-Master ──────────────────────────
import rolexYachtMasterSteel from '@/data/products/rolex-yacht-master-steel-essential.json';
import rolexYachtMasterSilver from '@/data/products/rolex-yacht-master-silver-essential.json';

// ─── Essential range — Oyster Perpetual 41 ───────────────────
import rolexOp41Black from '@/data/products/rolex-oyster-perpetual-41-black-essential.json';
import rolexOp41Blue from '@/data/products/rolex-oyster-perpetual-41-blue-essential.json';
import rolexOp41Green from '@/data/products/rolex-oyster-perpetual-41-green-essential.json';
import rolexOp41Grey from '@/data/products/rolex-oyster-perpetual-41-grey-essential.json';

// ─── Essential range — Sky-Dweller ───────────────────────────
import rolexSkyDwellerSteel from '@/data/products/rolex-sky-dweller-steel-essential.json';
import rolexSkyDwellerRosegold from '@/data/products/rolex-sky-dweller-rosegold-essential.json';

// ─── Essential range — Land-Dweller ──────────────────────────
import rolexLandDwellerBlue from '@/data/products/rolex-land-dweller-blue-essential.json';
import rolexLandDwellerRosegold from '@/data/products/rolex-land-dweller-rosegold-essential.json';
import rolexLandDwellerWhite from '@/data/products/rolex-land-dweller-white-essential.json';

// ─── Essential range — Cartier ────────────────────────────────
import cartierPanthereEssential from '@/data/products/cartier-panthere-essential.json';
import cartierSantosSilverEssential from '@/data/products/cartier-santos-silver-essential.json';
import cartierSantosBlackEssential from '@/data/products/cartier-santos-black-essential.json';
import cartierSantosBlueEssential from '@/data/products/cartier-santos-blue-essential.json';
import cartierSantosGoldEssential from '@/data/products/cartier-santos-gold-essential.json';
import cartierSantosSkeletonEssential from '@/data/products/cartier-santos-skeleton-essential.json';

// ─── Essential range — Patek Philippe ────────────────────────
import patekNautilusBlack from '@/data/products/patek-philippe-nautilus-black-essential.json';
import patekNautilusBlue from '@/data/products/patek-philippe-nautilus-blue-essential.json';
import patekAquanautBlack from '@/data/products/patek-philippe-aquanaut-black-essential.json';
import patekSkeletonEssential from '@/data/products/patek-philippe-skeleton-essential.json';

// ─── Essential range — Audemars Piguet ───────────────────────
import apRoyalOakBlueEssential from '@/data/products/ap-royal-oak-blue-essential.json';
import apRoyalOakRosegold from '@/data/products/ap-royal-oak-rosegold-essential.json';
import apRoyalOakSkeletonBlack from '@/data/products/ap-royal-oak-skeleton-black-essential.json';
import apRoyalOakSkeletonRosegold from '@/data/products/ap-royal-oak-skeleton-rosegold-essential.json';
import apRoyalOakSkeletonSilver from '@/data/products/ap-royal-oak-skeleton-silver-essential.json';
import apRoyalOakSkeletonWhite from '@/data/products/ap-royal-oak-skeleton-white-essential.json';

// ─── Master catalogue ─────────────────────────────────────────
const RAW_PRODUCTS: Product[] = [
  // Legacy products
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
  // Submariner essential
  rolexSubmarinerBlackNodate,
  rolexSubmarinerBlackdate,
  rolexSubmarinerBluesy,
  rolexSubmarinerHulk,
  rolexSubmarinerSmurf,
  rolexSubmarinerStarbucks,
  rolexSubmarinerLabelNoir,
  // Daytona essential
  rolexDaytonaBlack,
  rolexDaytonaBlue,
  rolexDaytonaPanda,
  // GMT-Master II essential
  rolexGmtBatgirl,
  rolexGmtBrucewayne,
  rolexGmtPepsi,
  rolexGmtRootbeer,
  rolexGmtSprite,
  rolexGmtSpriteGreen,
  rolexGmtZombie,
  // Datejust essential
  rolexDj41Black,
  rolexDj41Blue,
  rolexDj41Chocolate,
  rolexDj41Green,
  rolexDj41Grey,
  rolexDj41White,
  rolexDj41Wimbledon,
  rolexDj41WimbledonSmooth,
  rolexDjWimbledonGold,
  rolexDj31Gold,
  rolexDj2tone,
  rolexDj31Pink,
  // Day-Date essential
  rolexDayDateBlue,
  rolexDayDateBrown,
  rolexDayDateGold,
  rolexDayDateGreen,
  rolexDayDateGrey,
  rolexDayDateOmbre,
  rolexDayDateRed,
  // Explorer essential
  rolexExplorerBlack,
  rolexExplorerIi,
  // Yacht-Master essential
  rolexYachtMasterSteel,
  rolexYachtMasterSilver,
  // Oyster Perpetual 41 essential
  rolexOp41Black,
  rolexOp41Blue,
  rolexOp41Green,
  rolexOp41Grey,
  // Sky-Dweller essential
  rolexSkyDwellerSteel,
  rolexSkyDwellerRosegold,
  // Land-Dweller essential
  rolexLandDwellerBlue,
  rolexLandDwellerRosegold,
  rolexLandDwellerWhite,
  // Cartier essential
  cartierPanthereEssential,
  cartierSantosSilverEssential,
  cartierSantosBlackEssential,
  cartierSantosBlueEssential,
  cartierSantosGoldEssential,
  cartierSantosSkeletonEssential,
  // Patek Philippe essential
  patekNautilusBlack,
  patekNautilusBlue,
  patekAquanautBlack,
  patekSkeletonEssential,
  // Audemars Piguet essential
  apRoyalOakBlueEssential,
  apRoyalOakRosegold,
  apRoyalOakSkeletonBlack,
  apRoyalOakSkeletonRosegold,
  apRoyalOakSkeletonSilver,
  apRoyalOakSkeletonWhite,
] as Product[];

function getProductFamilyKey(product: Pick<Product, 'brandSlug' | 'collectionSlug' | 'name'>): string {
  return `${product.brandSlug}:${product.collectionSlug}:${product.name.trim().toLowerCase()}`;
}

export function isGenericMovementVariant(variant: string): boolean {
  return /^(japanese movement|swiss movement|mouvement japonais|mouvement suisse)$/i.test(
    variant.trim()
  );
}

function stripVariantRangeSuffix(variant: string): string {
  return variant
    .replace(/\s+[·-]\s+(Japanese|Swiss) Movement(?:\s*\(.*?\))?$/i, '')
    .replace(/\s+[·-]\s+Mouvement (japonais|suisse)(?:\s*\(.*?\))?$/i, '')
    .replace(/\s+[—-]\s+(Essential|Premium)$/i, '')
    .trim();
}

export function getVariantOptionLabel(product: Pick<Product, 'variant' | 'range' | 'name' | 'slug'>, locale = 'en'): string {
  const cleaned = stripVariantRangeSuffix(product.variant || '').trim();
  const shortLabel = cleaned.includes(' — ') ? cleaned.split(' — ')[0].trim() : cleaned;

  if (!shortLabel || isGenericMovementVariant(shortLabel)) {
    return product.range === 'premium'
      ? locale === 'fr'
        ? 'Version suisse'
        : 'Swiss version'
      : locale === 'fr'
      ? 'Version japonaise'
      : 'Japanese version';
  }

  if (
    product.range === 'premium' &&
    !cleaned.includes('—') &&
    !cleaned.includes('—') &&
    /dial|tone|cadran/i.test(cleaned)
  ) {
    const base = shortLabel.replace(/\s+Dial$/i, '').replace(/\s+Tone$/i, '').trim();
    return `${base} (${locale === 'fr' ? 'suisse' : 'Swiss'})`;
  }

  return shortLabel;
}

export function getProductDisplayTitle(product: Pick<Product, 'name' | 'variant'>): string {
  const cleaned = stripVariantRangeSuffix(product.variant || '').trim();
  if (!cleaned || isGenericMovementVariant(cleaned)) {
    return product.name;
  }
  const variantParts = cleaned.split(/\s+[—–-]\s+/).map((part) => part.trim()).filter(Boolean);
  const variantFirstPart = variantParts[0] ?? '';

  if (product.name === 'Submariner Date' && cleaned.includes(' — ')) {
    const [variantName, ...rest] = cleaned.split(' — ');
    const detail = rest.join(' — ').trim();
    return detail ? `Submariner ${variantName} — ${detail}` : `Submariner ${variantName}`;
  }
  if (
    variantFirstPart &&
    product.name.toLowerCase().endsWith(variantFirstPart.toLowerCase())
  ) {
    const variantRest = variantParts.slice(1).join(' — ').trim();
    return variantRest ? `${product.name} — ${variantRest}` : product.name;
  }
  return `${product.name} — ${cleaned}`;
}

export function getMovementComparisonLabel(
  product: Pick<Product, 'essentialPrice' | 'premiumPrice'>,
  locale: string
): string | null {
  if (product.essentialPrice == null || product.premiumPrice == null) {
    return null;
  }

  return locale === 'fr'
    ? `Mouvement japonais — ${formatPrice(product.essentialPrice)} CAD | Mouvement suisse — ${formatPrice(product.premiumPrice)} CAD`
    : `Japanese Movement — ${formatPrice(product.essentialPrice)} CAD | Swiss Movement — ${formatPrice(product.premiumPrice)} CAD`;
}

export function getRetailReference(
  product: Pick<Product, 'collectionSlug' | 'name'>
): number | null {
  if (product.collectionSlug === 'submariner') return 12500;
  if (product.collectionSlug === 'gmt-master-ii') return 14800;
  if (product.collectionSlug === 'datejust') return 10500;
  if (product.collectionSlug === 'daytona') return 18500;
  if (product.collectionSlug === 'day-date') return 38000;
  if (product.collectionSlug === 'royal-oak') return 28000;
  if (product.collectionSlug === 'nautilus') return 35000;
  if (product.collectionSlug === 'santos') return 7500;
  if (product.collectionSlug === 'panthere') return 4500;
  if (product.collectionSlug === 'aquanaut') return 14000;
  if (product.collectionSlug === 'calatrava') return 18500;
  return null;
}

export function enrichProductCatalog(products: Product[]): Product[] {
  const groups = products.reduce<Map<string, Product[]>>((acc, product) => {
    const key = getProductFamilyKey(product);
    const bucket = acc.get(key) ?? [];
    bucket.push(product);
    acc.set(key, bucket);
    return acc;
  }, new Map());

  return products.map((product) => {
    const family = groups.get(getProductFamilyKey(product)) ?? [product];
    const essentialPrices = family
      .filter((item) => item.range === 'essential')
      .map((item) => item.price);
    const premiumPrices = family
      .filter((item) => item.range === 'premium')
      .map((item) => item.price);

    return {
      ...product,
      hasEssentialVariant: essentialPrices.length > 0,
      hasPremiumVariant: premiumPrices.length > 0,
      essentialPrice: essentialPrices.length > 0 ? Math.min(...essentialPrices) : null,
      premiumPrice: premiumPrices.length > 0 ? Math.min(...premiumPrices) : null,
      boxAndPapersPrice:
        product.range === 'premium' ? 0 : product.boxAndPapersPrice ?? 49,
    };
  });
}

export const ALL_PRODUCTS: Product[] = enrichProductCatalog(RAW_PRODUCTS);

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

export function getHomepageEditProducts(): Product[] {
  const preferredIds = [
    'rolex-submariner-date-black',
    'rolex-submariner-hulk-essential',
    'cartier-santos-silver-essential',
    'rolex-gmt-master-ii-pepsi-essential',
  ];

  const seeded = preferredIds
    .map((id) => getProductById(id))
    .filter((product): product is Product => product !== undefined);

  if (seeded.length === preferredIds.length) {
    return seeded;
  }

  const premium = ALL_PRODUCTS
    .filter((product) => product.range === 'premium')
    .sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller) || Number(b.featured) - Number(a.featured))
    .slice(0, 2);

  const essential = ALL_PRODUCTS
    .filter((product) => product.range === 'essential')
    .sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller) || a.price - b.price)
    .slice(0, 2);

  return [...premium, ...essential];
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
  if (product.stockCount <= 5) return { type: 'low-stock', count: product.stockCount };
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
  options?: { viewIndex?: number; locale?: string }
): string {
  const isFr = options?.locale === 'fr';
  const suffix = isFr ? 'Artemis Montres Montréal' : 'Artemis Watches Montreal';
  const base = `${product.brand} ${product.name} ${product.variant} — ${suffix}`;
  if (!options?.viewIndex) return base;
  return isFr ? `${base} — vue ${options.viewIndex}` : `${base} — view ${options.viewIndex}`;
}
