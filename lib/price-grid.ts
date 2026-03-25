type SupportedRange = 'essential' | 'premium';

export interface PriceSubject {
  brand?: string | null;
  brandSlug?: string | null;
  collection?: string | null;
  collectionSlug?: string | null;
  name?: string | null;
  slug?: string | null;
  variant?: string | null;
  range?: string | null;
}

const ESSENTIAL_PRICES = {
  submariner: 350,
  'gmt-master-ii': 350,
  datejust: 330,
  'datejust-31': 300,
  'datejust-28': 300,
  'day-date': 330,
  daytona: 350,
  'yacht-master': 320,
  'sky-dweller': 320,
  'land-dweller': 320,
  explorer: 320,
  'oyster-perpetual': 320,
  'air-king': 320,
  nautilus: 350,
  aquanaut: 350,
  calatrava: 350,
  'royal-oak': 350,
  santos: 350,
  panthere: 280,
} as const;

const PREMIUM_PRICES = {
  submariner: 1250,
  'gmt-master-ii': 1450,
  datejust: 1200,
  'day-date': 1550,
  daytona: 1550,
  nautilus: 1400,
  aquanaut: 1400,
  'royal-oak': 1450,
  santos: 1050,
  panthere: 1050,
} as const;

function normalize(value?: string | null) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getBrand(value: PriceSubject) {
  const raw = value.brandSlug || value.brand || '';
  if (raw === 'rolex' || raw === 'Rolex') return 'rolex';
  if (raw === 'cartier' || raw === 'Cartier') return 'cartier';
  if (raw === 'audemars-piguet' || raw === 'Audemars Piguet') return 'audemars-piguet';
  if (raw === 'patek-philippe' || raw === 'Patek Philippe') return 'patek-philippe';
  return normalize(raw).replace(/\s+/g, '-');
}

function getHaystack(value: PriceSubject) {
  return normalize(
    [
      value.collectionSlug,
      value.collection,
      value.name,
      value.slug,
      value.variant,
    ]
      .filter(Boolean)
      .join(' ')
  );
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some((needle) => haystack.includes(needle));
}

function inferCollectionKey(subject: PriceSubject) {
  const haystack = getHaystack(subject);
  const brand = getBrand(subject);

  if (brand === 'rolex') {
    if (includesAny(haystack, ['submariner'])) return 'submariner';
    if (includesAny(haystack, ['gmt master ii', 'gmt master', 'gmt'])) return 'gmt-master-ii';
    if (includesAny(haystack, ['datejust'])) {
      if (includesAny(haystack, [' 31', '31 ', 'datejust 31', 'lady', ' 28', '28 '])) {
        return 'datejust-31';
      }
      return 'datejust';
    }
    if (includesAny(haystack, ['day date'])) return 'day-date';
    if (includesAny(haystack, ['daytona'])) return 'daytona';
    if (includesAny(haystack, ['yacht master'])) return 'yacht-master';
    if (includesAny(haystack, ['sky dweller'])) return 'sky-dweller';
    if (includesAny(haystack, ['land dweller'])) return 'land-dweller';
    if (includesAny(haystack, ['explorer'])) return 'explorer';
    if (includesAny(haystack, ['oyster perpetual'])) return 'oyster-perpetual';
    if (includesAny(haystack, ['air king'])) return 'air-king';
  }

  if (brand === 'cartier') {
    if (includesAny(haystack, ['panthere'])) return 'panthere';
    if (includesAny(haystack, ['santos'])) return 'santos';
  }

  if (brand === 'audemars-piguet') {
    if (includesAny(haystack, ['royal oak'])) return 'royal-oak';
  }

  if (brand === 'patek-philippe') {
    if (includesAny(haystack, ['nautilus'])) return 'nautilus';
    if (includesAny(haystack, ['aquanaut'])) return 'aquanaut';
    if (includesAny(haystack, ['calatrava', 'skeleton'])) return 'calatrava';
  }

  return null;
}

function getRange(range?: string | null): SupportedRange | null {
  if (range === 'essential' || range === 'premium') return range;
  return null;
}

export function getOfficialPrice(subject: PriceSubject): number | null {
  const range = getRange(subject.range);
  const collectionKey = inferCollectionKey(subject);

  if (!range || !collectionKey) return null;

  if (range === 'essential') {
    return ESSENTIAL_PRICES[collectionKey as keyof typeof ESSENTIAL_PRICES] ?? null;
  }

  return PREMIUM_PRICES[collectionKey as keyof typeof PREMIUM_PRICES] ?? null;
}

export function getOfficialEssentialCompanionPrice(subject: PriceSubject): number | null {
  const collectionKey = inferCollectionKey({ ...subject, range: 'essential' });

  if (!collectionKey) return null;
  return ESSENTIAL_PRICES[collectionKey as keyof typeof ESSENTIAL_PRICES] ?? null;
}

export function getOfficialBoxAndPapersPrice(subject: PriceSubject): number {
  return getRange(subject.range) === 'premium' ? 0 : 49;
}

export function formatPriceCAD(value: number, locale: 'en' | 'fr' = 'en') {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function replaceSeoPriceCopy(
  text: string | null | undefined,
  price: number,
  locale: 'en' | 'fr' = 'en'
) {
  if (!text) return text ?? '';
  return text.replace(/\$\s?\d[\d\s,]*\s*CAD/gi, `$${formatPriceCAD(price, locale)} CAD`);
}
