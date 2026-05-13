'use client';

import { useTranslations } from 'next-intl';

interface ComplementsProps {
  range: 'essential' | 'premium';
  /** Add-on price (CAD) for the relevant tier - coming from the singleton. */
  price: number;
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Optional Sanity-driven description override; falls back to i18n default. */
  description?: string | null;
  /** Optional shared inclusions to list under the card. */
  inclusions?: string[] | null;
  /** True when the box & papers cost is already absorbed (Premium with included BP). */
  alreadyIncluded?: boolean;
}

export function Complements({
  range,
  price,
  checked,
  onChange,
  description,
  inclusions,
  alreadyIncluded = false,
}: ComplementsProps) {
  const t = useTranslations('complements');

  const cardTitle =
    range === 'premium' ? t('premiumCardTitle') : t('essentialCardTitle');
  const defaultDesc =
    range === 'premium' ? t('premiumDefaultDesc') : t('essentialDefaultDesc');
  const body = description?.trim() || defaultDesc;

  const priceLabel = `${t('pricePrefix')}${price} $ CAD`;

  if (alreadyIncluded) return null;

  const checkboxLabel = checked ? t('addedToOrder') : t('addToOrder');

  return (
    <section
      aria-labelledby="complements-title"
      style={{
        marginTop: 24,
        marginBottom: 24,
      }}
    >
      <h3
        id="complements-title"
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8C8884',
          marginBottom: 14,
        }}
      >
        {t('title')}
      </h3>

      <article
        style={{
          padding: '20px 22px',
          borderRadius: 6,
          border: checked
            ? '1px solid rgba(201,169,110,0.45)'
            : '1px solid rgba(255,255,255,0.08)',
          background: checked
            ? 'rgba(201,169,110,0.06)'
            : 'rgba(255,255,255,0.02)',
          transition: 'border-color 0.2s, background 0.2s',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 8,
          }}
        >
          <p
            style={{
              fontFamily:
                'var(--font-playfair, "Playfair Display", serif)',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              color: '#F5F3EF',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {cardTitle}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#C9A96E',
              whiteSpace: 'nowrap',
            }}
          >
            {priceLabel}
          </p>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: '0.88rem',
            color: '#A8A5A0',
            lineHeight: 1.6,
            marginBottom: inclusions && inclusions.length > 0 ? 12 : 18,
          }}
        >
          {body}
        </p>

        {inclusions && inclusions.length > 0 ? (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 18px',
              display: 'grid',
              gap: 6,
            }}
          >
            {inclusions.map((bullet) => (
              <li
                key={bullet}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  fontSize: '0.82rem',
                  color: '#A8A5A0',
                  lineHeight: 1.5,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flex: '0 0 auto',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#C9A96E',
                    marginTop: 7,
                  }}
                />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-label={checkboxLabel}
            style={{
              width: 18,
              height: 18,
              accentColor: '#C9A96E',
              cursor: 'pointer',
            }}
          />
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: checked ? '#C9A96E' : '#E8E5DF',
            }}
          >
            {checkboxLabel}
          </span>
        </label>
      </article>
    </section>
  );
}
