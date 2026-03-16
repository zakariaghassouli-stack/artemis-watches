export type ProductRange = 'essential' | 'premium';

export type ProductBadge =
  | 'best-seller'
  | 'low-stock'
  | 'high-demand'
  | 'new-arrival'
  | 'just-restocked'
  | null;

export interface ProductSpecs {
  caseDiameter?: string;
  caseThickness?: string;
  dialColor?: string;
  bracelet?: string;
  clasp?: string;
  bezel?: string;
  lume?: string;
  material?: string;
  crystal?: string;
  movement?: string;
  powerReserve?: string;
  waterResistance?: string;
  [key: string]: string | undefined;
}

export interface ProductReview {
  id: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  city: string;
  verified: boolean;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  brandSlug: string;
  collection: string;
  collectionSlug: string;
  name: string;
  variant: string;
  description: string;
  descriptionShort: string;
  keyPoints: string[];
  range: ProductRange;
  price: number;
  compareAtPrice: number | null;
  currency: 'CAD';
  inStock: boolean;
  stockCount: number;
  badge: ProductBadge;
  /** 6 image paths relative to /public */
  images: string[];
  specs: ProductSpecs;
  availableSizes: string[];
  availableColors: string[];
  hasEssentialVariant: boolean;
  essentialPrice: number | null;
  boxAndPapersPrice: 49;
  /** IDs of related products */
  relatedProducts: string[];
  reviews: ProductReview[];
  featured: boolean;
  bestSeller: boolean;
  seoTitle?: string;
  seoDescription?: string;
}
