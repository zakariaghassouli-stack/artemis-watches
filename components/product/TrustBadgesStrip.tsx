import { Clock, MapPin, RotateCcw, ShoppingBag } from 'lucide-react';

interface Props {
  labels: {
    orders: string;
    montreal: string;
    returns: string;
    response: string;
  };
}

export function TrustBadgesStrip({ labels }: Props) {
  const items = [
    { icon: ShoppingBag, label: labels.orders },
    { icon: MapPin, label: labels.montreal },
    { icon: RotateCcw, label: labels.returns },
    { icon: Clock, label: labels.response },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 8,
        marginBottom: 20,
      }}
    >
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '10px 12px',
            border: '1px solid rgba(201,169,110,0.22)',
            borderRadius: 3,
            background: 'rgba(201,169,110,0.05)',
          }}
        >
          <Icon
            size={13}
            strokeWidth={1.9}
            style={{ color: '#C9A96E', flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#E8D5A8',
              letterSpacing: '0.03em',
              lineHeight: 1.2,
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
