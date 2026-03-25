import { loadEnvConfig } from '@next/env';
import {
  getOfficialBoxAndPapersPrice,
  getOfficialEssentialCompanionPrice,
  getOfficialPrice,
  replaceSeoPriceCopy,
  type PriceSubject,
} from '../../lib/price-grid';

loadEnvConfig(process.cwd());

type SanityProductRow = {
  _id: string;
  name: string;
  brand?: string | null;
  collection?: string | null;
  variant?: string | null;
  range?: string | null;
  slug?: string | null;
  price?: number | null;
  essentialPrice?: number | null;
  boxAndPapersPrice?: number | null;
  seoDescription?: string | null;
  seoDescriptionFr?: string | null;
};

type SiteSettingsRow = {
  _id: string;
};

function getSubject(product: SanityProductRow): PriceSubject {
  return {
    brand: product.brand,
    collection: product.collection,
    variant: product.variant,
    name: product.name,
    slug: product.slug,
    range: product.range,
  };
}

async function updateProducts() {
  const { assertSanityWriteAccess } = await import('../../lib/sanity');
  const client = assertSanityWriteAccess();
  const products = await client.fetch<SanityProductRow[]>(
    `*[_type == "product"]{
      _id,
      name,
      brand,
      collection,
      variant,
      range,
      "slug": slug.current,
      price,
      essentialPrice,
      boxAndPapersPrice,
      seoDescription,
      seoDescriptionFr
    }`
  );

  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    const subject = getSubject(product);
    const newPrice = getOfficialPrice(subject);

    if (newPrice === null) {
      console.log(`SKIP ${product.name} (${product.range}) — no official rule matched`);
      skipped += 1;
      continue;
    }

    const patch: Record<string, unknown> = {
      price: newPrice,
      boxAndPapersPrice: getOfficialBoxAndPapersPrice(subject),
      seoDescription: replaceSeoPriceCopy(product.seoDescription, newPrice, 'en'),
      seoDescriptionFr: replaceSeoPriceCopy(product.seoDescriptionFr, newPrice, 'fr'),
    };

    const essentialCompanionPrice = getOfficialEssentialCompanionPrice(subject);
    if (product.range === 'premium' && essentialCompanionPrice !== null) {
      patch.essentialPrice = essentialCompanionPrice;
    }

    if (product.range === 'essential') {
      patch.essentialPrice = null;
    }

    await client.patch(product._id).set(patch).commit();
    updated += 1;
    console.log(
      `UPDATED ${product.name} (${product.range}) → $${newPrice} | box=${patch.boxAndPapersPrice}`
    );
  }

  console.log(`\nSanity product update complete. Updated: ${updated}, skipped: ${skipped}`);
}

async function updateSiteSettings() {
  const { assertSanityWriteAccess } = await import('../../lib/sanity');
  const client = assertSanityWriteAccess();
  const siteSettings = await client.fetch<SiteSettingsRow | null>(
    `*[_type == "siteSettings"][0]{ _id }`
  );

  if (!siteSettings?._id) {
    console.log('SKIP siteSettings — document not found');
    return;
  }

  await client
    .patch(siteSettings._id)
    .set({
      heroSubtext: {
        en: '78 pieces · From $280 · Tracked shipping · 30-day returns',
        fr: '78 pièces · À partir de 280 $ · Livraison suivie · Retours 30 jours',
      },
      boxAndPapersPrice: 49,
    })
    .commit();

  console.log('UPDATED siteSettings heroSubtext and boxAndPapersPrice');
}

async function main() {
  await updateProducts();
  await updateSiteSettings();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
