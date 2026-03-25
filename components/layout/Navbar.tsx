'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useCartStore, selectItemCount } from '@/store/cart';
import { useSearchStore } from '@/store/search';
import { useWishlistStore, selectWishlistCount } from '@/store/wishlist';
import { SearchModal } from '@/components/search/SearchModal';
import { getNavWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

// ─── Mega-menu data ──────────────────────────────────────────────
const COLLECTIONS = [
  {
    brand: 'Rolex',
    slug: 'rolex',
    models: [
      { name: 'Submariner', slug: 'submariner' },
      { name: 'Datejust', slug: 'datejust' },
      { name: 'GMT-Master II', slug: 'gmt-master-ii' },
      { name: 'Daytona', slug: 'daytona' },
    ],
  },
  {
    brand: 'Cartier',
    slug: 'cartier',
    models: [
      { name: 'Santos de Cartier', slug: 'santos' },
      { name: 'Panthère de Cartier', slug: 'panthere' },
    ],
  },
  {
    brand: 'Audemars Piguet',
    slug: 'audemars-piguet',
    models: [
      { name: 'Royal Oak', slug: 'royal-oak' },
    ],
  },
  {
    brand: 'Patek Philippe',
    slug: 'patek-philippe',
    models: [
      { name: 'Nautilus', slug: 'nautilus' },
      { name: 'Aquanaut', slug: 'aquanaut' },
    ],
  },
];

// ─── LocaleSelector ──────────────────────────────────────────────
function LocaleSelector({ tNav }: { tNav: ReturnType<typeof useTranslations<'nav'>> }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const switchLocale = (next: string) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Language"
        style={{
          background: open ? 'rgba(201,169,110,0.08)' : 'none',
          border: `1px solid ${open ? 'rgba(201,169,110,0.35)' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 3,
          cursor: 'pointer',
          color: open ? '#C9A96E' : '#A8A5A0',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          padding: '4px 9px',
          transition: 'border-color 0.2s, color 0.2s, background 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          whiteSpace: 'nowrap',
        }}
      >
        {locale.toUpperCase()}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: 'rgba(14,13,11,0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4,
            padding: '16px 18px',
            minWidth: 180,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            zIndex: 200,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div>
            <p style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B6965', marginBottom: 8 }}>
              {tNav('languageLabel')}
            </p>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['en', 'fr'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  style={{
                    flex: 1,
                    padding: '7px 0',
                    background: locale === l ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${locale === l ? 'rgba(201,169,110,0.35)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 3,
                    color: locale === l ? '#C9A96E' : '#6B6965',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────
export function Navbar() {
  const t = useTranslations('nav');
  const mobileMenuWhatsAppHref = getWhatsAppUrl(getNavWhatsAppMessage(useLocale()));
  const openSearch = useSearchStore((s) => s.openSearch);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCollExpanded, setMobileCollExpanded] = useState(false);

  const megaRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLDivElement>(null);

  // Scroll detection for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        megaTriggerRef.current &&
        !megaTriggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
    background: scrolled
      ? 'rgba(10,10,10,0.85)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled
      ? '1px solid rgba(255,255,255,0.06)'
      : '1px solid transparent',
  };

  return (
    <>
      <nav style={navStyle} aria-label="Main navigation">
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-editorial, "Playfair Display", serif)',
              fontSize: '1.375rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#F5F3EF',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            ARTEMIS
          </Link>

          {/* ── Desktop nav links ── */}
          <div
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: 32 }}
          >
            {/* Collections trigger */}
            <div
              ref={megaTriggerRef}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}
              onMouseEnter={() => setMegaOpen(true)}
            >
              <Link
                href="/collections"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: megaOpen ? '#C9A96E' : '#A8A5A0',
                  transition: 'color 0.2s ease',
                  padding: '4px 0',
                  textDecoration: 'none',
                }}
              >
                {t('collections')}
              </Link>
              <button
                type="button"
                onClick={() => setMegaOpen((o) => !o)}
                aria-label={t('collections')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: megaOpen ? '#C9A96E' : '#A8A5A0',
                  padding: 0,
                }}
              >
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
            </div>

            {[
              { key: 'reviews', href: '/reviews' },
              { key: 'faq', href: '/faq' },
              { key: 'contact', href: '/contact' },
              { key: 'about', href: '/about' },
            ].map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#A8A5A0',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F3EF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A5A0')}
              >
                {t(key as Parameters<typeof t>[0])}
              </Link>
            ))}
          </div>

          {/* ── Right icons ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <LocaleSelector tNav={t} />
            <SearchBtn label={t('search')} onClick={openSearch} />
            <IconBtn href="/account" label={t('account')} icon={<User size={18} />} />
            <WishlistIcon label={t('wishlist')} />
            <CartIcon label={t('cart')} />

            {/* Mobile menu toggle */}
            <button
              className="flex md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F5F3EF', padding: 4 }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mega-menu (desktop) ── */}
        {megaOpen && (
          <div
            ref={megaRef}
            onMouseLeave={() => setMegaOpen(false)}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(20,20,20,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '48px 0 40px',
              animation: 'fadeSlideDown 0.2s ease forwards',
            }}
          >
            <style>{`
              @keyframes fadeSlideDown {
                from { opacity: 0; transform: translateY(-8px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <div
              style={{
                maxWidth: 1280,
                margin: '0 auto',
                padding: '0 24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 40,
              }}
            >
              {COLLECTIONS.map((col) => (
                <div key={col.slug}>
                  <Link
                    href={`/collections/${col.slug}`}
                    onClick={() => setMegaOpen(false)}
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#C9A96E',
                      marginBottom: 16,
                      textDecoration: 'none',
                    }}
                  >
                    {col.brand}
                  </Link>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {col.models.map((model) => (
                      <li key={model.slug}>
                        <Link
                          href={`/collections/${col.slug}/${model.slug}`}
                          onClick={() => setMegaOpen(false)}
                          style={{
                            fontSize: '0.875rem',
                            color: '#A8A5A0',
                            transition: 'color 0.2s ease',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F3EF')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A5A0')}
                        >
                          {model.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom strip */}
            <div
              style={{
                maxWidth: 1280,
                margin: '32px auto 0',
                padding: '20px 24px 0',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: 24,
              }}
            >
              <MegaFeatureLink href="/collections" label={t('megaAllWatches')} />
              <MegaFeatureLink href="/collections/new-arrivals" label={t('megaNewArrivals')} />
              <MegaFeatureLink href="/collections?range=essential" label={t('megaEssential')} />
              <MegaFeatureLink href="/collections?range=premium" label={t('megaPremium')} />
            </div>
          </div>
        )}
      </nav>

      {/* ── Mobile drawer ── */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        t={t}
        collExpanded={mobileCollExpanded}
        onToggleColl={() => setMobileCollExpanded((e) => !e)}
        whatsappHref={mobileMenuWhatsAppHref}
      />

      {/* ── Search modal ── */}
      <SearchModal />
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────

function SearchBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#A8A5A0',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#F5F3EF')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#A8A5A0')}
    >
      <Search size={18} />
    </button>
  );
}

function IconBtn({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      style={{
        color: '#A8A5A0',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#F5F3EF')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#A8A5A0')}
    >
      {icon}
    </Link>
  );
}

function WishlistIcon({ label }: { label: string }) {
  const count = useWishlistStore(selectWishlistCount);

  return (
    <Link
      href="/wishlist"
      aria-label={label}
      style={{
        position: 'relative',
        color: '#A8A5A0',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#F5F3EF')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#A8A5A0')}
    >
      <Heart size={18} strokeWidth={1.5} />
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#C9A96E',
            color: '#0A0A0A',
            fontSize: 9,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function CartIcon({ label }: { label: string }) {
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartStore(selectItemCount);

  return (
    <button
      aria-label={label}
      onClick={openCart}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#A8A5A0',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#F5F3EF')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#A8A5A0')}
    >
      <ShoppingBag size={18} />
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#C9A96E',
            color: '#0A0A0A',
            fontSize: 9,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function MegaFeatureLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#6B6965',
        transition: 'color 0.2s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6965')}
    >
      {label}
    </Link>
  );
}

function MobileMenu({
  open,
  onClose,
  t,
  collExpanded,
  onToggleColl,
  whatsappHref,
}: {
  open: boolean;
  onClose: () => void;
  t: ReturnType<typeof useTranslations<'nav'>>;
  collExpanded: boolean;
  onToggleColl: () => void;
  whatsappHref: string;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden
      />
      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 95,
          width: Math.min(320, typeof window !== 'undefined' ? window.innerWidth : 320),
          background: '#141414',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-editorial, "Playfair Display", serif)',
              fontSize: '1.1rem',
              letterSpacing: '0.2em',
              color: '#F5F3EF',
            }}
          >
            ARTEMIS
          </span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8A5A0', padding: 4 }}
            aria-label={t('closeMenu')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {/* Collections accordion */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 24px',
            }}
          >
            <Link
              href="/collections"
              onClick={onClose}
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#F5F3EF',
                textDecoration: 'none',
              }}
            >
              {t('collections')}
            </Link>
            <button
              onClick={onToggleColl}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#C9A96E',
                padding: 0,
              }}
              aria-label={t('collections')}
            >
              <ChevronDown
                size={14}
                style={{
                  transition: 'transform 0.2s',
                  transform: collExpanded ? 'rotate(180deg)' : 'none',
                }}
              />
            </button>
          </div>

          {collExpanded && (
            <div style={{ background: 'rgba(255,255,255,0.02)', paddingBottom: 8 }}>
              {COLLECTIONS.map((col) => (
                <div key={col.slug}>
                  <Link
                    href={`/collections/${col.slug}`}
                    onClick={onClose}
                    style={{
                      display: 'block',
                      padding: '10px 32px',
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#C9A96E',
                      textDecoration: 'none',
                    }}
                  >
                    {col.brand}
                  </Link>
                  {col.models.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/collections/${col.slug}/${m.slug}`}
                      onClick={onClose}
                      style={{
                        display: 'block',
                        padding: '8px 44px',
                        fontSize: '0.875rem',
                        color: '#A8A5A0',
                        textDecoration: 'none',
                      }}
                    >
                      {m.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Static links */}
          {[
            { label: t('reviews'), href: '/reviews' },
            { label: t('faq'), href: '/faq' },
            { label: t('contact'), href: '/contact' },
            { label: t('about'), href: '/about' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              style={{
                display: 'block',
                padding: '14px 24px',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#A8A5A0',
                textDecoration: 'none',
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom CTAs */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 6,
              }}
            >
              {t('mobileHelp')}
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                color: '#6B6965',
                lineHeight: 1.6,
              }}
            >
              {t('mobileSupport')}
            </p>
          </div>
          <Link
            href="/account"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              fontSize: '0.74rem',
              color: '#A8A5A0',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              padding: '13px 16px',
            }}
          >
            <User size={16} /> {t('account')}
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.whatsappClick('mobile_nav')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              fontSize: '0.74rem',
              fontWeight: 600,
              color: '#0A0A0A',
              background: '#C9A96E',
              borderRadius: 4,
              padding: '13px 16px',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            {t('whatsappMobile')}
          </a>
        </div>
      </div>
    </>
  );
}
