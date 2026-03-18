'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { X } from 'lucide-react';

const COOKIE_KEY = 'artemis_promo_popup_dismissed';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function hasDismissCookie(): boolean {
  return document.cookie.split('; ').some((cookie) => cookie.startsWith(`${COOKIE_KEY}=`));
}

function setDismissCookie() {
  document.cookie = `${COOKIE_KEY}=1; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function PromoPopup() {
  const t = useTranslations('popup');
  const router = useRouter();
  const { data: session, status } = useSession();
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const dismiss = useCallback(() => {
    setDismissCookie();
    setEntered(false);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (status === 'loading' || session?.user) return;
    if (hasDismissCookie()) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setVisible(true);
    };

    const timer = window.setTimeout(trigger, 8000);
    const onMouseLeave = (event: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (event.clientY <= 0) trigger();
    };

    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [session?.user, status]);

  useEffect(() => {
    if (!visible) return;
    const frame = window.requestAnimationFrame(() => setEntered(true));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [dismiss, visible]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setDismissCookie();
    router.push(`/account/register${email.trim() ? `?email=${encodeURIComponent(email.trim())}` : ''}`);
  };

  if (!visible || status === 'loading' || session?.user) return null;

  return (
    <>
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6,6,6,0.62)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 9000,
          opacity: entered ? 1 : 0,
          transition: 'opacity 400ms ease',
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('headline')}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 9001,
          width: 'min(520px, calc(100vw - 24px))',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.16)',
          background: 'linear-gradient(160deg, rgba(17,17,17,0.88) 0%, rgba(10,10,10,0.82) 100%)',
          boxShadow: '0 24px 90px rgba(0,0,0,0.45)',
          overflow: 'hidden',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)',
          transition: 'opacity 400ms ease, transform 400ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at top right, rgba(201,169,110,0.18) 0%, transparent 38%)',
            pointerEvents: 'none',
          }}
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label={t('closeLabel')}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(245,243,239,0.72)',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <X size={16} />
        </button>

        <div style={{ position: 'relative', padding: '44px 32px 32px' }}>
          <p
            style={{
              fontSize: '0.64rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 16,
            }}
          >
            {t('overline')}
          </p>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: 700,
              color: '#F5F3EF',
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              marginBottom: 14,
            }}
          >
            {t('headline')}
          </h2>

          <p
            style={{
              fontSize: '0.92rem',
              lineHeight: 1.7,
              color: '#A8A5A0',
              marginBottom: 26,
            }}
          >
            {t('subheadline')}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('emailPlaceholder')}
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4,
                padding: '14px 16px',
                color: '#F5F3EF',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: '#C9A96E',
                color: '#0A0A0A',
                border: 'none',
                borderRadius: 4,
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? t('loading') : t('cta')}
            </button>
          </form>

          <button
            type="button"
            onClick={dismiss}
            style={{
              display: 'block',
              margin: '14px auto 0',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.36)',
              fontSize: '0.74rem',
              cursor: 'pointer',
            }}
          >
            {t('dismissText')}
          </button>
        </div>
      </div>
    </>
  );
}
