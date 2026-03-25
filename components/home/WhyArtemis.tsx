'use client';

import { useLocale, useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

function CuratedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function InspectIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GuaranteeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}

const ICONS = [CuratedIcon, InspectIcon, LocationIcon, GuaranteeIcon];
const PILLAR_KEYS = ['p1', 'p2', 'p3', 'p4'] as const;

export function WhyArtemis() {
  const t = useTranslations('home.why');
  const locale = useLocale();

  const placeholders = locale === 'fr'
    ? [
        'Manipulation d’une montre',
        'Emballage soigné',
        'Ajustement bracelet',
        'Expédition du colis',
      ]
    : [
        'Handling a watch',
        'Careful packaging',
        'Bracelet adjustment',
        'Parcel dispatch',
      ];

  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        position: 'relative',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.98fr) minmax(0, 1.02fr)',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
          }}
          className="why-layout"
        >
          <style>{`
            @media (max-width: 1024px) {
              .why-layout,
              .why-pillars,
              .why-placeholders {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          <div>
            <SectionHeader
              overline={t('overline')}
              headline={t('headline')}
              subheadline={t('subheadline')}
              align="left"
            />

            <div
              className="why-pillars"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 14,
              }}
            >
              {PILLAR_KEYS.map((key, index) => {
                const Icon = ICONS[index];
                return (
                  <ScrollReveal key={key} delay={index * 70}>
                    <div
                      style={{
                        height: '100%',
                        padding: '24px 22px',
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 999,
                          background: 'rgba(201,169,110,0.08)',
                          border: '1px solid rgba(201,169,110,0.16)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#C9A96E',
                          marginBottom: 14,
                        }}
                      >
                        <Icon />
                      </div>
                      <h3
                        style={{
                          fontSize: '0.92rem',
                          fontWeight: 600,
                          color: '#F5F3EF',
                          marginBottom: 10,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {t(`${key}Title` as Parameters<typeof t>[0])}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#8F8B84',
                          lineHeight: 1.65,
                        }}
                      >
                        {t(`${key}Body` as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={200}>
              <div style={{ textAlign: 'left', marginTop: 28 }}>
                <a
                  href="#reviews"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: '#C9A96E',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(201,169,110,0.3)',
                    paddingBottom: 2,
                  }}
                >
                  {t('reviewsCta')}
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div
            className="why-placeholders"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 14,
            }}
          >
            {placeholders.map((label, index) => (
              <ScrollReveal key={label} delay={index * 80}>
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 11',
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background:
                      'linear-gradient(145deg, rgba(24,24,24,1) 0%, rgba(17,17,17,1) 55%, rgba(21,21,21,1) 100%)',
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 58%)',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        border: '1px solid rgba(201,169,110,0.2)',
                        background: 'rgba(10,10,10,0.42)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path d="M7 5.75 14 10l-7 4.25V5.75Z" fill="#F5F3EF" />
                      </svg>
                    </div>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      left: 14,
                      right: 14,
                      bottom: 14,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#C9A96E',
                      }}
                    >
                      {locale === 'fr' ? 'À venir' : 'Coming Soon'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: '#E5DFD5',
                        letterSpacing: '0.02em',
                        textAlign: 'right',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
        }}
      />
    </section>
  );
}
