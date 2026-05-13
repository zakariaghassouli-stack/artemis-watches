import type { Metadata } from 'next';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about');
  const locale = await getLocale();
  const aboutWhatsAppUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
  ];

  // Pivot V2: 2 value cards instead of 4. Image headers reuse real product
  // face shots - the legacy IMG_*.webp placeholders that backed the dropped
  // value cards (v2 + v4) are gone from this page entirely.
  const valueCards = [
    {
      number: '01',
      title: t('v1Title'),
      body: t('v1Body'),
      image: '/images/rolex-gmt-master-ii-pepsi-face.webp',
    },
    {
      number: '02',
      title: t('v3Title'),
      body: t('v3Body'),
      image: '/images/cartier-santos-silver-face.webp',
    },
  ];

  return (
    <>
      {/* ── Hero (compact, single image) ────────────────────────────── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(96px, 14vw, 160px) 24px clamp(72px, 10vw, 108px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18% 28%, rgba(201,169,110,0.08), transparent 36%), radial-gradient(circle at 82% 72%, rgba(201,169,110,0.05), transparent 34%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="about-hero-grid"
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
            gap: 'clamp(36px, 6vw, 72px)',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              .about-hero-grid { grid-template-columns: 1fr !important; }
            }
            @media (max-width: 700px) {
              .about-stats-grid,
              .about-values-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          <div>
            <ScrollReveal delay={0}>
              <p
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.24em',
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
                  fontSize: 'clamp(2.7rem, 6vw, 5.2rem)',
                  fontWeight: 600,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  color: '#F5F3EF',
                  marginBottom: 28,
                }}
              >
                {t('headline1')}
                <br />
                <em
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                    fontStyle: 'italic',
                    color: '#C9A96E',
                    fontWeight: 400,
                  }}
                >
                  {t('headlineAccent')}
                </em>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.35vw, 1.08rem)',
                  color: '#A8A5A0',
                  lineHeight: 1.85,
                  maxWidth: 620,
                  marginBottom: 32,
                }}
              >
                {t('heroBody')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <Link
                  href="/collections"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px 30px',
                    background: '#F5F3EF',
                    color: '#0A0A0A',
                    textDecoration: 'none',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    borderRadius: 4,
                  }}
                >
                  {t('ctaShop')}
                </Link>

                <a
                  href={aboutWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px 30px',
                    border: '1px solid rgba(201,169,110,0.35)',
                    color: '#C9A96E',
                    textDecoration: 'none',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: 4,
                    background: 'rgba(201,169,110,0.04)',
                  }}
                >
                  {t('ctaWhatsApp')}
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={120}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#151515',
              }}
            >
              {/* IMG_5447.webp is a placeholder until Zaki shoots the
                  Montréal atelier portrait + workshop set. Replace then
                  with a real founder / workshop image. */}
              <Image
                src="/images/IMG_5447.webp"
                alt="Artemis original product photography"
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.04) 0%, rgba(10,10,10,0.38) 100%)',
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats (2 tiles) ─────────────────────────────────────────── */}
      <section
        style={{
          background: '#111',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '36px 24px',
        }}
      >
        <div
          className="about-stats-grid"
          style={{
            maxWidth: 720,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 16,
          }}
        >
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 60}>
              <div
                style={{
                  padding: '24px 20px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.025)',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(1.85rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    color: '#C9A96E',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
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

      {/* ── Values (2 cards) ────────────────────────────────────────── */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(72px, 10vw, 120px) 24px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
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
                fontSize: 'clamp(1.95rem, 3.8vw, 3rem)',
                fontWeight: 600,
                lineHeight: 1.14,
                letterSpacing: '-0.02em',
                color: '#F5F3EF',
                marginBottom: 48,
                textAlign: 'center',
              }}
            >
              {t('valuesHeadline')}
            </h2>
          </ScrollReveal>

          <div
            className="about-values-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 18,
              alignItems: 'stretch',
            }}
          >
            {valueCards.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 80}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16 / 10',
                      overflow: 'hidden',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      padding: '28px 28px 30px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: 'rgba(201,169,110,0.55)',
                        marginBottom: 14,
                      }}
                    >
                      {item.number}
                    </p>
                    <h3
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: '#F5F3EF',
                        marginBottom: 12,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#8F8B84',
                        lineHeight: 1.75,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
