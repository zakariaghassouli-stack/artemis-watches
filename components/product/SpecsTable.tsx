import type { ProductSpecs } from '@/types/product';

interface SpecsTableProps {
  specs: ProductSpecs;
  labels: {
    heading: string;
    fields: Partial<Record<keyof ProductSpecs, string>>;
  };
}

// Order specs in a sensible reading flow regardless of insertion order
const FIELD_ORDER: Array<keyof ProductSpecs> = [
  'caseDiameter',
  'caseThickness',
  'caseMaterial',
  'material',
  'dialColor',
  'bezel',
  'crystal',
  'movement',
  'powerReserve',
  'lume',
  'waterResistance',
  'bracelet',
  'clasp',
];

export function SpecsTable({ specs, labels }: SpecsTableProps) {
  const rows = FIELD_ORDER
    .map((key) => {
      const value = specs[key];
      const label = labels.fields[key];
      if (!value || !label || typeof value !== 'string') return null;
      return { key, label, value };
    })
    .filter((row): row is { key: keyof ProductSpecs; label: string; value: string } => row !== null);

  if (rows.length === 0) return null;

  return (
    <section
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
      }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <p
          style={{
            fontSize: '0.66rem',
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 24,
          }}
        >
          {labels.heading}
        </p>

        <dl
          style={{
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.42fr) minmax(0, 1fr)',
            rowGap: 0,
            columnGap: 32,
          }}
          className="specs-grid"
        >
          <style>{`
            @media (max-width: 600px) {
              .specs-grid {
                grid-template-columns: minmax(0, 0.5fr) minmax(0, 1fr) !important;
                column-gap: 16px !important;
              }
            }
          `}</style>
          {rows.map(({ key, label, value }, index) => {
            const isLast = index === rows.length - 1;
            const rowStyle = {
              padding: '14px 0',
              borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
            } as const;
            return (
              <div key={key} style={{ display: 'contents' }}>
                <dt
                  style={{
                    ...rowStyle,
                    fontSize: '0.74rem',
                    fontWeight: 500,
                    color: '#8F8B84',
                    letterSpacing: '0.02em',
                  }}
                >
                  {label}
                </dt>
                <dd
                  style={{
                    ...rowStyle,
                    margin: 0,
                    fontSize: '0.85rem',
                    color: '#E5DFD5',
                    lineHeight: 1.5,
                  }}
                >
                  {value}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
