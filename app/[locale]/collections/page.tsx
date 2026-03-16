import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { getAllBrands, getCollectionsByBrand } from '@/lib/brands';
import { getProductsByBrand, getProductCountByBrand, formatPrice } from '@/lib/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collections | Artemis Watches — Montreal',
  description:
    'Shop Rolex, Cartier, Audemars Piguet, and Patek Philippe at Artemis. Montreal\'s premier luxury watch destination. Essential and Premium ranges. Free shipping across Canada.',
};

const BRAND_PRODUCT_COUNTS = getProductCountByBrand();

function BrandCard({
  slug,
  name,
  tagline,
  description,
  productCount,
  collectionNames,
  index,
  exploreLabel,
}: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  productCount: number;
  collectionNames: string[];
  index: number;
  exploreLabel: string;
}) {
  return (
    <ScrollReveal delay={index * 80}>
      <Link
        href={`/collections/${slug}`}
        style={{
          display: 'block',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 4,
          overflow: 'hidden',
          textDecoration: 'none',
          background: '#111111',
          padding: '40px 36px 36px',
          transition:
            'border-color 0.3s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
          height: '100%',
        }}
        className="brand-card-link"
      >
        {/* Product count badge */}
        <div style={{ marginBottom: 28 }}>
          <span
            style={{
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              background: 'rgba(201,169,110,0.08)',
              border: '1px solid rgba(201,169,110,0.18)',
              padding: '4px 10px',
              borderRadius: 2,
            }}
          >
            {productCount} {productCount === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {/* Brand name */}
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: '#F5F3EF',
            letterSpacing: '-0.02em',
            marginBottom: 8,
            lineHeight: 1.1,
          }}
        >
          {name}
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#C9A96E',
            letterSpacing: '0.06em',
            marginBottom: 16,
            fontStyle: 'italic',
          }}
        >
          {tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              'linear-gradient(90deg, rgba(201,169,110,0.2) 0%, transparent 100%)',
            marginBottom: 16,
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: '0.82rem',
            color: '#6B6965',
            lineHeight: 1.65,
            marginBottom: 24,
          }}
        >
          {description}
        </p>

        {/* Collections list */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
          {collectionNames.map((col) => (
            <span
              key={col}
              style={{
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '3px 8px',
                borderRadius: 2,
              }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* CTA */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C9A96E',
          }}
        >
          {exploreLabel} {name}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </ScrollReveal>
  );
}

export default async function CollectionsPage() {
  const t = await getTranslations('collections');
  const brands = getAllBrands();

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)',
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 60%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader
            overline={t('pageOverline')}
            headline={t('pageHeadline')}
            subheadline={t('pageSubheadline')}
          />
        </div>
      </section>

      {/* Brand cards grid */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="brands-grid">
            <style>{`
              .brands-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
              }
              @media (max-width: 1100px) {
                .brands-grid { grid-template-columns: repeat(2, 1fr); }
              }
              @media (max-width: 560px) {
                .brands-grid { grid-template-columns: 1fr; }
              }
              .brand-card-link:hover {
                border-color: rgba(201,169,110,0.3) !important;
                transform: translateY(-4px) !important;
              }
            `}</style>

            {brands.map((brand, i) => {
              const collections = getCollectionsByBrand(brand.slug);
              const productCount = BRAND_PRODUCT_COUNTS[brand.slug] ?? 0;
              const products = getProductsByBrand(brand.slug);
              const lowestPrice = Math.min(...products.map((p) => p.price));

              return (
                <BrandCard
                  key={brand.slug}
                  slug={brand.slug}
                  name={brand.name}
                  tagline={brand.tagline}
                  description={brand.description}
                  productCount={productCount}
                  collectionNames={collections.map((c) => c.name)}
                  index={i}
                  exploreLabel={t('exploreLabel')}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom trust strip */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            flexWrap: 'wrap',
          }}
        >
          {[
            'Free shipping across Canada',
            '30-day money-back guarantee',
            'Authenticity guaranteed',
            'WhatsApp support: 514-560-9765',
          ].map((item) => (
            <span
              key={item}
              style={{
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
