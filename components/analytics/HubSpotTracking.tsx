'use client';

import Script from 'next/script';

const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID;

export function HubSpotTracking() {
  if (!HUBSPOT_ID) return null;

  return (
    <Script
      id="hubspot-tracking"
      strategy="afterInteractive"
      src={`//js.hs-scripts.com/${HUBSPOT_ID}.js`}
    />
  );
}
