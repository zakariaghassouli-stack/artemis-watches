'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'artemis_announcement_dismissed';

export function AnnouncementBar() {
  const t = useTranslations('announcement');
  const messages = t.raw('messages') as string[];

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % messages.length);
  }, [messages.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + messages.length) % messages.length);
  }, [messages.length]);

  useEffect(() => {
    if (!visible || isPaused || messages.length <= 1) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [visible, isPaused, next, messages.length]);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  const msg = messages[current];
  const isPromoMsg = msg.includes('10%') || msg.includes('10 %');

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #0A0A0A 0%, #1A1208 50%, #0A0A0A 100%)',
        borderBottom: '1px solid rgba(201,169,110,0.15)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gold shimmer line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          opacity: 0.5,
        }}
      />

      <div className="flex items-center justify-between px-4 py-2.5 max-w-screen-xl mx-auto">
        {/* Prev */}
        {messages.length > 1 && (
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="shrink-0 p-1 opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: '#C9A96E' }}
          >
            <ChevronLeft size={14} />
          </button>
        )}

        {/* Message */}
        <div className="flex-1 text-center">
          {isPromoMsg ? (
            <Link
              href="/signup"
              className="text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
              style={{ color: '#C9A96E', letterSpacing: '0.1em' }}
            >
              {msg}
            </Link>
          ) : (
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: '#A8A5A0', letterSpacing: '0.08em' }}
            >
              {msg}
            </p>
          )}
        </div>

        {/* Next + Close */}
        <div className="flex items-center gap-1 shrink-0">
          {messages.length > 1 && (
            <>
              <button
                onClick={next}
                aria-label="Next announcement"
                className="p-1 opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: '#C9A96E' }}
              >
                <ChevronRight size={14} />
              </button>
              {/* Dots */}
              <div className="flex gap-1 mx-2">
                {messages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to announcement ${i + 1}`}
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: i === current ? '#C9A96E' : '#6B6965',
                      transition: 'background 0.3s',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </>
          )}
          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="p-1 opacity-40 hover:opacity-80 transition-opacity ml-1"
            style={{ color: '#A8A5A0' }}
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
