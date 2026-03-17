'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

interface Review {
  text: string;
  author: string;
  location: string;
  rating: number;
}

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
  const reviews = t.raw('reviews') as Review[];

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
            @media (max-width: 1024px) {
              .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 600px) {
              .reviews-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {reviews.map((review, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                style={{
                  padding: '28px 24px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  height: '100%',
                }}
              >
                <Stars count={review.rating} />
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#6B6965',
                    lineHeight: 1.75,
                    marginBottom: 20,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#A8A5A0',
                      marginBottom: 2,
                    }}
                  >
                    {review.author}
                  </p>
                  <p
                    style={{
                      fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.2)',
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

        {/* UGC caption */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.08em',
          }}
        >
          {t('ugcCaption')}
        </p>
      </div>
    </section>
  );
}
