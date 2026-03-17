'use client';

import { useMemo } from 'react';
import { Link } from '@/i18n/navigation';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useWishlistStore } from '@/store/wishlist';
import { WishlistButton } from '@/components/product/WishlistButton';
import { formatPrice } from '@/lib/products';
import type { Product } from '@/types/product';

export function WishlistClient({ allProducts }: { allProducts: Product[] }) {
  const t = useTranslations('wishlist');
  const productIds = useWishlistStore((s) => s.productIds);

  const saved = useMemo(
    () => allProducts.filter((p) => productIds.includes(p.id)),
    [allProducts, productIds]
  );

  // ── Empty state ──────────────────────────────────────────────
  if (saved.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(80px, 12vw, 140px) 24px',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <Heart size={24} color="rgba(168,165,160,0.3)" strokeWidth={1.5} />
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 700,
            color: '#F5F3EF',
            letterSpacing: '-0.01em',
            marginBottom: 12,
          }}
        >
          {t('emptyTitle')}
        </h2>

        <p
          style={{
            fontSize: '0.875rem',
            color: '#6B6965',
            maxWidth: 380,
            lineHeight: 1.65,
            marginBottom: 36,
          }}
        >
          {t('emptyHint')}
        </p>

        <Link
          href="/collections"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '13px 28px',
            background: '#C9A96E',
            color: '#0A0A0A',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: 2,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.88')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        >
          {t('browseCta')}
        </Link>
      </div>
    );
  }

  // ── Product grid ─────────────────────────────────────────────
  return (
    <div>
      {/* Count */}
      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.06em',
          color: '#6B6965',
          marginBottom: 32,
        }}
      >
        {saved.length === 1
          ? t('countSingular', { count: 1 })
          : t('countPlural', { count: saved.length })}
      </p>

      <div className="wishlist-grid">
        <style>{`
          .wishlist-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          @media (max-width: 1100px) {
            .wishlist-grid { grid-template-columns: repeat(3, 1fr); }
          }
          @media (max-width: 700px) {
            .wishlist-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 480px) {
            .wishlist-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        {saved.map((product) => {
          const href = `/collections/${product.brandSlug}/${product.collectionSlug}/${product.slug}`;
          return (
            <div key={product.id} style={{ position: 'relative' }}>
              {/* Remove button — top left */}
              <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                <WishlistButton productId={product.id} size="sm" />
              </div>

              {/* Range badge — top right */}
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  zIndex: 2,
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: 2,
                  background: product.range === 'premium'
                    ? 'rgba(201,169,110,0.12)'
                    : 'rgba(168,165,160,0.1)',
                  border: product.range === 'premium'
                    ? '1px solid rgba(201,169,110,0.25)'
                    : '1px solid rgba(168,165,160,0.2)',
                  color: product.range === 'premium' ? '#C9A96E' : '#A8A5A0',
                }}
              >
                {product.range === 'premium' ? t('premiumBadge') : t('essentialBadge')}
              </div>

              <Link
                href={href}
                style={{
                  display: 'block',
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Image */}
                <div
                  style={{
                    aspectRatio: '1 / 1',
                    background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0]}
                      alt={`${product.brand} ${product.name}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <Heart size={32} color="rgba(201,169,110,0.15)" strokeWidth={1} />
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '18px 18px 20px' }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 5 }}>
                    {product.brand}
                  </p>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5F3EF', lineHeight: 1.2, marginBottom: 3, letterSpacing: '-0.01em' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#6B6965', marginBottom: 14 }}>
                    {product.variant}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: '#F5F3EF', letterSpacing: '-0.01em' }}>
                      {formatPrice(product.price)}
                      <span style={{ fontSize: '0.62rem', color: '#6B6965', marginLeft: 3 }}>CAD</span>
                    </p>
                    <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E' }}>
                      {t('viewDetails')} →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
