'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { getScarcityState, formatPrice } from '@/lib/products';
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
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const scarcity = getScarcityState(product);

  return (
    <ScrollReveal delay={index * 60}>
      <Link
        href={`/collections/${product.brandSlug}/${product.collectionSlug}/${product.slug}`}
        style={{
          display: 'block',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 4,
          overflow: 'hidden',
          textDecoration: 'none',
          transition:
            'border-color 0.3s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
          background: '#111111',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            'rgba(201,169,110,0.25)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image area */}
        <div
          style={{
            aspectRatio: '1/1',
            background: 'linear-gradient(160deg, #1A1A1A 0%, #131313 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={`${product.brand} ${product.name}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
          ) : (
            <>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '1px solid rgba(201,169,110,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(201,169,110,0.25)',
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#3A3A3A',
                }}
              >
                {product.brand}
              </p>
            </>
          )}

          {/* Scarcity badge */}
          {scarcity && (
            <div style={{ position: 'absolute', top: 10, left: 10 }}>
              {scarcity.type === 'best-seller' && (
                <span
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#0A0A0A',
                    background: '#C9A96E',
                    padding: '3px 7px',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#0A0A0A',
                      animation: 'scarcityPulse 2s ease infinite',
                      flexShrink: 0,
                    }}
                  />
                  Best Seller
                </span>
              )}
              {scarcity.type === 'low-stock' && (
                <span
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    color: '#F5F3EF',
                    background: 'rgba(220,60,60,0.9)',
                    padding: '3px 7px',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#FF6B6B',
                      animation: 'scarcityPulse 2s ease infinite',
                      flexShrink: 0,
                    }}
                  />
                  Only {scarcity.count} left
                </span>
              )}
              {scarcity.type === 'high-demand' && (
                <span
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    color: '#C9A96E',
                    background: 'rgba(201,169,110,0.12)',
                    border: '1px solid rgba(201,169,110,0.25)',
                    padding: '3px 7px',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#C9A96E',
                      animation: 'scarcityPulse 2s ease infinite',
                      flexShrink: 0,
                    }}
                  />
                  High Demand
                </span>
              )}
              {scarcity.type === 'new-arrival' && (
                <span
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    color: '#F5F3EF',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '3px 7px',
                    borderRadius: 2,
                  }}
                >
                  New Arrival
                </span>
              )}
            </div>
          )}

          <style>{`
            @keyframes scarcityPulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(0.8); }
            }
          `}</style>

          {/* Range badge */}
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <span
              style={{
                fontSize: '0.55rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: product.range === 'premium' ? '#C9A96E' : '#A8A5A0',
                background:
                  product.range === 'premium'
                    ? 'rgba(201,169,110,0.1)'
                    : 'rgba(255,255,255,0.05)',
                border: `1px solid ${
                  product.range === 'premium'
                    ? 'rgba(201,169,110,0.2)'
                    : 'rgba(255,255,255,0.08)'
                }`,
                padding: '2px 6px',
                borderRadius: 2,
              }}
            >
              {product.range === 'premium' ? 'Premium' : 'Essential'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '16px 16px 20px' }}>
          <p
            style={{
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 5,
            }}
          >
            {product.brand}
          </p>
          <p
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#F5F3EF',
              marginBottom: 4,
              letterSpacing: '-0.01em',
            }}
          >
            {product.name}
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: '#6B6965',
              marginBottom: 10,
            }}
          >
            {product.variant}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <p
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#A8A5A0',
              }}
            >
              {formatPrice(product.price)} CAD
            </p>
            {product.compareAtPrice && (
              <p
                style={{
                  fontSize: '0.78rem',
                  color: '#6B6965',
                  textDecoration: 'line-through',
                }}
              >
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function ProductGridClient({ products, t }: Props) {
  const [filter, setFilter] = useState<FilterOption>('all');
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
            @media (max-width: 480px) {
              .product-grid { grid-template-columns: 1fr; }
            }
          `}</style>
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
