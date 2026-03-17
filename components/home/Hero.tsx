'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#0A0A0A',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gold glow — left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '55%',
          height: '70%',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      {/* Ambient glow — right bottom */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '5%',
          width: '40%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(100px, 14vh, 140px) 24px clamp(80px, 10vh, 100px)',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left — Text */}
        <div>
          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 28,
              }}
            >
              {t('overline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#F5F3EF',
                marginBottom: 28,
              }}
            >
              {t('headlinePart1')}{' '}
              <span
                style={{
                  display: 'block',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  background:
                    'linear-gradient(135deg, #D4B882 0%, #C9A96E 50%, #B8924A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('headlineAccent')}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                color: '#A8A5A0',
                lineHeight: 1.75,
                marginBottom: 44,
                maxWidth: 500,
              }}
            >
              {t('subheadline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link
                href="/collections"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#C9A96E',
                  color: '#0A0A0A',
                  padding: '15px 32px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.25s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#D4B882')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#C9A96E')
                }
              >
                {t('ctaPrimary')}
              </Link>
              <a
                href={`https://wa.me/15145609765?text=${encodeURIComponent(
                  "Hello ARTEMIS, I'd like to learn more about your collection."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#F5F3EF',
                  padding: '15px 32px',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'border-color 0.25s, background 0.25s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(201,169,110,0.4)';
                  (e.currentTarget as HTMLElement).style.background =
                    'rgba(201,169,110,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(255,255,255,0.14)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {/* WhatsApp icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('ctaSecondary')}
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Hero watch image */}
        <ScrollReveal delay={200}>
          <div
            style={{
              position: 'relative',
              aspectRatio: '4/5',
              background: 'linear-gradient(160deg, #1C1C1C 0%, #111111 100%)',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Radial glow behind watch */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(201,169,110,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/IMG_9316.GIF"
              alt="Rolex Submariner Date — Artemis Watches Montreal"
              style={{
                width: '88%',
                height: '88%',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.6))',
              }}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          color: '#6B6965',
          animation: 'heroScroll 2.2s ease-in-out infinite',
        }}
      >
        <style>{`
          @keyframes heroScroll {
            0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
            50% { opacity: 0.8; transform: translateX(-50%) translateY(7px); }
          }
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-grid > *:last-child { display: none; }
          }
        `}</style>
        <span
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          {t('scrollLabel')}
        </span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}
