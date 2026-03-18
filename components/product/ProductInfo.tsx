'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useSession } from 'next-auth/react';
import { getScarcityState, formatPrice, getInstallmentPrice } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { pixel } from '@/lib/pixel';
import { WishlistButton } from '@/components/product/WishlistButton';
import { RangeBadge, ScarcityBadge } from '@/components/shared/ProductBadges';
import { Link } from '@/i18n/navigation';
import { RotateCcw, ShieldCheck, Truck, Wrench } from 'lucide-react';
import type { Product } from '@/types/product';
import { getProductWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

interface Props {
  product: Product;
  collectionVariants: Product[];
  t: {
    addToCart: string;
    buyNow: string;
    orderWhatsApp: string;
    wishlistLabel: string;
    installmentLine: string;
    boxAndPapersLabel: string;
    freeShipping: string;
    returnPolicy: string;
    authenticityLabel: string;
    braceletTool: string;
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
    reviewSingular: string;
    reviewPlural: string;
    rangeSelectorLabel: string;
    variantsLabel: string;
    sizeSelectorLabel: string;
    checkoutNote: string;
    newClientDiscount: string;
  };
}

function NewClientDiscount({ price, registerLabel }: { price: number; registerLabel: string }) {
  const { data: session } = useSession();
  if (session?.user) return null;
  const discountedPrice = formatPrice(Math.round(price * 0.9));
  return (
    <p style={{ fontSize: '0.72rem', color: '#C9A96E', marginTop: 6, letterSpacing: '0.02em' }}>
      {registerLabel.replace('{price}', `${discountedPrice} CAD`)}
    </p>
  );
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

export function ProductInfo({ product, collectionVariants, t }: Props) {
  const [boxAndPapers, setBoxAndPapers] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [selectedRange, setSelectedRange] = useState<'essential' | 'premium'>(product.range);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] ?? '');
  const addItem = useCartStore((s) => s.addItem);
  const scarcity = getScarcityState(product);
  const locale = useLocale();

  // Derived active price based on selected range
  const activePrice =
    selectedRange === 'essential' && product.essentialPrice
      ? product.essentialPrice
      : product.price;

  // viewers counter removed — replaced with stock/scarcity indicator

  const installmentAmt = formatPrice(getInstallmentPrice(activePrice, 4));
  const totalPrice = activePrice + (boxAndPapers ? product.boxAndPapersPrice : 0);

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : null;

  const whatsappUrl = getWhatsAppUrl(
    getProductWhatsAppMessage({
      locale,
      productName: `${product.brand} ${product.name}`,
      variant: product.variant,
      price: formatPrice(activePrice),
    })
  );

  const handleBuyNow = async () => {
    if (!product.inStock || isBuyingNow) return;
    setIsBuyingNow(true);
    const finalPrice = activePrice + (boxAndPapers ? product.boxAndPapersPrice : 0);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            id: product.id,
            slug: product.slug,
            brandSlug: product.brandSlug,
            collectionSlug: product.collectionSlug,
            brand: product.brand,
            name: product.name,
            variant: product.variant,
            size: selectedSize || undefined,
            range: selectedRange,
            price: finalPrice,
            boxAndPapers,
            quantity: 1,
            cartKey: product.id,
          }],
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setIsBuyingNow(false);
    }
  };

  return (
    <div
      id="product-purchase-panel"
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
            {product.reviews.length === 1 ? t.reviewSingular : t.reviewPlural})
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

      {/* Variant pills — other products in same collection */}
      {collectionVariants.length > 1 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 10,
          }}>
            {t.variantsLabel}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {collectionVariants.map((v) => {
              const active = v.id === product.id;
              return (
                <Link
                  key={v.id}
                  href={`/collections/${v.brandSlug}/${v.collectionSlug}/${v.slug}`}
                  style={{
                    padding: '7px 14px',
                    border: `1px solid ${active ? '#C9A96E' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 3,
                    background: active ? 'rgba(201,169,110,0.08)' : 'transparent',
                    fontSize: '0.68rem',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#C9A96E' : 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {v.variant}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selector — only when multiple sizes available */}
      {product.availableSizes.length > 1 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 10,
          }}>
            {t.sizeSelectorLabel}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {product.availableSizes.map((sz) => {
              const active = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    padding: '7px 14px',
                    border: `1px solid ${active ? '#C9A96E' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 3,
                    background: active ? 'rgba(201,169,110,0.08)' : 'transparent',
                    fontSize: '0.68rem',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#C9A96E' : 'rgba(255,255,255,0.45)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.04em',
                  }}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Range Selector — only if product has essential variant */}
      {product.hasEssentialVariant && product.essentialPrice && (
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 10,
          }}>
            {t.rangeSelectorLabel}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['essential', 'premium'] as const).map((r) => {
              const price = r === 'essential' ? product.essentialPrice! : product.price;
              const active = selectedRange === r;
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRange(r)}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: `1px solid ${active ? '#C9A96E' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 3,
                    background: active ? 'rgba(201,169,110,0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                >
                  <p style={{
                    fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: active ? '#C9A96E' : 'rgba(255,255,255,0.3)',
                    marginBottom: 2,
                  }}>
                    {r === 'essential' ? t.rangeEssential : t.rangePremium}
                  </p>
                  <p style={{
                    fontSize: '0.82rem', fontWeight: 600,
                    color: active ? '#F5F3EF' : 'rgba(255,255,255,0.4)',
                    letterSpacing: '-0.01em',
                  }}>
                    {formatPrice(price)} CAD
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Range badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <RangeBadge
          range={selectedRange}
          premiumLabel={t.rangePremium}
          essentialLabel={t.rangeEssential}
          size="md"
        />

        {/* Scarcity indicator */}
        {scarcity && (
          <ScarcityBadge
            scarcity={scarcity}
            labels={{
              lowStock: t.lowStock,
              bestSeller: t.bestSeller,
              highDemand: t.highDemand,
              newArrival: t.newArrival,
              justRestocked: t.justRestocked,
            }}
            size="md"
          />
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

        {/* 10% welcome offer for non-logged-in */}
        <NewClientDiscount price={activePrice} registerLabel={t.newClientDiscount} />
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

      {/* Purchase reassurance */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 8,
          marginBottom: 18,
        }}
      >
        {[
          { icon: Truck, label: t.freeShipping },
          { icon: RotateCcw, label: t.returnPolicy },
          { icon: ShieldCheck, label: t.authenticityLabel },
          { icon: Wrench, label: t.braceletTool },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 12px',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.02)',
              fontSize: '0.66rem',
              color: '#A8A5A0',
              letterSpacing: '0.04em',
            }}
          >
            <Icon size={13} strokeWidth={1.6} style={{ color: '#C9A96E', flexShrink: 0 }} />
            {label}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Add to Cart */}
        <button
          disabled={!product.inStock}
          onClick={() => {
            if (!product.inStock) return;
            const finalPrice = activePrice + (boxAndPapers ? product.boxAndPapersPrice : 0);
            addItem({
              id: product.id,
              slug: product.slug,
              brandSlug: product.brandSlug,
              collectionSlug: product.collectionSlug,
              brand: product.brand,
              name: product.name,
              variant: product.variant,
              size: selectedSize || undefined,
              range: selectedRange,
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

        {/* Buy Now */}
        {product.inStock && (
          <button
            disabled={isBuyingNow}
            onClick={handleBuyNow}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: 'transparent',
              color: isBuyingNow ? 'rgba(201,169,110,0.4)' : '#C9A96E',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              border: `1px solid ${isBuyingNow ? 'rgba(201,169,110,0.2)' : 'rgba(201,169,110,0.35)'}`,
              borderRadius: 3,
              cursor: isBuyingNow ? 'wait' : 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isBuyingNow) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9A96E';
                (e.currentTarget as HTMLButtonElement).style.color = '#E8D5A8';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.35)';
              (e.currentTarget as HTMLButtonElement).style.color = '#C9A96E';
            }}
          >
            {isBuyingNow ? '...' : t.buyNow}
          </button>
        )}

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

      <p
        style={{
          marginTop: 12,
          fontSize: '0.72rem',
          color: 'rgba(255,255,255,0.34)',
          lineHeight: 1.6,
          letterSpacing: '0.02em',
        }}
      >
        {t.checkoutNote}
      </p>

      {/* Save to wishlist */}
      <div style={{ marginTop: 12 }}>
        <WishlistButton productId={product.id} label={t.wishlistLabel} />
      </div>
    </div>
  );
}
