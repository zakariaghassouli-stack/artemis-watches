import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ProductGridClient } from '@/components/collection/ProductGridClient';
import { getBrandMeta, getCollectionsByBrand } from '@/lib/brands';
import { getProductsByBrand, getProductsByCollection, formatPrice } from '@/lib/products';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ brandSlug: string; locale: string }>;
  searchParams?: Promise<{ range?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = getBrandMeta(brandSlug);
  if (!brand) return {};
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
  const path = `/collections/${brandSlug}`;
  return {
    title: `${brand.name} | Artemis Watches — Montreal`,
    description: `Shop ${brand.name} at Artemis. ${brand.description}`,
    alternates: {
      canonical: `${base}${path}`,
      languages: { 'en-CA': `${base}${path}`, 'fr-CA': `${base}/fr${path}` },
    },
  };
}

export default async function BrandPage({ params, searchParams }: Props) {
  const { brandSlug } = await params;
  const { range } = (await searchParams) ?? {};
  const initialFilter = range === 'essential' || range === 'premium' ? range : undefined;
  const brand = getBrandMeta(brandSlug);
  if (!brand) notFound();

  const [t, tBrands] = await Promise.all([
    getTranslations('collections'),
    getTranslations('brands'),
  ]);

  const brandTagline = (tBrands(`${brandSlug}.tagline` as never) as string) || brand.tagline;
  const brandDescription = (tBrands(`${brandSlug}.description` as never) as string) || brand.description;
  const collections = getCollectionsByBrand(brandSlug);
  const allProducts = getProductsByBrand(brandSlug);
  const lowestPrice = allProducts.length
    ? Math.min(...allProducts.map((p) => p.price))
    : 0;

  const translations = {
    filterAll: t('filterAll'),
    filterEssential: t('filterEssential'),
    filterPremium: t('filterPremium'),
    sortBy: t('sortBy'),
    sortDefault: t('sortDefault'),
    sortPriceLow: t('sortPriceLow'),
    sortPriceHigh: t('sortPriceHigh'),
    products: t('products'),
    product: t('product'),
    viewDetails: t('viewDetails'),
    noResults: t('noResults'),
  };

  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Collections', item: `${base}/collections` },
      { '@type': 'ListItem', position: 2, name: brand.name, item: `${base}/collections/${brandSlug}` },
    ],
  };

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Brand hero */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)',
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Breadcrumb
            crumbs={[
              { label: t('breadcrumbCollections'), href: '/collections' },
              { label: brand.name },
            ]}
          />

          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 16,
              }}
            >
              {t('piecesAvailable', { count: allProducts.length })}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 700,
                color: '#F5F3EF',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: 16,
              }}
            >
              {brand.name}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: '#C9A96E',
                marginBottom: 20,
                letterSpacing: '0.04em',
              }}
            >
              {brandTagline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#6B6965',
                lineHeight: 1.7,
                maxWidth: 600,
                marginBottom: 32,
              }}
            >
              {brandDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {t('startingFrom')} {formatPrice(lowestPrice)} CAD
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Collections within this brand */}
      {collections.length > 1 && (
        <section
          style={{
            padding: 'clamp(48px, 6vw, 80px) 24px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <p
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 24,
              }}
            >
              {t('collectionsIn')} {brand.name}
            </p>

            <div className="collections-row">
              <style>{`
                .collections-row {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  gap: 16px;
                }
                @media (max-width: 900px) {
                  .collections-row { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 480px) {
                  .collections-row { grid-template-columns: 1fr; }
                }
                .collection-link:hover {
                  border-color: rgba(201,169,110,0.25) !important;
                  transform: translateY(-3px) !important;
                }
              `}</style>

              {collections.map((col, i) => {
                const colProducts = getProductsByCollection(col.slug);
                return (
                  <ScrollReveal key={col.slug} delay={i * 60}>
                    <Link
                      href={`/collections/${brandSlug}/${col.slug}`}
                      style={{
                        display: 'block',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 4,
                        padding: '24px 20px',
                        textDecoration: 'none',
                        background: '#111111',
                        transition:
                          'border-color 0.3s, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
                      }}
                      className="collection-link"
                    >
                      <p
                        style={{
                          fontSize: '0.58rem',
                          color: 'rgba(255,255,255,0.2)',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 10,
                        }}
                      >
                        {t('piecesCount', { count: colProducts.length })}
                      </p>
                      <h3
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#F5F3EF',
                          letterSpacing: '-0.01em',
                          marginBottom: 8,
                        }}
                      >
                        {col.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: '#6B6965',
                          lineHeight: 1.5,
                          marginBottom: 16,
                        }}
                      >
                        {col.description}
                      </p>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#C9A96E',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        {t('exploreLabel')}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path
                            d="M1.5 5h7M5.5 2L8.5 5l-3 3"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All products for this brand */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 32,
            }}
          >
            {t('allBrandPieces', { name: brand.name })}
          </p>

          <ProductGridClient products={allProducts} t={translations} initialFilter={initialFilter} />
        </div>
      </section>
    </div>
  );
}
