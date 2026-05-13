'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export function AuthenticityAssumed() {
  const t = useTranslations('home.authenticityAssumed');

  const cards = [
    {
      title: t('card1Title'),
      body: t('card1Body'),
      href: '/mouvements',
      linkLabel: t('card1LinkLabel'),
    },
    {
      title: t('card2Title'),
      body: t('card2Body'),
      href: null,
      linkLabel: null,
    },
    {
      title: t('card3Title'),
      body: t('card3Body'),
      href: '/notre-approche',
      linkLabel: t('card3LinkLabel'),
    },
  ];

  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(72px, 11vw, 128px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
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
          className="auth-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 'clamp(16px, 2.2vw, 24px)',
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              .auth-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={120 + i * 60}>
              <article
                style={{
                  padding: '28px 26px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.025)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                    marginBottom: 14,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.98rem',
                    color: '#E8E5DF',
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {card.body}
                </p>
                {card.href && card.linkLabel ? (
                  <Link
                    href={card.href}
                    style={{
                      marginTop: 20,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#C9A96E',
                      textDecoration: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {card.linkLabel}
                    <span aria-hidden style={{ fontSize: '0.9rem' }}>
                      →
                    </span>
                  </Link>
                ) : null}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
