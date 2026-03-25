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
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  const valueCards = [
    {
      number: '01',
      title: t('v1Title'),
      body: t('v1Body'),
      image: '/images/rolex-gmt-master-ii-pepsi-face.webp',
    },
    {
      number: '02',
      title: t('v2Title'),
      body: t('v2Body'),
      image: '/images/IMG_5447.webp',
    },
    {
      number: '03',
      title: t('v3Title'),
      body: t('v3Body'),
      image: '/images/cartier-santos-silver-face.webp',
    },
    {
      number: '04',
      title: t('v4Title'),
      body: t('v4Body'),
      image: '/images/patek-philippe-nautilus-blue-face.webp',
    },
  ];

  return (
    <>
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
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
            gap: 'clamp(36px, 6vw, 72px)',
            alignItems: 'center',
            position: 'relative',
          }}
          className="about-hero-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .about-hero-grid { grid-template-columns: 1fr !important; }
            }
            @media (max-width: 700px) {
              .about-stats-grid,
              .about-values-grid,
              .about-montreal-grid {
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
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
                gap: 14,
                minHeight: 540,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  minHeight: 540,
                }}
              >
                <Image
                  src="/images/IMG_5447.webp"
                  alt="Artemis original product photography"
                  fill
                  sizes="(max-width: 900px) 100vw, 36vw"
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

              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
                {[
                  '/images/cartier-santos-silver-face.webp',
                  '/images/patek-philippe-nautilus-blue-face.webp',
                ].map((src) => (
                  <div
                    key={src}
                    style={{
                      position: 'relative',
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.06)',
                      minHeight: 0,
                    }}
                  >
                    <Image
                      src={src}
                      alt="Artemis collection detail"
                      fill
                      sizes="(max-width: 900px) 50vw, 22vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

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
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 16,
          }}
        >
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 60}>
              <div
                style={{
                  padding: '20px 18px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.025)',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(1.65rem, 2.8vw, 2.3rem)',
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
                    fontSize: '0.68rem',
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

      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(72px, 10vw, 120px) 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
            gap: 'clamp(32px, 5vw, 60px)',
            alignItems: 'center',
          }}
          className="about-montreal-grid"
        >
          <ScrollReveal delay={0}>
            <div
              style={{
                position: 'relative',
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: 520,
                background: '#151515',
              }}
            >
              <Image
                src="/images/IMG_6279.webp"
                alt="Artemis Montreal watch detail"
                fill
                sizes="(max-width: 700px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  bottom: 20,
                  padding: '16px 18px',
                  borderRadius: 6,
                  background: 'rgba(10,10,10,0.72)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <p
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                    marginBottom: 6,
                  }}
                >
                  {t('storyOverline')}
                </p>
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: '#F5F3EF',
                    lineHeight: 1.65,
                  }}
                >
                  &ldquo;{t('storyQuote')}&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal delay={80}>
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

            <ScrollReveal delay={140}>
              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.14,
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

            <ScrollReveal delay={200}>
              <p
                style={{
                  fontSize: '0.96rem',
                  color: '#A8A5A0',
                  lineHeight: 1.85,
                  marginBottom: 18,
                }}
              >
                {t('storyP1')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <p
                style={{
                  fontSize: '0.96rem',
                  color: '#A8A5A0',
                  lineHeight: 1.85,
                }}
              >
                {t('storyP2')}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

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

      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(72px, 10vw, 120px) 24px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="about-montreal-grid"
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          <ScrollReveal delay={0}>
            <div>
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
                {t('montrealOverline')}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
                  fontWeight: 600,
                  lineHeight: 1.18,
                  letterSpacing: '-0.02em',
                  color: '#F5F3EF',
                  marginBottom: 22,
                }}
              >
                {t('montrealHeadline1')}
                <br />
                {t('montrealHeadline2')}
              </h2>
              <p
                style={{
                  fontSize: '0.96rem',
                  color: '#A8A5A0',
                  lineHeight: 1.82,
                  marginBottom: 28,
                  maxWidth: 560,
                }}
              >
                {t('montrealBody')}
              </p>
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

          <ScrollReveal delay={120}>
            <div
              style={{
                position: 'relative',
                minHeight: 420,
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#151515',
              }}
            >
              <Image
                src="/images/IMG_3268.webp"
                alt="Prepared in Montreal"
                fill
                sizes="(max-width: 700px) 100vw, 44vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

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
          <Link
            href="/collections"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 40px',
              background: '#F5F3EF',
              color: '#0A0A0A',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 4,
            }}
          >
            {t('ctaShop')}
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
