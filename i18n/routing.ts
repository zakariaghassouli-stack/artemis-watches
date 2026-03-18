import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // /en route is just /, /fr stays /fr
  localeDetection: false, // disable Accept-Language auto-redirect (prevents Vercel edge redirect loops)
});
