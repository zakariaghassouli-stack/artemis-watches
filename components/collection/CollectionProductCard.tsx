'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { RangeBadge, ScarcityBadge } from '@/components/shared/ProductBadges';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { useLocale, useTranslations } from 'next-intl';
import {
  formatPrice,
  getMovementComparisonLabel,
  getProductImageAlt,
  getScarcityState,
  localizeProduct,
} from '@/lib/products';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { convertPrice } from '@/lib/currency';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  index: number;
  viewDetailsLabel: string;
}

export function CollectionProductCard({ product, index, viewDetailsLabel }: Props) {
  const locale = useLocale();
  const tProduct = useTranslations('product');
  const tCollections = useTranslations('collections');
  const localizedProduct = localizeProduct(product, locale);
  const scarcity = getScarcityState(product);
  const { currency } = useCurrency();
  const movementComparison = getMovementComparisonLabel(product, locale);
  const detailNote = product.hasEssentialVariant && product.hasPremiumVariant
    ? movementComparison ?? tCollections('rangeOptions')
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
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.25)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
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
            <Image
              src={product.images[0]}
              alt={getProductImageAlt(localizedProduct, { locale })}
              fill
              sizes="(max-width: 700px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{
                position: 'absolute',
                inset: 0,
                objectFit: 'cover',
              }}
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

          {scarcity && (
            <div style={{ position: 'absolute', top: 10, left: 10 }}>
              <ScarcityBadge
                scarcity={scarcity}
                labels={{
                  lowStock: tProduct.raw('lowStock') as string,
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

          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <RangeBadge
              range={product.range}
              premiumLabel={tProduct('rangePremium')}
              essentialLabel={tProduct('rangeEssential')}
              size="xs"
            />
          </div>
        </div>

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
