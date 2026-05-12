import type { CSSProperties } from 'react';
import type { ScarcityState } from '@/lib/products';
import type { ProductRange } from '@/types/product';

type BadgeSize = 'xs' | 'sm' | 'md';
type ScarcityKind = NonNullable<ScarcityState>['type'];

interface ScarcityLabels {
  lowStock?: string;
  bestSeller: string;
  highDemand: string;
  newArrival: string;
  justRestocked: string;
  stockImmediate: string;
  essentialOnly: string;
  premiumOnly: string;
  preparationMontreal: string;
}

const SIZE_STYLES: Record<BadgeSize, CSSProperties> = {
  xs: {
    fontSize: '0.52rem',
    padding: '3px 8px',
    letterSpacing: '0.04em',
  },
  sm: {
    fontSize: '0.56rem',
    padding: '4px 9px',
    letterSpacing: '0.04em',
  },
  md: {
    fontSize: '0.62rem',
    padding: '5px 10px',
    letterSpacing: '0.05em',
  },
};

const BADGE_BASE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 999,
  fontWeight: 600,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

export function RangeBadge({
  range,
  premiumLabel,
  essentialLabel,
  size = 'sm',
}: {
  range: ProductRange;
  premiumLabel: string;
  essentialLabel: string;
  size?: BadgeSize;
}) {
  const premium = range === 'premium';

  return (
    <span
      style={{
        ...BADGE_BASE,
        ...SIZE_STYLES[size],
        color: premium ? '#C9A96E' : '#C9C5BC',
        background: premium ? 'rgba(201,169,110,0.1)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${premium ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.08)'}`,
        whiteSpace: 'normal',
        textAlign: 'center',
        borderRadius: 6,
        maxWidth: '100%',
        lineHeight: 1.35,
      }}
    >
      {premium ? premiumLabel : essentialLabel}
    </span>
  );
}

export function ScarcityBadge({
  scarcity,
  labels,
  size = 'sm',
  excludeTypes = [],
}: {
  scarcity: ScarcityState;
  labels: ScarcityLabels;
  size?: BadgeSize;
  excludeTypes?: ScarcityKind[];
}) {
  if (!scarcity || excludeTypes.includes(scarcity.type)) {
    return null;
  }

  const label =
    scarcity.type === 'best-seller'
      ? labels.bestSeller
      : scarcity.type === 'high-demand'
      ? labels.highDemand
      : scarcity.type === 'new-arrival'
      ? labels.newArrival
      : scarcity.type === 'just-restocked'
      ? labels.justRestocked
      : scarcity.type === 'stock-immediate'
      ? labels.stockImmediate
      : scarcity.type === 'essential-only'
      ? labels.essentialOnly
      : scarcity.type === 'premium-only'
      ? labels.premiumOnly
      : labels.preparationMontreal;

  const isSignature = scarcity.type === 'preparation-montreal';

  return (
    <span
      style={{
        ...BADGE_BASE,
        ...SIZE_STYLES[size],
        color: isSignature ? '#C9A96E' : '#D6D1C9',
        background: isSignature ? 'rgba(201,169,110,0.1)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${isSignature ? 'rgba(201,169,110,0.24)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {label}
    </span>
  );
}
