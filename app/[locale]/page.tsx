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

export const metadata: Metadata = {
  title: 'ARTEMIS — Luxury Watch Boutique | Montreal',
  description:
    'Authentic Rolex, Cartier, Audemars Piguet & Patek Philippe timepieces. Curated, inspected and delivered from Montreal. 30-day guarantee.',
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
