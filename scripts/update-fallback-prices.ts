import fs from 'node:fs';
import path from 'node:path';
import {
  getOfficialBoxAndPapersPrice,
  getOfficialEssentialCompanionPrice,
  getOfficialPrice,
  replaceSeoPriceCopy,
  type PriceSubject,
} from '../lib/price-grid';

type JsonProduct = {
  brand?: string | null;
  brandSlug?: string | null;
  collection?: string | null;
  collectionSlug?: string | null;
  name?: string | null;
  variant?: string | null;
  slug?: string | null;
  range?: 'essential' | 'premium' | string | null;
  price?: number | null;
  essentialPrice?: number | null;
  boxAndPapersPrice?: number | null;
  seoDescription?: string | null;
  seoDescriptionFr?: string | null;
};

function getSubject(product: JsonProduct): PriceSubject {
  return {
    brand: product.brand,
    brandSlug: product.brandSlug,
    collection: product.collection,
    collectionSlug: product.collectionSlug,
    variant: product.variant,
    name: product.name,
    slug: product.slug,
    range: product.range,
  };
}

function main() {
  const productsDir = path.join(process.cwd(), 'data/products');
  const files = fs
    .readdirSync(productsDir)
    .filter((file) => file.endsWith('.json'))
    .sort();

  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(productsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as JsonProduct;
    const subject = getSubject(data);
    const newPrice = getOfficialPrice(subject);

    if (newPrice === null) {
      console.log(`SKIP ${file} — no official rule matched`);
      skipped += 1;
      continue;
    }

    data.price = newPrice;
    data.boxAndPapersPrice = getOfficialBoxAndPapersPrice(subject);
    data.seoDescription = replaceSeoPriceCopy(data.seoDescription, newPrice, 'en');
    data.seoDescriptionFr = replaceSeoPriceCopy(data.seoDescriptionFr, newPrice, 'fr');

    if (data.range === 'premium') {
      data.essentialPrice = getOfficialEssentialCompanionPrice(subject);
    } else if (data.range === 'essential') {
      data.essentialPrice = null;
    }

    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
    console.log(
      `UPDATED ${file} → $${newPrice} | box=${data.boxAndPapersPrice} | essential=${data.essentialPrice ?? 'null'}`
    );
    updated += 1;
  }

  console.log(`\nFallback JSON update complete. Updated: ${updated}, skipped: ${skipped}`);
}

main();
