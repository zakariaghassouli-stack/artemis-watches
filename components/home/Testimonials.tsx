'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

interface Review {
  tag?: string;
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
  const locale = useLocale();
  const waUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));
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
          subheadline={t('subheadline')}
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
                {review.tag && (
                  <p
                    style={{
                      display: 'inline-flex',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#C9A96E',
                      background: 'rgba(201,169,110,0.08)',
                      border: '1px solid rgba(201,169,110,0.18)',
                      padding: '4px 8px',
                      borderRadius: 999,
                      marginBottom: 14,
                    }}
                  >
                    {review.tag}
                  </p>
                )}
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

        {/* WhatsApp CTA — capture hésitants */}
        <ScrollReveal delay={0}>
          <div
            style={{
              margin: '48px auto 0',
              padding: '24px 32px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 4,
              textAlign: 'center',
              maxWidth: 540,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <p style={{ fontSize: '0.88rem', color: '#A8A5A0', lineHeight: 1.6, margin: 0 }}>
              {t('whatsappText')}
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,169,110,0.28)',
                paddingBottom: 2,
              }}
            >
              {t('whatsappButton')}
            </a>
          </div>
        </ScrollReveal>

        {/* UGC caption */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.08em',
            marginBottom: 18,
            marginTop: 48,
          }}
        >
          {t('ugcCaption')}
        </p>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/reviews"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '0.76rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#C9A96E',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,169,110,0.28)',
              paddingBottom: 2,
            }}
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
