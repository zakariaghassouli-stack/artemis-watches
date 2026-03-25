'use client';

import { useState } from 'react';
import { CollectionProductCard } from '@/components/collection/CollectionProductCard';
import type { Product } from '@/types/product';

type FilterOption = 'all' | 'essential' | 'premium';
type SortOption = 'default' | 'price-asc' | 'price-desc';

interface Translations {
  filterAll: string;
  filterEssential: string;
  filterPremium: string;
  sortBy: string;
  sortDefault: string;
  sortPriceLow: string;
  sortPriceHigh: string;
  products: string;
  product: string;
  viewDetails: string;
  noResults: string;
}

interface Props {
  products: Product[];
  t: Translations;
  initialFilter?: FilterOption;
}

export function ProductGridClient({ products, t, initialFilter }: Props) {
  const [filter, setFilter] = useState<FilterOption>(initialFilter ?? 'all');
  const [sort, setSort] = useState<SortOption>('default');

  const counts = {
    all: products.length,
    essential: products.filter((p) => p.range === 'essential').length,
    premium: products.filter((p) => p.range === 'premium').length,
  };

  const filtered = products
    .filter((p) => filter === 'all' || p.range === filter)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return 0;
    });

  const tabs: { key: FilterOption; label: string; count: number }[] = [
    { key: 'all', label: t.filterAll, count: counts.all },
    { key: 'essential', label: t.filterEssential, count: counts.essential },
    { key: 'premium', label: t.filterPremium, count: counts.premium },
  ];

  return (
    <div>
      {/* Filter + sort bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        {/* Range tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {tabs.map(({ key, label, count }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.7rem',
                  fontWeight: active ? 600 : 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: active
                    ? 'rgba(201,169,110,0.12)'
                    : 'transparent',
                  color: active ? '#C9A96E' : 'rgba(255,255,255,0.35)',
                  border: `1px solid ${
                    active
                      ? 'rgba(201,169,110,0.3)'
                      : 'rgba(255,255,255,0.08)'
                  }`,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {label}
                <span
                  style={{
                    fontSize: '0.6rem',
                    color: active
                      ? 'rgba(201,169,110,0.7)'
                      : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort select */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 3,
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            padding: '8px 12px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="default" style={{ background: '#111' }}>
            {t.sortDefault}
          </option>
          <option value="price-asc" style={{ background: '#111' }}>
            {t.sortPriceLow}
          </option>
          <option value="price-desc" style={{ background: '#111' }}>
            {t.sortPriceHigh}
          </option>
        </select>
      </div>

      {/* Product count */}
      <p
        style={{
          fontSize: '0.68rem',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
          marginBottom: 24,
        }}
      >
        {filtered.length} {filtered.length === 1 ? t.product : t.products}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
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
          {filtered.map((product, i) => (
            <CollectionProductCard
              key={product.id}
              product={product}
              index={i}
              viewDetailsLabel={t.viewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
