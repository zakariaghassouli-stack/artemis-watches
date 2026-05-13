'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { HubSpotTracking } from '@/components/analytics/HubSpotTracking';
import { MetaPixel } from '@/components/analytics/MetaPixel';

const CONSENT_KEY = 'artemis_cookie_consent';

function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'all';
  } catch {
    return false;
  }
}

export function ConsentAwareAnalytics() {
  const [enabled, setEnabled] = useState(() =>
    typeof window !== 'undefined' ? hasAnalyticsConsent() : false
  );

  useEffect(() => {
    const syncConsent = () => setEnabled(hasAnalyticsConsent());
    window.addEventListener('artemis:cookie-consent', syncConsent);
    window.addEventListener('storage', syncConsent);

    return () => {
      window.removeEventListener('artemis:cookie-consent', syncConsent);
      window.removeEventListener('storage', syncConsent);
    };
  }, []);

  return (
    <>
      {/*
        Always-on, cookieless trackers (Loi 25 / RGPD compatible without
        explicit consent per Vercel privacy policy: no PII, no fingerprinting,
        no third-party cookies). Sprint V3 Phase 3 moved these out of the
        consent gate so the conversion baseline collects ~100% of sessions
        instead of the ~30-50% opt-in floor.
      */}
      <Analytics />
      <SpeedInsights />

      {/*
        PII trackers gated behind explicit opt-in (consent === 'all').
        Cookies, fingerprinting, cross-site remarketing. Stay opt-in.
      */}
      {enabled && (
        <>
          <GoogleAnalytics />
          <HubSpotTracking />
          <MetaPixel />
        </>
      )}
    </>
  );
}
