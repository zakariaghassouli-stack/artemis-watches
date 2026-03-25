'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError(t('error'));
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push(`/account/reset-password?email=${encodeURIComponent(email)}`);
      }, 1200);
    } catch {
      setError(t('error'));
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div aria-hidden style={glowStyle} />
      <div style={cardStyle}>
        <p style={logoStyle}>ARTEMIS</p>
        <h1 style={headlineStyle}>{t('headline')}</h1>
        <p style={subStyle}>{t('sub')}</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('emailLabel')}</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="your@email.com"
              style={inputStyle}
            />
          </div>

          {error ? <p style={errorStyle}>{error}</p> : null}
          {success ? <p style={successStyle}>{t('success')}</p> : null}

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? t('submitting') : t('submit')}
          </button>
        </form>

        <p style={footerLinkStyle}>
          <Link href="/account/login" style={linkStyle}>
            {t('backToLogin')}
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
};

const buttonStyle: React.CSSProperties = {
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

const successStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#A8D5A2',
  textAlign: 'center',
  padding: '10px 14px',
  background: 'rgba(108,176,99,0.08)',
  border: '1px solid rgba(108,176,99,0.2)',
  borderRadius: 3,
};

const footerLinkStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '0.78rem',
  color: '#6B6965',
  margin: 0,
};

const linkStyle: React.CSSProperties = {
  color: '#C9A96E',
  textDecoration: 'none',
  fontWeight: 500,
};
