import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { getAllProducts } from '@/lib/queries';

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Collections | Artemis Watches — Montreal',
  description:
    'Shop Rolex, Cartier, Audemars Piguet, and Patek Philippe at Artemis. A considered watch selection from Montreal, with direct service.',
  alternates: {
    canonical: `${BASE}/collections`,
    languages: {
      'en-CA': `${BASE}/en/collections`,
      'fr-CA': `${BASE}/collections`,
    },
  },
};

type BrandCardConfig = {
  slug: 'rolex' | 'cartier' | 'audemars-piguet' | 'patek-philippe';
  name: string;
  image: string;
  tags: Array<{ label: string; href: string }>;
  ctaKey: 'exploreRolex' | 'exploreCartier' | 'exploreAP' | 'explorePatek';
};

function BrandCard({
  brand,
  count,
  piecesLabel,
  cta,
  index,
}: {
  brand: BrandCardConfig;
  count: number;
  piecesLabel: string;
  cta: string;
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 70}>
      <article
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 4,
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <Link
          href={`/collections/${brand.slug}`}
          style={{
            display: 'block',
            aspectRatio: '4 / 3',
            overflow: 'hidden',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: '#121212',
            position: 'relative',
          }}
        >
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            style={{
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Link>

        <div style={{ padding: '20px 20px 22px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: 999,
              border: '1px solid rgba(201,169,110,0.18)',
              background: 'rgba(201,169,110,0.08)',
              color: '#C9A96E',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {count} {piecesLabel}
          </span>

          <h2
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#F5F3EF',
              marginBottom: 14,
            }}
          >
            {brand.name}
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
            {brand.tags.map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                style={{
                  fontSize: '0.64rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#A8A5A0',
                  textDecoration: 'none',
                  padding: '6px 9px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {tag.label}
              </Link>
            ))}
          </div>

          <Link
            href={`/collections/${brand.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,169,110,0.3)',
              paddingBottom: 2,
            }}
          >
            {cta}
          </Link>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default async function CollectionsPage() {
  const [t, products] = await Promise.all([
    getTranslations('collections'),
    getAllProducts(),
  ]);

  const counts = {
    rolex: products.filter((product) => product.brand === 'Rolex').length,
    cartier: products.filter((product) => product.brand === 'Cartier').length,
    ap: products.filter((product) => product.brand === 'Audemars Piguet').length,
    patek: products.filter((product) => product.brand === 'Patek Philippe').length,
    total: products.length,
  };

  const brandCards: BrandCardConfig[] = [
    {
      slug: 'rolex',
      name: 'Rolex',
      image: '/images/rolex-gmt-master-ii-pepsi-face.webp',
      tags: [
        { label: 'Submariner', href: '/collections/rolex/submariner' },
        { label: 'Datejust', href: '/collections/rolex/datejust' },
        { label: 'GMT-Master II', href: '/collections/rolex/gmt-master-ii' },
        { label: 'Daytona', href: '/collections/rolex/daytona' },
        { label: 'Day-Date', href: '/collections/rolex/day-date' },
        { label: 'Explorer', href: '/collections/rolex/explorer' },
      ],
      ctaKey: 'exploreRolex',
    },
    {
      slug: 'cartier',
      name: 'Cartier',
      image: '/images/cartier-santos-silver-face.webp',
      tags: [
        { label: 'Santos', href: '/collections/cartier/santos' },
        { label: 'Panthère', href: '/collections/cartier/panthere' },
      ],
      ctaKey: 'exploreCartier',
    },
    {
      slug: 'audemars-piguet',
      name: 'Audemars Piguet',
      image: '/images/audemars-piguet-royal-oak-skeleton-silver-face.webp',
      tags: [{ label: 'Royal Oak', href: '/collections/audemars-piguet/royal-oak' }],
      ctaKey: 'exploreAP',
    },
    {
      slug: 'patek-philippe',
      name: 'Patek Philippe',
      image: '/images/patek-philippe-nautilus-blue-face.webp',
      tags: [
        { label: 'Nautilus', href: '/collections/patek-philippe/nautilus' },
        { label: 'Aquanaut', href: '/collections/patek-philippe/aquanaut' },
        { label: 'Calatrava', href: '/collections/patek-philippe/calatrava' },
      ],
      ctaKey: 'explorePatek',
    },
  ];

  const cardCounts = {
    rolex: counts.rolex,
    cartier: counts.cartier,
    'audemars-piguet': counts.ap,
    'patek-philippe': counts.patek,
  } as const;

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <section
        style={{
          padding: 'clamp(84px, 12vw, 132px) 24px clamp(54px, 8vw, 88px)',
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 60%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal delay={0}>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.35rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#F5F3EF',
                marginBottom: 16,
              }}
            >
              {t('title')}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p
              style={{
                fontSize: '1rem',
                color: '#A8A5A0',
                lineHeight: 1.7,
                maxWidth: 560,
                margin: '0 auto',
              }}
            >
              {t('subtitle', { count: counts.total })}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: 'clamp(40px, 6vw, 72px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="collection-brand-grid">
            <style>{`
              .collection-brand-grid {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 20px;
              }
              @media (max-width: 1100px) {
                .collection-brand-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              }
              @media (max-width: 640px) {
                .collection-brand-grid { grid-template-columns: 1fr; }
              }
            `}</style>

            {brandCards.map((brand, index) => (
              <BrandCard
                key={brand.slug}
                brand={brand}
                count={cardCounts[brand.slug]}
                piecesLabel={t('pieces')}
                cta={t(brand.ctaKey)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
