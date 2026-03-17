'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

const BRANDS = [
  {
    key: 'rolex' as const,
    slug: 'rolex',
    bgAccent: 'rgba(0,135,81,0.06)',
    priority: true,
    image: '/images/IMG_9316.GIF',
  },
  {
    key: 'cartier' as const,
    slug: 'cartier',
    bgAccent: 'rgba(180,30,30,0.05)',
    priority: false,
    image: '/images/IMG_7155.GIF',
  },
  {
    key: 'ap' as const,
    slug: 'audemars-piguet',
    bgAccent: 'rgba(0,80,160,0.05)',
    priority: false,
    image: '/images/IMG_0418.GIF',
  },
  {
    key: 'patek' as const,
    slug: 'patek-philippe',
    bgAccent: 'rgba(140,100,0,0.05)',
    priority: false,
    image: '/images/IMG_6709.GIF',
  },
];

export function FeaturedCollections() {
  const t = useTranslations('home.collections');

  const brandNames: Record<string, string> = {
    rolex: 'Rolex',
    cartier: 'Cartier',
    ap: 'Audemars Piguet',
    patek: 'Patek Philippe',
  };

  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(72px, 10vw, 120px) 24px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHeader
          overline={t('overline')}
          headline={t('headline')}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
          className="collections-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .collections-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 520px) {
              .collections-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {BRANDS.map((brand, i) => (
            <ScrollReveal key={brand.slug} delay={i * 80}>
              <Link
                href={`/collections/${brand.slug}`}
                style={{
                  display: 'block',
                  position: 'relative',
                  aspectRatio: brand.priority ? '3/4' : '3/4',
                  background: `linear-gradient(160deg, #161616 0%, #111111 100%)`,
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(201,169,110,0.3)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Ambient brand-colored glow */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at 50% 40%, ${brand.bgAccent} 0%, transparent 65%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Brand image */}
                <img
                  src={brand.image}
                  alt={brandNames[brand.key]}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  loading={brand.priority ? 'eager' : 'lazy'}
                />

                {/* Bottom overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      'linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)',
                    padding: '40px 20px 24px',
                  }}
                >
                  {brand.priority && (
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.58rem',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#C9A96E',
                        background: 'rgba(201,169,110,0.1)',
                        border: '1px solid rgba(201,169,110,0.25)',
                        padding: '3px 8px',
                        borderRadius: 2,
                        marginBottom: 10,
                      }}
                    >
                      {t('no1Bestseller')}
                    </span>
                  )}
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: '#F5F3EF',
                      marginBottom: 4,
                    }}
                  >
                    {brandNames[brand.key]}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: '#A8A5A0',
                      marginBottom: 14,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {t(`${brand.key}Sub` as Parameters<typeof t>[0])}
                  </p>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      color: '#C9A96E',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {t(`${brand.key}Cta` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
