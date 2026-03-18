'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { RangeBadge } from '@/components/shared/ProductBadges';
import type { Product } from '@/types/product';
import { getProductImageAlt } from '@/lib/products';

interface Props {
  product: Product;
}

// Dial graphic for placeholder — shows brand initial in a watch-face motif
function WatchPlaceholder({ brand }: { brand: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 0,
        position: 'relative',
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Middle ring */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            border: '1px solid rgba(201,169,110,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner ring */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.3)',
              background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'rgba(201,169,110,0.35)',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-playfair)',
              }}
            >
              {brand.charAt(0)}
            </span>
          </div>
        </div>

        {/* 12 o'clock marker */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 2,
            height: 10,
            background: 'rgba(201,169,110,0.25)',
            borderRadius: 1,
          }}
        />
        {/* 6 o'clock marker */}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 2,
            height: 10,
            background: 'rgba(201,169,110,0.25)',
            borderRadius: 1,
          }}
        />
        {/* 3 o'clock marker */}
        <div
          style={{
            position: 'absolute',
            right: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 10,
            height: 2,
            background: 'rgba(201,169,110,0.25)',
            borderRadius: 1,
          }}
        />
        {/* 9 o'clock marker */}
        <div
          style={{
            position: 'absolute',
            left: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 10,
            height: 2,
            background: 'rgba(201,169,110,0.25)',
            borderRadius: 1,
          }}
        />
      </div>

      {/* Brand name below */}
      <p
        style={{
          marginTop: 24,
          fontSize: '0.62rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.12)',
        }}
      >
        {brand}
      </p>
    </div>
  );
}

export function ProductGallery({ product }: Props) {
  const t = useTranslations('product');
  const hasImages = product.images && product.images.length > 0;
  // Use 4 thumbnail slots (real images or placeholder indices)
  const thumbCount = hasImages ? Math.min(product.images.length, 5) : 4;
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Main image */}
      <div
        style={{
          aspectRatio: '1/1',
          background: 'linear-gradient(155deg, #1C1C1C 0%, #111111 60%, #141414 100%)',
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[selected]}
            alt={getProductImageAlt(product, { viewIndex: selected + 1 })}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <WatchPlaceholder brand={product.brand} />
        )}

        {/* Range badge overlay */}
        <div style={{ position: 'absolute', top: 14, left: 14 }}>
          <RangeBadge
            range={product.range}
            premiumLabel={t('rangePremium')}
            essentialLabel={t('rangeEssential')}
            size="sm"
          />
        </div>

        {/* Thumbnail indicator */}
        {thumbCount > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              right: 14,
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.08em',
            }}
          >
            {selected + 1} / {thumbCount}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {thumbCount > 1 && (
        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: thumbCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                flex: 1,
                aspectRatio: '1/1',
                background:
                  selected === i
                    ? 'rgba(201,169,110,0.06)'
                    : 'rgba(255,255,255,0.02)',
                border: `1px solid ${
                  selected === i
                    ? 'rgba(201,169,110,0.35)'
                    : 'rgba(255,255,255,0.06)'
                }`,
                borderRadius: 3,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={`View ${product.name} image ${i + 1}`}
            >
              {hasImages ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[i]}
                  alt={getProductImageAlt(product, { viewIndex: i + 1 })}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `1px solid ${
                        selected === i
                          ? 'rgba(201,169,110,0.3)'
                          : 'rgba(255,255,255,0.1)'
                      }`,
                    }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
