'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { track } from '@vercel/analytics';
import { Info } from 'lucide-react';

const STORAGE_KEY = 'artemis_cookie_consent';
const REOPEN_EVENT = 'artemis:cookie-banner-reopen';
type ConsentValue = 'all' | 'essential';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('cookies');
  const locale = useLocale();
  const privacyHref = locale === 'en' ? '/en/privacy' : '/privacy';

  useEffect(() => {
    const showIfNoConsent = () => {
      try {
        const consent = localStorage.getItem(STORAGE_KEY);
        if (!consent) setVisible(true);
      } catch {
        setVisible(true);
      }
    };

    const reopen = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new CustomEvent('artemis:cookie-consent'));
      } catch {}
      setVisible(true);
    };

    const frame = window.requestAnimationFrame(showIfNoConsent);
    window.addEventListener(REOPEN_EVENT, reopen);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(REOPEN_EVENT, reopen);
    };
  }, []);

  const accept = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    track('cookie_consent', { choice: value });
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
        padding: '10px 20px',
        transition:
          'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <style>{`
        .cookie-banner-row {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: nowrap;
        }
        .cookie-banner-message {
          flex: 1;
          min-width: 0;
          font-size: 12px;
          line-height: 1.4;
          color: rgba(245,243,239,0.6);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cookie-banner-info-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 1px solid rgba(201,169,110,0.3);
          background: rgba(201,169,110,0.12);
          color: #C9A96E;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .cookie-banner-info-icon:hover {
          border-color: rgba(201,169,110,0.55);
          background: rgba(201,169,110,0.2);
        }
        @media (min-width: 769px) {
          .cookie-banner-info-icon { display: none; }
        }
        @media (max-width: 768px) {
          .cookie-banner-row { flex-wrap: wrap; gap: 8px; }
          .cookie-banner-learn-more { display: none; }
        }
      `}</style>
      <div className="cookie-banner-row">
        <a
          className="cookie-banner-info-icon"
          href={privacyHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('learnMoreIcon')}
        >
          <Info size={12} aria-hidden="true" />
        </a>
        <p className="cookie-banner-message">
          {t('message')}{' '}
          <a
            className="cookie-banner-learn-more"
            href={privacyHref}
            style={{
              color: '#C9A96E',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            {t('learnMore')}
          </a>
        </p>

        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => accept('essential')}
            style={{
              padding: '6px 12px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 1,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.07em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                'rgba(255,255,255,0.28)';
              (e.currentTarget as HTMLButtonElement).style.color =
                'rgba(255,255,255,0.78)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLButtonElement).style.color =
                'rgba(255,255,255,0.5)';
            }}
          >
            {t('essentialOnly')}
          </button>

          <button
            onClick={() => accept('all')}
            style={{
              padding: '6px 14px',
              background: '#C9A96E',
              border: '1px solid #C9A96E',
              borderRadius: 1,
              color: '#0A0A0A',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.07em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#B8924A';
            }}
            onMouseLeave={(e) => {
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
