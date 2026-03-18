'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Check } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function RangeComparison() {
  const t = useTranslations('home.range');
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  const essentialIncludes = t.raw('essentialIncludes') as string[];
  const premiumIncludes = t.raw('premiumIncludes') as string[];

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0B08 50%, #0A0A0A 100%)',
        padding: 'clamp(72px, 10vw, 120px) 24px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHeader
          overline={t('overline')}
          headline={t('headline')}
          subheadline={t('subheadline')}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            maxWidth: 900,
            margin: '0 auto',
          }}
          className="range-grid"
        >
          <style>{`
            @media (max-width: 680px) {
              .range-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Essential */}
          <ScrollReveal delay={0}>
            <div
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#A8A5A0',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '4px 10px',
                  borderRadius: 2,
                  marginBottom: 28,
                  alignSelf: 'flex-start',
                }}
              >
                {t('essentialBadge')}
              </span>

              <p
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#F5F3EF',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {t('essentialPrice')}
              </p>

              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#A8A5A0',
                  marginBottom: 20,
                  fontStyle: 'italic',
                }}
              >
                {t('essentialTagline')}
              </p>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#6B6965',
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                {t('essentialBody')}
              </p>

              <p
                style={{
                  fontSize: '0.78rem',
                  color: '#6B6965',
                  lineHeight: 1.6,
                  marginBottom: 24,
                  fontStyle: 'italic',
                }}
              >
                {t('essentialBestFor')}
              </p>

              <p
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#6B6965',
                  marginBottom: 16,
                }}
              >
                {t('includesLabel')}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 36 }}>
                {essentialIncludes.map((item: string, i: number) => (
                  <li
                    key={i}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: '#A8A5A0' }}
                  >
                    <Check size={14} style={{ color: '#C9A96E', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/collections?range=essential"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 24px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#F5F3EF',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'border-color 0.25s, background 0.25s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.4)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {t('essentialCta')}
              </Link>
            </div>
          </ScrollReveal>

          {/* Premium */}
          <ScrollReveal delay={100}>
            <div
              style={{
                border: '1px solid rgba(201,169,110,0.18)',
                borderRadius: 8,
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                background: 'rgba(201,169,110,0.025)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                  background: 'rgba(201,169,110,0.08)',
                  border: '1px solid rgba(201,169,110,0.25)',
                  padding: '4px 10px',
                  borderRadius: 2,
                  marginBottom: 28,
                  alignSelf: 'flex-start',
                }}
              >
                {t('premiumBadge')}
              </span>

              <p
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #D4B882 0%, #C9A96E 50%, #B8924A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {t('premiumPrice')}
              </p>

              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#A8A5A0',
                  marginBottom: 20,
                  fontStyle: 'italic',
                }}
              >
                {t('premiumTagline')}
              </p>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#6B6965',
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                {t('premiumBody')}
              </p>

              <p
                style={{
                  fontSize: '0.78rem',
                  color: '#6B6965',
                  lineHeight: 1.6,
                  marginBottom: 24,
                  fontStyle: 'italic',
                }}
              >
                {t('premiumBestFor')}
              </p>

              <p
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#6B6965',
                  marginBottom: 16,
                }}
              >
                {t('includesLabel')}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 36 }}>
                {premiumIncludes.map((item: string, i: number) => (
                  <li
                    key={i}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: '#A8A5A0' }}
                  >
                    <Check size={14} style={{ color: '#C9A96E', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/collections?range=premium"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #D4B882, #C9A96E)',
                  color: '#0A0A0A',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'opacity 0.25s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = '0.85')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = '1')
                }
              >
                {t('premiumCta')}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={180}>
          <p
            style={{
              textAlign: 'center',
              marginTop: 32,
              fontSize: '0.82rem',
              color: '#6B6965',
              letterSpacing: '0.02em',
            }}
          >
            {t('whatsappNote')}{' '}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#C9A96E', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.28)' }}
            >
              {t('whatsappCta')}
            </a>
          </p>
          <p
            style={{
              textAlign: 'center',
              marginTop: 12,
              fontSize: '0.78rem',
              color: '#6B6965',
              letterSpacing: '0.02em',
            }}
          >
            {t('sharedNote')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
