
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { FAQPageAccordion } from '@/components/faq/FAQPageAccordion';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('faqPage');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function FAQPage() {
  const t = await getTranslations('faqPage');
  const locale = await getLocale();
  const faqWhatsAppUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const FAQ_CATEGORIES = [
    {
      id: 'shipping',
      label: t('cat1Label'),
      items: [
        { q: t('s1q1'), a: t('s1a1') },
        { q: t('s1q2'), a: t('s1a2') },
        { q: t('s1q3'), a: t('s1a3') },
        { q: t('s1q4'), a: t('s1a4') },
        { q: t('s1q5'), a: t('s1a5') },
      ],
    },
    {
      id: 'returns',
      label: t('cat2Label'),
      items: [
        { q: t('s2q1'), a: t('s2a1') },
        { q: t('s2q2'), a: t('s2a2') },
        { q: t('s2q3'), a: t('s2a3') },
        { q: t('s2q4'), a: t('s2a4') },
      ],
    },
    {
      id: 'products',
      label: t('cat3Label'),
      items: [
        { q: t('s3q1'), a: t('s3a1') },
        { q: t('s3q2'), a: t('s3a2') },
        { q: t('s3q3'), a: t('s3a3') },
        { q: t('s3q4'), a: t('s3a4') },
        { q: t('s3q5'), a: t('s3a5') },
        { q: t('s3q6'), a: t('s3a6') },
      ],
    },
    {
      id: 'payment',
      label: t('cat4Label'),
      items: [
        { q: t('s4q1'), a: t('s4a1') },
        { q: t('s4q2'), a: t('s4a2') },
        { q: t('s4q3'), a: t('s4a3') },
        { q: t('s4q4'), a: t('s4a4') },
      ],
    },
    {
      id: 'account',
      label: t('cat5Label'),
      items: [
        { q: t('s5q1'), a: t('s5a1') },
        { q: t('s5q2'), a: t('s5a2') },
        { q: t('s5q3'), a: t('s5a3') },
        { q: t('s5q4'), a: t('s5a4') },
      ],
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(96px, 14vw, 160px) 24px clamp(64px, 10vw, 112px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
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

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
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
              {t('headline2')}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p style={{ fontSize: '1rem', color: '#A8A5A0', lineHeight: 1.75 }}>
              {t('heroBody')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Accordion ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(64px, 9vw, 104px) 24px',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FAQPageAccordion categories={FAQ_CATEGORIES} />
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section
        style={{
          background: '#111',
          padding: 'clamp(64px, 9vw, 96px) 24px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
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
              {t('stillHaveQLabel')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#F5F3EF',
                marginBottom: 16,
              }}
            >
              {t('stillHaveQHeadline')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#A8A5A0',
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              {t('stillHaveQBody')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <style>{`
              .faq-btn-whatsapp {
                display: inline-block;
                padding: 14px 32px;
                background: #F5F3EF;
                color: #0A0A0A;
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                text-decoration: none;
                transition: background 0.2s;
              }
              .faq-btn-whatsapp:hover { background: #C9A96E; }
              .faq-btn-contact {
                display: inline-block;
                padding: 14px 32px;
                border: 1px solid rgba(255,255,255,0.1);
                color: #A8A5A0;
                font-size: 0.78rem;
                font-weight: 600;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                text-decoration: none;
                transition: border-color 0.2s, color 0.2s;
              }
              .faq-btn-contact:hover { border-color: rgba(201,169,110,0.4); color: #C9A96E; }
            `}</style>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={faqWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-btn-whatsapp"
              >
                {t('ctaWhatsApp')}
              </a>
              <Link href="/contact" className="faq-btn-contact">
                {t('ctaContact')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
