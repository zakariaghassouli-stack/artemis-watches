import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ProductGridClient } from '@/components/collection/ProductGridClient';
import { getBrandMeta, getCollectionMeta } from '@/lib/brands';
import { getProductsByCollection, formatPrice } from '@/lib/products';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ brandSlug: string; collectionSlug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug, collectionSlug } = await params;
  const brand = getBrandMeta(brandSlug);
  const collection = getCollectionMeta(collectionSlug);
  if (!brand || !collection) return {};
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
  const path = `/collections/${brandSlug}/${collectionSlug}`;
  return {
    title: `${brand.name} ${collection.name} | Artemis Watches — Montreal`,
    description: `Shop the ${brand.name} ${collection.name} at Artemis. ${collection.description}`,
    alternates: {
      canonical: `${base}${path}`,
      languages: { 'en-CA': `${base}${path}`, 'fr-CA': `${base}/fr${path}` },
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { brandSlug, collectionSlug } = await params;

  const brand = getBrandMeta(brandSlug);
  const collection = getCollectionMeta(collectionSlug);

  if (!brand || !collection || collection.brandSlug !== brandSlug) {
    notFound();
  }

  const [t, tBrands] = await Promise.all([
    getTranslations('collections'),
    getTranslations('brands'),
  ]);
  const collectionDescription =
    (tBrands(`collections.${collection.slug}.description` as never) as string) ||
    collection.description;
  const products = getProductsByCollection(collectionSlug);
  const lowestPrice = products.length
    ? Math.min(...products.map((p) => p.price))
    : 0;
  const highestPrice = products.length
    ? Math.max(...products.map((p) => p.price))
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
      { '@type': 'ListItem', position: 3, name: collection.name, item: `${base}/collections/${brandSlug}/${collectionSlug}` },
    ],
  };

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Collection hero */}
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
              { label: brand.name, href: `/collections/${brandSlug}` },
              { label: collection.name },
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
              {brand.name}
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
                marginBottom: 20,
              }}
            >
              {collection.name}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#6B6965',
                lineHeight: 1.7,
                maxWidth: 560,
                marginBottom: 28,
              }}
            >
              {collectionDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {t('piecesAvailable', { count: products.length })}
              </p>
              {products.length > 0 && (
                <p
                  style={{
                    fontSize: '0.72rem',
                    color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {lowestPrice === highestPrice
                    ? formatPrice(lowestPrice)
                    : `${formatPrice(lowestPrice)} – ${formatPrice(highestPrice)}`}{' '}
                  CAD
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product grid */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <ProductGridClient products={products} t={translations} />
        </div>
      </section>
    </div>
  );
}
