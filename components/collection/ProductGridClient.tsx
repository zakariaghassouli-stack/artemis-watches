'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { RangeBadge, ScarcityBadge } from '@/components/shared/ProductBadges';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { useLocale, useTranslations } from 'next-intl';
import { getScarcityState, formatPrice, getProductImageAlt, localizeProduct } from '@/lib/products';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { convertPrice } from '@/lib/currency';
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

function ProductCard({
  product,
  index,
  viewDetailsLabel,
}: {
  product: Product;
  index: number;
  viewDetailsLabel: string;
}) {
  const locale = useLocale();
  const tProduct = useTranslations('product');
  const tCollections = useTranslations('collections');
  const localizedProduct = localizeProduct(product, locale);
  const scarcity = getScarcityState(product);
  const { currency } = useCurrency();
  const detailNote = product.hasEssentialVariant
    ? tCollections('rangeOptions')
    : product.availableSizes.length > 1
      ? tCollections('sizeOptions')
      : tCollections('supportNote');

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
              alt={getProductImageAlt(localizedProduct)}
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
              <ScarcityBadge
                scarcity={scarcity}
                labels={{
                  lowStock: tProduct('lowStock'),
                  bestSeller: tProduct('bestSeller'),
                  highDemand: tProduct('highDemand'),
                  newArrival: tProduct('newArrival'),
                  justRestocked: tProduct('justRestocked'),
                }}
                size="sm"
                excludeTypes={['best-seller', 'high-demand']}
              />
            </div>
          )}

          {/* Range badge */}
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <RangeBadge
              range={product.range}
              premiumLabel={tProduct('rangePremium')}
              essentialLabel={tProduct('rangeEssential')}
              size="xs"
            />
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
          {localizedProduct.brand}
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
          {localizedProduct.name}
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: '#6B6965',
              marginBottom: 10,
            }}
          >
          {localizedProduct.variant}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#A8A5A0' }}>
              {formatPrice(convertPrice(product.price, currency), currency)} {currency}
            </p>
            {product.compareAtPrice && (
              <p style={{ fontSize: '0.78rem', color: '#6B6965', textDecoration: 'line-through' }}>
                {formatPrice(convertPrice(product.compareAtPrice, currency), currency)}
              </p>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span
              style={{
                fontSize: '0.62rem',
                color: 'rgba(255,255,255,0.32)',
                letterSpacing: '0.04em',
              }}
            >
              {detailNote}
            </span>
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                whiteSpace: 'nowrap',
              }}
            >
              {viewDetailsLabel}
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
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
            @media (max-width: 480px) {
              .product-grid { grid-template-columns: 1fr; }
            }
          `}</style>
          {filtered.map((product, i) => (
            <ProductCard
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
