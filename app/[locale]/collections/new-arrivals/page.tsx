import { getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductGridClient } from '@/components/collection/ProductGridClient';
import { ALL_PRODUCTS, formatPrice } from '@/lib/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Arrivals | Artemis Watches — Montreal',
  description:
    'Freshly curated timepieces from Rolex, Cartier, Audemars Piguet, and Patek Philippe. New additions to the Artemis catalogue — Essential and Premium ranges.',
};

// Sort: new-arrival badge first, then high-demand, then best-sellers, then rest
const BADGE_PRIORITY: Record<string, number> = {
  'new-arrival': 0,
  'just-restocked': 1,
  'high-demand': 2,
  'best-seller': 3,
};

const NEW_ARRIVALS_PRODUCTS = [...ALL_PRODUCTS].sort((a, b) => {
  const pa = BADGE_PRIORITY[a.badge ?? ''] ?? 4;
  const pb = BADGE_PRIORITY[b.badge ?? ''] ?? 4;
  if (pa !== pb) return pa - pb;
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  return 0;
});

const LOWEST_PRICE = Math.min(...ALL_PRODUCTS.map((p) => p.price));

export default async function NewArrivalsPage() {
  const t = await getTranslations('collections');

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

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)',
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 60%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Breadcrumb
            crumbs={[
              { label: t('breadcrumbCollections'), href: '/collections' },
              { label: 'New Arrivals' },
            ]}
          />
          <div style={{ marginTop: 32 }}>
            <SectionHeader
              overline="NEW ARRIVALS"
              headline="Freshly Curated."
              subheadline={`${ALL_PRODUCTS.length} timepieces — Rolex, Cartier, Audemars Piguet, Patek Philippe. Every piece inspected and ready to ship from Montreal. ${t('startingFrom')} ${formatPrice(LOWEST_PRICE)} CAD.`}
            />
          </div>
        </div>
      </section>

      {/* ── Products grid ── */}
      <section style={{ padding: 'clamp(48px, 7vw, 96px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <ProductGridClient
            products={NEW_ARRIVALS_PRODUCTS}
            t={translations}
          />
        </div>
      </section>

      {/* ── Bottom trust strip ── */}
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
