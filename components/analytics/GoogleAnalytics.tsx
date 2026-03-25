'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function GARouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined' || !window.gtag) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    window.gtag('config', GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_title: document.title,
              page_path: window.location.pathname,
              send_page_view: true
            });
            if (Array.isArray(window.__artemisPendingAnalytics) && window.__artemisPendingAnalytics.length) {
              window.__artemisPendingAnalytics.forEach(function(entry) {
                gtag('event', entry.eventName, entry.params || {});
              });
              window.__artemisPendingAnalytics = [];
            }
          `,
        }}
      />
      <Suspense fallback={null}>
        <GARouteTracker />
      </Suspense>
    </>
  );
}
