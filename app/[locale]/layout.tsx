import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppFAB } from '@/components/shared/WhatsAppFAB';
import { CookieBanner } from '@/components/shared/CookieBanner';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ARTEMIS — Luxury Watch Boutique | Montréal',
    template: '%s | ARTEMIS Watches',
  },
  description:
    'Authentic luxury timepieces from Rolex, Cartier, Audemars Piguet & Patek Philippe. Based in Montréal. Fast shipping across Canada.',
  keywords: ['luxury watches', 'Rolex Montreal', 'Cartier watches', 'pre-owned watches', 'ARTEMIS'],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'ARTEMIS Watches',
  },
  robots: { index: true, follow: true },
};

type Locale = (typeof routing.locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFAB />
          <CookieBanner />
          <MetaPixel />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
