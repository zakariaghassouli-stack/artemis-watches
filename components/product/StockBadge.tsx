'use client';

import { useTranslations } from 'next-intl';

type StockStatus = 'in_stock' | 'on_order' | 'out_of_stock';

interface StockBadgeProps {
  status?: StockStatus | null;
  leadTimeDays?: number | null;
  /** Optional Sanity override label — wins over the default i18n copy. */
  label?: string | null;
  /** Visual density: 'pdp' (default) or 'compact' (cards, cart). */
  size?: 'pdp' | 'compact';
}

const DOT_COLOR: Record<StockStatus, string> = {
  in_stock: '#27AE60',
  on_order: '#E67E22',
  out_of_stock: '#888888',
};

export function StockBadge({
  status = 'in_stock',
  leadTimeDays,
  label,
  size = 'pdp',
}: StockBadgeProps) {
  const t = useTranslations('stockBadge');
  const effective: StockStatus = status ?? 'in_stock';

  let text = label;
  if (!text) {
    if (effective === 'in_stock') text = t('inStock');
    else if (effective === 'out_of_stock') text = t('outOfStock');
    else if (leadTimeDays && Number.isFinite(leadTimeDays))
      text = t('onOrderDays', { days: String(leadTimeDays) });
    else text = t('onOrder');
  }

  const compact = size === 'compact';
  const dot = DOT_COLOR[effective];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 6 : 8,
        fontSize: compact ? '0.7rem' : '0.78rem',
        fontWeight: 500,
        letterSpacing: '0.01em',
        color: '#C7C4BE',
        lineHeight: 1.3,
      }}
    >
      <span
        aria-hidden
        style={{
          flex: '0 0 auto',
          width: compact ? 7 : 8,
          height: compact ? 7 : 8,
          borderRadius: '50%',
          background: dot,
          boxShadow: `0 0 0 2px ${dot}22`,
        }}
      />
      {text}
    </span>
  );
}
