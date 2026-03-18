'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Plus, Minus } from 'lucide-react';

const FAQ_KEYS = ['1', '2', '3', '4', '5', '6'] as const;

export function FAQAccordion() {
  const t = useTranslations('home.faq');
  const [open, setOpen] = useState<string | null>('1'); // first open by default

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key));

  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(72px, 10vw, 120px) 24px',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <SectionHeader
          overline={t('overline')}
          headline={t('headline')}
          subheadline={t('subheadline')}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQ_KEYS.map((key, i) => {
            const isOpen = open === key;
            return (
              <ScrollReveal key={key} delay={i * 60}>
                <div
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <button
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 24,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '22px 0',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: isOpen ? '#F5F3EF' : '#A8A5A0',
                        transition: 'color 0.2s',
                        lineHeight: 1.4,
                      }}
                    >
                      {t(`q${key}` as Parameters<typeof t>[0])}
                    </span>
                    <span
                      style={{
                        color: '#C9A96E',
                        flexShrink: 0,
                        transition: 'transform 0.2s',
                        display: 'flex',
                      }}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: isOpen ? 400 : 0,
                      transition: 'max-height 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: '#6B6965',
                        lineHeight: 1.8,
                        paddingBottom: 24,
                      }}
                    >
                      {t(`a${key}` as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        </div>

        {/* View all */}
        <ScrollReveal delay={0}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link
              href="/faq"
              style={{
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: '#C9A96E',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,169,110,0.3)',
                paddingBottom: 2,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = '#C9A96E')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(201,169,110,0.3)')
              }
            >
              {t('viewAll')}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
