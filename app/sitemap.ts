import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/queries';
import { BRAND_META, COLLECTION_META } from '@/lib/brands';

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';

// With localePrefix: 'as-needed', French has no prefix (default); English uses /en
const LOCALES = ['', 'en'] as const;

function buildUrl(path: string, locale: string): string {
  const prefix = locale ? `/${locale}` : '';
  return `${BASE}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const products = await getAllProducts();

  // ── Static pages ────────────────────────────────────────────────
  const staticPages = [
    { path: '/',           priority: 1.0, changeFrequency: 'weekly'  },
    { path: '/collections', priority: 0.9, changeFrequency: 'weekly'  },
    { path: '/about',      priority: 0.7, changeFrequency: 'monthly' },
    { path: '/reviews',    priority: 0.6, changeFrequency: 'weekly'  },
    { path: '/faq',        priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact',    priority: 0.5, changeFrequency: 'monthly' },
  ] satisfies { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[];

  for (const locale of LOCALES) {
    for (const { path, priority, changeFrequency } of staticPages) {
      entries.push({ url: buildUrl(path, locale), lastModified: now, changeFrequency, priority });
    }
  }

  // ── Brand pages ─────────────────────────────────────────────────
  for (const locale of LOCALES) {
    for (const brand of Object.values(BRAND_META)) {
      entries.push({
        url: buildUrl(`/collections/${brand.slug}`, locale),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // ── Collection pages ─────────────────────────────────────────────
  for (const locale of LOCALES) {
    for (const col of Object.values(COLLECTION_META)) {
      entries.push({
        url: buildUrl(`/collections/${col.brandSlug}/${col.slug}`, locale),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    }
  }

  // ── Product pages ────────────────────────────────────────────────
  for (const locale of LOCALES) {
    for (const product of products) {
      entries.push({
        url: buildUrl(
          `/collections/${product.brandSlug}/${product.collectionSlug}/${product.slug}`,
          locale
        ),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    }
  }

  return entries;
}
