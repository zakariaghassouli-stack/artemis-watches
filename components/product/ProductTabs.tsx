'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Product, ProductSpecs } from '@/types/product';
import { analytics } from '@/lib/analytics';
import { formatPrice } from '@/lib/products';
import { getProductWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

interface Props {
  product: Product;
  t: {
    tabDescription: string;
    tabSpecs: string;
    tabReviews: string;
    tabShipping: string;
    tabReturns: string;
    tabHelp: string;
    specsHeading: string;
    reviewsHeading: string;
    verifiedPurchase: string;
    noReviews: string;
    shippingTitle: string;
    shippingLine1Label: string;
    shippingLine1Value: string;
    shippingLine2Label: string;
    shippingLine2Value: string;
    shippingLine3Label: string;
    shippingLine3Value: string;
    shippingNote: string;
    returnsTitle: string;
    returnsPoints: string[];
    returnsNote: string;
    helpTitle: string;
    helpBody: string;
    helpCta: string;
  };
}

type Tab = 'description' | 'specs' | 'reviews' | 'shipping' | 'returns' | 'help';

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.2 3.7H11L8.1 6.8l1.1 3.5L6 8.4l-3.2 1.9L3.9 6.8 1 4.7h3.8L6 1z"
            fill={n <= Math.round(rating) ? '#C9A96E' : 'rgba(255,255,255,0.1)'}
          />
        </svg>
      ))}
    </span>
  );
}

function SpecsTab({
  specs,
  specLabels,
  range,
}: {
  specs: ProductSpecs;
  specLabels: Record<string, string>;
  range: Product['range'];
}) {
  const normalizedSpecs: ProductSpecs = {
    ...specs,
    movement:
      range === 'essential'
        ? 'Miyota Japanese automatic'
        : 'Swiss automatic (Dandong)',
  };
  const entries = Object.entries(normalizedSpecs).filter(([, v]) => v) as [string, string][];

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {entries.map(([key, value]) => (
            <tr
              key={key}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <td
                style={{
                  padding: '14px 0',
                  width: '40%',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.04em',
                  verticalAlign: 'top',
                }}
              >
                {specLabels[key] ?? key.replace(/([A-Z])/g, ' $1').trim()}
              </td>
              <td
                style={{
                  padding: '14px 0 14px 16px',
                  fontSize: '0.82rem',
                  color: '#A8A5A0',
                  letterSpacing: '0.02em',
                  verticalAlign: 'top',
                }}
              >
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductTabs({ product, t }: Props) {
  const tProduct = useTranslations('product');
  const locale = useLocale();
  const specLabels = tProduct.raw('specLabels') as Record<string, string>;
  const helpWhatsAppUrl = getWhatsAppUrl(
    getProductWhatsAppMessage({
      locale,
      productName: `${product.brand} ${product.name}`,
      variant: product.variant,
      price: formatPrice(product.price),
    })
  );

  const [activeTab, setActiveTab] = useState<Tab>('description');

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'description', label: t.tabDescription },
    { key: 'specs', label: t.tabSpecs },
    {
      key: 'reviews',
      label: t.tabReviews,
      count: product.reviews.length,
    },
    { key: 'shipping' as Tab, label: t.tabShipping },
    { key: 'returns' as Tab, label: t.tabReturns },
    { key: 'help' as Tab, label: t.tabHelp },
  ];

  return (
    <div>
      {/* Tab nav */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 40,
          gap: 0,
          overflowX: 'auto',
        }}
      >
        {tabs.map(({ key, label, count }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '14px 24px',
                fontSize: '0.7rem',
                fontWeight: active ? 600 : 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: active ? '#C9A96E' : 'rgba(255,255,255,0.3)',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${active ? '#C9A96E' : 'transparent'}`,
                cursor: 'pointer',
                marginBottom: -1,
                transition: 'color 0.2s, border-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {label}
              {typeof count === 'number' && count > 0 && (
                <span
                  style={{
                    fontSize: '0.58rem',
                    color: active ? 'rgba(201,169,110,0.7)' : 'rgba(255,255,255,0.2)',
                    background: active
                      ? 'rgba(201,169,110,0.1)'
                      : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${active ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 10,
                    padding: '1px 6px',
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'description' && (
        <div style={{ maxWidth: 720 }}>
          {product.description
            .split('\n\n')
            .filter(Boolean)
            .map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: '0.9rem',
                  color: '#6B6965',
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                {paragraph.trim()}
              </p>
            ))}
        </div>
      )}

      {activeTab === 'specs' && (
        <div style={{ maxWidth: 600 }}>
          <SpecsTab specs={product.specs} specLabels={specLabels} range={product.range} />
        </div>
      )}

      {activeTab === 'reviews' && (
        <div style={{ maxWidth: 720 }}>
          {product.reviews.length === 0 ? (
            <p
              style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.25)',
                textAlign: 'center',
                padding: '40px 0',
              }}
            >
              {t.noReviews}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {product.reviews.map((review, i) => (
                <div
                  key={i}
                  style={{
                    padding: '24px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: 12,
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <div>
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}
                      >
                        <p
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: '#F5F3EF',
                          }}
                        >
                          {review.author}
                        </p>
                        {review.verified && (
                          <span
                            style={{
                              fontSize: '0.58rem',
                              fontWeight: 600,
                              color: '#C9A96E',
                              background: 'rgba(201,169,110,0.08)',
                              border: '1px solid rgba(201,169,110,0.15)',
                              padding: '2px 6px',
                              borderRadius: 2,
                              letterSpacing: '0.08em',
                            }}
                          >
                            {t.verifiedPurchase}
                          </span>
                        )}
                      </div>
                      <Stars rating={review.rating} />
                    </div>
                    {review.date && (
                      <p
                        style={{
                          fontSize: '0.68rem',
                          color: 'rgba(255,255,255,0.2)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {review.date}
                      </p>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#6B6965',
                      lineHeight: 1.7,
                    }}
                  >
                    {review.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'shipping' && (
        <div style={{ maxWidth: 600 }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 20 }}>
            {t.shippingTitle}
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
            <tbody>
              {[
                [t.shippingLine1Label, t.shippingLine1Value],
                [t.shippingLine2Label, t.shippingLine2Value],
                [t.shippingLine3Label, t.shippingLine3Value],
              ].map(([label, value]) => (
                <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 0', width: '40%', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>{label}</td>
                  <td style={{ padding: '14px 0 14px 16px', fontSize: '0.82rem', color: '#A8A5A0' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: '0.82rem', color: '#6B6965', lineHeight: 1.7 }}>{t.shippingNote}</p>
        </div>
      )}

      {activeTab === 'returns' && (
        <div style={{ maxWidth: 600 }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 20 }}>
            {t.returnsTitle}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(t.returnsPoints as string[]).map((point, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.85rem', color: '#A8A5A0', lineHeight: 1.6 }}>
                <span style={{ color: '#C9A96E', flexShrink: 0, marginTop: 2 }}>✓</span>
                {point}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '0.82rem', color: '#6B6965', lineHeight: 1.7 }}>{t.returnsNote}</p>
        </div>
      )}

      {activeTab === 'help' && (
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 20 }}>
            {t.helpTitle}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#6B6965', lineHeight: 1.8, marginBottom: 28 }}>{t.helpBody}</p>
          <a
            href={helpWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.whatsappClick('product_help', product.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 24px',
              background: '#C9A96E', color: '#0A0A0A',
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.helpCta}
          </a>
        </div>
      )}
    </div>
  );
}
