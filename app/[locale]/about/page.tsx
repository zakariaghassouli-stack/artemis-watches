
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  const STATS = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  const VALUES = [
    { number: '01', title: t('v1Title'), body: t('v1Body') },
    { number: '02', title: t('v2Title'), body: t('v2Body') },
    { number: '03', title: t('v3Title'), body: t('v3Body') },
    { number: '04', title: t('v4Title'), body: t('v4Body') },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(96px, 14vw, 160px) 24px clamp(64px, 10vw, 112px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 24,
              }}
            >
              {t('overline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#F5F3EF',
                marginBottom: 32,
              }}
            >
              {t('headline1')}
              <br />
              <em
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                  fontStyle: 'italic',
                  color: '#C9A96E',
                }}
              >
                {t('headlineAccent')}
              </em>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                color: '#A8A5A0',
                lineHeight: 1.8,
                maxWidth: 640,
              }}
            >
              {t('heroBody')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section
        style={{
          background: '#111',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            textAlign: 'center',
          }}
          className="stats-grid"
        >
          <style>{`
            @media (max-width: 640px) {
              .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>

          {STATS.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div>
                <p
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    color: '#C9A96E',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#6B6965',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Story Section ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(72px, 10vw, 120px) 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
          className="story-grid"
        >
          <style>{`
            @media (max-width: 800px) {
              .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            }
          `}</style>

          {/* Text */}
          <div>
            <ScrollReveal delay={0}>
              <p
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                  marginBottom: 20,
                }}
              >
                {t('storyOverline')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: '#F5F3EF',
                  marginBottom: 24,
                }}
              >
                {t('storyHeadline1')}
                <br />
                {t('storyHeadline2')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#A8A5A0',
                  lineHeight: 1.85,
                  marginBottom: 20,
                }}
              >
                {t('storyP1')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p style={{ fontSize: '0.95rem', color: '#A8A5A0', lineHeight: 1.85 }}>
                {t('storyP2')}
              </p>
            </ScrollReveal>
          </div>

          {/* Decorative panel */}
          <ScrollReveal delay={120}>
            <div
              style={{
                aspectRatio: '4/5',
                background: 'linear-gradient(135deg, #161616 0%, #111 40%, #141414 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 40,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '15%',
                  right: '-10%',
                  width: '60%',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,169,110,0.1)',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '-5%',
                  width: '45%',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,169,110,0.06)',
                }}
              />

              <p
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  fontStyle: 'italic',
                  color: '#F5F3EF',
                  lineHeight: 1.5,
                  marginBottom: 20,
                  position: 'relative',
                }}
              >
                &ldquo;{t('storyQuote')}&rdquo;
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  position: 'relative',
                }}
              >
                <div style={{ width: 32, height: 1, background: '#C9A96E' }} />
                <p
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                  }}
                >
                  ARTEMIS — Montréal
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Values ── */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(72px, 10vw, 120px) 24px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              {t('valuesOverline')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2
              style={{
                fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#F5F3EF',
                marginBottom: 64,
                textAlign: 'center',
              }}
            >
              {t('valuesHeadline')}
            </h2>
          </ScrollReveal>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}
            className="values-grid"
          >
            <style>{`
              @media (max-width: 700px) {
                .values-grid { grid-template-columns: 1fr !important; }
              }
              .value-card {
                padding: 40px 36px;
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.05);
                transition: border-color 0.3s ease;
              }
              .value-card:hover { border-color: rgba(201,169,110,0.15); }
            `}</style>

            {VALUES.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="value-card">
                  <p
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      color: 'rgba(201,169,110,0.4)',
                      marginBottom: 16,
                    }}
                  >
                    {item.number}
                  </p>
                  <h3
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: '#F5F3EF',
                      marginBottom: 14,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6B6965', lineHeight: 1.8 }}>
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Montreal section ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(72px, 10vw, 120px) 24px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 20,
              }}
            >
              {t('montrealOverline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              style={{
                fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: '#F5F3EF',
                marginBottom: 24,
              }}
            >
              {t('montrealHeadline1')}
              <br />
              {t('montrealHeadline2')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: '0.95rem',
                color: '#A8A5A0',
                lineHeight: 1.85,
                marginBottom: 40,
              }}
            >
              {t('montrealBody')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <style>{`
              .about-btn-whatsapp {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 14px 28px;
                border: 1px solid rgba(201,169,110,0.4);
                color: #C9A96E;
                font-size: 0.78rem;
                font-weight: 600;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                text-decoration: none;
                transition: background 0.25s, border-color 0.25s;
              }
              .about-btn-whatsapp:hover {
                background: rgba(201,169,110,0.06);
                border-color: #C9A96E;
              }
            `}</style>
            <a
              href="https://wa.me/15145609765?text=Hello%20ARTEMIS%2C%20I%27d%20like%20to%20learn%20more."
              target="_blank"
              rel="noopener noreferrer"
              className="about-btn-whatsapp"
            >
              {t('ctaWhatsApp')}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section
        style={{
          background: '#111',
          padding: '56px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
        }}
      >
        <ScrollReveal delay={0}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#6B6965',
              marginBottom: 20,
            }}
          >
            {t('ctaReadyLabel')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <style>{`
            .about-btn-shop {
              display: inline-block;
              padding: 16px 40px;
              background: #F5F3EF;
              color: #0A0A0A;
              font-size: 0.8rem;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              text-decoration: none;
              transition: background 0.2s, color 0.2s;
            }
            .about-btn-shop:hover { background: #C9A96E; }
          `}</style>
          <Link href="/collections" className="about-btn-shop">
            {t('ctaShop')}
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
