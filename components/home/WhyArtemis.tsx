'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

function CuratedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function InspectIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function GuaranteeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
const ICONS = [CuratedIcon, InspectIcon, LocationIcon, GuaranteeIcon];
const PILLAR_KEYS = ['p1', 'p2', 'p3', 'p4'] as const;

export function WhyArtemis() {
  const t = useTranslations('home.why');

  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        position: 'relative',
      }}
    >
      {/* Gold divider top */}
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
        <SectionHeader
          overline={t('overline')}
          headline={t('headline')}
          subheadline={t('subheadline')}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
            maxWidth: 980,
            margin: '0 auto',
          }}
          className="why-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .why-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {PILLAR_KEYS.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal key={key} delay={i * 80}>
                <div
                  style={{
                    padding: '36px 32px',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 6,
                    transition: 'border-color 0.3s, background 0.3s',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      'rgba(201,169,110,0.2)';
                    (e.currentTarget as HTMLElement).style.background =
                      'rgba(201,169,110,0.03)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.background =
                      'rgba(255,255,255,0.025)';
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 6,
                      background: 'rgba(201,169,110,0.08)',
                      border: '1px solid rgba(201,169,110,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C9A96E',
                      marginBottom: 20,
                    }}
                  >
                    <Icon />
                  </div>
                  <h3
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#F5F3EF',
                      marginBottom: 12,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t(`${key}Title` as Parameters<typeof t>[0])}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#6B6965',
                      lineHeight: 1.7,
                    }}
                  >
                    {t(`${key}Body` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Gold divider bottom */}
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
