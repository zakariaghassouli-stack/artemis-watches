'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const STORAGE_KEY = 'artemis_cookie_consent';
type ConsentValue = 'all' | 'essential';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('cookies');
  const locale = useLocale();
  const privacyHref = locale === 'fr' ? '/fr/privacy' : '/privacy';

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) setVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const accept = (value: ConsentValue) => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent('artemis:cookie-consent'));
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t('ariaLabel')}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'rgba(10, 10, 10, 0.97)',
        borderTop: '1px solid rgba(201, 169, 110, 0.18)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '18px 24px',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        {/* Text */}
        <p
          style={{
            flex: 1,
            minWidth: 240,
            fontSize: 13,
            lineHeight: 1.65,
            color: 'rgba(245,243,239,0.52)',
            margin: 0,
          }}
        >
          {t('message')}{' '}
          <a
            href={privacyHref}
            style={{
              color: '#C9A96E',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            {t('learnMore')}
          </a>
          .
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
          <button
            onClick={() => accept('essential')}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 1,
              color: 'rgba(255,255,255,0.42)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.07em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                'rgba(255,255,255,0.28)';
              (e.currentTarget as HTMLButtonElement).style.color =
                'rgba(255,255,255,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLButtonElement).style.color =
                'rgba(255,255,255,0.42)';
            }}
          >
            {t('essentialOnly')}
          </button>

          <button
            onClick={() => accept('all')}
            style={{
              padding: '8px 18px',
              background: '#C9A96E',
              border: '1px solid #C9A96E',
              borderRadius: 1,
              color: '#0A0A0A',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.07em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#B8924A';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E';
            }}
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
