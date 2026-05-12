import type {
  FactoryChoice,
  FactoryOption,
  ProductRange,
  ProductSpecs,
} from '@/types/product';

interface SpecsTableProps {
  specs: ProductSpecs;
  labels: {
    heading: string;
    fields: Partial<Record<keyof ProductSpecs, string>> & { factory?: string };
  };
  range?: ProductRange;
  factoryOptions?: FactoryOption[];
  factoryChoice?: FactoryChoice;
  factoryChoiceLabels?: {
    subjectToAvailability: string;
    customerChoice: string;
  };
}

const FIELD_ORDER: Array<keyof ProductSpecs> = [
  'caseDiameter',
  'caseThickness',
  'caseMaterial',
  'material',
  'weight',
  'dialColor',
  'dialFinish',
  'hourMarkers',
  'hands',
  'lume',
  'bezel',
  'crystal',
  'glassTreatment',
  'movement',
  'powerReserve',
  'waterResistance',
  'bracelet',
  'clasp',
];

type SpecRow = { key: string; label: string; value: string };

function formatFactory(
  options: FactoryOption[],
  choice: FactoryChoice | undefined,
  choiceLabels: SpecsTableProps['factoryChoiceLabels'],
): string {
  if (options.length === 1) return options[0];
  const joined = options.join(' · ');
  if (!choiceLabels) return joined;
  if (choice === 'customer-choice') return `${joined} ${choiceLabels.customerChoice}`;
  if (choice === 'subject-to-availability')
    return `${joined} ${choiceLabels.subjectToAvailability}`;
  return joined;
}

export function SpecsTable({
  specs,
  labels,
  range,
  factoryOptions,
  factoryChoice,
  factoryChoiceLabels,
}: SpecsTableProps) {
  const rows: SpecRow[] = FIELD_ORDER
    .map((key): SpecRow | null => {
      const value = specs[key];
      const label = labels.fields[key];
      if (!value || !label || typeof value !== 'string') return null;
      return { key: String(key), label, value };
    })
    .filter((row): row is SpecRow => row !== null);

  // Premium pieces lead with the source factory row when populated.
  if (
    range === 'premium' &&
    factoryOptions &&
    factoryOptions.length > 0 &&
    labels.fields.factory
  ) {
    rows.unshift({
      key: 'factory',
      label: labels.fields.factory,
      value: formatFactory(factoryOptions, factoryChoice, factoryChoiceLabels),
    });
  }

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
