import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

// Page kept alive (no 404) but hidden from indexing while we migrate to
// verified, permission-cleared reviews. Replace this stub once the Sanity
// verifiedReview schema is live and at least 6 entries are visible.
export const metadata: Metadata = {
  title: 'Artemis Watches',
  description: '',
  robots: { index: false, follow: false },
};

export default async function ReviewsPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';

  return (
    <section
      style={{
        background: '#0A0A0A',
        minHeight: 'calc(100vh - 200px)',
        padding: 'clamp(120px, 16vw, 200px) 24px 80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <p
          style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 18,
          }}
        >
          {isFr ? 'Avis · Artemis' : 'Reviews · Artemis'}
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)',
            fontWeight: 600,
            color: '#F5F3EF',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          {isFr ? 'Section en cours de mise à jour.' : 'This section is being updated.'}
        </h1>
        <p
          style={{
            fontSize: '0.95rem',
            color: '#A8A5A0',
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          {isFr
            ? "Nous repensons cette section pour ne publier que des avis vérifiés. Revenez bientôt."
            : 'We are reworking this section to publish only verified reviews. Check back soon.'}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/collections"
            style={{
              display: 'inline-flex',
              padding: '14px 28px',
              background: '#F5F3EF',
              color: '#0A0A0A',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 4,
            }}
          >
            {isFr ? 'Voir le catalogue' : 'View collections'}
          </Link>
          <Link
            href="/notre-approche"
            style={{
              display: 'inline-flex',
              padding: '14px 28px',
              border: '1px solid rgba(201,169,110,0.35)',
              color: '#C9A96E',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 4,
              background: 'rgba(201,169,110,0.04)',
            }}
          >
            {isFr ? 'Notre histoire' : 'Our story'}
          </Link>
        </div>
      </div>
    </section>
  );
}
