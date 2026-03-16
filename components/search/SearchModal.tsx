'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, X, ArrowRight, Command } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchStore } from '@/store/search';
import { ALL_PRODUCTS, formatPrice } from '@/lib/products';
import type { Product } from '@/types/product';

// ─── Search logic (lightweight — top 6 matches) ───────────────

function quickSearch(query: string): Product[] {
  if (!query.trim()) return [];
  const terms = query.toLowerCase().trim().split(/\s+/);
  return ALL_PRODUCTS.filter((p) => {
    const haystack = [
      p.name, p.variant, p.brand, p.collection,
      p.specs.dialColor ?? '', p.specs.bracelet ?? '',
      p.range, p.badge ?? '',
    ].join(' ').toLowerCase();
    return terms.every((t) => haystack.includes(t));
  }).slice(0, 6);
}

// ─── Result row ───────────────────────────────────────────────

function ResultRow({
  product,
  isActive,
  onMouseEnter,
  onClick,
}: {
  product: Product;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) {
  const href = `/collections/${product.brandSlug}/${product.collectionSlug}/${product.slug}`;

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 24px',
        textDecoration: 'none',
        background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
        borderLeft: isActive ? '2px solid #C9A96E' : '2px solid transparent',
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      {/* Watch icon placeholder */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {product.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1.2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#C9A96E',
            }}
          >
            {product.brand}
          </span>
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#F5F3EF',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.name}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#6B6965', whiteSpace: 'nowrap' }}>
            — {product.variant}
          </span>
        </div>
        <p style={{ fontSize: '0.7rem', color: '#6B6965', marginTop: 2 }}>
          {product.collection} · {product.range === 'premium' ? 'Premium' : 'Essential'}
        </p>
      </div>

      {/* Price + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F5F3EF' }}>
          {formatPrice(product.price)}
          <span style={{ fontSize: '0.6rem', color: '#6B6965', marginLeft: 3 }}>CAD</span>
        </span>
        <ArrowRight
          size={14}
          style={{
            color: isActive ? '#C9A96E' : 'rgba(255,255,255,0.2)',
            transition: 'color 0.15s',
          }}
        />
      </div>
    </Link>
  );
}

// ─── Modal ────────────────────────────────────────────────────

export function SearchModal() {
  const t = useTranslations('search');
  const { isOpen, closeSearch } = useSearchStore();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = quickSearch(query);
  const totalCount = query.trim()
    ? ALL_PRODUCTS.filter((p) => {
        const terms = query.toLowerCase().trim().split(/\s+/);
        const haystack = [p.name, p.variant, p.brand, p.collection, p.range].join(' ').toLowerCase();
        return terms.every((t) => haystack.includes(t));
      }).length
    : 0;

  // Close on route change
  useEffect(() => {
    closeSearch();
  }, [pathname, closeSearch]);

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          closeSearch();
        } else {
          useSearchStore.getState().openSearch();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeSearch]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeSearch]);

  // Focus input when modal opens + reset state
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      // Small delay to ensure the DOM is ready
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Arrow key navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (results.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIndex]) {
        const p = results[activeIndex];
        closeSearch();
        window.location.href = `/collections/${p.brandSlug}/${p.collectionSlug}/${p.slug}`;
      }
    },
    [results, activeIndex, closeSearch]
  );

  if (!isOpen) return null;

  const viewAllHref = query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.18s ease',
        }}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('pageTitle')}
        style={{
          position: 'fixed',
          top: 'clamp(60px, 10vh, 140px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 201,
          width: 'min(680px, calc(100vw - 32px))',
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 6,
          overflow: 'hidden',
          animation: 'slideDown 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        `}</style>

        {/* Search input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 20px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Search size={18} style={{ color: '#6B6965', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
            autoComplete="off"
            spellCheck={false}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: '#F5F3EF',
              fontSize: '1rem',
              padding: '20px 0',
              outline: 'none',
            }}
          />
          {query ? (
            <button
              onClick={() => { setQuery(''); setActiveIndex(0); inputRef.current?.focus(); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B6965',
                display: 'flex',
                padding: 4,
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#A8A5A0')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#6B6965')}
              aria-label={t('clearQuery')}
            >
              <X size={16} />
            </button>
          ) : (
            /* Keyboard hint */
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                flexShrink: 0,
              }}
            >
              <kbd
                style={{
                  fontSize: '0.6rem',
                  fontFamily: 'inherit',
                  color: '#6B6965',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 3,
                  padding: '2px 5px',
                  lineHeight: 1.5,
                }}
              >
                ESC
              </kbd>
            </div>
          )}
        </div>

        {/* Results */}
        {query.trim() && (
          <div>
            {results.length > 0 ? (
              <>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {results.map((p, i) => (
                    <li key={p.id}>
                      <ResultRow
                        product={p}
                        isActive={i === activeIndex}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={closeSearch}
                      />
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.65rem', color: '#6B6965', letterSpacing: '0.06em' }}>
                    ↑↓ navigate · ↵ select
                  </span>
                  <Link
                    href={viewAllHref}
                    onClick={closeSearch}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#C9A96E',
                      textDecoration: 'none',
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                  >
                    {totalCount > 6
                      ? `${t('resultsCountPlural', { count: totalCount })} →`
                      : t('viewDetails') + ' →'}
                  </Link>
                </div>
              </>
            ) : (
              /* No results */
              <div style={{ padding: '36px 24px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B6965', marginBottom: 4 }}>
                  {t('noResults')}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#4A4845' }}>
                  {t('noResultsHint')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty state — show suggestions when no query */}
        {!query.trim() && (
          <div style={{ padding: '20px 24px 24px' }}>
            <p
              style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#4A4845',
                marginBottom: 14,
              }}
            >
              {t('suggestionsLabel')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Submariner', 'Datejust', 'Royal Oak', 'Nautilus', 'Santos', 'Daytona'].map((term) => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); setActiveIndex(0); inputRef.current?.focus(); }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 3,
                    color: '#A8A5A0',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    padding: '7px 14px',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)';
                    (e.currentTarget as HTMLElement).style.color = '#C9A96E';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.color = '#A8A5A0';
                  }}
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Cmd+K hint at bottom */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 6,
              }}
            >
              <Command size={11} style={{ color: '#4A4845' }} />
              <kbd style={{ fontSize: '0.6rem', color: '#4A4845', fontFamily: 'inherit' }}>K</kbd>
              <span style={{ fontSize: '0.6rem', color: '#4A4845', letterSpacing: '0.06em' }}>
                to toggle search
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
