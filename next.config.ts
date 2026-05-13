import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Pivot V2: the standalone /faq page is retired. The 5 home FAQ
  // questions and the 8 PDP FAQ questions cover the same ground. Send
  // legacy traffic — internal links updated to /#faq, but external links
  // and stored bookmarks still hit /faq — to the home anchor with a 301.
  async redirects() {
    return [
      {
        source: '/faq',
        destination: '/#faq',
        permanent: true,
      },
      {
        source: '/en/faq',
        destination: '/en#faq',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
