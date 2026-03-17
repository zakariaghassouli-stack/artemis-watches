'use client';

import { useState, useEffect, useCallback } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'artemis_announcement_dismissed';

export function AnnouncementBar() {
  const t = useTranslations('announcement');
  const messages = t.raw('messages') as string[];

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 180);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % messages.length);
  }, [current, messages.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + messages.length) % messages.length);
  }, [current, messages.length, goTo]);

  useEffect(() => {
    if (!visible || isPaused || messages.length <= 1) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [visible, isPaused, next, messages.length]);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  const msg = messages[current];
  const isPromo = msg.includes('10%') || msg.includes('10 %');

  return (
    <>
      <style>{`
        @keyframes ab-shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(500%) skewX(-15deg); opacity: 0; }
        }
        .ab-shimmer { animation: ab-shimmer 7s ease-in-out infinite; }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          /* Liquid glass */
          background: 'rgba(6,5,3,0.88)',
          backdropFilter: 'blur(28px) saturate(200%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%)',
          borderBottom: '1px solid rgba(201,169,110,0.22)',
          zIndex: 60,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top gold hairline */}
        <div style={{
          position: 'absolute', inset: '0 0 auto 0', height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.7) 50%, transparent 100%)',
        }} />

        {/* Moving shimmer */}
        <div className="ab-shimmer" style={{
          position: 'absolute', top: 0, bottom: 0, width: '15%',
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.06), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Main row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 46,
          padding: '0 20px',
          maxWidth: 1280,
          margin: '0 auto',
          gap: 12,
        }}>

          {/* Left nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, width: 80 }}>
            {messages.length > 1 && (
              <button
                onClick={prev}
                aria-label="Previous"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(201,169,110,0.45)', padding: '6px 8px',
                  display: 'flex', alignItems: 'center',
                  transition: 'color 0.2s',
                  borderRadius: 4,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(201,169,110,0.45)')}
              >
                <ChevronLeft size={13} />
              </button>
            )}
          </div>

          {/* Center message */}
          <div style={{
            flex: 1,
            textAlign: 'center',
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
          }}>
            {isPromo ? (
              <Link href="/account/register" style={{ textDecoration: 'none' }}>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                  textShadow: '0 0 24px rgba(201,169,110,0.35)',
                }}>
                  {msg}
                </span>
              </Link>
            ) : (
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#E2DDD7',
              }}>
                {msg}
              </span>
            )}
          </div>

          {/* Right controls */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, width: 80,
            justifyContent: 'flex-end',
          }}>
            {messages.length > 1 && (
              <>
                <button
                  onClick={next}
                  aria-label="Next"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(201,169,110,0.45)', padding: '6px 8px',
                    display: 'flex', alignItems: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(201,169,110,0.45)')}
                >
                  <ChevronRight size={13} />
                </button>

                {/* Pill dots */}
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {messages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Message ${i + 1}`}
                      style={{
                        width: i === current ? 18 : 4,
                        height: 3,
                        borderRadius: 2,
                        background: i === current ? '#C9A96E' : 'rgba(201,169,110,0.28)',
                        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                        border: 'none', padding: 0, cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Separator */}
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.07)', marginLeft: 2 }} />

            {/* Close */}
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.22)', padding: '6px 6px',
                display: 'flex', alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Bottom inner glow */}
        <div style={{
          position: 'absolute', inset: 'auto 0 0 0', height: 1,
          background: 'linear-gradient(90deg, transparent 5%, rgba(201,169,110,0.08) 50%, transparent 95%)',
        }} />
      </div>
    </>
  );
}
