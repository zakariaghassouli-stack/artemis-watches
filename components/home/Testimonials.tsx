'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

const REVIEWS = [
  {
    text: 'I was skeptical buying a luxury watch online, but Artemis changed my mind. The Submariner arrived in perfect condition, beautifully packaged, and the WhatsApp support was incredible.',
    author: 'Marc D.',
    location: 'Montreal, QC',
    rating: 5,
  },
  {
    text: 'Ordered the Datejust for my husband\'s birthday. The presentation was gorgeous — he thought it was from an authorized dealer. The 30-day guarantee gave me total peace of mind.',
    author: 'Sarah L.',
    location: 'Toronto, ON',
    rating: 5,
  },
  {
    text: 'Best purchase I\'ve made this year. The Royal Oak from the Premium range has an incredible wrist presence. Fast shipping, great communication.',
    author: 'James K.',
    location: 'Vancouver, BC',
    rating: 5,
  },
  {
    text: 'As a watch collector, I\'m picky. Artemis impressed me with their attention to detail and honest descriptions. The Santos I received was exactly as shown.',
    author: 'David R.',
    location: 'Ottawa, ON',
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="#C9A96E"
          aria-hidden
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations('home.testimonials');

  return (
    <section
      style={{
        background: '#0D0D0D',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHeader
          overline={t('overline')}
          headline={t('headline')}
        />

        {/* Reviews grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 64,
          }}
          className="reviews-grid"
        >
          <style>{`
            @media (max-width: 1000px) {
              .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 560px) {
              .reviews-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {REVIEWS.map((review, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                style={{
                  padding: '28px 24px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stars count={review.rating} />

                {/* Quote mark */}
                <span
                  style={{
                    fontSize: '2.5rem',
                    lineHeight: 0.8,
                    color: 'rgba(201,169,110,0.2)',
                    fontFamily: 'Georgia, serif',
                    marginBottom: 12,
                    display: 'block',
                  }}
                  aria-hidden
                >
                  "
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
                      fontSize: '0.72rem',
                      color: '#6B6965',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {review.location}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* UGC Gallery */}
        <ScrollReveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 8,
              }}
            >
              #ARTEMISONWRIST
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#6B6965',
              }}
            >
              {t('ugcCaption')}
            </p>
          </div>
        </ScrollReveal>

        {/* UGC grid placeholders */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 8,
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
          `}</style>

          {[1,2,3,4,5,6].map((n, i) => (
            <ScrollReveal key={n} delay={i * 50}>
              <div
                style={{
                  aspectRatio: '1/1',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.25s',
                  position: 'relative',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(201,169,110,0.2)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(255,255,255,0.05)')
                }
              >
                <img
                  src={`/images/review/review-0${n}.png`}
                  alt={`Client review ${n}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
