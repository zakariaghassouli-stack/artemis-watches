
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('reviewsPage');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

interface ReviewItem {
  text: string;
  author: string;
  location: string;
  watch: string;
  rating: number;
}

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#C9A96E" aria-hidden>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  const t = await getTranslations('reviewsPage');
  const locale = await getLocale();

  const REVIEWS = (t.raw('reviewsList' as never) ?? []) as ReviewItem[];
  const waUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const PLATFORMS = [
    { label: t('stat1Label'), value: t('stat1Value'), count: t('stat1Count') },
    { label: t('stat2Label'), value: t('stat2Value'), count: t('stat2Count') },
    { label: t('stat3Label'), value: t('stat3Value'), count: t('stat3Count') },
  ];

  const ugcImages: string[] = Array.from({ length: 24 }, (_, i) =>
    `/images/review/review-${String(i + 1).padStart(2, '0')}.png`
  );

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(96px, 14vw, 160px) 24px clamp(64px, 10vw, 112px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
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

        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
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
                fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#F5F3EF',
                marginBottom: 24,
              }}
            >
              {t('headline')}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: '1rem',
                color: '#A8A5A0',
                lineHeight: 1.75,
                marginBottom: 40,
              }}
            >
              {t('heroBody')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 18px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 999,
              }}
            >
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#F5F3EF',
                }}
              >
                {t('heroReviewCount')}
              </span>
              <span style={{ color: 'rgba(201,169,110,0.5)' }}>•</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: '#A8A5A0',
                }}
              >
                {t('heroPlatformsLabel')}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Platform stats ── */}
      <section
        style={{
          background: '#111',
          padding: '36px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
          }}
          className="platform-grid"
        >
          <style>{`
            @media (max-width: 580px) {
              .platform-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {PLATFORMS.map((p, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div
                style={{
                  padding: '24px 32px',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.015)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#6B6965',
                    marginBottom: 8,
                  }}
                >
                  {p.label}
                </p>
                <p
                  style={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: '#C9A96E',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {p.value}
                </p>
                <p
                  style={{
                    fontSize: '0.72rem',
                    color: '#6B6965',
                  }}
                >
                  {p.count}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Reviews grid ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(72px, 10vw, 120px) 24px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}
            className="reviews-page-grid"
          >
            <style>{`
              @media (max-width: 900px) {
                .reviews-page-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 560px) {
                .reviews-page-grid { grid-template-columns: 1fr !important; }
              }
              .review-card {
                padding: 28px 24px;
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.06);
                border-radius: 4px;
                height: 100%;
                display: flex;
                flex-direction: column;
                transition: border-color 0.3s ease;
              }
              .review-card:hover {
                border-color: rgba(201,169,110,0.15);
              }
            `}</style>

            {REVIEWS.map((review, i) => (
              <ScrollReveal key={i} delay={Math.min(i * 50, 300)}>
                <div className="review-card">
                  <Stars count={review.rating} />

                  <span
                    style={{
                      fontSize: '2.5rem',
                      lineHeight: 0.8,
                      color: 'rgba(201,169,110,0.15)',
                      fontFamily: 'Georgia, serif',
                      marginBottom: 12,
                      display: 'block',
                    }}
                    aria-hidden
                  >
                    &ldquo;
                  </span>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#A8A5A0',
                      lineHeight: 1.75,
                      flex: 1,
                      marginBottom: 24,
                      fontStyle: 'italic',
                    }}
                  >
                    {review.text}
                  </p>

                  <div>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#F5F3EF',
                        marginBottom: 2,
                      }}
                    >
                      {review.author}
                    </p>
                    <p
                      style={{
                        fontSize: '0.68rem',
                        color: '#6B6965',
                        letterSpacing: '0.04em',
                        marginBottom: 8,
                      }}
                    >
                      {review.location}
                    </p>
                    <p
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(201,169,110,0.5)',
                      }}
                    >
                      {review.watch}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── UGC Section ── */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(60px, 8vw, 96px) 24px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal delay={0}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                  marginBottom: 12,
                }}
              >
                {t('ugcHashtag')}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 600,
                  color: '#F5F3EF',
                  letterSpacing: '-0.02em',
                  marginBottom: 12,
                }}
              >
                {t('ugcHeading')}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#6B6965', lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
                {t('ugcCaption')}
              </p>
            </div>
          </ScrollReveal>

          {/* Placeholder grid — replaced with real UGC when available */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 8,
              marginBottom: 36,
            }}
            className="ugc-grid"
          >
            <style>{`
              @media (max-width: 900px) {
                .ugc-grid { grid-template-columns: repeat(4, 1fr) !important; }
              }
              @media (max-width: 560px) {
                .ugc-grid { grid-template-columns: repeat(3, 1fr) !important; }
              }
              .ugc-card-link {
                display: block;
                aspect-ratio: 1/1;
                border: 1px solid rgba(255,255,255,0.05);
                border-radius: 4px;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                text-decoration: none;
                transition: border-color 0.25s, transform 0.3s;
              }
              .ugc-card-link:hover {
                border-color: rgba(201,169,110,0.25);
                transform: scale(1.03);
              }
              .ugc-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.25s;
              }
              .ugc-overlay svg { opacity: 0; transition: opacity 0.25s; }
              .ugc-card-link:hover .ugc-overlay { background: rgba(0,0,0,0.45); }
              .ugc-card-link:hover .ugc-overlay svg { opacity: 1; }
            `}</style>

            {ugcImages.map((img: string, i: number) => (
              <ScrollReveal key={i} delay={i * 35}>
                <a
                  href="https://www.instagram.com/artemis.watches"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on Instagram"
                  className="ugc-card-link"
                >
                  <img
                    src={img}
                    alt="ARTEMIS client wrist shot — luxury watch Montreal"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                  />
                  {/* Instagram overlay on hover */}
                  <div className="ugc-overlay">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
                    </svg>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Instagram CTA */}
          <ScrollReveal delay={0}>
            <div style={{ textAlign: 'center' }}>
              <style>{`
                .ugc-ig-btn {
                  display: inline-flex; align-items: center; gap: 10px;
                  padding: 13px 28px;
                  border: 1px solid rgba(201,169,110,0.25);
                  color: #C9A96E;
                  font-size: 0.72rem; font-weight: 700;
                  letter-spacing: 0.14em; text-transform: uppercase;
                  text-decoration: none; transition: background 0.2s;
                }
                .ugc-ig-btn:hover { background: rgba(201,169,110,0.06); }
              `}</style>
              <a
                href="https://www.instagram.com/artemis.watches"
                target="_blank"
                rel="noopener noreferrer"
                className="ugc-ig-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                @artemis.watches
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(64px, 9vw, 104px) 24px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <ScrollReveal delay={0}>
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 16,
            }}
          >
            {t('ctaOverline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#F5F3EF',
              marginBottom: 32,
            }}
          >
            {t('ctaHeadline')}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <style>{`
            .reviews-btn-shop {
              display: inline-block;
              padding: 15px 36px;
              background: #F5F3EF;
              color: #0A0A0A;
              font-size: 0.78rem;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              text-decoration: none;
              transition: background 0.2s;
            }
            .reviews-btn-shop:hover {
              background: #C9A96E;
            }
            .reviews-btn-whatsapp {
              display: inline-block;
              padding: 15px 36px;
              border: 1px solid rgba(255,255,255,0.12);
              color: #A8A5A0;
              font-size: 0.78rem;
              font-weight: 600;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              text-decoration: none;
              transition: border-color 0.2s, color 0.2s;
            }
            .reviews-btn-whatsapp:hover {
              border-color: rgba(201,169,110,0.4);
              color: #C9A96E;
            }
          `}</style>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/collections" className="reviews-btn-shop">
              {t('ctaShop')}
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-btn-whatsapp"
            >
              {t('ctaWhatsApp')}
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
