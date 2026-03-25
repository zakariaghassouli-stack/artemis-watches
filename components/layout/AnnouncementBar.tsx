'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';

const STORAGE_KEY = 'artemis_bar_dismissed';

interface AnnouncementBarProps {
  enabled?: boolean;
  messageOverride?: string | null;
}

function normalizeMessage(message: string) {
  return message.split('—')[0]?.trim() ?? message.trim();
}

export function AnnouncementBar({
  enabled = true,
  messageOverride,
}: AnnouncementBarProps) {
  const t = useTranslations('announcement');
  const { data: session, status } = useSession();
  const [visible, setVisible] = useState(false);
  const message = normalizeMessage(messageOverride?.trim() || t('message'));

  useEffect(() => {
    if (!enabled || status === 'loading' || session?.user) {
      return;
    }

    let frame = 0;
    frame = window.requestAnimationFrame(() => {
      try {
        setVisible(!sessionStorage.getItem(STORAGE_KEY));
      } catch {
        setVisible(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [enabled, session?.user, status]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setVisible(false);
  };

  if (!enabled || !visible || status === 'loading' || session?.user) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 36,
        padding: '0 12px',
        background: '#0A0A0A',
        borderBottom: '1px solid rgba(201,169,110,0.16)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1280,
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <p
          style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: '#C9A96E',
            textAlign: 'center',
            margin: 0,
          }}
        >
          {message}
        </p>

        <Link
          href="/collections"
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#C9A96E',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {t('cta')}
        </Link>

        <button
          type="button"
          onClick={dismiss}
          aria-label={t('closeLabel')}
          style={{
            width: 28,
            height: 28,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            color: 'rgba(201,169,110,0.72)',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
