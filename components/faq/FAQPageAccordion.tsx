'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

interface Props {
  categories: FAQCategory[];
}

export function FAQPageAccordion({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '');
  const [openItem, setOpenItem] = useState<string | null>('0');

  const current = categories.find((c) => c.id === activeCategory);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenItem('0');
  };

  return (
    <div>
      {/* Category tabs */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          flexWrap: 'nowrap',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          marginBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          paddingBottom: 0,
        }}
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              style={{
                padding: '12px 14px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid #C9A96E' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive ? '#C9A96E' : '#6B6965',
                transition: 'color 0.2s, border-color 0.2s',
                marginBottom: -1,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = '#A8A5A0';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = '#6B6965';
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Accordion items */}
      {current && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {current.items.map((item, i) => {
            const key = String(i);
            const isOpen = openItem === key;
            return (
              <ScrollReveal key={key} delay={i * 40}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={() => setOpenItem(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 24,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '22px 0',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: isOpen ? '#F5F3EF' : '#A8A5A0',
                        transition: 'color 0.2s',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      style={{
                        color: '#C9A96E',
                        flexShrink: 0,
                        display: 'flex',
                      }}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: isOpen ? 600 : 0,
                      transition: 'max-height 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: '#6B6965',
                        lineHeight: 1.85,
                        paddingBottom: 24,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        </div>
      )}
    </div>
  );
}
