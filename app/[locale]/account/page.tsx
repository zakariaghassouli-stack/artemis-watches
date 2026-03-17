import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Order } from '@prisma/client';
import { SignOutButton } from './SignOutButton';
import { ReferralShare } from './ReferralShare';

function formatCAD(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Pending',
  PAID: 'Paid',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: '#A8A5A0',
  PAID: '#C9A96E',
  PROCESSING: '#C9A96E',
  SHIPPED: '#7EB89A',
  DELIVERED: '#7EB89A',
  CANCELLED: '#FF6B6B',
  REFUNDED: '#FF6B6B',
};

export default async function AccountPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let session: any;
  try {
    session = await auth();
  } catch (err) {
    console.error('[account] auth() failed:', err);
    throw err; // Let error.tsx handle it and show real message
  }

  if (!session?.user?.email) {
    redirect('/account/login');
  }

  let orders: Order[] = [];
  let promoCode: string | null = null;
  let promoUsed = false;

  if (prisma) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          orders: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      });
      orders = user?.orders ?? [];
      promoCode = user?.promoCode ?? null;
      promoUsed = user?.promoUsed ?? false;
    } catch (err) {
      console.error('[account] DB query failed:', err);
      // Page renders gracefully without order data
    }
  }

  const userName = session.user.name ?? session.user.email;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        padding: 'clamp(48px, 8vw, 96px) 24px',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 8 }}>
              Your Account
            </p>
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: '#F5F3EF',
                margin: 0,
              }}
            >
              Welcome, {userName}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <style>{`
              .acc-settings-link { color: #6B6965; border-color: rgba(255,255,255,0.08); }
              .acc-settings-link:hover { color: #C9A96E !important; border-color: rgba(201,169,110,0.25) !important; }
              .acc-order-row:hover { border-color: rgba(201,169,110,0.2) !important; background: rgba(255,255,255,0.035) !important; }
            `}</style>
            <Link
              href="/account/settings"
              className="acc-settings-link"
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '10px 16px',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3,
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              Settings
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* ── Promo Code Card ── */}
        {promoCode && (
          <div
            style={{
              padding: '32px 40px',
              background: promoUsed
                ? 'rgba(255,255,255,0.02)'
                : 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0.03) 100%)',
              border: promoUsed
                ? '1px solid rgba(255,255,255,0.06)'
                : '1px solid rgba(201,169,110,0.2)',
              borderRadius: 4,
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div>
              <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: promoUsed ? '#6B6965' : '#C9A96E', marginBottom: 10 }}>
                Your Exclusive Promo Code
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-playfair, monospace)',
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: promoUsed ? '#3A3835' : '#C9A96E',
                  marginBottom: 8,
                }}
              >
                {promoCode}
              </p>
              <p style={{ fontSize: '0.78rem', color: promoUsed ? '#3A3835' : '#A8A5A0', lineHeight: 1.5 }}>
                {promoUsed
                  ? 'This code has been redeemed. Thank you for your order.'
                  : '10% off your first order — enter this code at checkout.'}
              </p>
            </div>
            {!promoUsed && (
              <Link
                href="/collections"
                style={{
                  padding: '12px 24px',
                  background: '#C9A96E',
                  color: '#0A0A0A',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: 3,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Shop Now →
              </Link>
            )}
          </div>
        )}

        {/* ── Referral ── */}
        {promoCode && !promoUsed && (
          <div
            style={{
              padding: '28px 36px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 4,
            }}
          >
            <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6965', marginBottom: 10 }}>
              Share & Give 10% Off
            </p>
            <p style={{ fontSize: '0.82rem', color: '#A8A5A0', lineHeight: 1.6, marginBottom: 20 }}>
              Share your code with a friend — they get <span style={{ color: '#C9A96E', fontWeight: 600 }}>10% off</span> their first order. No conditions.
            </p>
            <ReferralShare code={promoCode} />
          </div>
        )}

        {/* ── Orders ── */}
        <div>
          <p
            style={{
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#6B6965',
              marginBottom: 24,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              paddingBottom: 16,
            }}
          >
            Order History
          </p>

          {orders.length === 0 ? (
            <div
              style={{
                padding: '48px 32px',
                textAlign: 'center',
                border: '1px dashed rgba(255,255,255,0.07)',
                borderRadius: 4,
              }}
            >
              <p style={{ fontSize: '0.85rem', color: '#6B6965', marginBottom: 16 }}>
                No orders yet.
              </p>
              <Link
                href="/collections"
                style={{
                  fontSize: '0.72rem',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="acc-order-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto auto',
                    alignItems: 'center',
                    gap: 24,
                    padding: '20px 24px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 4,
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '0.68rem', color: '#6B6965', marginBottom: 4, letterSpacing: '0.05em' }}>
                      {formatDate(order.createdAt)}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#A8A5A0', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                    {order.promoCodeUsed && (
                      <p style={{ fontSize: '0.62rem', color: 'rgba(201,169,110,0.5)', marginTop: 4, letterSpacing: '0.08em' }}>
                        Promo: {order.promoCodeUsed}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: STATUS_COLOR[order.status] ?? '#A8A5A0',
                      padding: '4px 10px',
                      border: `1px solid ${STATUS_COLOR[order.status] ?? '#A8A5A0'}30`,
                      borderRadius: 20,
                    }}
                  >
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F5F3EF', letterSpacing: '-0.01em' }}>
                    {formatCAD(order.total)}
                  </p>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E' }}>
                    View →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Support footer ── */}
        <div
          style={{
            padding: '24px 32px',
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: '0.78rem', color: '#6B6965' }}>
            Need help with an order?
          </p>
          <a
            href={`https://wa.me/15145609765?text=${encodeURIComponent('Hello ARTEMIS, I need help with my order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              textDecoration: 'none',
            }}
          >
            WhatsApp Support →
          </a>
        </div>
      </div>
    </div>
  );
}
