import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getBrandMeta, getCollectionMeta } from '@/lib/brands';
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCollection,
  getSiteSettings,
} from '@/lib/queries';
import { localizeProduct } from '@/lib/products';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { SpecsTable } from '@/components/product/SpecsTable';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { MobileStickyBar } from '@/components/product/MobileStickyBar';
import { ViewContentTracker } from '@/components/analytics/ViewContentTracker';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    brandSlug: string;
    collectionSlug: string;
    productSlug: string;
    locale: string;
  }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug, collectionSlug, productSlug, locale } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) return {};

  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
  const productPath = `/collections/${brandSlug}/${collectionSlug}/${productSlug}`;
  const frUrl = `${base}${productPath}`;               // FR — no locale prefix (default)
  const enUrl = `${base}/en${productPath}`;             // EN

  // Resolve og:image — handles both absolute Supabase URLs and relative /public paths
  const rawImage = product.images[0];
  const ogImage = rawImage
    ? rawImage.startsWith('http') ? rawImage : `${base}${rawImage}`
    : undefined;

  const isFr = locale === 'fr';
  const title = isFr
    ? (product.seoTitleFr ?? product.seoTitle ?? `${product.brand} ${product.name} | Artemis Montres`)
    : (product.seoTitle ?? `${product.brand} ${product.name} | Artemis Watches`);
  const description = isFr
    ? (product.seoDescriptionFr || product.descriptionShortFr || product.descriptionShort)
    : (product.seoDescription ?? product.descriptionShort);

  return {
    title,
    description,
    alternates: {
      canonical: isFr ? frUrl : enUrl,
      languages: {
        'en-CA': enUrl,
        'fr-CA': frUrl,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isFr ? 'fr_CA' : 'en_CA',
      url: isFr ? frUrl : enUrl,
      ...(ogImage && {
        images: [{ url: ogImage, width: 800, height: 800, alt: `${product.brand} ${product.name}` }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { brandSlug, collectionSlug, productSlug, locale } = await params;

  const [product, siteSettings, allProducts] = await Promise.all([
    getProductBySlug(productSlug),
    getSiteSettings(),
    getAllProducts(),
  ]);
  if (!product) notFound();

  const localizedProduct = localizeProduct(product, locale);

  // Variant pills: only siblings sharing the exact `name` AND the same `range` tier.
  //   - Same name avoids mixing Datejust 31/36/41 in one pill row
  //   - Same range avoids a "Black Dial" pill appearing twice when both an
  //     Essential and a Premium variant exist with the same dial color
  // Cross-tier discovery (Essential ↔ Premium for the same dial) is handled by
  // the range selector lower in the panel — pills stay scoped to visual variants.
  const collectionVariants = (await getProductsByCollection(product.collectionSlug))
    .filter((sibling) => sibling.name === product.name && sibling.range === product.range);

  const brand = getBrandMeta(brandSlug);
  const collection = getCollectionMeta(collectionSlug);
  if (!brand || !collection) notFound();

  const t = await getTranslations('product');
  const tCommon = await getTranslations('common');
  const tCollections = await getTranslations('collections');
  const tSpecs = await getTranslations('product.specLabels');

  const specsTableLabels = {
    heading: t('specsHeading'),
    fields: {
      caseDiameter: tSpecs('caseDiameter'),
      caseThickness: tSpecs('caseThickness'),
      caseMaterial: tSpecs('caseMaterial'),
      material: tSpecs('material'),
      weight: tSpecs('weight'),
      dialColor: tSpecs('dialColor'),
      dialFinish: tSpecs('dialFinish'),
      hourMarkers: tSpecs('hourMarkers'),
      hands: tSpecs('hands'),
      bezel: tSpecs('bezel'),
      crystal: tSpecs('crystal'),
      glassTreatment: tSpecs('glassTreatment'),
      movement: tSpecs('movement'),
      powerReserve: tSpecs('powerReserve'),
      lume: tSpecs('lume'),
      waterResistance: tSpecs('waterResistance'),
      bracelet: tSpecs('bracelet'),
      clasp: tSpecs('clasp'),
      factory: tSpecs('factory'),
    },
  };

  const factoryChoiceLabels = {
    subjectToAvailability: t('factorySubjectToAvailability'),
    customerChoice: t('factoryCustomerChoice'),
  };

  // Enrich specs once at the page level so both the structured SpecsTable
  // and the in-tab SpecsTab render identical values:
  //  - movement / powerReserve fall back to tier-canonical defaults when
  //    Sanity data is missing (matches the Premium tagline 28 800 alt/h · 70h
  //    and the Essential Miyota wording — no more dissonance with the table)
  //  - waterResistance gets the Option A "(spec d'origine)" suffix when set,
  //    otherwise the row is omitted entirely
  const rawWaterResistance = localizedProduct.specs.waterResistance;
  const tierMovementDefault =
    localizedProduct.range === 'premium'
      ? t('movementPremiumDefault')
      : t('movementEssentialDefault');
  const tierPowerReserveDefault =
    localizedProduct.range === 'premium'
      ? t('powerReservePremiumDefault')
      : t('powerReserveEssentialDefault');

  const enrichedSpecs = {
    ...localizedProduct.specs,
    movement: localizedProduct.specs.movement ?? tierMovementDefault,
    powerReserve: localizedProduct.specs.powerReserve ?? tierPowerReserveDefault,
    ...(rawWaterResistance
      ? { waterResistance: `${rawWaterResistance} ${t('waterResistanceSuffix')}` }
      : {}),
  };

  const enrichedLocalizedProduct = {
    ...localizedProduct,
    specs: enrichedSpecs,
  };

  const productInfoT = {
    addToCart: t('addToCart'),
    orderWhatsApp: t('orderWhatsApp'),
    wishlistLabel: t('wishlistLabel'),
    boxAndPapersLabel: t.raw('boxAndPapersLabel') as string,
    boxAndPapersIncluded: t('boxAndPapersIncluded'),
    freeShipping: t('freeShipping'),
    returnPolicy: t('returnPolicy'),
    authenticityLabel: t('authenticityLabel'),
    braceletTool: tCommon('braceletTool'),
    keyPoints: t('keyPoints'),
    complimentaryBadge: t('complimentaryBadge'),
    premiumPackagingLabel: t('premiumPackagingLabel'),
    guaranteeLabel: t('guaranteeLabel'),
    trackedShippingLabel: t('trackedShippingLabel'),
    braceletToolLabel: t('braceletToolLabel'),
    lowStock: t.raw('lowStock') as string,
    bestSeller: t('bestSeller'),
    highDemand: t('highDemand'),
    newArrival: t('newArrival'),
    justRestocked: t('justRestocked'),
    stockImmediate: t('stockImmediate'),
    essentialOnly: t('essentialOnly'),
    premiumOnly: t('premiumOnly'),
    preparationMontreal: t('preparationMontreal'),
    inStock: t('inStock'),
    outOfStock: t('outOfStock'),
    rangeEssential: t('rangeEssential'),
    rangePremium: t('rangePremium'),
    reviewSingular: t('reviewSingular'),
    reviewPlural: t('reviewPlural'),
    rangeSelectorLabel: t('rangeSelectorLabel'),
    variantsLabel: t('variantsLabel'),
    variantsLabelDials: t('variantsLabelDials'),
    variantsLabelSpecial: t('variantsLabelSpecial'),
    sizeSelectorLabel: t('sizeSelectorLabel'),
    checkoutNote: t('checkoutNote'),
    newClientDiscount: t.raw('newClientDiscount') as string,
    shippingAvailabilityLabel: t('shippingAvailabilityLabel'),
    shippingStatusReady: t('shippingStatusReady'),
    shippingStatusMadeToOrder: t('shippingStatusMadeToOrder'),
    shippingTrackingNote: t('shippingTrackingNote'),
    trustOrders: t('trustOrders'),
    trustMontreal: t('trustMontreal'),
    trustReturns: t('trustReturns'),
    trustResponse: t('trustResponse'),
  };

  const productTabsT = {
    tabDescription: t('tabDescription'),
    tabSpecs: t('tabSpecs'),
    tabReviews: t('tabReviews'),
    specsHeading: t('specsHeading'),
    reviewsHeading: t('reviewsHeading'),
    verifiedPurchase: t('verifiedPurchase'),
    noReviews: t('noReviews'),
    tabShipping: t('tabShipping'),
    tabReturns: t('tabReturns'),
    tabHelp: t('tabHelp'),
    shippingTitle: t('shippingTitle'),
    shippingLine1Label: t('shippingLine1Label'),
    shippingLine1Value: t('shippingLine1Value'),
    shippingLine2Label: t('shippingLine2Label'),
    shippingLine2Value: t('shippingLine2Value'),
    shippingLine3Label: t('shippingLine3Label'),
    shippingLine3Value: t('shippingLine3Value'),
    shippingNote: t('shippingNote'),
    returnsTitle: t('returnsTitle'),
    returnsPoints: t.raw('returnsPoints') as string[],
    returnsNote: t('returnsNote'),
    helpTitle: t('helpTitle'),
    helpBody: t('helpBody'),
    helpCta: t('helpCta'),
  };

  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
  const productPath = `/collections/${brandSlug}/${collectionSlug}/${productSlug}`;

  // JSON-LD Product schema
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.brand} ${product.name}`,
    image: product.images[0] ? [product.images[0]] : undefined,
    description: product.descriptionShort,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'CAD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${base}${productPath}`,
      seller: {
        '@type': 'Organization',
        name: 'Artemis Watches',
        url: base,
      },
    },
    ...(product.reviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (
          product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
        ).toFixed(1),
        reviewCount: product.reviews.length,
      },
    }),
  };

  // JSON-LD BreadcrumbList — helps Google show breadcrumbs in SERPs
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Collections',
        item: `${base}/collections`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: brand.name,
        item: `${base}/collections/${brandSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: collection.name,
        item: `${base}/collections/${brandSlug}/${collectionSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `${base}${productPath}`,
      },
    ],
  };

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {/* JSON-LD: Product + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Meta Pixel — ViewContent */}
      <ViewContentTracker
        productId={product.id}
        productName={`${product.brand} ${product.name}`}
        brand={product.brand}
        price={product.price}
        range={product.range}
      />

      {/* ── Hero: gallery + sticky info ─────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 24px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Breadcrumb
            crumbs={[
              { label: tCollections('breadcrumbCollections'), href: '/collections' },
              { label: brand.name, href: `/collections/${brandSlug}` },
              {
                label: collection.name,
                href: `/collections/${brandSlug}/${collectionSlug}`,
              },
              { label: product.name },
            ]}
          />

          {/* 2-column layout: gallery left, info right */}
          <div className="product-hero-grid">
            <style>{`
              .product-hero-grid {
                display: grid;
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
                gap: clamp(40px, 6vw, 80px);
                align-items: start;
                padding-bottom: clamp(60px, 8vw, 100px);
              }
              @media (max-width: 768px) {
                .product-hero-grid {
                  grid-template-columns: 1fr;
                  gap: 40px;
                }
              }
            `}</style>

            {/* Gallery */}
            <div style={{ minWidth: 0, position: 'relative', zIndex: 0 }}>
              <ProductGallery product={enrichedLocalizedProduct} />
            </div>

            {/* Sticky info */}
            <div style={{ minWidth: 0, position: 'relative', zIndex: 1 }}>
              <ProductInfo
                product={enrichedLocalizedProduct}
                collectionVariants={collectionVariants}
                welcomeDiscountPercent={siteSettings?.welcomeDiscountPercent ?? 10}
                t={productInfoT}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Spec sheet: visible without tab interaction ───────────── */}
      <SpecsTable
        specs={enrichedSpecs}
        labels={specsTableLabels}
        range={enrichedLocalizedProduct.range}
        factoryOptions={enrichedLocalizedProduct.factoryOptions}
        factoryChoice={enrichedLocalizedProduct.factoryChoice}
        factoryChoiceLabels={factoryChoiceLabels}
      />

      {/* ── Tabs: Description / Reviews / Shipping / Returns / Help ── */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: 'clamp(48px, 7vw, 88px) 24px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <ProductTabs product={enrichedLocalizedProduct} t={productTabsT} />
        </div>
      </section>

      {/* ── FAQ produit (Schema.org FAQPage JSON-LD inline) ─────────── */}
      <ProductFAQ
        title={t('faqTitle')}
        items={(t.raw('faqItems') as { q: string; a: string }[]).map((it) => ({
          question: it.q,
          answer: it.a,
        }))}
      />

      {/* ── Related Products ────────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: 'clamp(48px, 7vw, 88px) 24px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <RelatedProducts
            allProducts={allProducts}
            product={enrichedLocalizedProduct}
            title={t('relatedTitle')}
            viewAll={t('relatedViewAll')}
          />
        </div>
      </section>

      {/* ── Recently Viewed ─────────────────────────────────────────── */}
      <RecentlyViewed currentProductId={product.id} allProducts={allProducts} />

      {/* ── Mobile sticky bar ───────────────────────────────────────── */}
      <MobileStickyBar
        product={enrichedLocalizedProduct}
        addToCartLabel={t('addToCart')}
        orderWhatsAppLabel={t('orderWhatsApp')}
        selectOptionsLabel={t('selectOptions')}
        selectionHint={t('selectionHint')}
      />
    </div>
  );
}
