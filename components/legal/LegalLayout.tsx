'use client';

import { Link } from '@/i18n/navigation';

interface Section {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  overline: string;
  title: string;
  lastUpdated: string;
  sections: Section[];
  children: React.ReactNode;
}

/**
 * Shared layout for all legal pages.
 * Dark top header → light cream content for maximum readability.
 */
export function LegalLayout({
  overline,
  title,
  lastUpdated,
  sections,
  children,
}: LegalLayoutProps) {
  return (
    <>
      {/* ── Dark top header ── */}
      <div
        style={{
          background: '#0A0A0A',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(72px, 10vw, 112px) 24px 48px',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 32,
              fontSize: '0.72rem',
              color: '#6B6965',
              letterSpacing: '0.06em',
            }}
          >
            <Link
              href="/"
              style={{ color: '#6B6965', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6965')}
            >
              Home
            </Link>
            <span aria-hidden>/</span>
            <span style={{ color: '#A8A5A0' }}>{title}</span>
          </nav>

          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 16,
            }}
          >
            {overline}
          </p>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: '#F5F3EF',
              marginBottom: 20,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '0.78rem',
              color: '#6B6965',
              letterSpacing: '0.04em',
            }}
          >
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* ── Light content area ── */}
      <div style={{ background: '#F8F6F2', minHeight: '60vh' }}>
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            padding: 'clamp(48px, 6vw, 72px) 24px clamp(72px, 10vw, 112px)',
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: 64,
            alignItems: 'start',
          }}
          className="legal-grid"
        >
          <style>{`
            @media (max-width: 720px) {
              .legal-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
              .legal-toc { display: none !important; }
            }
          `}</style>

          {/* Sticky Table of Contents */}
          <aside
            className="legal-toc"
            style={{
              position: 'sticky',
              top: 96,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <p
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9B978F',
                marginBottom: 12,
              }}
            >
              Contents
            </p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontSize: '0.78rem',
                  color: '#9B978F',
                  textDecoration: 'none',
                  lineHeight: 1.5,
                  padding: '5px 0 5px 12px',
                  borderLeft: '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#1A1A1A';
                  el.style.borderLeftColor = '#C9A96E';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#9B978F';
                  el.style.borderLeftColor = 'transparent';
                }}
              >
                {s.title}
              </a>
            ))}

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <p
                style={{
                  fontSize: '0.72rem',
                  color: '#9B978F',
                  lineHeight: 1.6,
                  marginBottom: 12,
                }}
              >
                Questions? We&apos;re here.
              </p>
              <a
                href="https://wa.me/15145609765"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#C9A96E',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                }}
              >
                WhatsApp →
              </a>
            </div>
          </aside>

          {/* Main prose */}
          <article style={{ minWidth: 0 }}>
            <style>{`
              .legal-prose h2 {
                font-size: 1.125rem;
                font-weight: 700;
                color: #1A1A1A;
                margin: 48px 0 14px;
                padding-top: 8px;
                letter-spacing: -0.01em;
                scroll-margin-top: 100px;
              }
              .legal-prose h2:first-child { margin-top: 0; }
              .legal-prose h3 {
                font-size: 0.9rem;
                font-weight: 700;
                color: #1A1A1A;
                margin: 28px 0 10px;
                text-transform: uppercase;
                letter-spacing: 0.06em;
              }
              .legal-prose p {
                font-size: 0.9rem;
                color: #4A4845;
                line-height: 1.85;
                margin-bottom: 16px;
              }
              .legal-prose ul, .legal-prose ol {
                padding-left: 20px;
                margin-bottom: 16px;
              }
              .legal-prose li {
                font-size: 0.9rem;
                color: #4A4845;
                line-height: 1.75;
                margin-bottom: 6px;
              }
              .legal-prose a {
                color: #C9A96E;
                text-decoration: underline;
                text-decoration-color: rgba(201,169,110,0.4);
                transition: text-decoration-color 0.2s;
              }
              .legal-prose a:hover { text-decoration-color: #C9A96E; }
              .legal-prose strong { color: #1A1A1A; font-weight: 600; }
              .legal-prose .section-divider {
                border: none;
                border-top: 1px solid rgba(0,0,0,0.08);
                margin: 8px 0 0;
              }
              .legal-highlight {
                background: rgba(201,169,110,0.08);
                border-left: 3px solid #C9A96E;
                padding: 16px 20px;
                margin: 24px 0;
                border-radius: 0 4px 4px 0;
              }
              .legal-highlight p {
                margin-bottom: 0 !important;
                font-size: 0.875rem !important;
                color: #3A3835 !important;
              }
            `}</style>

            <div className="legal-prose">{children}</div>
          </article>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div
        style={{
          background: '#0A0A0A',
          padding: '40px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Return Policy', href: '/returns' },
              { label: 'Shipping Policy', href: '/shipping' },
              { label: 'Terms & Conditions', href: '/terms' },
              { label: 'Privacy Policy', href: '/privacy' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: '0.72rem',
                  color: '#6B6965',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#A8A5A0')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6965')}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: '#6B6965' }}>
            © {new Date().getFullYear()} ARTEMIS Watches. Montréal, QC.
          </p>
        </div>
      </div>
    </>
  );
}
