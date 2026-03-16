'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
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
        <h1 style={headlineStyle}>Welcome Back</h1>
        <p style={subStyle}>Sign in to access your account & exclusive offers.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Email</label>
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
            <label style={labelStyle}>Password</label>
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
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div style={dividerStyle}>
          <span style={dividerLineStyle} />
          <span style={{ fontSize: '0.68rem', color: '#6B6965', padding: '0 12px', flexShrink: 0 }}>OR</span>
          <span style={dividerLineStyle} />
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#6B6965' }}>
          No account?{' '}
          <Link
            href="/account/register"
            style={{ color: '#C9A96E', textDecoration: 'none', fontWeight: 500 }}
          >
            Create one & get 10% off →
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
