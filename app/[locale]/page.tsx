import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { WhyArtemis } from '@/components/home/WhyArtemis';
import { BestSellers } from '@/components/home/BestSellers';
import { Testimonials } from '@/components/home/Testimonials';
import { SignupPromo } from '@/components/home/SignupPromo';
import { FAQAccordion } from '@/components/home/FAQAccordion';
import {
  getHomepageEditProducts,
  getProductCountByBrand,
  getSiteSettings,
} from '@/lib/queries';

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'siteLayout' });

  return {
    title: t('homepageTitle'),
    description: t('homepageDescription'),
    alternates: {
      canonical: BASE,
      languages: {
        'en-CA': BASE,
        'fr-CA': `${BASE}/fr`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [homepageProducts, brandCounts, siteSettings] = await Promise.all([
    getHomepageEditProducts(),
    getProductCountByBrand(),
    getSiteSettings(),
  ]);
  const heroHeadline =
    locale === 'fr'
      ? siteSettings?.heroHeadline?.fr ?? null
      : siteSettings?.heroHeadline?.en ?? null;
  const heroSubheadline =
    locale === 'fr'
      ? siteSettings?.heroSubtext?.fr ?? null
      : siteSettings?.heroSubtext?.en ?? null;
  const welcomeDiscountPercent = siteSettings?.welcomeDiscountPercent ?? 10;

  return (
    <>
      {/* §3 Hero */}
      <Hero
        headlineOverride={heroHeadline}
        subheadlineOverride={heroSubheadline}
      />

      {/* §4 Reassurance bar */}
      <TrustBar />

      {/* §5 Featured collections */}
      <FeaturedCollections counts={brandCounts} />

      {/* §6 Why Artemis */}
      <WhyArtemis />

      {/* §7 Best sellers */}
      <BestSellers products={homepageProducts} />

      {/* §8 Testimonials + UGC */}
      <Testimonials />

      {/* §9 Signup promo */}
      <SignupPromo discountPercent={welcomeDiscountPercent} />

      {/* §10 FAQ */}
      <FAQAccordion />
    </>
  );
}
