'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export function TiersCards() {
  const t = useTranslations('home.tiersCards');

  const essential = {
    title: t('essentialTitle'),
    sub: t('essentialSub'),
    bullets: [t('essentialBullet1'), t('essentialBullet2'), t('essentialBullet3')],
    cta: t('essentialCta'),
    href: '/search?range=essential',
    accent: false,
  };
  const premium = {
    title: t('premiumTitle'),
    sub: t('premiumSub'),
    bullets: [t('premiumBullet1'), t('premiumBullet2'), t('premiumBullet3')],
    cta: t('premiumCta'),
    href: '/search?range=premium',
    accent: true,
  };
  const cards = [essential, premium];

  return (
    <section
      style={{
        background: '#0D0D0D',
        padding: 'clamp(72px, 11vw, 128px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <ScrollReveal delay={0}>
          <p
            style={{
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            {t('overline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#F5F3EF',
              textAlign: 'center',
              marginBottom: 'clamp(32px, 5vw, 56px)',
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
              fontStyle: 'italic',
            }}
          >
            {t('headline')}
          </h2>
        </ScrollReveal>

        <div
          className="tiers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(18px, 2.5vw, 28px)',
          }}
        >
          <style>{`
            @media (max-width: 800px) {
              .tiers-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={120 + i * 80}>
              <article
                style={{
                  padding: 'clamp(28px, 4vw, 40px)',
                  borderRadius: 12,
                  border: card.accent
                    ? '1px solid rgba(201,169,110,0.35)'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: card.accent
                    ? 'linear-gradient(180deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))'
                    : 'rgba(255,255,255,0.025)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <p
                  style={{
                    fontFamily:
                      'var(--font-playfair, "Playfair Display", serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
                    color: card.accent ? '#C9A96E' : '#F5F3EF',
                    marginBottom: 6,
                    lineHeight: 1.1,
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#8C8884',
                    marginBottom: 24,
                  }}
                >
                  {card.sub}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 28px',
                    display: 'grid',
                    gap: 10,
                  }}
                >
                  {card.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: '0.95rem',
                        color: '#E8E5DF',
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          flex: '0 0 auto',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: card.accent ? '#C9A96E' : '#A8A5A0',
                          marginTop: 9,
                        }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Link
                  href={card.href}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px 24px',
                    background: card.accent ? '#C9A96E' : 'transparent',
                    color: card.accent ? '#0A0A0A' : '#F5F3EF',
                    border: card.accent
                      ? '1px solid transparent'
                      : '1px solid rgba(255,255,255,0.18)',
                    textDecoration: 'none',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    borderRadius: 4,
                  }}
                >
                  {card.cta}
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
