'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export function SignOutButton() {
  const t = useTranslations('auth.account');

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      style={{
        background: 'none',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        padding: '10px 20px',
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#6B6965',
        cursor: 'pointer',
        transition: 'color 0.2s, border-color 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = '#F5F3EF';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = '#6B6965';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      {t('signOut')}
    </button>
  );
}
