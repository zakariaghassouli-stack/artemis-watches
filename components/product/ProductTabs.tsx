'use client';

import { useState } from 'react';
import type { Product, ProductSpecs } from '@/types/product';

interface Props {
  product: Product;
  t: {
    tabDescription: string;
    tabSpecs: string;
    tabReviews: string;
    specsHeading: string;
    reviewsHeading: string;
    verifiedPurchase: string;
    noReviews: string;
  };
}

type Tab = 'description' | 'specs' | 'reviews';

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

const SPEC_LABELS: Record<string, string> = {
  caseSize: 'Case Size',
  caseMaterial: 'Case Material',
  braceletMaterial: 'Bracelet',
  dialColor: 'Dial Color',
  crystalType: 'Crystal',
  waterResistance: 'Water Resistance',
  movement: 'Movement',
  powerReserve: 'Power Reserve',
  functions: 'Functions',
  weight: 'Weight',
};

function SpecsTab({ specs }: { specs: ProductSpecs }) {
  const entries = Object.entries(specs).filter(([, v]) => v) as [string, string][];

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {entries.map(([key, value], i) => (
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
                {SPEC_LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').trim()}
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
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'description', label: t.tabDescription },
    { key: 'specs', label: t.tabSpecs },
    {
      key: 'reviews',
      label: t.tabReviews,
      count: product.reviews.length,
    },
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
          <SpecsTab specs={product.specs} />
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
    </div>
  );
}
