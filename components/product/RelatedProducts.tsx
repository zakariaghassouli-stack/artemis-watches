'use client';

import { Link } from '@/i18n/navigation';
import { getRelatedProducts, getScarcityState, formatPrice } from '@/lib/products';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { convertPrice } from '@/lib/currency';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  title: string;
  viewAll: string;
}

function RelatedCard({ product }: { product: Product }) {
  const scarcity = getScarcityState(product);
  const { currency } = useCurrency();

  return (
    <Link
      href={`/collections/${product.brandSlug}/${product.collectionSlug}/${product.slug}`}
      style={{
        display: 'block',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 4,
        overflow: 'hidden',
        textDecoration: 'none',
        background: '#111111',
        transition: 'border-color 0.3s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.25)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Image area */}
      <div
        style={{
          aspectRatio: '1/1',
          background: 'linear-gradient(155deg, #1A1A1A 0%, #121212 100%)',
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
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: '1px solid rgba(201,169,110,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(201,169,110,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: 'rgba(201,169,110,0.3)',
                    fontFamily: 'var(--font-playfair)',
                  }}
                >
                  {product.brand.charAt(0)}
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: '0.52rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#2A2A2A',
              }}
            >
              {product.brand}
            </p>
          </>
        )}

        {/* Scarcity badge */}
        {scarcity && (
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            {scarcity.type === 'low-stock' && (
              <span
                style={{
                  fontSize: '0.56rem',
                  fontWeight: 600,
                  color: '#F5F3EF',
                  background: 'rgba(220,60,60,0.85)',
                  padding: '2px 6px',
                  borderRadius: 2,
                }}
              >
                {scarcity.count} left
              </span>
            )}
            {scarcity.type === 'best-seller' && (
              <span
                style={{
                  fontSize: '0.56rem',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  background: '#C9A96E',
                  padding: '2px 6px',
                  borderRadius: 2,
                }}
              >
                Best Seller
              </span>
            )}
          </div>
        )}

        {/* Range badge */}
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <span
            style={{
              fontSize: '0.52rem',
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
              padding: '2px 5px',
              borderRadius: 2,
            }}
          >
            {product.range === 'premium' ? 'Premium' : 'Essential'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 14px 18px' }}>
        <p
          style={{
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 4,
          }}
        >
          {product.brand}
        </p>
        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#F5F3EF',
            marginBottom: 3,
            letterSpacing: '-0.01em',
          }}
        >
          {product.name}
        </p>
        <p
          style={{
            fontSize: '0.7rem',
            color: '#6B6965',
            marginBottom: 8,
          }}
        >
          {product.variant}
        </p>
        <p
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#A8A5A0',
          }}
        >
          {formatPrice(convertPrice(product.price, currency), currency)} {currency}
        </p>
      </div>
    </Link>
  );
}

export function RelatedProducts({ product, title, viewAll }: Props) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontWeight: 700,
            color: '#F5F3EF',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>
        <Link
          href="/collections"
          style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            textDecoration: 'none',
          }}
        >
          {viewAll}
        </Link>
      </div>

      {/* Grid */}
      <div className="related-grid">
        <style>{`
          .related-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          @media (max-width: 1024px) {
            .related-grid { grid-template-columns: repeat(3, 1fr); }
          }
          @media (max-width: 640px) {
            .related-grid { grid-template-columns: repeat(2, 1fr); }
          }
        `}</style>
        {related.map((p) => (
          <RelatedCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
