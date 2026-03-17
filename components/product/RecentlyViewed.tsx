'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ALL_PRODUCTS } from '@/lib/products';
import type { Product } from '@/types/product';

const STORAGE_KEY = 'artemis_recently_viewed';
const MAX_ITEMS = 4;

function formatCAD(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface Props {
  currentProductId: string;
}

export function RecentlyViewed({ currentProductId }: Props) {
  const t = useTranslations('product');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
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

    setProducts(toShow);
  }, [currentProductId]);

  if (products.length === 0) return null;

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
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${product.brandSlug}/${product.collectionSlug}/${product.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.2)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)')}
              >
                {/* Image */}
                <div style={{ aspectRatio: '1', background: '#111', overflow: 'hidden' }}>
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={`${product.brand} ${product.name}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 4 }}>
                    {product.brand}
                  </p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#F5F3EF', marginBottom: 4, letterSpacing: '-0.01em' }}>
                    {product.name}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#6B6965', marginBottom: 10 }}>
                    {product.variant}
                  </p>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#A8A5A0', letterSpacing: '-0.01em' }}>
                    {formatCAD(product.price)} CAD
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
