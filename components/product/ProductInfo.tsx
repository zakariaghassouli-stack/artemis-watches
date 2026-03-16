'use client';

import { useState } from 'react';
import { getScarcityState, formatPrice, getInstallmentPrice } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { pixel } from '@/lib/pixel';
import { WishlistButton } from '@/components/product/WishlistButton';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  t: {
    addToCart: string;
    orderWhatsApp: string;
    wishlistLabel: string;
    installmentLine: string;
    boxAndPapersLabel: string;
    freeShipping: string;
    returnPolicy: string;
    authenticityLabel: string;
    keyPoints: string;
    lowStock: string;
    bestSeller: string;
    highDemand: string;
    newArrival: string;
    justRestocked: string;
    inStock: string;
    outOfStock: string;
    rangeEssential: string;
    rangePremium: string;
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.2 3.7H11L8.1 6.8l1.1 3.5L6 8.4l-3.2 1.9L3.9 6.8 1 4.7h3.8L6 1z"
            fill={n <= Math.round(rating) ? '#C9A96E' : 'rgba(255,255,255,0.12)'}
          />
        </svg>
      ))}
    </span>
  );
}

export function ProductInfo({ product, t }: Props) {
  const [boxAndPapers, setBoxAndPapers] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const scarcity = getScarcityState(product);
  const installmentAmt = formatPrice(getInstallmentPrice(product.price, 4));
  const totalPrice = product.price + (boxAndPapers ? product.boxAndPapersPrice : 0);

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : null;

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the ${product.brand} ${product.name} (${product.variant}) — ${formatPrice(product.price)} CAD. Is it still available?`
  );
  const whatsappUrl = `https://wa.me/15145609765?text=${whatsappMsg}`;

  return (
    <div
      style={{
        position: 'sticky',
        top: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Brand overline */}
      <p
        style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C9A96E',
          marginBottom: 12,
        }}
      >
        {product.brand}
      </p>

      {/* Product name */}
      <h1
        style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight: 700,
          color: '#F5F3EF',
          letterSpacing: '-0.025em',
          lineHeight: 1.08,
          marginBottom: 8,
        }}
      >
        {product.name}
      </h1>

      {/* Variant */}
      <p
        style={{
          fontSize: '0.85rem',
          color: '#6B6965',
          marginBottom: 12,
          letterSpacing: '0.02em',
        }}
      >
        {product.variant}
      </p>

      {/* Star rating */}
      {avgRating !== null && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Stars rating={avgRating} />
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>
            {avgRating.toFixed(1)} ({product.reviews.length}{' '}
            {product.reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.06)',
          marginBottom: 24,
        }}
      />

      {/* Range badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span
          style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: product.range === 'premium' ? '#C9A96E' : '#A8A5A0',
            background:
              product.range === 'premium'
                ? 'rgba(201,169,110,0.1)'
                : 'rgba(255,255,255,0.05)',
            border: `1px solid ${
              product.range === 'premium'
                ? 'rgba(201,169,110,0.25)'
                : 'rgba(255,255,255,0.1)'
            }`,
            padding: '4px 10px',
            borderRadius: 2,
          }}
        >
          {product.range === 'premium' ? t.rangePremium : t.rangeEssential}
        </span>

        {/* Scarcity indicator */}
        {scarcity && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color:
                scarcity.type === 'low-stock'
                  ? '#FF6B6B'
                  : scarcity.type === 'best-seller'
                  ? '#C9A96E'
                  : 'rgba(255,255,255,0.5)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background:
                  scarcity.type === 'low-stock'
                    ? '#FF6B6B'
                    : scarcity.type === 'best-seller'
                    ? '#C9A96E'
                    : 'rgba(255,255,255,0.4)',
                animation: 'infoPulse 2s ease infinite',
                flexShrink: 0,
              }}
            />
            <style>{`@keyframes infoPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}`}</style>
            {scarcity.type === 'low-stock'
              ? t.lowStock.replace('{count}', String(scarcity.count))
              : scarcity.type === 'best-seller'
              ? t.bestSeller
              : scarcity.type === 'high-demand'
              ? t.highDemand
              : scarcity.type === 'new-arrival'
              ? t.newArrival
              : t.justRestocked}
          </span>
        )}
      </div>

      {/* Price block */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
          <span
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
              fontWeight: 700,
              color: '#A8A5A0',
              letterSpacing: '-0.02em',
            }}
          >
            {formatPrice(totalPrice)} CAD
          </span>
          {product.compareAtPrice && (
            <span
              style={{
                fontSize: '1rem',
                color: '#3A3A3A',
                textDecoration: 'line-through',
              }}
            >
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Installment */}
        <p
          style={{
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.04em',
          }}
        >
          {t.installmentLine.replace('{amount}', installmentAmt)}
        </p>
      </div>

      {/* Box & Papers toggle (premium only) */}
      {product.range === 'premium' && (
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 24,
            cursor: 'pointer',
            padding: '12px 14px',
            border: `1px solid ${
              boxAndPapers ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.08)'
            }`,
            borderRadius: 3,
            background: boxAndPapers ? 'rgba(201,169,110,0.05)' : 'transparent',
            transition: 'border-color 0.2s, background 0.2s',
          }}
        >
          {/* Custom checkbox */}
          <div
            style={{
              width: 16,
              height: 16,
              border: `1px solid ${
                boxAndPapers ? '#C9A96E' : 'rgba(255,255,255,0.2)'
              }`,
              borderRadius: 2,
              background: boxAndPapers ? '#C9A96E' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
          >
            {boxAndPapers && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4l3 3 5-6"
                  stroke="#0A0A0A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <input
            type="checkbox"
            checked={boxAndPapers}
            onChange={(e) => setBoxAndPapers(e.target.checked)}
            style={{ display: 'none' }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              color: boxAndPapers ? '#C9A96E' : 'rgba(255,255,255,0.5)',
              letterSpacing: '0.04em',
            }}
          >
            {t.boxAndPapersLabel.replace('{price}', String(product.boxAndPapersPrice))}
          </span>
        </label>
      )}

      {/* Key points */}
      {product.keyPoints && product.keyPoints.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginBottom: 12,
            }}
          >
            {t.keyPoints}
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {product.keyPoints.map((point, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: '0.82rem',
                  color: '#A8A5A0',
                  lineHeight: 1.5,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: 2 }}
                >
                  <path
                    d="M2.5 7.5l3 3 6-6"
                    stroke="#C9A96E"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Add to Cart */}
        <button
          disabled={!product.inStock}
          onClick={() => {
            if (!product.inStock) return;
            const finalPrice = product.price + (boxAndPapers ? product.boxAndPapersPrice : 0);
            addItem({
              id: product.id,
              slug: product.slug,
              brandSlug: product.brandSlug,
              collectionSlug: product.collectionSlug,
              brand: product.brand,
              name: product.name,
              variant: product.variant,
              range: product.range,
              price: finalPrice,
              boxAndPapers,
            });
            pixel.addToCart({
              content_ids: [product.id],
              content_name: `${product.brand} ${product.name}`,
              content_type: 'product',
              value: finalPrice,
              currency: 'CAD',
            });
          }}
          style={{
            width: '100%',
            padding: '16px 24px',
            background: product.inStock ? '#C9A96E' : 'rgba(255,255,255,0.06)',
            color: product.inStock ? '#0A0A0A' : 'rgba(255,255,255,0.25)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            border: 'none',
            borderRadius: 3,
            cursor: product.inStock ? 'pointer' : 'not-allowed',
            transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            if (product.inStock)
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.88';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
        >
          {product.inStock ? t.addToCart : t.outOfStock}
        </button>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '100%',
            padding: '14px 24px',
            background: 'transparent',
            color: 'rgba(255,255,255,0.65)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'border-color 0.2s, color 0.2s',
            boxSizing: 'border-box',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              'rgba(255,255,255,0.25)';
            (e.currentTarget as HTMLAnchorElement).style.color = '#F5F3EF';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              'rgba(255,255,255,0.1)';
            (e.currentTarget as HTMLAnchorElement).style.color =
              'rgba(255,255,255,0.65)';
          }}
        >
          {/* WhatsApp icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t.orderWhatsApp}
        </a>
      </div>

      {/* Save to wishlist */}
      <div style={{ marginTop: 12 }}>
        <WishlistButton productId={product.id} label={t.wishlistLabel} />
      </div>

      {/* Trust pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 20,
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {[
          { icon: '✈', label: t.freeShipping },
          { icon: '↩', label: t.returnPolicy },
          { icon: '✓', label: t.authenticityLabel },
        ].map(({ icon, label }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ color: '#C9A96E', fontSize: '0.7rem' }}>{icon}</span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
