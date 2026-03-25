'use client';

import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { analytics } from '@/lib/analytics';
import { getFooterWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();
  const footerWhatsAppUrl = getWhatsAppUrl(getFooterWhatsAppMessage(locale));

  return (
    <footer
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 72,
        paddingBottom: 40,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Gold divider */}
        <div
          style={{
            height: 1,
            marginBottom: 56,
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)',
          }}
        />

        {/* 5-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 40,
            marginBottom: 64,
          }}
        >
          {/* Col 1 — Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <span
              style={{
                fontFamily: 'var(--font-editorial, "Playfair Display", serif)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: '#F5F3EF',
                display: 'block',
                marginBottom: 16,
              }}
            >
              ARTEMIS
            </span>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#6B6965',
                lineHeight: 1.7,
                marginBottom: 10,
                maxWidth: 200,
              }}
            >
              {t('tagline')}
            </p>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.34)',
                lineHeight: 1.6,
                marginBottom: 20,
                maxWidth: 220,
              }}
            >
              {t('depth')}
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <SocialLink
                href={footerWhatsAppUrl}
                label="WhatsApp"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                }
              />
              <SocialLink
                href="https://www.instagram.com/artemismtl_"
                label="Instagram"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                }
              />
              <SocialLink
                href="mailto:artemismtl101@gmail.com"
                label="Email"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Col 2 — Collections */}
          <FooterColumn title={t('collections')}>
            <FooterLink href="/collections">{t('allCollections')}</FooterLink>
            <FooterLink href="/collections/rolex">{t('rolex')}</FooterLink>
            <FooterLink href="/collections/cartier">{t('cartier')}</FooterLink>
            <FooterLink href="/collections/audemars-piguet">{t('audemarsPiguet')}</FooterLink>
            <FooterLink href="/collections/patek-philippe">{t('patekPhilippe')}</FooterLink>
            <FooterLink href="/collections/new-arrivals">{t('newArrivals')}</FooterLink>
          </FooterColumn>

          {/* Col 3 — Company */}
          <FooterColumn title={t('company')}>
            <FooterLink href="/about">{t('about')}</FooterLink>
            <FooterLink href="/reviews">{t('reviews')}</FooterLink>
            <FooterLink href="/contact">{t('contact')}</FooterLink>
          </FooterColumn>

          {/* Col 4 — Support */}
          <FooterColumn title={t('support')}>
            <FooterLink href="/faq">{t('faq')}</FooterLink>
            <FooterLink href="/shipping">{t('shippingPolicy')}</FooterLink>
            <FooterLink href="/returns">{t('returnPolicy')}</FooterLink>
            <FooterLink href="/account/orders">{t('trackOrder')}</FooterLink>
            <FooterLink href={footerWhatsAppUrl} external>
              {t('whatsapp')}
            </FooterLink>
          </FooterColumn>

          {/* Col 5 — Legal */}
          <FooterColumn title={t('legal')}>
            <FooterLink href="/terms">{t('termsConditions')}</FooterLink>
            <FooterLink href="/privacy">{t('privacyPolicy')}</FooterLink>
            <FooterLink href="/returns">{t('returnPolicyShort')}</FooterLink>
            <FooterLink href="/shipping">{t('shippingPolicyShort')}</FooterLink>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <p style={{ fontSize: '0.73rem', color: '#6B6965', letterSpacing: '0.04em' }}>
            {t('copyright', { year })}
          </p>
          <p style={{ fontSize: '0.73rem', color: '#6B6965' }}>
            {t('madeIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Helpers ──────────────────────────────────────────────────

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        style={{
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#C9A96E',
          marginBottom: 20,
        }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
        {children}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    fontSize: '0.82rem',
    color: '#6B6965',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
    display: 'inline-block',
  };
  const hover = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) =>
      (e.currentTarget.style.color = '#A8A5A0'),
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) =>
      (e.currentTarget.style.color = '#6B6965'),
  };

  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
          onClick={href.includes('wa.me') ? () => analytics.whatsappClick('footer') : undefined}
          {...hover}
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} style={style} {...hover}>
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={href.includes('wa.me') ? () => analytics.whatsappClick('footer_social') : undefined}
      style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6B6965',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#C9A96E';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#6B6965';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      {icon}
    </a>
  );
}
