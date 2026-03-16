import type { Product, ProductRange } from '@/types/product';

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
  if (product.stockCount < 5) return { type: 'low-stock', count: product.stockCount };
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
