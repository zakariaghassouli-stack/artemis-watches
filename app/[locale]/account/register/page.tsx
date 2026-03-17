'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations('auth.register');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? t('errorRegistration'));
        setLoading(false);
        return;
      }

      // Store promo code for the success screen
      setPromoCode(data.promoCode ?? '');

      // Auto sign-in after registration
      await signIn('credentials', { email, password, redirect: false });
      router.push('/account');
      router.refresh();
    } catch {
      setError(t('errorGeneric'));
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div aria-hidden style={glowStyle} />

      <div style={cardStyle}>
        <p style={logoStyle}>ARTEMIS</p>
        <h1 style={headlineStyle}>{t('headline')}</h1>
        <p style={subStyle}>
          {t('subPre')}{' '}
          <span style={{ color: '#C9A96E', fontWeight: 500 }}>{t('subHighlight')}</span>{' '}
          {t('subPost')}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('firstNameLabel')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jean-Pierre"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>
          <div>
            <label style={labelStyle}>{t('emailLabel')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>
          <div>
            <label style={labelStyle}>{t('passwordLabel')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder={t('passwordPlaceholder')}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          {promoCode && (
            <div style={promoSuccessStyle}>
              <p style={{ fontSize: '0.72rem', color: '#A8A5A0', marginBottom: 6 }}>{t('promoYourCode')}</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#C9A96E' }}>
                {promoCode}
              </p>
              <p style={{ fontSize: '0.65rem', color: '#6B6965', marginTop: 4 }}>
                {t('promoApplies')}
              </p>
            </div>
          )}

          <button type="submit" disabled={loading} style={btnPrimaryStyle}>
            {loading ? t('creatingAccount') : t('createAndGet')}
          </button>
        </form>

        <div style={dividerStyle}>
          <span style={dividerLineStyle} />
          <span style={{ fontSize: '0.68rem', color: '#6B6965', padding: '0 12px', flexShrink: 0 }}>{t('orDivider')}</span>
          <span style={dividerLineStyle} />
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#6B6965' }}>
          {t('haveAccount')}{' '}
          <Link href="/account/login" style={{ color: '#C9A96E', textDecoration: 'none', fontWeight: 500 }}>
            {t('signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#0A0A0A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 24px',
  position: 'relative',
};

const glowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  background: 'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 65%)',
  pointerEvents: 'none',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 420,
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 4,
  padding: '48px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  position: 'relative',
};

const logoStyle: React.CSSProperties = {
  fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
  fontSize: '1.1rem',
  fontWeight: 700,
  letterSpacing: '0.22em',
  color: '#C9A96E',
  textAlign: 'center',
};

const headlineStyle: React.CSSProperties = {
  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: '#F5F3EF',
  textAlign: 'center',
  margin: 0,
};

const subStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  color: '#6B6965',
  textAlign: 'center',
  lineHeight: 1.6,
  margin: 0,
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.68rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#A8A5A0',
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 3,
  padding: '12px 14px',
  fontSize: '0.875rem',
  color: '#F5F3EF',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const btnPrimaryStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  background: '#C9A96E',
  color: '#0A0A0A',
  border: 'none',
  borderRadius: 3,
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'background 0.2s',
  marginTop: 4,
};

const errorStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#FF6B6B',
  textAlign: 'center',
  padding: '10px 14px',
  background: 'rgba(255,107,107,0.08)',
  border: '1px solid rgba(255,107,107,0.2)',
  borderRadius: 3,
};

const promoSuccessStyle: React.CSSProperties = {
  padding: '16px 20px',
  background: 'rgba(201,169,110,0.07)',
  border: '1px solid rgba(201,169,110,0.25)',
  borderRadius: 3,
  textAlign: 'center',
};

const dividerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  margin: '4px 0',
};

const dividerLineStyle: React.CSSProperties = {
  flex: 1,
  height: 1,
  background: 'rgba(255,255,255,0.07)',
};
