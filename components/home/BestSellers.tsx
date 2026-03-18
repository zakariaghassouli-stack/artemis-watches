'use client';

import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RangeBadge, ScarcityBadge } from '@/components/shared/ProductBadges';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import {
  formatPrice,
  getBestSellers,
  getProductImageAlt,
  getScarcityState,
  localizeProduct,
} from '@/lib/products';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { convertPrice } from '@/lib/currency';
import type { Product } from '@/types/product';

function ProductCard({
  product,
  index,
  t,
}: {
  product: Product;
  index: number;
  t: ReturnType<typeof useTranslations<'home.bestSellers'>>;
}) {
  const locale = useLocale();
  const localizedProduct = localizeProduct(product, locale);
  const scarcity = getScarcityState(product);
  const { currency } = useCurrency();
  const detailNote = product.hasEssentialVariant
    ? t('cardRange')
    : product.availableSizes.length > 1
      ? t('cardSize')
      : t('cardSupport');

  return (
    <ScrollReveal delay={index * 80}>
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
          {localizedProduct.brand}
              </p>
            </>
          )}

          {/* Scarcity badge */}
          {scarcity && (
            <div style={{ position: 'absolute', top: 10, left: 10 }}>
              <ScarcityBadge
                scarcity={scarcity}
                labels={{
                  lowStock: t('lowStock'),
                  bestSeller: t('bestSeller'),
                  highDemand: t('highDemand'),
                  newArrival: t('newArrival'),
                  justRestocked: t('justRestocked'),
                }}
                size="sm"
              />
            </div>
          )}

          {/* Range badge */}
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <RangeBadge
              range={product.range}
              premiumLabel={t('premium')}
              essentialLabel={t('essential')}
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
            <p
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#A8A5A0',
              }}
            >
              {formatPrice(convertPrice(product.price, currency), currency)} {currency}
            </p>
            {product.compareAtPrice && (
              <p
                style={{
                  fontSize: '0.78rem',
                  color: '#6B6965',
                  textDecoration: 'line-through',
                }}
              >
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
              {t('cardCta')}
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function BestSellers() {
  const t = useTranslations('home.bestSellers');
  const products = getBestSellers(4);

  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(72px, 10vw, 120px) 24px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHeader
          overline={t('overline')}
          headline={t('headline')}
          subheadline={t('subheadline')}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 48,
          }}
          className="bs-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .bs-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 520px) {
              .bs-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} t={t} />
          ))}
        </div>

        <ScrollReveal delay={0}>
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/collections"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: '#C9A96E',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,169,110,0.3)',
                paddingBottom: 2,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = '#C9A96E')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(201,169,110,0.3)')
              }
            >
              {t('viewAll')}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
