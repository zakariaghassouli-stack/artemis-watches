import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ orderId: string; locale: string }>;
}

export const metadata: Metadata = {
  title: 'Order Details | ARTEMIS',
  robots: { index: false, follow: false },
};

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
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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
  CANCELLED: '#E24B4A',
  REFUNDED: '#E24B4A',
};

// Steps for order progress tracker
const STATUS_STEPS = ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

interface OrderItem {
  productId?: string;
  name: string;
  brand?: string;
  price: number;
  qty?: number;
  quantity?: number;
  variant?: string;
  range?: string;
  boxAndPapers?: boolean;
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderId } = await params;
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/account/login');
  }

  if (!prisma) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });

  if (!order || order.user?.email !== session.user.email) {
    notFound();
  }

  const items = (order.items as unknown as OrderItem[]) ?? [];
  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* ── Back + header ── */}
        <div>
          <Link
            href="/account"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6B6965',
              textDecoration: 'none',
              marginBottom: 28,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6965')}
          >
            ← Back to Account
          </Link>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 8 }}>
                Order Details
              </p>
              <h1
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#F5F3EF',
                  margin: 0,
                }}
              >
                #{order.id.slice(-8).toUpperCase()}
              </h1>
              <p style={{ fontSize: '0.72rem', color: '#6B6965', marginTop: 6, letterSpacing: '0.04em' }}>
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            {/* Status badge */}
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: STATUS_COLOR[order.status] ?? '#A8A5A0',
                padding: '7px 16px',
                border: `1px solid ${STATUS_COLOR[order.status] ?? '#A8A5A0'}35`,
                borderRadius: 20,
                background: `${STATUS_COLOR[order.status] ?? '#A8A5A0'}0A`,
              }}
            >
              {STATUS_LABEL[order.status] ?? order.status}
            </span>
          </div>
        </div>

        {/* ── Progress tracker (only for active orders) ── */}
        {currentStepIndex >= 0 && (
          <div
            style={{
              padding: '28px 32px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 4,
            }}
          >
            <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6965', marginBottom: 24 }}>
              Order Progress
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStepIndex;
                const active = i === currentStepIndex;
                return (
                  <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {/* Connector line */}
                    {i > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          left: '-50%',
                          right: '50%',
                          top: 11,
                          height: 1,
                          background: done ? '#C9A96E' : 'rgba(255,255,255,0.08)',
                          transition: 'background 0.4s',
                        }}
                      />
                    )}
                    {/* Dot */}
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        border: `1.5px solid ${done ? '#C9A96E' : 'rgba(255,255,255,0.12)'}`,
                        background: active ? '#C9A96E' : done ? 'rgba(201,169,110,0.15)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10,
                        zIndex: 1,
                        position: 'relative',
                        transition: 'all 0.3s',
                        flexShrink: 0,
                      }}
                    >
                      {done && !active && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{
                      fontSize: '0.58rem',
                      fontWeight: active ? 700 : 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: done ? '#C9A96E' : '#6B6965',
                      textAlign: 'center',
                    }}>
                      {STATUS_LABEL[step]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Tracking info */}
            {order.trackingNumber && (
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '0.68rem', color: '#6B6965', marginBottom: 6 }}>
                  Tracking number
                </p>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#F5F3EF', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
                  {order.trackingNumber}
                  {order.trackingCarrier && (
                    <span style={{ fontSize: '0.68rem', color: '#6B6965', fontWeight: 400, marginLeft: 10, fontFamily: 'inherit' }}>
                      via {order.trackingCarrier}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Items ── */}
        <div>
          <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6965', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            Items Ordered
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: 16,
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div>
                  {item.brand && (
                    <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 4 }}>
                      {item.brand}
                    </p>
                  )}
                  <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#F5F3EF', letterSpacing: '-0.01em', marginBottom: 4 }}>
                    {item.name}
                  </p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {item.variant && (
                      <p style={{ fontSize: '0.68rem', color: '#6B6965' }}>{item.variant}</p>
                    )}
                    {item.range && (
                      <p style={{ fontSize: '0.68rem', color: '#6B6965' }}>{item.range} range</p>
                    )}
                    {item.boxAndPapers && (
                      <p style={{ fontSize: '0.68rem', color: 'rgba(201,169,110,0.6)' }}>+ Box & Papers</p>
                    )}
                    <p style={{ fontSize: '0.68rem', color: '#6B6965' }}>
                      Qty: {item.qty ?? item.quantity ?? 1}
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F5F3EF', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                  {formatCAD(item.price)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Summary + Shipping ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
          className="order-detail-grid"
        >
          <style>{`
            @media (max-width: 640px) {
              .order-detail-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Shipping address */}
          {order.shippingName && (
            <div style={{ padding: '24px 28px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4 }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6965', marginBottom: 16 }}>
                Shipping To
              </p>
              <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#F5F3EF', marginBottom: 4 }}>{order.shippingName}</p>
              {order.shippingEmail && (
                <p style={{ fontSize: '0.75rem', color: '#6B6965', marginBottom: 8 }}>{order.shippingEmail}</p>
              )}
              {order.shippingAddress && (
                <p style={{ fontSize: '0.78rem', color: '#A8A5A0', lineHeight: 1.6 }}>
                  {order.shippingAddress}<br />
                  {order.shippingCity}{order.shippingProvince ? `, ${order.shippingProvince}` : ''}{order.shippingPostal ? ` ${order.shippingPostal}` : ''}<br />
                  {order.shippingCountry ?? 'CA'}
                </p>
              )}
            </div>
          )}

          {/* Order totals */}
          <div style={{ padding: '24px 28px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4 }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6965', marginBottom: 16 }}>
              Order Summary
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', color: '#A8A5A0' }}>Subtotal</span>
                <span style={{ fontSize: '0.8rem', color: '#F5F3EF' }}>{formatCAD(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: '#A8A5A0' }}>
                    Discount{order.promoCodeUsed ? ` (${order.promoCodeUsed})` : ''}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#7EB89A' }}>−{formatCAD(order.discount)}</span>
                </div>
              )}
              {order.shipping > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: '#A8A5A0' }}>Shipping</span>
                  <span style={{ fontSize: '0.8rem', color: '#F5F3EF' }}>{formatCAD(order.shipping)}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: '#A8A5A0' }}>Tax</span>
                  <span style={{ fontSize: '0.8rem', color: '#F5F3EF' }}>{formatCAD(order.tax)}</span>
                </div>
              )}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F5F3EF' }}>Total</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#C9A96E' }}>{formatCAD(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Support ── */}
        <div
          style={{
            padding: '20px 28px',
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
            Question about this order?
          </p>
          <a
            href={`https://wa.me/15145609765?text=${encodeURIComponent(`Hello ARTEMIS, I have a question about order #${order.id.slice(-8).toUpperCase()}.`)}`}
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
