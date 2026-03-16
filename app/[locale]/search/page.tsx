import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { ALL_PRODUCTS } from '@/lib/products';
import { SearchClient } from '@/components/search/SearchClient';
import type { Metadata } from 'next';

// ─── Metadata ─────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('search');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: false },
  };
}

// ─── Page ─────────────────────────────────────────────────────

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    brand?: string;
    range?: string;
    sort?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const initialQuery = typeof params.q === 'string' ? params.q : '';
  const initialBrand = (['rolex', 'cartier', 'audemars-piguet', 'patek-philippe'] as const).includes(
    params.brand as never
  )
    ? (params.brand as 'rolex' | 'cartier' | 'audemars-piguet' | 'patek-philippe')
    : 'all';
  const initialRange = params.range === 'essential' || params.range === 'premium'
    ? params.range
    : 'all';
  const initialSort =
    params.sort === 'price-asc' || params.sort === 'price-desc' ? params.sort : 'featured';

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0A0A0A' }} />}>
      <SearchClient
        products={ALL_PRODUCTS}
        initialQuery={initialQuery}
        initialBrand={initialBrand}
        initialRange={initialRange}
        initialSort={initialSort}
      />
    </Suspense>
  );
}
