'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { pixel } from '@/lib/pixel';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Tracks SPA route changes and fires PageView
function PixelRouteTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render — the init script already fires PageView on load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    pixel.pageView();
  }, [pathname]);

  return null;
}

export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      {/* Pixel base code — loads after hydration */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${PIXEL_ID}');
            fbq('track','PageView');
          `,
        }}
      />
      {/* Route change tracker — no Suspense needed (no useSearchParams) */}
      <PixelRouteTracker />
    </>
  );
}
