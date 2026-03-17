'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

const STORAGE_KEY = 'artemis_promo_popup_dismissed';

export function PromoPopup() {
  const t = useTranslations('popup');
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const dismiss = useCallback(() => {
    setVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setVisible(true);
    };

    const timer = setTimeout(trigger, 8000);
    const onMouseLeave = (e: MouseEvent) => { if (e.clientY <= 0) trigger(); };
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, dismiss]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const tempPassword =
        Math.random().toString(36).slice(-10) +
        Math.random().toString(36).slice(-2).toUpperCase() +
        '!';
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: tempPassword }),
      });
      const data = await res.json();
      setPromoCode(data.promoCode ?? '');
    } catch {}
    setSubmitted(true);
    setLoading(false);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
  };

  if (!visible) return null;

  return (
    <>
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 9000,
          animation: 'fadeIn 0.35s ease',
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('overline')}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9001,
          width: 'min(520px, 92vw)',
          background: '#111111',
          border: '1px solid rgba(201,169,110,0.2)',
          borderRadius: 4,
          overflow: 'hidden',
          animation: 'popupIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes popupIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.92); }
            to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        `}</style>

        <div style={{ height: 3, background: 'linear-gradient(90deg, #C9A96E 0%, #B8924A 100%)' }} />

        <button
          onClick={dismiss}
          aria-label={t('closeLabel')}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.3)', padding: 4, lineHeight: 0, transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F3EF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
        >
          <X size={18} />
        </button>

        <div style={{ padding: '40px 40px 36px' }}>
          {!submitted ? (
            <>
              <p style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16,
              }}>
                {t('overline')}
              </p>

              <h2 style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700,
                color: '#F5F3EF', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12,
              }}>
                {t('headline')}<br />
                <span style={{ color: '#C9A96E' }}>{t('headlineAccent')}</span>
              </h2>

              <p style={{ fontSize: '0.85rem', color: '#6B6965', lineHeight: 1.6, marginBottom: 28 }}>
                {t('body')}
              </p>

              <div style={{
                height: 1,
                background: 'linear-gradient(90deg, rgba(201,169,110,0.2) 0%, transparent 100%)',
                marginBottom: 24,
              }} />

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3, padding: '14px 16px',
                    fontSize: '0.88rem', color: '#F5F3EF',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? 'rgba(201,169,110,0.5)' : 'linear-gradient(135deg, #C9A96E 0%, #B8924A 100%)',
                    border: 'none', borderRadius: 0,
                    padding: '14px 24px',
                    fontSize: '0.72rem', fontWeight: 700,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#0A0A0A', cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {loading ? t('loading') : t('cta')}
                </button>
              </form>

              <p style={{
                fontSize: '0.62rem', color: 'rgba(255,255,255,0.18)',
                textAlign: 'center', marginTop: 14, lineHeight: 1.5,
              }}>
                {t('microcopy')}
              </p>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(201,169,110,0.1)',
                border: '1px solid rgba(201,169,110,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', fontSize: '1.4rem',
              }}>
                ✓
              </div>

              <p style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12,
              }}>
                {t('successOverline')}
              </p>

              <h2 style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700,
                color: '#F5F3EF', letterSpacing: '-0.02em', marginBottom: 16,
              }}>
                {t('successHeadline')}
              </h2>

              {promoCode && (
                <div style={{
                  background: 'rgba(201,169,110,0.08)',
                  border: '1px solid rgba(201,169,110,0.25)',
                  borderRadius: 3, padding: '16px 24px', marginBottom: 20,
                }}>
                  <p style={{ fontSize: '0.6rem', color: '#A8A5A0', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {t('successCodeLabel')}
                  </p>
                  <p style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.1em', color: '#C9A96E', fontFamily: 'monospace' }}>
                    {promoCode}
                  </p>
                </div>
              )}

              <p style={{ fontSize: '0.8rem', color: '#6B6965', lineHeight: 1.6, marginBottom: 24 }}>
                {t('successBody')}
              </p>

              <button
                onClick={dismiss}
                style={{
                  background: 'linear-gradient(135deg, #C9A96E 0%, #B8924A 100%)',
                  border: 'none', borderRadius: 0,
                  padding: '12px 32px',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#0A0A0A', cursor: 'pointer',
                }}
              >
                {t('successCta')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
