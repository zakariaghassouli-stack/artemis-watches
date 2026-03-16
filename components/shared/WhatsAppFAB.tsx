'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const WA_NUMBER = '15145609765';
const COOKIE_KEY = 'artemis_cookie_consent';

export function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(88);
  const locale = useLocale();
  const t = useTranslations('whatsapp');

  useEffect(() => {
    // Entrance delay
    const timer = setTimeout(() => setVisible(true), 1500);

    // Adjust position if cookie consent already given
    const consent = localStorage.getItem(COOKIE_KEY);
    if (consent) setBottomOffset(24);

    // Listen for consent event (dispatched by CookieBanner)
    const handler = () => setBottomOffset(24);
    window.addEventListener('artemis:cookie-consent', handler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('artemis:cookie-consent', handler);
    };
  }, []);

  const message = encodeURIComponent(t('fabMessage'));
  const href = `https://wa.me/${WA_NUMBER}?text=${message}`;

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.40); }
          50%       { box-shadow: 0 4px 28px rgba(37,211,102,0.65), 0 0 0 8px rgba(37,211,102,0.08); }
        }
        .wa-fab-pulse { animation: wa-pulse 2.8s ease-in-out infinite; }
        .wa-fab-pulse:hover { animation: none; box-shadow: 0 6px 32px rgba(37,211,102,0.55); }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('fabTooltip')}
        className="wa-fab-pulse"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'fixed',
          bottom: bottomOffset,
          right: 24,
          zIndex: 45,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#25D366',
          borderRadius: 50,
          padding: hovered ? '12px 20px 12px 14px' : '14px',
          textDecoration: 'none',
          transition:
            'padding 0.35s cubic-bezier(0.34,1.56,0.64,1), bottom 0.45s ease, opacity 0.45s ease, transform 0.45s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {/* WhatsApp icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="white"
          style={{ flexShrink: 0, display: 'block' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Expandable label */}
        <span
          style={{
            color: 'white',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.03em',
            whiteSpace: 'nowrap',
            maxWidth: hovered ? 150 : 0,
            opacity: hovered ? 1 : 0,
            overflow: 'hidden',
            transition:
              'max-width 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
          }}
        >
          {t('fabTooltip')}
        </span>
      </a>
    </>
  );
}
