import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { WhyArtemis } from '@/components/home/WhyArtemis';
import { RangeComparison } from '@/components/home/RangeComparison';
import { BestSellers } from '@/components/home/BestSellers';
import { Testimonials } from '@/components/home/Testimonials';
import { SignupPromo } from '@/components/home/SignupPromo';
import { FAQAccordion } from '@/components/home/FAQAccordion';

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';

export const metadata: Metadata = {
  title: 'ARTEMIS — Luxury Watch Boutique | Montreal',
  description:
    'Rolex, Cartier, Audemars Piguet & Patek Philippe inspired timepieces. Curated, inspected and delivered from Montreal. 30-day quality guarantee.',
  alternates: {
    canonical: BASE,
    languages: {
      'en-CA': BASE,
      'fr-CA': `${BASE}/fr`,
    },
  },
};

export default function HomePage() {
  return (
    <>
      {/* §3 Hero */}
      <Hero />

      {/* §4 Reassurance bar */}
      <TrustBar />

      {/* §5 Featured collections */}
      <FeaturedCollections />

      {/* §6 Why Artemis */}
      <WhyArtemis />

      {/* §7 Choose your range */}
      <RangeComparison />

      {/* §8 Best sellers */}
      <BestSellers />

      {/* §9 Testimonials + UGC */}
      <Testimonials />

      {/* §10 Signup promo */}
      <SignupPromo />

      {/* §11 FAQ */}
      <FAQAccordion />
    </>
  );
}
