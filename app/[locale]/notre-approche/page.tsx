import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { ContactCTA } from '@/components/shared/ContactCTA';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('approach');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    // Editorial page that names Dandong + Rolex calibre architecture in
    // the footnote. Kept noindex while Zaki evaluates SEO vs prudence.
    robots: { index: false, follow: true },
  };
}

export default async function ApproachPage() {
  const t = await getTranslations('approach');
  const locale = await getLocale();

  const tableRows = [
    {
      label: t('rowMovementLabel'),
      essential: t('rowMovementEssential'),
      premium: t('rowMovementPremium'),
    },
    {
      label: t('rowReserveLabel'),
      essential: t('rowReserveEssential'),
      premium: t('rowReservePremium'),
    },
    {
      label: t('rowWaterLabel'),
      essential: t('rowWaterEssential'),
      premium: t('rowWaterPremium'),
    },
    {
      label: t('rowPriceLabel'),
      essential: t('rowPriceEssential'),
      premium: t('rowPricePremium'),
    },
  ];

  const guarantees = [t('guarantee1'), t('guarantee2')];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('metaTitle'),
    description: t('metaDescription'),
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'Artemis Watches' },
    publisher: { '@type': 'Organization', name: 'Artemis Watches' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(96px, 14vw, 160px) 24px clamp(56px, 8vw, 88px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 22%, rgba(201,169,110,0.08), transparent 38%), radial-gradient(circle at 84% 78%, rgba(201,169,110,0.05), transparent 34%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
          <Breadcrumb
            crumbs={[
              { label: t('breadcrumbHome'), href: '/' },
              { label: t('breadcrumbCurrent') },
            ]}
          />

          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginTop: 20,
                marginBottom: 24,
              }}
            >
              {t('overline')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#F5F3EF',
                fontFamily:
                  'var(--font-playfair, "Playfair Display", serif)',
                marginBottom: 24,
              }}
            >
              {t('headline')}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.35vw, 1.1rem)',
                color: '#A8A5A0',
                lineHeight: 1.75,
                maxWidth: 720,
                marginBottom: 32,
              }}
            >
              {t('subhero')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Link
                href="/collections"
                style={ctaPrimaryStyle}
              >
                {t('ctaPrimary')}
              </Link>
              <ContactCTA
                channel="whatsapp"
                variant="secondary"
                size="md"
                source="general"
                label={t('ctaSecondary')}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 1: Authenticité assumée */}
      <section style={sectionStyle('#0D0D0D')}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <ScrollReveal delay={0}>
            <h2 style={h2Style}>{t('section1Title')}</h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p style={bodyStyle}>{t('section1Body')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats band: single centered tile */}
      <section
        style={{
          background: '#111',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '44px 24px',
        }}
      >
        <ScrollReveal delay={0}>
          <div
            style={{
              maxWidth: 480,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 700,
                color: '#C9A96E',
                lineHeight: 1,
                letterSpacing: '-0.025em',
                marginBottom: 10,
                fontFamily:
                  'var(--font-playfair, "Playfair Display", serif)',
              }}
            >
              {t('statValue')}
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#8C8884',
              }}
            >
              {t('statLabel')}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Deux gammes, un standard */}
      <section style={sectionStyle('#0D0D0D')}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <ScrollReveal delay={0}>
            <h2 style={{ ...h2Style, textAlign: 'center', marginBottom: 32 }}>
              {t('section3Title')}
            </h2>
          </ScrollReveal>

          {/* Desktop table */}
          <ScrollReveal delay={60}>
            <div
              className="ep-table-desktop"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.95rem',
                  color: '#E8E5DF',
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <th style={cellHeadStyle}>{t('tableColCriterion')}</th>
                    <th style={cellHeadStyle}>{t('tableColEssential')}</th>
                    <th
                      style={{
                        ...cellHeadStyle,
                        color: '#C9A96E',
                        background: 'rgba(201,169,110,0.06)',
                      }}
                    >
                      {t('tableColPremium')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr
                      key={row.label}
                      style={{
                        borderBottom:
                          i < tableRows.length - 1
                            ? '1px solid rgba(255,255,255,0.05)'
                            : 'none',
                      }}
                    >
                      <td style={cellLabelStyle}>{row.label}</td>
                      <td style={cellStyle}>{row.essential}</td>
                      <td
                        style={{
                          ...cellStyle,
                          background: 'rgba(201,169,110,0.03)',
                          color: '#F5F3EF',
                          fontWeight: 500,
                        }}
                      >
                        {row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Mobile cards */}
          <div
            className="ep-cards-mobile"
            style={{ gap: 16 }}
          >
            {[
              {
                title: t('tableColEssential'),
                rows: tableRows.map((r) => ({
                  label: r.label,
                  value: r.essential,
                })),
                accent: false,
              },
              {
                title: t('tableColPremium'),
                rows: tableRows.map((r) => ({
                  label: r.label,
                  value: r.premium,
                })),
                accent: true,
              },
            ].map((card, idx) => (
              <ScrollReveal key={idx} delay={idx * 60}>
                <article
                  style={{
                    borderRadius: 10,
                    border: card.accent
                      ? '1px solid rgba(201,169,110,0.35)'
                      : '1px solid rgba(255,255,255,0.08)',
                    background: card.accent
                      ? 'rgba(201,169,110,0.04)'
                      : 'rgba(255,255,255,0.02)',
                    padding: '20px 18px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: card.accent ? '#C9A96E' : '#F5F3EF',
                      marginBottom: 14,
                      margin: 0,
                      marginBlockEnd: '14px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <dl style={{ margin: 0 }}>
                    {card.rows.map((r) => (
                      <div
                        key={r.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          gap: 12,
                          padding: '8px 0',
                          borderBottom: '1px dashed rgba(255,255,255,0.06)',
                        }}
                      >
                        <dt
                          style={{
                            fontSize: '0.72rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#8C8884',
                            fontWeight: 600,
                          }}
                        >
                          {r.label}
                        </dt>
                        <dd
                          style={{
                            margin: 0,
                            fontSize: '0.95rem',
                            color: '#E8E5DF',
                            textAlign: 'right',
                          }}
                        >
                          {r.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={140}>
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <Link
                href="/mouvements"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#C9A96E',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(201,169,110,0.35)',
                  paddingBottom: 3,
                }}
              >
                {t('viewMovementsLink')}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <style>{`
          .ep-cards-mobile { display: none; }
          @media (max-width: 768px) {
            .ep-table-desktop { display: none; }
            .ep-cards-mobile { display: grid !important; }
          }
        `}</style>
      </section>

      {/* Section 4: Garanties solides (2 items) */}
      <section style={sectionStyle('#0A0A0A')}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <ScrollReveal delay={0}>
            <h2 style={h2Style}>{t('section4Title')}</h2>
          </ScrollReveal>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: 14,
            }}
          >
            {guarantees.map((g, i) => (
              <ScrollReveal key={i} delay={60 + i * 60}>
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '16px 18px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flex: '0 0 auto',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#C9A96E',
                      marginTop: 9,
                    }}
                  />
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                      color: '#E8E5DF',
                      lineHeight: 1.7,
                    }}
                  >
                    {g}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(48px, 8vw, 88px) 24px clamp(32px, 5vw, 56px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            gap: 14,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link href="/collections" style={ctaPrimaryStyle}>
            {t('ctaPrimary')}
          </Link>
          <ContactCTA
            channel="whatsapp"
            variant="secondary"
            size="md"
            source="general"
            label={t('ctaSecondary')}
          />
        </div>
      </section>

      {/* Footnote (anchored to footnote disclaimer) */}
      <section
        style={{
          background: '#0A0A0A',
          padding: '0 24px clamp(72px, 10vw, 112px)',
        }}
      >
        <p
          style={{
            maxWidth: 820,
            margin: '0 auto',
            fontSize: '0.78rem',
            fontStyle: 'italic',
            color: '#8C8884',
            lineHeight: 1.6,
          }}
        >
          {t('footnote')}
        </p>
      </section>
    </>
  );
}

const sectionStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  padding: 'clamp(56px, 9vw, 100px) 24px',
  borderTop: '1px solid rgba(255,255,255,0.04)',
});

const h2Style: React.CSSProperties = {
  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
  fontWeight: 600,
  lineHeight: 1.15,
  letterSpacing: '-0.02em',
  color: '#F5F3EF',
  marginBottom: 20,
  fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
};

const bodyStyle: React.CSSProperties = {
  fontSize: 'clamp(1rem, 1.3vw, 1.08rem)',
  color: '#C7C4BE',
  lineHeight: 1.85,
  marginBottom: 0,
};

const cellHeadStyle: React.CSSProperties = {
  padding: '18px 20px',
  textAlign: 'left',
  fontSize: '0.74rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#F5F3EF',
};

const cellLabelStyle: React.CSSProperties = {
  padding: '18px 20px',
  fontSize: '0.74rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#8C8884',
  width: '24%',
};

const cellStyle: React.CSSProperties = {
  padding: '18px 20px',
  fontSize: '0.95rem',
  color: '#E8E5DF',
};

const ctaPrimaryStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 28px',
  background: '#C9A96E',
  color: '#0A0A0A',
  textDecoration: 'none',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  borderRadius: 3,
  border: 'none',
};
