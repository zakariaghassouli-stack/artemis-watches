import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { ALL_PRODUCTS } from '@/lib/products';
import { WishlistClient } from '@/components/wishlist/WishlistClient';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('wishlist');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: false },
  };
}

export default async function WishlistPage() {
  const t = await getTranslations('wishlist');

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 130px) 24px clamp(40px, 6vw, 64px)',
          background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 60%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 16,
            }}
          >
            {t('pageOverline')}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-editorial, "Playfair Display", serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#F5F3EF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {t('pageHeadline')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(40px, 6vw, 72px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Suspense fallback={<div style={{ minHeight: 400 }} />}>
            <WishlistClient allProducts={ALL_PRODUCTS} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
