import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderProps {
  overline?: string;
  headline: string;
  subheadline?: string;
  align?: 'left' | 'center';
  accentHeadline?: boolean; // italic editorial style on last word
}

export function SectionHeader({
  overline,
  headline,
  subheadline,
  align = 'center',
  accentHeadline = false,
}: SectionHeaderProps) {
  const textAlign = align === 'center' ? 'center' : 'left';
  const maxWidth = align === 'center' ? 640 : undefined;
  const margin = align === 'center' ? '0 auto' : undefined;

  return (
    <div style={{ textAlign, maxWidth, margin, marginBottom: 56 }}>
      {overline && (
        <ScrollReveal delay={0}>
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 16,
            }}
          >
            {overline}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={80}>
        <h2
          style={{
            fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#F5F3EF',
            marginBottom: subheadline ? 20 : 0,
          }}
        >
          {headline}
        </h2>
      </ScrollReveal>
      {subheadline && (
        <ScrollReveal delay={160}>
          <p
            style={{
              fontSize: '1rem',
              color: '#A8A5A0',
              lineHeight: 1.75,
              maxWidth: align === 'center' ? 560 : 620,
              margin: align === 'center' ? '0 auto' : undefined,
            }}
          >
            {subheadline}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
