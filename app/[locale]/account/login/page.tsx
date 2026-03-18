'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('auth.login');
  const searchParams = useSearchParams();

  const [email, setEmail] = useState(() => searchParams.get('email') ?? '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(t('errorInvalid'));
      setLoading(false);
    } else {
      router.push('/account');
      router.refresh();
    }
  };

  return (
    <div style={pageStyle}>
      {/* Background glow */}
      <div aria-hidden style={glowStyle} />

      <div style={cardStyle}>
        {/* Logo */}
        <p style={logoStyle}>ARTEMIS</p>
        <h1 style={headlineStyle}>{t('headline')}</h1>
        <p style={subStyle}>{t('sub')}</p>

        <div style={benefitsStyle}>
          {[t('benefit1'), t('benefit2'), t('benefit3')].map((item) => (
            <div key={item} style={benefitRowStyle}>
              <span aria-hidden style={benefitDotStyle} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
              placeholder="••••••••"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" disabled={loading} style={btnPrimaryStyle}>
            {loading ? t('signingIn') : t('signIn')}
          </button>

          <p style={noteStyle}>{t('note')}</p>
        </form>

        <div style={dividerStyle}>
          <span style={dividerLineStyle} />
          <span style={{ fontSize: '0.68rem', color: '#6B6965', padding: '0 12px', flexShrink: 0 }}>{t('orDivider')}</span>
          <span style={dividerLineStyle} />
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#6B6965' }}>
          {t('noAccount')}{' '}
          <Link
            href="/account/register"
            style={{ color: '#C9A96E', textDecoration: 'none', fontWeight: 500 }}
          >
            {t('createOne')}
          </Link>
        </p>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────

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
  marginBottom: 0,
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

const benefitsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '16px 18px',
  border: '1px solid rgba(255,255,255,0.07)',
  background: 'rgba(255,255,255,0.02)',
  borderRadius: 4,
};

const benefitRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: '0.76rem',
  color: '#A8A5A0',
  lineHeight: 1.6,
};

const benefitDotStyle: React.CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: '#C9A96E',
  flexShrink: 0,
};

const noteStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#6B6965',
  textAlign: 'center',
  lineHeight: 1.6,
  margin: 0,
};
