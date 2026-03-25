'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
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
  const locale = useLocale();
  const uniqueImages = Array.from(
    new Set((product.images ?? []).filter(Boolean))
  );
  const videoThumb = uniqueImages[1] ?? uniqueImages[0] ?? null;
  const media = [
    ...(product.video ? [{ type: 'video' as const, src: product.video }] : []),
    ...uniqueImages.map((src) => ({ type: 'image' as const, src })),
  ];
  const thumbCount = media.length > 0 ? Math.min(media.length, 5) : 4;
  const [selected, setSelected] = useState(0);
  const activeMedia = media[selected];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        width: '100%',
        minWidth: 0,
        isolation: 'isolate',
        zIndex: 0,
      }}
    >
      {/* Main image */}
      <div
        className="product-gallery"
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
          width: '100%',
          minWidth: 0,
          maxWidth: '100%',
          maxHeight: 'min(80vh, 820px)',
          isolation: 'isolate',
          zIndex: 0,
        }}
      >
        {activeMedia ? (
          activeMedia.type === 'video' ? (
            <video
              src={activeMedia.src}
              poster={uniqueImages[0]}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'cover',
                position: 'relative',
                zIndex: 0,
              }}
            />
          ) : (
            <Image
              src={activeMedia.src}
              alt={getProductImageAlt(product, { viewIndex: selected + 1, locale })}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={selected === 0}
              style={{
                objectFit: 'cover',
                zIndex: 0,
              }}
            />
          )
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
        <div style={{ display: 'flex', gap: 8, minWidth: 0 }}>
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
              aria-label={
                media[i]?.type === 'video'
                  ? `Play ${product.name} video`
                  : `View ${product.name} image ${i + 1}`
              }
            >
              {media[i] ? (
                media[i].type === 'video' ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {videoThumb ? (
                      <Image
                        src={videoThumb}
                        alt={getProductImageAlt(product, { locale })}
                        fill
                        sizes="96px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : null}
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F5F3EF',
                        background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.24) 100%)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="9" cy="9" r="8" fill="rgba(10,10,10,0.58)" stroke="rgba(245,243,239,0.22)" />
                        <path d="M7 6.25l5 2.75L7 11.75V6.25z" fill="#F5F3EF" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <Image
                    src={media[i].src}
                    alt={getProductImageAlt(product, { viewIndex: i + 1, locale })}
                    fill
                    sizes="96px"
                    style={{ objectFit: 'cover' }}
                  />
                )
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
