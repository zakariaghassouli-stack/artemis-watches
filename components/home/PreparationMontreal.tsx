'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { analytics } from '@/lib/analytics';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export function PreparationMontreal() {
  const t = useTranslations('home.preparation');
  const locale = useLocale();
  const bullets = t.raw('bullets') as string[];
  const waUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  return (
    <section
      style={{
        background: '#0B0B0B',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '-15%',
          width: '50%',
          height: '70%',
          background:
            'radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 88px)',
          alignItems: 'center',
        }}
        className="prep-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .prep-grid { grid-template-columns: 1fr !important; }
            .prep-image { order: -1; aspect-ratio: 16/10 !important; }
          }
        `}</style>

        {/* LEFT — Image placeholder (asset to come later) */}
        <ScrollReveal delay={0}>
          <div
            className="prep-image"
            style={{
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid rgba(201,169,110,0.16)',
              background:
                'linear-gradient(160deg, #1A1A1A 0%, #131313 50%, #181818 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 45%, rgba(201,169,110,0.1) 0%, transparent 60%)',
              }}
            />
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 18,
                color: 'rgba(201,169,110,0.42)',
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 7v5l3 3" />
                <path d="M9.5 3h5" />
                <path d="M9.5 21h5" />
              </svg>
              <p
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,169,110,0.5)',
                  margin: 0,
                }}
              >
                {locale === 'fr' ? 'Atelier · Montréal' : 'Atelier · Montréal'}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* RIGHT — Text content */}
        <div>
          <ScrollReveal delay={80}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 18,
              }}
            >
              {t('overline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 3.4vw, 2.6rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#F5F3EF',
                marginBottom: 18,
              }}
            >
              {t('headline')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p
              style={{
                fontSize: '0.95rem',
                color: '#A8A5A0',
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              {t('subheadline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 28px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {bullets.map((bullet, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    fontSize: '0.88rem',
                    color: '#D6D1C9',
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#C9A96E',
                      flexShrink: 0,
                      marginTop: 8,
                    }}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p
              style={{
                fontSize: '0.82rem',
                color: '#8F8B84',
                lineHeight: 1.7,
                marginBottom: 22,
                paddingLeft: 14,
                borderLeft: '1px solid rgba(201,169,110,0.2)',
              }}
            >
              {t('closing')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={340}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.whatsappClick('home_preparation')}
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
              {t('whatsappCta')}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
