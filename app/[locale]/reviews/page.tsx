
import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: 'Client Reviews — ARTEMIS Watches',
  description:
    'Read what our clients say about ARTEMIS. 200+ satisfied collectors across Canada. 4.9/5 average rating on every order.',
};

const REVIEWS = [
  {
    text: "I was skeptical buying a luxury watch online, but ARTEMIS changed my mind entirely. The Submariner arrived in perfect condition, beautifully packaged. The WhatsApp support was incredible — they responded within minutes every time.",
    author: 'Marc D.',
    location: 'Montreal, QC',
    watch: 'Rolex Submariner',
    rating: 5,
  },
  {
    text: "Ordered the Datejust for my husband's birthday. The presentation was gorgeous — he genuinely thought it was from an authorized dealer. The 30-day guarantee gave me total peace of mind.",
    author: 'Sarah L.',
    location: 'Toronto, ON',
    watch: 'Rolex Datejust',
    rating: 5,
  },
  {
    text: "Best purchase I've made this year. The Royal Oak from the Premium range has an incredible wrist presence. Shipping was fast, communication was excellent, and the bracelet adjustment tool was a nice touch.",
    author: 'James K.',
    location: 'Vancouver, BC',
    watch: 'AP Royal Oak',
    rating: 5,
  },
  {
    text: "As a watch collector, I'm extremely picky. ARTEMIS impressed me with their attention to detail and honest descriptions. The Santos I received was exactly as shown — not a single flaw.",
    author: 'David R.',
    location: 'Ottawa, ON',
    watch: 'Cartier Santos',
    rating: 5,
  },
  {
    text: "Fantastic experience start to finish. The Nautilus exceeded my expectations. Packaging was premium — felt like opening something from the Maison itself. Will definitely be back for the Aquanaut next.",
    author: 'Philippe M.',
    location: 'Quebec City, QC',
    watch: 'Patek Nautilus',
    rating: 5,
  },
  {
    text: "I reached out on WhatsApp before buying. The team was knowledgeable, honest about the condition of each piece, and helped me find the right watch for my budget. Customer service is top-tier.",
    author: 'Emma T.',
    location: 'Calgary, AB',
    watch: 'Rolex GMT-Master II',
    rating: 5,
  },
  {
    text: "The Panthère de Cartier I ordered was stunning. I compared it to pieces I've seen in-store and ARTEMIS held up perfectly. For the price point, this is unbeatable value.",
    author: 'Isabelle F.',
    location: 'Montreal, QC',
    watch: 'Cartier Panthère',
    rating: 5,
  },
  {
    text: "Quick delivery, zero hassle. The watch came with the bracelet adjustment tool, which I actually used right away. Good communication throughout — I was updated at every stage of my order.",
    author: 'Ryan B.',
    location: 'Edmonton, AB',
    watch: 'Rolex Daytona',
    rating: 5,
  },
  {
    text: "I've bought from three different online watch sellers. ARTEMIS is by far the most professional. The listing photos are accurate, the shipping is fast, and the after-purchase support is real.",
    author: 'Nathan C.',
    location: 'Winnipeg, MB',
    watch: 'Rolex Submariner',
    rating: 5,
  },
  {
    text: "Gift for my partner's 30th birthday. The unboxing experience was premium — proper packaging, clean presentation. The watch is exactly as described. She hasn't taken it off since.",
    author: 'Luc B.',
    location: 'Laval, QC',
    watch: 'Cartier Santos',
    rating: 5,
  },
  {
    text: "Very happy with my Datejust. Process was clean — I messaged them, confirmed everything on WhatsApp, paid through the site, and received the watch in excellent condition within 5 days.",
    author: 'Alex V.',
    location: 'Longueuil, QC',
    watch: 'Rolex Datejust',
    rating: 5,
  },
  {
    text: "I appreciated the transparency. They told me exactly what was included, the condition of the dial, and even helped me compare two models. That level of honesty is rare in this space.",
    author: 'Sophie M.',
    location: 'Halifax, NS',
    watch: 'AP Royal Oak',
    rating: 5,
  },
];

const PLATFORMS = [
  { label: 'Google Reviews', value: '4.9', count: '80+' },
  { label: 'Facebook', value: '5.0', count: '45+' },
  { label: 'Direct Clients', value: '4.9', count: '200+' },
];

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

export default function ReviewsPage() {
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
              CLIENT REVIEWS
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
              What Our Clients Say.
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
              Over 200 collectors and first-time buyers across Canada have trusted ARTEMIS
              with their most meaningful purchases. Here is what they have to say.
            </p>
          </ScrollReveal>

          {/* Overall rating */}
          <ScrollReveal delay={200}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 28px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: '#C9A96E',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  4.9
                </p>
                <div style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C9A96E" aria-hidden>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: 'rgba(255,255,255,0.08)',
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <p
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#F5F3EF',
                    marginBottom: 4,
                  }}
                >
                  200+ Reviews
                </p>
                <p
                  style={{
                    fontSize: '0.72rem',
                    color: '#6B6965',
                    letterSpacing: '0.08em',
                  }}
                >
                  Across all platforms
                </p>
              </div>
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
                  <span style={{ fontSize: '0.875rem', color: '#A8A5A0', fontWeight: 400 }}> / 5</span>
                </p>
                <p
                  style={{
                    fontSize: '0.72rem',
                    color: '#6B6965',
                  }}
                >
                  {p.count} reviews
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
                <div
                  className="review-card"
                >
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
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
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
              <p style={{ fontSize: '0.85rem', color: '#6B6965' }}>
                Tag us on Instagram or Snapchat @artemis.watches
              </p>
            </div>
          </ScrollReveal>

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
              .ugc-card {
                aspect-ratio: 1/1;
                border: 1px solid rgba(255,255,255,0.05);
                border-radius: 4px;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                transition: border-color 0.25s;
              }
              .ugc-card:hover {
                border-color: rgba(201,169,110,0.2);
              }
            `}</style>

            {Array.from({ length: 24 }, (_, i) => i + 1).map((n, i) => (
              <ScrollReveal key={n} delay={i * 40}>
                <div
                  className="ugc-card"
                >
                  <img
                    src={`/images/review/review-${String(n).padStart(2, '0')}.png`}
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
            JOIN THEM
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
            Your next timepiece is waiting.
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
            <Link
              href="/collections"
              className="reviews-btn-shop"
            >
              Shop the Collection
            </Link>
            <a
              href="https://wa.me/15145609765?text=Hello%20ARTEMIS%2C%20I%27m%20looking%20for%20a%20watch."
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-btn-whatsapp"
            >
              Ask on WhatsApp →
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
