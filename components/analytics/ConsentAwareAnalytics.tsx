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

  if (!enabled) return null;

  return (
    <>
      <GoogleAnalytics />
      <HubSpotTracking />
      <MetaPixel />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
