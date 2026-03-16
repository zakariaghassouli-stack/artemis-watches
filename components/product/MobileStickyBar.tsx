'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/products';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  addToCartLabel: string;
  orderWhatsAppLabel: string;
}

export function MobileStickyBar({ product, addToCartLabel, orderWhatsAppLabel }: Props) {
  const [visible, setVisible] = useState(false);

  // Show bar only after user has scrolled past the hero info panel (~600px)
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the ${product.brand} ${product.name} (${product.variant}) — ${formatPrice(product.price)} CAD. Is it still available?`
  );
  const whatsappUrl = `https://wa.me/15145609765?text=${whatsappMsg}`;

  return (
    <>
      <style>{`
        .mobile-sticky-bar {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-sticky-bar {
            display: flex;
          }
        }
      `}</style>

      <div
        className="mobile-sticky-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(14,14,14,0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 16px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
          flexDirection: 'column',
          gap: 8,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Product name + price row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 2,
              }}
            >
              {product.brand}
            </p>
            <p
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#F5F3EF',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '55vw',
              }}
            >
              {product.name}
            </p>
          </div>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#A8A5A0',
              letterSpacing: '-0.02em',
              flexShrink: 0,
            }}
          >
            {formatPrice(product.price)} CAD
          </p>
        </div>

        {/* CTA buttons row */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            disabled={!product.inStock}
            style={{
              flex: 1,
              padding: '13px 0',
              background: product.inStock ? '#C9A96E' : 'rgba(255,255,255,0.06)',
              color: product.inStock ? '#0A0A0A' : 'rgba(255,255,255,0.2)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: 3,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
            }}
          >
            {addToCartLabel}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: '13px 0',
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 3,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
