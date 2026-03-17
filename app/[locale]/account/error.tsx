'use client';

import { useEffect } from 'react';

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[account/error]', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: '100%',
          padding: '40px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,107,107,0.2)',
          borderRadius: 4,
        }}
      >
        <p
          style={{
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FF6B6B',
            marginBottom: 12,
          }}
        >
          Account Error
        </p>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#F5F3EF',
            marginBottom: 16,
          }}
        >
          Something went wrong loading your account.
        </p>

        {/* Show real error in dev or with digest */}
        <pre
          style={{
            fontSize: '0.7rem',
            color: '#A8A5A0',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 3,
            padding: '12px 16px',
            overflow: 'auto',
            marginBottom: 24,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {error.message || 'Unknown error'}
          {error.digest ? `\n\nDigest: ${error.digest}` : ''}
        </pre>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={reset}
            style={{
              padding: '10px 20px',
              background: 'rgba(201,169,110,0.1)',
              border: '1px solid rgba(201,169,110,0.3)',
              borderRadius: 3,
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          <a
            href="/account/login"
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 3,
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6B6965',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}
