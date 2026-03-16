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

export const BRAND_META: Record<string, BrandMeta> = {
  rolex: {
    slug: 'rolex',
    name: 'Rolex',
    tagline: 'The Standard of Excellence',
    description:
      "The world's most recognizable watch brand. Rolex has defined horological excellence since 1905 — from the depths of the ocean to the summit of Everest. Every Rolex at Artemis is a statement of timeless achievement.",
  },
  cartier: {
    slug: 'cartier',
    name: 'Cartier',
    tagline: 'The Jeweller of Kings',
    description:
      "Cartier's watches carry the elegance that has adorned royalty for over 175 years. The Santos and Panthère are icons of Parisian refinement — precision engineering clothed in art.",
  },
  'audemars-piguet': {
    slug: 'audemars-piguet',
    name: 'Audemars Piguet',
    tagline: 'Break the Rules of Time',
    description:
      'AP invented the luxury sports watch in 1972 with the Royal Oak. The octagonal bezel and tapisserie dial remain the most copied design in watchmaking — and the most coveted.',
  },
  'patek-philippe': {
    slug: 'patek-philippe',
    name: 'Patek Philippe',
    tagline: 'You Never Actually Own a Patek Philippe',
    description:
      'The pinnacle of horological achievement. The Nautilus and Aquanaut carry decade-long waiting lists at authorized dealers worldwide. At Artemis — immediate availability.',
  },
};

export const COLLECTION_META: Record<string, CollectionMeta> = {
  submariner: {
    slug: 'submariner',
    name: 'Submariner',
    brandSlug: 'rolex',
    description:
      'The dive watch that transcended diving. Since 1953, the Submariner has been the defining sports watch — robust, legible, and iconic on any wrist.',
  },
  datejust: {
    slug: 'datejust',
    name: 'Datejust',
    brandSlug: 'rolex',
    description:
      'The most recognized watch in the world. The Datejust has graced boardrooms and red carpets alike since 1945 — the watch that defines classic Rolex.',
  },
  'gmt-master': {
    slug: 'gmt-master',
    name: 'GMT-Master II',
    brandSlug: 'rolex',
    description:
      'Built for pilots and globe-trotters. The bi-colour bezel and dual-timezone display make the GMT-Master II the most versatile — and most distinctive — Rolex ever made.',
  },
  daytona: {
    slug: 'daytona',
    name: 'Daytona',
    brandSlug: 'rolex',
    description:
      "The chronograph of champions. Born on the racing circuit, the Daytona's extreme scarcity and racing heritage make it the most desired Rolex in the world.",
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
      "The ultimate statement of Parisian elegance. The Panthère's articulated bracelet and square case define Cartier's most refined expression.",
  },
  'royal-oak': {
    slug: 'royal-oak',
    name: 'Royal Oak',
    brandSlug: 'audemars-piguet',
    description:
      "Gerald Genta's 1972 masterpiece that launched luxury sports watches. The octagonal bezel with exposed screws and tapisserie dial remain the most copied design in watchmaking.",
  },
  nautilus: {
    slug: 'nautilus',
    name: 'Nautilus',
    brandSlug: 'patek-philippe',
    description:
      'The holy grail of modern watches. The porthole-shaped case and horizontally embossed blue dial define the ultimate steel sports watch — with decade-long waiting lists at ADs worldwide.',
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
  return COLLECTION_META[slug];
}

export function getCollectionsByBrand(brandSlug: string): CollectionMeta[] {
  return Object.values(COLLECTION_META).filter((c) => c.brandSlug === brandSlug);
}

export function getAllBrands(): BrandMeta[] {
  return Object.values(BRAND_META);
}
