'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export function SignupPromo() {
  const t = useTranslations('home.signup');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [promoCode, setPromoCode] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    try {
      // Generate a random password for quick signup (user can set one in account)
      const tempPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-2).toUpperCase() + '!';

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: tempPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If already registered, still show success (don't reveal registration status)
        setPromoCode('');
      } else {
        setPromoCode(data.promoCode ?? '');
      }

      setSubmitted(true);
    } catch {
      setSubmitted(true); // Optimistic — don't block UX on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #0E0C08 0%, #111007 50%, #0A0A0A 100%)',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '60%',
          height: '140%',
          background:
            'radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <ScrollReveal delay={0}>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 20,
            }}
          >
            {t('overline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#F5F3EF',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {t('headline')}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p
            style={{
              fontSize: '1rem',
              color: '#A8A5A0',
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            {t('subheadline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          {submitted ? (
            <div
              style={{
                padding: '24px 32px',
                background: 'rgba(201,169,110,0.08)',
                border: '1px solid rgba(201,169,110,0.25)',
                borderRadius: 4,
                marginBottom: 24,
              }}
            >
              <p style={{ fontSize: '0.95rem', color: '#C9A96E', fontWeight: 500 }}>
                ✓ {t('success')}
              </p>
              {promoCode && (
                <p
                  style={{
                    marginTop: 12,
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#F5F3EF',
                  }}
                >
                  {promoCode}
                </p>
              )}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: 0,
                marginBottom: 16,
                maxWidth: 480,
                margin: '0 auto 16px',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                required
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRight: 'none',
                  color: '#F5F3EF',
                  fontSize: '0.875rem',
                  padding: '14px 18px',
                  outline: 'none',
                  borderRadius: '2px 0 0 2px',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')
                }
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#C9A96E',
                  color: '#0A0A0A',
                  border: 'none',
                  padding: '14px 24px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'wait' : 'pointer',
                  borderRadius: '0 2px 2px 0',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLElement).style.background = '#D4B882';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#C9A96E';
                }}
              >
                {loading ? '...' : t('cta')}
              </button>
            </form>
          )}

          <p
            style={{
              fontSize: '0.72rem',
              color: '#6B6965',
              marginBottom: 12,
            }}
          >
            {t('microcopy')}
          </p>

          {/* Trust line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {/* Mini stars */}
            <div style={{ display: 'flex', gap: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#C9A96E" aria-hidden>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p
              style={{
                fontSize: '0.72rem',
                color: '#6B6965',
              }}
            >
              {t('trust')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
