import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getStripe } from '@/lib/stripe';
import { CartClearer } from '@/components/cart/CartClearer';
import { PurchaseTracker } from '@/components/analytics/PurchaseTracker';
import { getOrderWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('orderSuccess');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: false },
  };
}

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const t = await getTranslations('orderSuccess');
  const locale = await getLocale();
  const { session_id } = await searchParams;

  let orderNumber = '';
  let customerName = '';
  let customerEmail = '';
  let itemLines: { name: string; qty: number; price: number }[] = [];
  let total = 0;
  let valid = false;
  let contentIds: string[] = [];
  let numItems = 0;

  if (session_id) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items'],
      });

      if (session.payment_status === 'paid') {
        valid = true;
        orderNumber = session.id.slice(-8).toUpperCase();
        customerName = session.customer_details?.name ?? '';
        customerEmail = session.customer_details?.email ?? '';
        total = (session.amount_total ?? 0) / 100;

        itemLines = (session.line_items?.data ?? []).map((li) => ({
          name: li.description ?? li.price?.product?.toString() ?? '',
          qty: li.quantity ?? 1,
          price: (li.amount_total ?? 0) / 100,
        }));

        try {
          const rawItems = JSON.parse(session.metadata?.items ?? '[]') as { id: string; qty: number }[];
          contentIds = rawItems.map((i) => i.id);
          numItems = rawItems.reduce((sum, i) => sum + (i.qty ?? 1), 0);
        } catch {
          numItems = itemLines.reduce((sum, l) => sum + l.qty, 0);
        }
      }
    } catch {
      // Invalid session_id — show generic confirmation
    }
  }

  const steps = [t('step1'), t('step2'), t('step3')];
  const supportWhatsAppUrl = getWhatsAppUrl(
    getOrderWhatsAppMessage(locale, orderNumber || undefined)
  );

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {/* Clear cart on mount */}
      <CartClearer />

      {/* Meta Pixel — Purchase (fires once, only on valid paid sessions) */}
      {valid && <PurchaseTracker total={total} numItems={numItems} contentIds={contentIds} />}

      <section
        style={{
          padding: 'clamp(100px, 14vw, 160px) 24px clamp(80px, 10vw, 120px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: 560, width: '100%' }}>

          {/* Check icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              background: 'rgba(201,169,110,0.05)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M6 14l6 6 10-12"
                stroke="#C9A96E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Overline */}
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            {t('overline')}
          </p>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#F5F3EF',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            {customerName
              ? t('thankYouWith', { name: customerName.split(' ')[0] })
              : t('thankYouGeneric')}
          </h1>

          <p
            style={{
              fontSize: '0.9rem',
              color: '#6B6965',
              lineHeight: 1.7,
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
            {valid
              ? t('bodyValid', { email: customerEmail })
              : t('bodyGeneric')}
          </p>

          {/* Order details card */}
          {valid && (
            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 4,
                padding: '24px',
                marginBottom: 32,
              }}
            >
              {orderNumber && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    paddingBottom: 20,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                    {t('orderReference')}
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#F5F3EF', letterSpacing: '0.1em' }}>
                    #{orderNumber}
                  </span>
                </div>
              )}

              {/* Line items */}
              {itemLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 12,
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: '#A8A5A0', flex: 1 }}>
                    {line.qty > 1 && (
                      <span style={{ color: '#C9A96E', marginRight: 6 }}>{line.qty}×</span>
                    )}
                    {line.name}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#A8A5A0', flexShrink: 0 }}>
                    {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 }).format(line.price)}
                  </span>
                </div>
              ))}

              {/* Total */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                  {t('totalPaid')}
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#A8A5A0' }}>
                  {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 }).format(total)} CAD
                </span>
              </div>
            </div>
          )}

          {/* Next steps */}
          <div
            style={{
              background: 'rgba(201,169,110,0.04)',
              border: '1px solid rgba(201,169,110,0.12)',
              borderRadius: 4,
              padding: '20px 24px',
              marginBottom: 32,
            }}
          >
            <p
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 12,
              }}
            >
              {t('nextStepsTitle')}
            </p>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 10 : 0 }}
              >
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#C9A96E',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {i + 1}.
                </span>
                <p style={{ fontSize: '0.8rem', color: '#6B6965', lineHeight: 1.6 }}>{step}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp follow-up */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
              {t('supportQuestion')}
            </p>
            <a
              href={supportWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 3,
                color: 'rgba(255,255,255,0.55)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('contactWhatsApp')}
            </a>
          </div>

          {/* Back to shop */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/collections"
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                textDecoration: 'none',
              }}
            >
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
