'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { getProductCountByBrand } from '@/lib/products';

const BRANDS = [
  {
    key: 'rolex' as const,
    slug: 'rolex',
    bgAccent: 'rgba(0,135,81,0.06)',
    image: '/images/rolex-gmt-master-ii-pepsi-face.webp',
    models: [
      { label: 'Submariner', slug: 'submariner' },
      { label: 'Datejust', slug: 'datejust' },
      { label: 'GMT-Master II', slug: 'gmt-master-ii' },
      { label: 'Daytona', slug: 'daytona' },
      { label: 'Day-Date', slug: 'day-date' },
      { label: 'Explorer', slug: 'explorer' },
    ],
  },
  {
    key: 'cartier' as const,
    slug: 'cartier',
    bgAccent: 'rgba(180,30,30,0.05)',
    image: '/images/cartier-santos-silver-face.webp',
    models: [
      { label: 'Santos', slug: 'santos' },
      { label: 'Panthère', slug: 'panthere' },
    ],
  },
  {
    key: 'ap' as const,
    slug: 'audemars-piguet',
    bgAccent: 'rgba(0,80,160,0.05)',
    image: '/images/audemars-piguet-royal-oak-skeleton-silver-face.webp',
    models: [{ label: 'Royal Oak', slug: 'royal-oak' }],
  },
  {
    key: 'patek' as const,
    slug: 'patek-philippe',
    bgAccent: 'rgba(140,100,0,0.05)',
    image: '/images/patek-philippe-nautilus-blue-face.webp',
    models: [
      { label: 'Nautilus', slug: 'nautilus' },
      { label: 'Aquanaut', slug: 'aquanaut' },
      { label: 'Calatrava', slug: 'calatrava' },
    ],
  },
];

const BRAND_COUNTS = getProductCountByBrand();

interface FeaturedCollectionsProps {
  counts?: Record<string, number>;
}

export function FeaturedCollections({ counts }: FeaturedCollectionsProps) {
  const t = useTranslations('home.collections');
  const brandCounts = counts ?? BRAND_COUNTS;

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
          subheadline={t('subheadline')}
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
              <div
                style={{
                  display: 'block',
                  position: 'relative',
                  aspectRatio: '3/4',
                  background: `linear-gradient(160deg, #161616 0%, #111111 100%)`,
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
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
                <Image
                  src={brand.image}
                  alt={`${brandNames[brand.key]} collection — Artemis Watches Montreal`}
                  fill
                  sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
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
                  <p
                    style={{
                      display: 'inline-flex',
                      fontSize: '0.56rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#C9A96E',
                      background: 'rgba(10,10,10,0.45)',
                      border: '1px solid rgba(201,169,110,0.16)',
                      padding: '4px 8px',
                      borderRadius: 999,
                      marginBottom: 12,
                    }}
                  >
                    {t('piecesCount', { count: brandCounts[brand.slug] ?? 0 })}
                  </p>
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
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    {brand.models.map((model) => (
                      <Link
                        key={model.slug}
                        href={`/collections/${brand.slug}/${model.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '5px 8px',
                          borderRadius: 999,
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(10,10,10,0.38)',
                          color: '#A8A5A0',
                          fontSize: '0.63rem',
                          letterSpacing: '0.03em',
                          textDecoration: 'none',
                        }}
                      >
                        {model.label}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/collections/${brand.slug}`}
                    style={{
                      display: 'inline-flex',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#C9A96E',
                      letterSpacing: '0.08em',
                      textDecoration: 'none',
                    }}
                  >
                    {t(`${brand.key}Cta` as Parameters<typeof t>[0])}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
