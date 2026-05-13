'use client';

import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle, Check, Truck } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export function HowToOrder() {
  const t = useTranslations('home.howToOrder');
  const locale = useLocale();
  const ctaUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const steps = [
    { Icon: MessageCircle, title: t('step1Title'), body: t('step1Body') },
    { Icon: Check, title: t('step2Title'), body: t('step2Body') },
    { Icon: Truck, title: t('step3Title'), body: t('step3Body') },
  ];

  return (
    <section
      style={{
        background: '#0D0D0D',
        padding: 'clamp(72px, 11vw, 128px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <ScrollReveal delay={0}>
          <p
            style={{
              fontSize: '0.66rem',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            {t('overline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#F5F3EF',
              textAlign: 'center',
              marginBottom: 'clamp(40px, 5vw, 64px)',
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
              fontStyle: 'italic',
            }}
          >
            {t('headline')}
          </h2>
        </ScrollReveal>

        <div
          className="howto-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 'clamp(16px, 2.2vw, 28px)',
            marginBottom: 'clamp(40px, 5vw, 56px)',
          }}
        >
          <style>{`
            @media (max-width: 800px) {
              .howto-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {steps.map(({ Icon, title, body }, i) => (
            <ScrollReveal key={title} delay={120 + i * 70}>
              <article
                style={{
                  padding: '32px 28px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.025)',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <div
                  aria-hidden
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'rgba(201,169,110,0.1)',
                    border: '1px solid rgba(201,169,110,0.25)',
                    color: '#C9A96E',
                    marginBottom: 18,
                  }}
                >
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#F5F3EF',
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.92rem',
                    lineHeight: 1.65,
                    color: '#A8A5A0',
                  }}
                >
                  {body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={360}>
          <div style={{ textAlign: 'center' }}>
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 32px',
                background: '#C9A96E',
                color: '#0A0A0A',
                textDecoration: 'none',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                borderRadius: 4,
              }}
            >
              {t('ctaWhatsapp')}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
