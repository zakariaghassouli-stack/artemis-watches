export interface BrandMeta {
  slug: string;
  name: string;
  tagline: string;
  description: string;
}

export interface CollectionMeta {
  slug: string;
  name: string;
  brandSlug: string;
  description: string;
}

const COLLECTION_ALIASES: Record<string, string> = {
  'gmt-master': 'gmt-master-ii',
};

export const BRAND_META: Record<string, BrandMeta> = {
  rolex: {
    slug: 'rolex',
    name: 'Rolex',
    tagline: 'The Standard of Excellence',
    description:
      'For more than a century, Rolex has defined restraint, precision, and unmistakable wrist presence. At Artemis, Rolex stands for timeless confidence and enduring appeal.',
  },
  cartier: {
    slug: 'cartier',
    name: 'Cartier',
    tagline: 'The Jeweller of Kings',
    description:
      'Cartier balances watchmaking discipline with unmistakable style. The Santos and Panthere embody a Parisian elegance that feels refined without ever forcing it.',
  },
  'audemars-piguet': {
    slug: 'audemars-piguet',
    name: 'Audemars Piguet',
    tagline: 'Break the Rules of Time',
    description:
      'With the Royal Oak, Audemars Piguet turned steel into a luxury statement. The octagonal bezel and tapisserie dial still define one of the sharpest silhouettes in watchmaking.',
  },
  'patek-philippe': {
    slug: 'patek-philippe',
    name: 'Patek Philippe',
    tagline: 'You Never Actually Own a Patek Philippe',
    description:
      'Patek Philippe sits in a category of its own. The Nautilus and Aquanaut capture a rare mix of prestige, restraint, and long-term desirability.',
  },
};

export const COLLECTION_META: Record<string, CollectionMeta> = {
  submariner: {
    slug: 'submariner',
    name: 'Submariner',
    brandSlug: 'rolex',
    description:
      'The dive watch that moved well beyond diving. Since 1953, the Submariner has remained a reference point for robust proportions, legibility, and everyday versatility.',
  },
  datejust: {
    slug: 'datejust',
    name: 'Datejust',
    brandSlug: 'rolex',
    description:
      'A Rolex mainstay since 1945. The Datejust pairs familiar proportions with an easy elegance that feels at home in both formal and everyday settings.',
  },
  'gmt-master-ii': {
    slug: 'gmt-master-ii',
    name: 'GMT-Master II',
    brandSlug: 'rolex',
    description:
      'Designed for pilots and frequent travellers. The bi-colour bezel and dual-time display give the GMT-Master II a practical function and an immediately recognizable silhouette.',
  },
  daytona: {
    slug: 'daytona',
    name: 'Daytona',
    brandSlug: 'rolex',
    description:
      "Rolex's racing chronograph, shaped by motorsport heritage and a highly recognizable dial layout. The Daytona remains one of the house's most discussed modern references.",
  },
  santos: {
    slug: 'santos',
    name: 'Santos de Cartier',
    brandSlug: 'cartier',
    description:
      "The world's first aviator's watch, designed in 1904 for Alberto Santos-Dumont. Architectural, bold, and unmistakably Cartier — over a century of pioneering spirit.",
  },
  panthere: {
    slug: 'panthere',
    name: 'Panthère de Cartier',
    brandSlug: 'cartier',
    description:
      "A distinctly Cartier expression of jewellery watch design. The Panthère's articulated bracelet and square case give it a soft, refined presence on the wrist.",
  },
  'royal-oak': {
    slug: 'royal-oak',
    name: 'Royal Oak',
    brandSlug: 'audemars-piguet',
    description:
      "Gerald Genta's 1972 design that helped define the modern luxury sports watch. The octagonal bezel and tapisserie dial still feel sharp, architectural, and instantly familiar.",
  },
  nautilus: {
    slug: 'nautilus',
    name: 'Nautilus',
    brandSlug: 'patek-philippe',
    description:
      'A modern reference defined by its porthole-inspired case and horizontally embossed dial. The Nautilus balances restraint, prestige, and a distinctive integrated-sports silhouette.',
  },
  aquanaut: {
    slug: 'aquanaut',
    name: 'Aquanaut',
    brandSlug: 'patek-philippe',
    description:
      "Patek's adventurous spirit in watch form. The rounded octagonal case and composite strap give the Aquanaut a bold modernity unique in the Patek catalogue.",
  },
};

export function getBrandMeta(slug: string): BrandMeta | undefined {
  return BRAND_META[slug];
}

export function getCollectionMeta(slug: string): CollectionMeta | undefined {
  return COLLECTION_META[slug] ?? COLLECTION_META[COLLECTION_ALIASES[slug]];
}

export function getCollectionsByBrand(brandSlug: string): CollectionMeta[] {
  return Object.values(COLLECTION_META).filter((c) => c.brandSlug === brandSlug);
}

export function getAllBrands(): BrandMeta[] {
  return Object.values(BRAND_META);
}
