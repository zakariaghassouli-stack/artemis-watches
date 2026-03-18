'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RangeBadge } from '@/components/shared/ProductBadges';
import { ALL_PRODUCTS, formatPrice, getProductImageAlt, localizeProduct } from '@/lib/products';
import type { Product } from '@/types/product';

const STORAGE_KEY = 'artemis_recently_viewed';
const MAX_ITEMS = 4;

interface Props {
  currentProductId: string;
}

export function RecentlyViewed({ currentProductId }: Props) {
  const t = useTranslations('product');
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let frame = 0;

    // Read existing viewed IDs
    let viewed: string[] = [];
    try {
      viewed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {}

    // Add current product to front, deduplicate
    const updated = [currentProductId, ...viewed.filter((id) => id !== currentProductId)].slice(0, MAX_ITEMS + 1);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}

    // Show products that are NOT the current one
    const toShow = updated
      .filter((id) => id !== currentProductId)
      .slice(0, MAX_ITEMS)
      .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
      .filter(Boolean) as Product[];

    frame = window.requestAnimationFrame(() => {
      setProducts(toShow);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentProductId]);

  if (products.length < 2) return null;

  return (
    <section style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: 'clamp(48px, 7vw, 80px) 24px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#C9A96E',
          marginBottom: 32,
        }}>
          {t('recentlyViewedTitle')}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(products.length, 4)}, 1fr)`,
            gap: 20,
          }}
          className="rv-grid"
        >
          <style>{`
            @media (max-width: 1024px) { .rv-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 480px) { .rv-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          {products.map((product) => {
            const localizedProduct = localizeProduct(product, locale);

            return (
              <Link
                key={product.id}
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
                <div
                  style={{
                    aspectRatio: '1 / 1',
                    background: 'linear-gradient(155deg, #1A1A1A 0%, #121212 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={getProductImageAlt(localizedProduct)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  )}

                  <div style={{ position: 'absolute', top: 10, right: 10 }}>
                    <RangeBadge
                      range={product.range}
                      premiumLabel={t('rangePremium')}
                      essentialLabel={t('rangeEssential')}
                      size="xs"
                    />
                  </div>
                </div>

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
                    {localizedProduct.brand}
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
                    {localizedProduct.name}
                  </p>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: '#6B6965',
                      marginBottom: 8,
                    }}
                  >
                    {localizedProduct.variant}
                  </p>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#A8A5A0',
                    }}
                  >
                    {formatPrice(product.price)} CAD
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
