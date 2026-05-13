import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { getMovementsWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('movements');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    // Default to noindex while the page is fresh: TM proximity makes
    // organic-traffic acquisition a brand-safety question. Flip to
    // index:true once Zaki confirms SEO benefit > prudence trade-off.
    robots: { index: false, follow: true },
  };
}

export default async function MovementsPage() {
  const t = await getTranslations('movements');
  const locale = await getLocale();
  const ctaUrl = getWhatsAppUrl(getMovementsWhatsAppMessage(locale));

  const rows = [
    {
      label: t('tableRowPrecision'),
      chinese: t('chinesePrecision'),
      japanese: t('japanesePrecision'),
      swiss: t('swissPrecision'),
    },
    {
      label: t('tableRowLifespan'),
      chinese: t('chineseLifespan'),
      japanese: t('japaneseLifespan'),
      swiss: t('swissLifespan'),
    },
    {
      label: t('tableRowRange'),
      chinese: t('chineseRange'),
      japanese: t('japaneseRange'),
      swiss: t('swissRange'),
    },
    {
      label: t('tableRowPrice'),
      chinese: t('chinesePrice'),
      japanese: t('japanesePrice'),
      swiss: t('swissPrice'),
    },
  ];

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

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(96px, 14vw, 160px) 24px clamp(48px, 8vw, 80px)',
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
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#F5F3EF',
                marginBottom: 28,
                fontFamily:
                  'var(--font-playfair, "Playfair Display", serif)',
              }}
            >
              {t('headline')}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.35vw, 1.1rem)',
                color: '#A8A5A0',
                lineHeight: 1.8,
                maxWidth: 720,
              }}
            >
              {t('intro')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Comparison table ──────────────────────────────────────────── */}
      <section
        style={{
          background: '#0D0D0D',
          padding: 'clamp(56px, 8vw, 96px) 24px clamp(40px, 6vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Desktop table */}
          <ScrollReveal delay={0}>
            <div
              className="mvt-table-desktop"
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
                    <th style={cellHeadStyle}>{t('tableCriterion')}</th>
                    <th style={cellHeadStyle}>{t('tableChinese')}</th>
                    <th style={cellHeadStyle}>{t('tableJapanese')}</th>
                    <th
                      style={{
                        ...cellHeadStyle,
                        color: '#C9A96E',
                        background: 'rgba(201,169,110,0.06)',
                      }}
                    >
                      {t('tableSwiss')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.label}
                      style={{
                        borderBottom:
                          i < rows.length - 1
                            ? '1px solid rgba(255,255,255,0.05)'
                            : 'none',
                      }}
                    >
                      <td style={cellLabelStyle}>{row.label}</td>
                      <td style={cellStyle}>{row.chinese}</td>
                      <td style={cellStyle}>{row.japanese}</td>
                      <td
                        style={{
                          ...cellStyle,
                          background: 'rgba(201,169,110,0.03)',
                          color: '#F5F3EF',
                          fontWeight: 500,
                        }}
                      >
                        {row.swiss}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Mobile cards */}
          <div
            className="mvt-cards-mobile"
            style={{ gap: 16 }}
          >
            {[
              {
                title: t('tableChinese'),
                rows: rows.map((r) => ({ label: r.label, value: r.chinese })),
                accent: false,
              },
              {
                title: t('tableJapanese'),
                rows: rows.map((r) => ({
                  label: r.label,
                  value: r.japanese,
                })),
                accent: false,
              },
              {
                title: t('tableSwiss'),
                rows: rows.map((r) => ({ label: r.label, value: r.swiss })),
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
                  <h2
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: card.accent ? '#C9A96E' : '#F5F3EF',
                      marginBottom: 14,
                    }}
                  >
                    {card.title}
                  </h2>
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

          {/* Position assumed callout */}
          <ScrollReveal delay={120}>
            <div
              style={{
                marginTop: 40,
                padding: '24px 28px',
                borderRadius: 10,
                background:
                  'linear-gradient(180deg, rgba(201,169,110,0.08), rgba(201,169,110,0.03))',
                border: '1px solid rgba(201,169,110,0.35)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#F5F3EF',
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily:
                    'var(--font-playfair, "Playfair Display", serif)',
                  fontStyle: 'italic',
                }}
              >
                {t('positionAssumed')}
              </p>
            </div>
          </ScrollReveal>

          {/* Footnote (visually anchored to the table via the asterisk) */}
          <p
            style={{
              marginTop: 28,
              fontSize: '0.78rem',
              fontStyle: 'italic',
              color: '#8C8884',
              lineHeight: 1.6,
              textAlign: 'left',
            }}
          >
            {t('footnote')}
          </p>
        </div>

        <style>{`
          .mvt-cards-mobile { display: none; }
          @media (max-width: 768px) {
            .mvt-table-desktop { display: none; }
            .mvt-cards-mobile { display: grid !important; }
          }
        `}</style>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(48px, 8vw, 88px) 24px clamp(72px, 10vw, 112px)',
          textAlign: 'center',
        }}
      >
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px 36px',
            background: '#C9A96E',
            color: '#0A0A0A',
            textDecoration: 'none',
            fontSize: '0.76rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            borderRadius: 4,
          }}
        >
          {t('ctaLabel')}
        </a>
      </section>
    </>
  );
}

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
  width: '22%',
};

const cellStyle: React.CSSProperties = {
  padding: '18px 20px',
  fontSize: '0.95rem',
  color: '#E8E5DF',
};
