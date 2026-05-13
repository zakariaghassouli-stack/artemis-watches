'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/products';
import { analytics } from '@/lib/analytics';
import { useCartStore } from '@/store/cart';
import { pixel } from '@/lib/pixel';
import type { Product } from '@/types/product';
import { ContactCTA } from '@/components/shared/ContactCTA';

interface Props {
  product: Product;
  addToCartLabel: string;
  orderWhatsAppLabel: string;
  selectOptionsLabel: string;
  selectionHint: string;
}

export function MobileStickyBar({
  product,
  addToCartLabel,
  orderWhatsAppLabel,
  selectOptionsLabel,
  selectionHint,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const defaultSize = product.availableSizes[0] ?? undefined;
  const needsSelection = product.availableSizes.length > 1 || product.hasEssentialVariant;
  const includesBoxAndPapers = product.range === 'premium';
  // Pivot V2: same flag as ProductInfo. Hides the right "Add to Cart" button
  // in the mobile sticky bar; the WhatsApp CTA on the left expands to take
  // the full width.
  const cartEnabled = process.env.NEXT_PUBLIC_ENABLE_CART === 'true';

  // Show bar only after user has scrolled past the hero info panel (~600px)
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrimaryAction = () => {
    if (needsSelection) {
      document
        .getElementById('product-purchase-panel')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (!product.inStock || added) return;
    addItem({
      id: product.id,
      slug: product.slug,
      brandSlug: product.brandSlug,
      collectionSlug: product.collectionSlug,
      brand: product.brand,
      name: product.name,
      variant: product.variant,
      size: defaultSize,
      range: product.range,
      price: product.price,
      boxAndPapers: includesBoxAndPapers,
    });
    pixel.addToCart({
      content_ids: [product.id],
      content_name: `${product.brand} ${product.name}`,
      content_type: 'product',
      value: product.price,
      currency: 'CAD',
    });
    analytics.addToCart({
      id: product.id,
      name: `${product.brand} ${product.name}`,
      brand: product.brand,
      price: product.price,
      range: product.range,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
            {needsSelection && (
              <p
                style={{
                  fontSize: '0.64rem',
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.03em',
                  marginTop: 2,
                }}
              >
                {selectionHint}
              </p>
            )}
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

        {/* CTA buttons row - WhatsApp primary, Add to cart secondary outline */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <ContactCTA
              channel="whatsapp"
              variant="primary"
              size="md"
              source="product_sticky"
              fullWidth
              label={orderWhatsAppLabel}
              productContext={{
                brand: product.brand,
                name: product.name,
                variant: product.variant,
                range: product.range,
                size: defaultSize,
                boxAndPapers: includesBoxAndPapers,
                price: product.price,
                productId: product.id,
              }}
            />
          </div>

          {cartEnabled && (
          <button
            disabled={!product.inStock}
            onClick={handlePrimaryAction}
            style={{
              flex: 1,
              padding: '13px 0',
              background: 'transparent',
              color: product.inStock
                ? added
                  ? '#E8D5A8'
                  : '#C9A96E'
                : 'rgba(255,255,255,0.2)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: `1px solid ${product.inStock ? 'rgba(201,169,110,0.35)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 3,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            {needsSelection ? selectOptionsLabel : added ? '✓' : addToCartLabel}
          </button>
          )}
        </div>
      </div>
    </>
  );
}
