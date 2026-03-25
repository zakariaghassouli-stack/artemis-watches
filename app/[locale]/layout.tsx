import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getSiteSettings } from '@/lib/queries';
import { routing } from '@/i18n/routing';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppFAB } from '@/components/shared/WhatsAppFAB';
import { CookieBanner } from '@/components/shared/CookieBanner';
import { PromoPopup } from '@/components/shared/PromoPopup';
import { ConsentAwareAnalytics } from '@/components/analytics/ConsentAwareAnalytics';
import { CartAbandonment } from '@/components/analytics/CartAbandonment';
import { SessionEmailSync } from '@/components/analytics/SessionEmailSync';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { CurrencyProvider } from '@/components/providers/CurrencyProvider';
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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'siteLayout' });

  return {
    title: {
      default: t('titleDefault'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: t('keywords').split(', '),
    metadataBase: new URL(APP_URL),
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      siteName: 'ARTEMIS Watches',
      url: APP_URL,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@artemis_watches',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

type Locale = (typeof routing.locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// ─── Global JSON-LD schemas ─────────────────────────────────────
// Organization + LocalBusiness: signals Montréal presence to Google
// WebSite + SearchAction: enables Google Sitelinks search box
function GlobalJsonLd({ locale }: { locale: string }) {
  const url = process.env.NEXT_PUBLIC_APP_URL ?? 'https://artemis-watches.com';
  const isFr = locale === 'fr';

  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    '@id': `${url}/#organization`,
    name: 'ARTEMIS Montres',
    alternateName: 'Artemis Watches',
    url,
    logo: {
      '@type': 'ImageObject',
      url: `${url}/logo.png`,
    },
    description: isFr
      ? 'Montres de luxe authentiques — Rolex, Cartier, Audemars Piguet & Patek Philippe. Sélectionnées, inspectées et livrées depuis Montréal.'
      : 'Authentic luxury timepieces — Rolex, Cartier, Audemars Piguet & Patek Philippe. Curated, inspected and delivered from Montréal.',
    telephone: '+15145609765',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montréal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' },
    ],
    sameAs: [
      'https://www.instagram.com/artemis_watches',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+15145609765',
      contactType: 'customer service',
      availableLanguage: ['English', 'French'],
      contactOption: 'TollFree',
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    name: 'ARTEMIS Watches',
    url,
    publisher: { '@id': `${url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const [messages, siteSettings] = await Promise.all([
    getMessages(),
    getSiteSettings(),
  ]);
  const announcementText =
    locale === 'fr'
      ? siteSettings?.announcementBar?.fr ?? null
      : siteSettings?.announcementBar?.en ?? null;
  const announcementEnabled = siteSettings?.announcementBar?.enabled ?? true;
  const welcomeDiscountPercent = siteSettings?.welcomeDiscountPercent ?? 10;

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <GlobalJsonLd locale={locale} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
          <CurrencyProvider initial="CAD">
          <SiteHeader
            announcementEnabled={announcementEnabled}
            announcementText={announcementText}
          />
          <main>{children}</main>
          <Footer />
          <CartDrawer
            boxAndPapersPrice={siteSettings?.boxAndPapersPrice ?? 49}
            welcomeDiscountPercent={welcomeDiscountPercent}
          />
          <WhatsAppFAB />
          <CookieBanner />
          <PromoPopup discountPercent={welcomeDiscountPercent} />
          <SessionEmailSync />
          <CartAbandonment />
          <ConsentAwareAnalytics />
          </CurrencyProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
