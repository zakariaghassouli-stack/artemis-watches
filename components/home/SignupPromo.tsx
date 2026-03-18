'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export function SignupPromo() {
  const t = useTranslations('home.signup');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const benefits = t.raw('benefits') as string[];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    router.push(`/account/register?email=${encodeURIComponent(email.trim())}`);
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
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '60%',
          height: '140%',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 60%)',
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
              marginBottom: 32,
            }}
          >
            {t('subheadline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <form
            onSubmit={handleSubmit}
            className="signup-form"
            style={{
              display: 'flex',
              gap: 0,
              marginBottom: 14,
              maxWidth: 520,
              marginInline: 'auto',
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
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
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
                whiteSpace: 'nowrap',
              }}
            >
              {loading ? '...' : t('cta')}
            </button>
          </form>

          <style>{`
            @media (max-width: 640px) {
              .signup-form {
                flex-direction: column;
                gap: 10px;
              }
              .signup-form input,
              .signup-form button {
                width: 100%;
                border-radius: 2px !important;
                border-right: 1px solid rgba(255,255,255,0.1) !important;
              }
            }
          `}</style>
        </ScrollReveal>

        <ScrollReveal delay={260}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 18,
            }}
          >
            {benefits.map((benefit) => (
              <span
                key={benefit}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 999,
                  fontSize: '0.66rem',
                  color: '#A8A5A0',
                  letterSpacing: '0.04em',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#C9A96E',
                    flexShrink: 0,
                  }}
                />
                {benefit}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={280}>
          <p
            style={{
              fontSize: '0.74rem',
              color: '#A8A5A0',
              lineHeight: 1.7,
              marginBottom: 8,
            }}
          >
            {t('microcopy')}
          </p>
          <p
            style={{
              fontSize: '0.72rem',
              color: '#A8A5A0',
              lineHeight: 1.7,
              marginBottom: 8,
            }}
          >
            {t('accountHint')}{' '}
            <Link
              href="/account/login"
              style={{
                color: '#C9A96E',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,169,110,0.24)',
              }}
            >
              {t('accountCta')}
            </Link>
          </p>
          <p
            style={{
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.34)',
              lineHeight: 1.7,
            }}
          >
            {t('trust')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
