'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  title: string;
  items: FAQItem[];
}

export function ProductFAQ({ title, items }: Props) {
  const [openIndex, setOpenIndex] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  // Schema.org FAQPage JSON-LD for SEO snippets. Strip newlines from
  // answers to keep the JSON compact and valid.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer.replace(/\s+/g, ' ').trim(),
      },
    })),
  };

  return (
    <section
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
          {title}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item, i) => {
            const open = openIndex.has(i);
            return (
              <div
                key={i}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '20px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 500,
                      color: '#E5DFD5',
                      letterSpacing: '0.01em',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.6}
                    style={{
                      color: '#C9A96E',
                      flexShrink: 0,
                      transition: 'transform 0.2s ease',
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                {open && (
                  <p
                    style={{
                      padding: '0 0 24px',
                      fontSize: '0.88rem',
                      color: '#8F8B84',
                      lineHeight: 1.7,
                      letterSpacing: '0.01em',
                      maxWidth: 720,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
