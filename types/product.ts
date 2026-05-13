export type ProductRange = 'essential' | 'premium';
export type ShippingSpeed = 'ready-to-ship' | 'made-to-order';
export type FactoryOption = 'VSF' | 'ARF' | 'Clean' | 'ZF' | 'APSF' | 'AF';
export type FactoryChoice = 'subject-to-availability' | 'customer-choice' | null;

export type ProductBadge =
  | 'best-seller'
  | 'high-demand'
  | 'new-arrival'
  | 'just-restocked'
  | 'stock-immediate'
  | 'essential-only'
  | 'premium-only'
  | 'preparation-montreal'
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
  weight?: string;
  hourMarkers?: string;
  hands?: string;
  glassTreatment?: string;
  dialFinish?: string;
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
  /** Pivot V2 stock model — feeds the StockBadge on PDP / cards / cart. */
  stockStatus?: 'in_stock' | 'on_order' | 'out_of_stock';
  leadTimeDays?: number | null;
  stockLabel?: string | null;
  badge: ProductBadge;
  /** Product gallery assets. Prefer 3 photos plus 1 optional video. */
  images: string[];
  video?: string | null;
  shippingSpeed?: ShippingSpeed;
  shippingEstimate?: string;
  specs: ProductSpecs;
  availableSizes: string[];
  availableColors: string[];
  factoryOptions?: FactoryOption[];
  factoryChoice?: FactoryChoice;
  hasEssentialVariant: boolean;
  hasPremiumVariant?: boolean;
  essentialPrice: number | null;
  premiumPrice?: number | null;
  boxAndPapersPrice: number;
  /** IDs of related products */
  relatedProducts: string[];
  reviews: ProductReview[];
  featured: boolean;
  bestSeller: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoTitleFr?: string;
  seoDescriptionFr?: string;
  /** Localized FR fields — used when locale === 'fr' */
  descriptionFr?: string;
  descriptionShortFr?: string;
  keyPointsFr?: string[];
}
