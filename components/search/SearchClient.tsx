'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, X, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/products';

// ─── Types ────────────────────────────────────────────────────

type SortOption = 'featured' | 'price-asc' | 'price-desc';
type BrandFilter = 'all' | 'rolex' | 'cartier' | 'audemars-piguet' | 'patek-philippe';
type RangeFilter = 'all' | 'essential' | 'premium';

interface SearchFilters {
  query: string;
  brand: BrandFilter;
  range: RangeFilter;
  sort: SortOption;
}

const BRAND_LABELS: Record<BrandFilter, string> = {
  all: '',
  rolex: 'Rolex',
  cartier: 'Cartier',
  'audemars-piguet': 'Audemars Piguet',
  'patek-philippe': 'Patek Philippe',
};

// ─── Search logic ─────────────────────────────────────────────

function searchProducts(products: Product[], filters: SearchFilters): Product[] {
  let results = [...products];

  // Keyword search
  if (filters.query.trim()) {
    const terms = filters.query.toLowerCase().trim().split(/\s+/);
    results = results.filter((p) => {
      const haystack = [
        p.name,
        p.variant,
        p.brand,
        p.collection,
        p.descriptionShort,
        p.specs.dialColor ?? '',
        p.specs.bracelet ?? '',
        p.specs.caseDiameter ?? '',
        p.specs.bezel ?? '',
        p.specs.material ?? '',
        p.specs.movement ?? '',
        p.range,
        p.badge ?? '',
        ...p.availableColors,
      ]
        .join(' ')
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }

  // Brand filter
  if (filters.brand !== 'all') {
    results = results.filter((p) => p.brandSlug === filters.brand);
  }

  // Range filter
  if (filters.range !== 'all') {
    results = results.filter((p) => p.range === filters.range);
  }

  // Sort
  if (filters.sort === 'price-asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (filters.sort === 'price-desc') {
    results.sort((a, b) => b.price - a.price);
  } else {
    // Featured: bestSeller first, then featured, then rest
    results.sort((a, b) => {
      if (a.bestSeller && !b.bestSeller) return -1;
      if (!a.bestSeller && b.bestSeller) return 1;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }

  return results;
}

// ─── Product Card ─────────────────────────────────────────────

function ProductCard({ product, t }: { product: Product; t: ReturnType<typeof useTranslations<'search'>> }) {
  const href = `/collections/${product.brandSlug}/${product.collectionSlug}/${product.slug}`;

  const scarcityLabel = (() => {
    if (!product.inStock) return { text: t('outOfStock'), color: '#6B6965' };
    if (product.stockCount < 5)
      return { text: t('lowStock', { count: product.stockCount }), color: '#E8B86D' };
    if (product.badge === 'best-seller') return { text: t('bestSeller'), color: '#C9A96E' };
    if (product.badge === 'high-demand') return { text: t('highDemand'), color: '#C9A96E' };
    if (product.badge === 'new-arrival') return { text: t('newArrival'), color: '#A8A5A0' };
    if (product.badge === 'just-restocked') return { text: t('justRestocked'), color: '#A8A5A0' };
    return null;
  })();

  return (
    <Link
      href={href}
      style={{
        display: 'block',
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 4,
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.3s, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Range badge */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          fontSize: '0.55rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '3px 8px',
          borderRadius: 2,
          background: product.range === 'premium'
            ? 'rgba(201,169,110,0.12)'
            : 'rgba(168,165,160,0.1)',
          border: product.range === 'premium'
            ? '1px solid rgba(201,169,110,0.25)'
            : '1px solid rgba(168,165,160,0.2)',
          color: product.range === 'premium' ? '#C9A96E' : '#A8A5A0',
        }}
      >
        {product.range === 'premium' ? t('premiumBadge') : t('essentialBadge')}
      </div>

      {/* Image placeholder */}
      <div
        style={{
          aspectRatio: '1 / 1',
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {product.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={`${product.brand} ${product.name} ${product.variant}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '20px 20px 22px' }}>
        {/* Brand */}
        <p
          style={{
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 6,
          }}
        >
          {product.brand}
        </p>

        {/* Name */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#F5F3EF',
            lineHeight: 1.2,
            marginBottom: 4,
            letterSpacing: '-0.01em',
          }}
        >
          {product.name}
        </h3>

        {/* Variant */}
        <p
          style={{
            fontSize: '0.75rem',
            color: '#6B6965',
            marginBottom: 16,
          }}
        >
          {product.variant}
        </p>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F5F3EF', letterSpacing: '-0.01em' }}>
              {formatPrice(product.price)}
              <span style={{ fontSize: '0.65rem', color: '#6B6965', marginLeft: 4 }}>CAD</span>
            </p>
            {product.range === 'premium' && product.hasEssentialVariant && product.essentialPrice && (
              <p style={{ fontSize: '0.65rem', color: '#6B6965', marginTop: 2 }}>
                {t('fromPrice')} {formatPrice(product.essentialPrice)} CAD
              </p>
            )}
          </div>

          {scarcityLabel && (
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: scarcityLabel.color,
              }}
            >
              {scarcityLabel.text}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Filter Select ────────────────────────────────────────────

function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        style={{
          appearance: 'none',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3,
          color: '#A8A5A0',
          fontSize: '0.72rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          padding: '8px 32px 8px 12px',
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color 0.2s, color 0.2s',
          minWidth: 140,
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(201,169,110,0.4)';
          (e.currentTarget as HTMLSelectElement).style.color = '#F5F3EF';
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.1)';
          (e.currentTarget as HTMLSelectElement).style.color = '#A8A5A0';
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#141414', color: '#F5F3EF' }}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#6B6965',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export function SearchClient({
  products,
  initialQuery = '',
  initialBrand = 'all',
  initialRange = 'all',
  initialSort = 'featured',
}: {
  products: Product[];
  initialQuery?: string;
  initialBrand?: BrandFilter;
  initialRange?: RangeFilter;
  initialSort?: SortOption;
}) {
  const t = useTranslations('search');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    brand: initialBrand,
    range: initialRange,
    sort: initialSort,
  });

  const results = searchProducts(products, filters);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync filters to URL
  const syncUrl = useCallback(
    (newFilters: SearchFilters) => {
      const params = new URLSearchParams();
      if (newFilters.query) params.set('q', newFilters.query);
      if (newFilters.brand !== 'all') params.set('brand', newFilters.brand);
      if (newFilters.range !== 'all') params.set('range', newFilters.range);
      if (newFilters.sort !== 'featured') params.set('sort', newFilters.sort);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    syncUrl(next);
  };

  const clearAll = () => {
    const next: SearchFilters = { query: '', brand: 'all', range: 'all', sort: 'featured' };
    setFilters(next);
    router.replace(pathname, { scroll: false });
    inputRef.current?.focus();
  };

  const hasActiveFilters =
    filters.query || filters.brand !== 'all' || filters.range !== 'all';

  const brandOptions = [
    { value: 'all', label: t('allBrands') },
    { value: 'rolex', label: 'Rolex' },
    { value: 'cartier', label: 'Cartier' },
    { value: 'audemars-piguet', label: 'Audemars Piguet' },
    { value: 'patek-philippe', label: 'Patek Philippe' },
  ];

  const rangeOptions = [
    { value: 'all', label: t('allRanges') },
    { value: 'essential', label: t('essential') },
    { value: 'premium', label: t('premium') },
  ];

  const sortOptions = [
    { value: 'featured', label: t('sortFeatured') },
    { value: 'price-asc', label: t('sortPriceLow') },
    { value: 'price-desc', label: t('sortPriceHigh') },
  ];

  const countLabel =
    results.length === 1
      ? t('resultsCount', { count: results.length })
      : t('resultsCountPlural', { count: results.length });

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {/* ── Search Hero ── */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 120px) 24px 0',
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 60%)',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          {/* Overline */}
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 20,
            }}
          >
            {t('pageOverline')}
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-editorial, "Playfair Display", serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#F5F3EF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 40,
            }}
          >
            {t('pageHeadline')}
          </h1>

          {/* Search input */}
          <div
            style={{
              position: 'relative',
              marginBottom: 0,
            }}
          >
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6B6965',
                pointerEvents: 'none',
              }}
            />
            <input
              ref={inputRef}
              type="search"
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              placeholder={t('placeholder')}
              autoComplete="off"
              spellCheck={false}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4,
                color: '#F5F3EF',
                fontSize: '1rem',
                padding: '18px 48px 18px 52px',
                outline: 'none',
                transition: 'border-color 0.2s, background 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)';
                (e.currentTarget as HTMLInputElement).style.background = 'rgba(255,255,255,0.06)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLInputElement).style.background = 'rgba(255,255,255,0.04)';
              }}
            />
            {filters.query && (
              <button
                onClick={() => updateFilter('query', '')}
                aria-label={t('clearQuery')}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B6965',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#A8A5A0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#6B6965')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Filters bar ── */}
      <section
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '20px 24px',
          position: 'sticky',
          top: 72,
          zIndex: 10,
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {/* Count */}
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: '#6B6965',
              marginRight: 8,
              whiteSpace: 'nowrap',
            }}
          >
            {countLabel}
          </span>

          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)', minWidth: 20 }} />

          {/* Brand filter */}
          <FilterSelect
            value={filters.brand}
            onChange={(v) => updateFilter('brand', v as BrandFilter)}
            options={brandOptions}
            label={t('brandLabel')}
          />

          {/* Range filter */}
          <FilterSelect
            value={filters.range}
            onChange={(v) => updateFilter('range', v as RangeFilter)}
            options={rangeOptions}
            label={t('rangeLabel')}
          />

          {/* Sort */}
          <FilterSelect
            value={filters.sort}
            onChange={(v) => updateFilter('sort', v as SortOption)}
            options={sortOptions}
            label={t('sortLabel')}
          />

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: '1px solid rgba(201,169,110,0.2)',
                borderRadius: 3,
                cursor: 'pointer',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                padding: '7px 12px',
                transition: 'background 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.08)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.2)';
              }}
            >
              <X size={10} />
              {t('clearQuery')}
            </button>
          )}
        </div>
      </section>

      {/* ── Results ── */}
      <section style={{ padding: 'clamp(40px, 6vw, 80px) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {results.length > 0 ? (
            <div className="search-grid">
              <style>{`
                .search-grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  gap: 20px;
                }
                @media (max-width: 1100px) {
                  .search-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 700px) {
                  .search-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 480px) {
                  .search-grid { grid-template-columns: 1fr; }
                }
              `}</style>

              {results.map((product) => (
                <ProductCard key={product.id} product={product} t={t} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'clamp(60px, 10vw, 120px) 0',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 28,
                }}
              >
                <Search size={24} color="rgba(168,165,160,0.4)" />
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 700,
                  color: '#F5F3EF',
                  marginBottom: 12,
                  letterSpacing: '-0.01em',
                }}
              >
                {t('noResults')}
              </h2>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#6B6965',
                  maxWidth: 400,
                  lineHeight: 1.65,
                  marginBottom: 40,
                }}
              >
                {t('noResultsHint')}
              </p>

              {/* Brand suggestion chips */}
              <p
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#6B6965',
                  marginBottom: 16,
                }}
              >
                {t('suggestionsLabel')}
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                {(['rolex', 'cartier', 'audemars-piguet', 'patek-philippe'] as BrandFilter[]).map((slug) => (
                  <button
                    key={slug}
                    onClick={() => {
                      const next: SearchFilters = {
                        ...filters,
                        query: '',
                        brand: slug,
                      };
                      setFilters(next);
                      syncUrl(next);
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 3,
                      color: '#A8A5A0',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      padding: '8px 16px',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)';
                      (e.currentTarget as HTMLElement).style.color = '#C9A96E';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.color = '#A8A5A0';
                    }}
                  >
                    {BRAND_LABELS[slug]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
