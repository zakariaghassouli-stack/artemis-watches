'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { ContactCTA } from '@/components/shared/ContactCTA';

interface HeroProps {
  headlineOverride?: string | null;
  subheadlineOverride?: string | null;
}

export function Hero({ headlineOverride, subheadlineOverride }: HeroProps) {
  const t = useTranslations('home.hero');
  const rawHeadline = headlineOverride?.trim() || '';

  let headlinePrimary = t('headlinePart1');
  let headlineAccent = t('headlineAccent');

  if (rawHeadline) {
    const lineBreakParts = rawHeadline
      .split(/\n+/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (lineBreakParts.length >= 2) {
      headlinePrimary = lineBreakParts[0];
      headlineAccent = lineBreakParts.slice(1).join(' ');
    } else {
      const sentenceParts = rawHeadline
        .split(/(?<=\.)\s*/)
        .map((part) => part.trim())
        .filter(Boolean);
      headlinePrimary = sentenceParts[0] ?? rawHeadline;
      headlineAccent = sentenceParts.slice(1).join(' ') || t('headlineAccent');
    }
  }

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
                fontSize: 'clamp(2.9rem, 6vw, 5.5rem)',
                fontWeight: 600,
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                color: '#F5F3EF',
                marginBottom: 28,
              }}
            >
              <span style={{ display: 'block', color: '#F5F3EF' }}>{headlinePrimary}</span>
              <span
                style={{
                  display: 'block',
                  marginTop: 6,
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(3.15rem, 6.4vw, 6rem)',
                  background:
                    'linear-gradient(135deg, #D4B882 0%, #C9A96E 50%, #B8924A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {headlineAccent}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.08rem)',
                color: '#A8A5A0',
                lineHeight: 1.45,
                marginBottom: 44,
                maxWidth: 680,
                letterSpacing: '0.03em',
              }}
            >
              {subheadlineOverride ?? t('subheadline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 18 }}>
              {/* WhatsApp primary - Option A: DM-first 60d */}
              <ContactCTA
                channel="whatsapp"
                variant="primary"
                size="lg"
                source="home_hero"
                label={t('ctaWhatsapp')}
              />
              {/* Explore collections - secondary outline */}
              <Link
                href="/collections"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
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
                {t('ctaPrimary')}
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                marginBottom: 12,
              }}
            >
              {[t('point1'), t('point2'), t('point3')].map((point) => (
                <span
                  key={point}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 12px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    color: '#A8A5A0',
                    fontSize: '0.68rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#C9A96E',
                      flexShrink: 0,
                    }}
                  />
                  {point}
                </span>
              ))}
            </div>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.42)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {t('socialProof')}
            </p>
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
            <Image
              src="/images/rolex-submariner-black-nodate-face.webp"
              alt="Rolex Submariner No Date, Artemis Watches Montreal"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
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
