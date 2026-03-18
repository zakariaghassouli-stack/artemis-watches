
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');
  const locale = await getLocale();
  const contactWhatsAppUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const CHANNELS = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            fill="currentColor"
          />
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.875-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.958 7.958 0 01-4.054-1.106l-.291-.173-2.895.854.868-2.833-.19-.3A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"
            fill="currentColor"
          />
        </svg>
      ),
      label: t('ch1Label'),
      sublabel: t('ch1Sub'),
      value: '514-560-9765',
      href: contactWhatsAppUrl,
      cta: t('ch1Cta'),
      accent: true,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: t('ch2Label'),
      sublabel: t('ch2Sub'),
      value: 'hello@artemis-watches.com',
      href: 'mailto:hello@artemis-watches.com',
      cta: t('ch2Cta'),
      accent: false,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      ),
      label: t('ch3Label'),
      sublabel: t('ch3Sub'),
      value: '@artemis.watches',
      href: 'https://www.instagram.com/artemis.watches',
      cta: t('ch3Cta'),
      accent: false,
    },
  ];

  const INFO_ITEMS = [
    { label: t('infoEmail'), value: 'hello@artemis-watches.com' },
    { label: t('infoWhatsApp'), value: '514-560-9765' },
    { label: t('infoLocation'), value: t('infoLocationValue') },
    { label: t('infoHours'), value: t('infoHoursValue') },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(96px, 14vw, 160px) 24px clamp(64px, 10vw, 112px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 24,
              }}
            >
              {t('overline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#F5F3EF',
                marginBottom: 24,
              }}
            >
              {t('headline1')}
              <br />
              <em
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                  fontStyle: 'italic',
                  color: '#C9A96E',
                }}
              >
                {t('headlineAccent')}
              </em>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.0625rem)',
                color: '#A8A5A0',
                lineHeight: 1.8,
                maxWidth: 560,
              }}
            >
              {t('subheadline')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact channels ── */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(64px, 9vw, 96px) 24px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}
            className="channels-grid"
          >
            <style>{`
              @media (max-width: 800px) {
                .channels-grid { grid-template-columns: 1fr !important; }
              }
              .channel-link-accent:hover { border-color: rgba(201,169,110,0.5) !important; background: rgba(201,169,110,0.08) !important; }
              .channel-link:hover { border-color: rgba(201,169,110,0.15) !important; background: rgba(255,255,255,0.03) !important; }
            `}</style>

            {CHANNELS.map((ch, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '36px 32px',
                    background: ch.accent ? 'rgba(201,169,110,0.05)' : 'rgba(255,255,255,0.02)',
                    border: ch.accent
                      ? '1px solid rgba(201,169,110,0.2)'
                      : '1px solid rgba(255,255,255,0.06)',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s, background 0.3s',
                    height: '100%',
                  }}
                  className={ch.accent ? 'channel-link-accent' : 'channel-link'}
                >
                  <div style={{ color: '#C9A96E', marginBottom: 20 }}>{ch.icon}</div>

                  <p
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#6B6965',
                      marginBottom: 6,
                    }}
                  >
                    {ch.sublabel}
                  </p>

                  <p
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: '#F5F3EF',
                      marginBottom: 8,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {ch.label}
                  </p>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: ch.accent ? '#C9A96E' : '#A8A5A0',
                      marginBottom: 24,
                      flex: 1,
                    }}
                  >
                    {ch.value}
                  </p>

                  <p
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: '#C9A96E',
                      textTransform: 'uppercase',
                    }}
                  >
                    {ch.cta}
                  </p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(72px, 10vw, 120px) 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="contact-layout"
        >
          <style>{`
            @media (max-width: 860px) {
              .contact-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
            }
          `}</style>

          {/* Left — info */}
          <div>
            <ScrollReveal delay={0}>
              <p
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                  marginBottom: 20,
                }}
              >
                {t('formOverline')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: '#F5F3EF',
                  marginBottom: 20,
                }}
              >
                {t('formHeadline')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#6B6965',
                  lineHeight: 1.8,
                  marginBottom: 36,
                }}
              >
                {t('formBody')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  padding: '28px 0',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {INFO_ITEMS.map((info) => (
                  <div key={info.label}>
                    <p
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#6B6965',
                        marginBottom: 4,
                      }}
                    >
                      {info.label}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#A8A5A0' }}>
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <ScrollReveal delay={120}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Location strip ── */}
      <section
        style={{
          background: '#111',
          padding: '48px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
        }}
      >
        <ScrollReveal delay={0}>
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 12,
            }}
          >
            {t('basedInOverline')}
          </p>
          <p style={{ fontSize: '1rem', color: '#A8A5A0', letterSpacing: '0.04em' }}>
            {t('basedInValue')}
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
