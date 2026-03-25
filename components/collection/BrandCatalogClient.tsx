'use client';

import { useMemo, useState } from 'react';
import { CollectionProductCard } from '@/components/collection/CollectionProductCard';
import type { Product } from '@/types/product';

type RangeFilter = 'all' | 'essential' | 'premium';
type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest';

interface ModelOption {
  value: string;
  label: string;
}

interface Translations {
  brandLabel: string;
  modelLabel: string;
  modelAll: string;
  rangeLabel: string;
  rangeAll: string;
  rangeEssential: string;
  rangePremium: string;
  sortLabel: string;
  sortPopular: string;
  sortPriceLow: string;
  sortPriceHigh: string;
  sortNewest?: string;
  resultSingular: string;
  resultPlural: string;
  activeSortLabel: string;
  viewDetails: string;
  noResults: string;
}

interface Props {
  products: Product[];
  brandValue: string;
  models: ModelOption[];
  t: Translations;
  initialRange?: RangeFilter;
}

function getPopularityScore(product: Product) {
  let score = 0;
  if (product.bestSeller) score += 4;
  if (product.featured) score += 2;
  if (product.badge === 'best-seller') score += 1;
  if (product.badge === 'high-demand') score += 1;
  return score;
}

export function BrandCatalogClient({ products, brandValue, models, t, initialRange }: Props) {
  const [model, setModel] = useState<string>('all');
  const [range, setRange] = useState<RangeFilter>(initialRange ?? 'all');
  const [sort, setSort] = useState<SortOption>('popular');

  const hasNewestSort = products.some((product) => product.badge === 'new-arrival');
  const originalOrder = useMemo(
    () => new Map(products.map((product, index) => [product.id, index])),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => model === 'all' || product.collectionSlug === model)
      .filter((product) => range === 'all' || product.range === range)
      .slice()
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'newest') {
          const aScore = a.badge === 'new-arrival' ? 1 : 0;
          const bScore = b.badge === 'new-arrival' ? 1 : 0;
          if (aScore !== bScore) return bScore - aScore;
        }

        const popularityDiff = getPopularityScore(b) - getPopularityScore(a);
        if (popularityDiff !== 0) return popularityDiff;
        return (originalOrder.get(a.id) ?? 0) - (originalOrder.get(b.id) ?? 0);
      });
  }, [model, originalOrder, products, range, sort]);

  const sortLabel =
    sort === 'price-asc'
      ? t.sortPriceLow
      : sort === 'price-desc'
        ? t.sortPriceHigh
        : sort === 'newest'
          ? (t.sortNewest ?? t.sortPopular)
          : t.sortPopular;

  return (
    <div>
      <div className="brand-filter-bar">
        <style>{`
          .brand-filter-bar {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding: 0 0 8px;
            margin-bottom: 18px;
            scrollbar-width: thin;
          }
          .brand-filter-bar::-webkit-scrollbar {
            height: 4px;
          }
          .brand-filter-control {
            min-width: 168px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 14px 16px;
            background: rgba(255,255,255,0.025);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 4px;
            flex-shrink: 0;
          }
          .brand-filter-control select {
            appearance: none;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 3px;
            color: #F5F3EF;
            font-size: 0.78rem;
            letter-spacing: 0.03em;
            padding: 10px 12px;
            outline: none;
          }
          .brand-filter-control select:disabled {
            color: rgba(255,255,255,0.72);
            opacity: 1;
            cursor: default;
          }
          @media (min-width: 980px) {
            .brand-filter-bar {
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              overflow: visible;
            }
            .brand-filter-control {
              min-width: 0;
            }
          }
        `}</style>

        <label className="brand-filter-control">
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A96E',
            }}
          >
            {t.brandLabel}
          </span>
          <select value={brandValue} disabled aria-label={t.brandLabel}>
            <option value={brandValue}>{brandValue}</option>
          </select>
        </label>

        <label className="brand-filter-control">
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A96E',
            }}
          >
            {t.modelLabel}
          </span>
          <select value={model} onChange={(event) => setModel(event.target.value)} aria-label={t.modelLabel}>
            <option value="all">{t.modelAll}</option>
            {models.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="brand-filter-control">
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A96E',
            }}
          >
            {t.rangeLabel}
          </span>
          <select value={range} onChange={(event) => setRange(event.target.value as RangeFilter)} aria-label={t.rangeLabel}>
            <option value="all">{t.rangeAll}</option>
            <option value="essential">{t.rangeEssential}</option>
            <option value="premium">{t.rangePremium}</option>
          </select>
        </label>

        <label className="brand-filter-control">
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A96E',
            }}
          >
            {t.sortLabel}
          </span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label={t.sortLabel}>
            <option value="popular">{t.sortPopular}</option>
            <option value="price-asc">{t.sortPriceLow}</option>
            <option value="price-desc">{t.sortPriceHigh}</option>
            {hasNewestSort ? <option value="newest">{t.sortNewest ?? t.sortPopular}</option> : null}
          </select>
        </label>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 24,
          paddingTop: 6,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <p
          style={{
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.42)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? t.resultSingular : t.resultPlural}
        </p>

        <p
          style={{
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.42)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {t.activeSortLabel}: <span style={{ color: '#C9A96E' }}>{sortLabel}</span>
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.85rem',
          }}
        >
          {t.noResults}
        </div>
      ) : (
        <div className="product-grid">
          <style>{`
            .product-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
            }
            @media (max-width: 1024px) {
              .product-grid { grid-template-columns: repeat(3, 1fr); }
            }
            @media (max-width: 700px) {
              .product-grid { grid-template-columns: repeat(2, 1fr); }
            }
          `}</style>
          {filteredProducts.map((product, index) => (
            <CollectionProductCard
              key={product.id}
              product={product}
              index={index}
              viewDetailsLabel={t.viewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
