'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export function TierOneSourcing() {
  const t = useTranslations('home.tierOneSourcing');
  const paragraphs = (t('body') as string).split('\n\n');

  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-12%',
          width: '55%',
          height: '80%',
          background:
            'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
        <ScrollReveal delay={0}>
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

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontSize: 'clamp(1.85rem, 3.4vw, 2.6rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#F5F3EF',
              marginBottom: 28,
            }}
          >
            {t('headline')}
          </h2>
        </ScrollReveal>

        {paragraphs.map((paragraph, index) => (
          <ScrollReveal key={index} delay={140 + index * 60}>
            <p
              style={{
                fontSize: '0.98rem',
                color: '#B8B4AE',
                lineHeight: 1.7,
                marginBottom: 18,
              }}
            >
              {paragraph}
            </p>
          </ScrollReveal>
        ))}

        <ScrollReveal delay={140 + paragraphs.length * 60 + 40}>
          <Link
            href="/collections"
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
              marginTop: 12,
            }}
          >
            {t('cta')}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
