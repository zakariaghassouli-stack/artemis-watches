import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

type JsonProduct = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  collection: string;
  variant: string;
  range: 'essential' | 'premium';
  price: number;
  compareAtPrice: number | null;
  currency: 'CAD';
  inStock: boolean;
  stockCount: number;
  badge: string | null;
  images: string[];
  video?: string | null;
  description: string;
  descriptionShort: string;
  keyPoints: string[];
  specs: Record<string, string>;
  availableSizes: string[];
  availableColors: string[];
  featured: boolean;
  bestSeller: boolean;
  essentialPrice: number | null;
  boxAndPapersPrice: number;
  relatedProducts: string[];
  reviews: Array<{
    id: string;
    rating: number;
    title: string;
    body: string;
    author: string;
    city: string;
    verified: boolean;
    date: string;
  }>;
  seoTitle?: string;
  seoDescription?: string;
  descriptionFr?: string;
  descriptionShortFr?: string;
  keyPointsFr?: string[];
};

function paragraphBlocks(text?: string) {
  if (!text?.trim()) return [];

  return text
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => ({
      _key: `block-${index}`,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: `span-${index}`,
          _type: 'span',
          marks: [],
          text: paragraph,
        },
      ],
    }));
}

function mapBadge(badge: string | null) {
  switch (badge) {
    case 'best-seller':
      return 'client-favourite';
    case 'new-arrival':
      return 'new-arrival';
    case 'high-demand':
      return 'versatile-pick';
    case 'just-restocked':
      return 'popular-gift';
    default:
      return '';
  }
}

type SanityWriteClient = Awaited<typeof import('@/lib/sanity')>['writeClient'];

async function getWriteClient() {
  const { assertSanityWriteAccess } = await import('@/lib/sanity');
  return assertSanityWriteAccess();
}

async function uploadImageAsset(client: NonNullable<SanityWriteClient>, sourcePath: string) {
  const stream = fs.createReadStream(sourcePath);
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(sourcePath),
  });

  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: asset._id },
  };
}

async function uploadVideoAsset(client: NonNullable<SanityWriteClient>, sourcePath: string) {
  const buffer = fs.readFileSync(sourcePath);
  const asset = await client.assets.upload('file', Readable.from(buffer), {
    filename: path.basename(sourcePath),
    contentType: 'video/mp4',
  });

  return {
    _type: 'file' as const,
    asset: { _type: 'reference' as const, _ref: asset._id },
  };
}

async function migrateProducts() {
  const client = await getWriteClient();
  const productsDir = path.join(process.cwd(), 'data/products');
  const publicDir = path.join(process.cwd(), 'public');
  const files = fs.readdirSync(productsDir).filter((file) => file.endsWith('.json'));
  const products: JsonProduct[] = [];

  for (const file of files) {
    const data = JSON.parse(
      fs.readFileSync(path.join(productsDir, file), 'utf8')
    ) as JsonProduct;
    products.push(data);

    const images = [];
    for (const imagePath of data.images ?? []) {
      const absolutePath = path.join(publicDir, imagePath.replace(/^\//, ''));
      if (!fs.existsSync(absolutePath)) continue;
      images.push(await uploadImageAsset(client, absolutePath));
    }

    const video = data.video
      ? await uploadVideoAsset(
          client,
          path.join(publicDir, data.video.replace(/^\//, ''))
        ).catch(() => undefined)
      : undefined;

    await client.createOrReplace({
      _id: data.id,
      _type: 'product',
      legacyId: data.id,
      name: data.name,
      slug: { _type: 'slug', current: data.slug },
      brand: data.brand,
      collection: data.collection,
      variant: data.variant,
      range: data.range,
      price: data.price,
      compareAtPrice: data.compareAtPrice ?? undefined,
      essentialPrice: data.essentialPrice ?? undefined,
      currency: data.currency,
      inStock: data.inStock,
      stockCount: data.stockCount,
      badge: mapBadge(data.badge),
      images,
      video,
      shortDescription: data.descriptionShort,
      shortDescriptionFr: data.descriptionShortFr ?? '',
      longDescription: paragraphBlocks(data.description),
      longDescriptionFr: paragraphBlocks(data.descriptionFr),
      highlights: data.keyPoints,
      highlightsFr: data.keyPointsFr ?? [],
      specs: {
        ...data.specs,
        ...(data.specs.material ? {} : {}),
      },
      availableSizes: data.availableSizes,
      availableColors: data.availableColors,
      featured: data.featured,
      bestSeller: data.bestSeller,
      boxAndPapersPrice: data.boxAndPapersPrice ?? 49,
      seoTitle: data.seoTitle ?? '',
      seoDescription: data.seoDescription ?? '',
      reviews: data.reviews ?? [],
    });

    console.log(`Migrated product: ${data.id}`);
  }

  for (const data of products) {
    await client
      .patch(data.id)
      .set({
        relatedProducts: (data.relatedProducts ?? []).map((id) => ({
          _type: 'reference',
          _ref: id,
        })),
      })
      .commit();

    console.log(`Linked related products: ${data.id}`);
  }
}

async function migrateSiteSettings() {
  const client = await getWriteClient();

  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    announcementBar: {
      enabled: true,
      en: 'New here? Get 10% off your first order — Shop Now →',
      fr: 'Nouveau client ? Obtenez 10 % sur votre première commande — Magasiner →',
    },
    heroHeadline: {
      en: 'Four iconic brands. One Montreal address.',
      fr: 'Quatre marques iconiques. Une adresse à Montréal.',
    },
    heroSubtext: {
      en: '78 pieces · From $280 · Tracked shipping · 30-day returns',
      fr: '78 pièces · À partir de 280 $ · Livraison suivie · Retours 30 jours',
    },
    welcomeDiscountPercent: 10,
    boxAndPapersPrice: 49,
    whatsappNumber: '15145609765',
  });

  console.log('Migrated site settings');
}

async function main() {
  await migrateProducts();
  await migrateSiteSettings();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
