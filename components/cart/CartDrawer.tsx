'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCartStore, selectItemCount, selectCartTotal } from '@/store/cart';
import type { CartItem } from '@/store/cart';

function formatCAD(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 12,
        padding: '16px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div>
        {/* Brand */}
        <p
          style={{
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 3,
          }}
        >
          {item.brand}
        </p>
        {/* Name */}
        <p
          style={{
            fontSize: '0.82rem',
            fontWeight: 500,
            color: '#F5F3EF',
            marginBottom: 2,
            letterSpacing: '-0.01em',
          }}
        >
          {item.name}
        </p>
        {/* Variant */}
        <p style={{ fontSize: '0.7rem', color: '#6B6965', marginBottom: 4 }}>
          {item.variant}
        </p>
        {/* Box & papers indicator */}
        {item.boxAndPapers && (
          <p
            style={{
              fontSize: '0.6rem',
              color: 'rgba(201,169,110,0.6)',
              letterSpacing: '0.06em',
              marginBottom: 8,
            }}
          >
            + Box & Papers
          </p>
        )}
        {/* Qty controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <button
            onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
            style={{
              width: 28,
              height: 28,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '3px 0 0 3px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span
            style={{
              width: 32,
              height: 28,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: 'none',
              borderRight: 'none',
              color: '#F5F3EF',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
            style={{
              width: 28,
              height: 28,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0 3px 3px 0',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Price + remove */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#A8A5A0',
            letterSpacing: '-0.01em',
          }}
        >
          {formatCAD(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeItem(item.cartKey)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.2)',
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
            padding: 0,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(220,80,80,0.7)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.2)')
          }
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart } = useCartStore();
  const itemCount = useCartStore(selectItemCount);
  const total = useCartStore(selectCartTotal);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Promo code
  const [promoInput, setPromoInput] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); // percentage, e.g. 10
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeCart();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const applyPromo = useCallback(async () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    setPromoLoading(true);
    setPromoError('');

    try {
      const res = await fetch(`/api/auth/validate-promo?code=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (data.valid) {
        setPromoCode(code);
        setPromoDiscount(data.discount as number);
        setPromoError('');
      } else {
        setPromoCode('');
        setPromoDiscount(0);
        setPromoError(data.error ?? 'Invalid promo code');
      }
    } catch {
      setPromoError('Could not validate code. Try again.');
    } finally {
      setPromoLoading(false);
    }
  }, [promoInput]);

  const removePromo = useCallback(() => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoInput('');
    setPromoError('');
  }, []);

  const handleCheckout = useCallback(async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, promoCode: promoCode || undefined }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Checkout failed');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsCheckingOut(false);
    }
  }, [items, promoCode]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 60,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(420px, 100vw)',
          background: '#111111',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          zIndex: 61,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F5F3EF',
              }}
            >
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  background: '#C9A96E',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#F5F3EF')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)')
            }
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Items — scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 24px',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 16,
                paddingBottom: 60,
              }}
            >
              {/* Empty watch icon */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="5"
                    y="6"
                    width="14"
                    height="12"
                    rx="2"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 6V4M16 6V4M12 9v3l2 1"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                }}
              >
                Your cart is empty
              </p>
              <Link
                href="/collections"
                onClick={closeCart}
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                  textDecoration: 'none',
                }}
              >
                Browse Collections →
              </Link>
            </div>
          ) : (
            items.map((item) => <CartItemRow key={item.cartKey} item={item} />)
          )}
        </div>

        {/* Footer — subtotal + checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              flexShrink: 0,
            }}
          >
            {/* Subtotal row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#A8A5A0', letterSpacing: '-0.01em' }}>
                {formatCAD(total)} CAD
              </span>
            </div>
            {/* Discount row */}
            {promoDiscount > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: '0.72rem', color: '#C9A96E', letterSpacing: '0.06em' }}>
                  Promo ({promoCode}) −{promoDiscount}%
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#C9A96E' }}>
                  −{formatCAD(total * promoDiscount / 100)} CAD
                </span>
              </div>
            )}

            <p
              style={{
                fontSize: '0.62rem',
                color: 'rgba(255,255,255,0.2)',
                marginBottom: 16,
                letterSpacing: '0.04em',
              }}
            >
              Shipping & taxes calculated at checkout
            </p>

            {/* Promo code input */}
            {promoCode ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(201,169,110,0.07)',
                  border: '1px solid rgba(201,169,110,0.2)',
                  borderRadius: 3,
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: '0.72rem', color: '#C9A96E', letterSpacing: '0.1em' }}>
                  ✓ {promoCode} applied
                </span>
                <button
                  onClick={removePromo}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', padding: 0 }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 0, marginBottom: 14 }}>
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => { if (e.key === 'Enter') applyPromo(); }}
                  placeholder="PROMO CODE"
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRight: 'none',
                    borderRadius: '3px 0 0 3px',
                    padding: '10px 12px',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    color: '#F5F3EF',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={applyPromo}
                  disabled={promoLoading || !promoInput.trim()}
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0 3px 3px 0',
                    color: promoInput.trim() ? '#C9A96E' : 'rgba(255,255,255,0.2)',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: promoInput.trim() ? 'pointer' : 'default',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s',
                  }}
                >
                  {promoLoading ? '...' : 'Apply'}
                </button>
              </div>
            )}

            {promoError && (
              <p style={{ fontSize: '0.68rem', color: '#FF6B6B', marginBottom: 10, textAlign: 'center' }}>
                {promoError}
              </p>
            )}

            {/* Error */}
            {error && (
              <p
                style={{
                  fontSize: '0.72rem',
                  color: '#FF6B6B',
                  marginBottom: 12,
                  textAlign: 'center',
                }}
              >
                {error}
              </p>
            )}

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              style={{
                width: '100%',
                padding: '15px 24px',
                background: isCheckingOut ? 'rgba(201,169,110,0.5)' : '#C9A96E',
                color: '#0A0A0A',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: 3,
                cursor: isCheckingOut ? 'wait' : 'pointer',
                transition: 'opacity 0.2s',
                marginBottom: 10,
              }}
            >
              {isCheckingOut ? 'Redirecting...' : 'Proceed to Checkout →'}
            </button>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              style={{
                width: '100%',
                padding: '12px 24px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.35)',
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.35)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              Continue Shopping
            </button>

            {/* Trust strip */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 20,
                marginTop: 16,
                paddingTop: 16,
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {['Free Shipping', '30-Day Return', 'Authenticity Guaranteed'].map((label) => (
                <span
                  key={label}
                  style={{
                    fontSize: '0.58rem',
                    color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
