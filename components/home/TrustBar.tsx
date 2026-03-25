import { getTranslations } from 'next-intl/server';

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <path d="M16 8h4l3 5v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

export async function TrustBar() {
  const t = await getTranslations('home.trust');

  const items = [
    { icon: <ShieldIcon />, title: t('item1Title'), body: t('item1Body') },
    { icon: <TruckIcon />, title: t('item2Title'), body: t('item2Body') },
    { icon: <LockIcon />, title: t('item3Title'), body: t('item3Body') },
    { icon: <ChatIcon />, title: t('item4Title'), body: t('item4Body') },
  ];

  return (
    <section
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }}
        className="trust-grid"
      >
        <style>{`
          @media (max-width: 768px) {
            .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .trust-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '18px 20px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 4,
            }}
          >
            <div
              style={{
                color: '#C9A96E',
                flexShrink: 0,
                opacity: 0.9,
              }}
            >
              {item.icon}
            </div>
            <div>
              <p
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#F5F3EF',
                  marginBottom: 2,
                  letterSpacing: '-0.01em',
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontSize: '0.72rem',
                  color: '#6B6965',
                  letterSpacing: '0.01em',
                }}
              >
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
