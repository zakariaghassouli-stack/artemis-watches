#!/usr/bin/env node
/**
 * Phase 3 — enrichment of data/products/*.json:
 *  1. Genericize brand-trademarked terms in specs, keyPoints (EN + FR),
 *     and description/descriptionShort (EN + FR)
 *  2. Add `movement` and `powerReserve` based on `range`
 *
 * Idempotent: re-running produces no diff if already migrated.
 * Run from repo root: `node scripts/enrich-product-specs.mjs`
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = join(__dirname, '..', 'data', 'products');

// Order matters: most specific patterns first so partial matches don't fire early.
const TM_REPLACEMENTS = [
  // Compound terms first
  [/Oysterclasp with Easylink/g, 'Folding clasp with adjustable extension'],
  [/Oysterclasp with safety lock/g, 'Folding clasp with safety lock'],
  [/Oysterclasp/g, 'Folding clasp'],
  [/Easylink/g, 'adjustable extension'],
  [/Oysterflex bracelet/g, 'Rubber-coated link bracelet'],
  [/Oysterflex/g, 'rubber-coated bracelet'],

  // Bracelet phrasing — anchor on "Oyster," prefix
  [/Oyster or rubber-coated bracelet, stainless steel/g, 'Three-piece links or rubber-coated, stainless steel'],
  [/Oyster, three-piece solid links, stainless steel/g, 'Three-piece solid links, stainless steel'],
  [/Oyster, three-piece solid links/g, 'Three-piece solid links'],
  [/Oyster, full black PVD-coated/g, 'Full black PVD-coated three-piece links'],
  [/Oyster, black PVD-coated/g, 'Black PVD-coated three-piece links'],
  [/Oyster, gold\/steel two-tone/g, 'Two-tone gold/steel three-piece links'],
  [/Oyster, rose-gold-tone three-piece links/g, 'Rose-gold-tone three-piece links'],
  // EN prose phrasings (description, keyPoints in English)
  [/Oyster bracelet with Oysterclasp/g, 'three-piece link bracelet with folding clasp'],
  [/Oyster bracelet/g, 'three-piece link bracelet'],
  [/\bOyster\b(?!\w)/g, 'three-piece links'],

  // Lume — Chromalight is Rolex's branding for SuperLumiNova-equivalent
  [/Chromalight \(blue luminescence\)/g, 'Luminescent indices (blue)'],
  [/Chromalight/g, 'Luminescent indices'],

  // Bezel — Cerachrom is Rolex branding for ceramic
  [/Cerachrom ceramic/g, 'Ceramic'],
  [/Cerachrom/g, 'Ceramic'],

  // Second-pass Rolex TM names
  // Jubilee (5-piece bracelet style) — Rolex TM
  [/Jubilee, five-piece links/g, 'Five-piece links'],
  [/Jubilee, gold\/steel two-tone/g, 'Two-tone gold/steel five-piece links'],
  [/Jubilee, rose-gold-tone/g, 'Rose-gold-tone five-piece links'],
  [/Jubilee\b/g, 'Five-piece links'],
  // President (semi-circular three-piece, Day-Date) — Rolex TM
  [/President, three-piece links/g, 'Semi-circular three-piece links'],
  [/President\b/g, 'Semi-circular three-piece links'],
  // Crownclasp (hidden Rolex clasp) — Rolex TM
  [/Crownclasp/g, 'Hidden folding clasp'],
  // Oysterlock (Rolex sport bracelet safety clasp) — Rolex TM
  [/Folding Oysterlock/g, 'Folding safety clasp'],
  [/Oysterlock/g, 'Safety clasp'],
];

// French equivalents — applied to FR fields (keyPointsFr, descriptionFr, etc.)
// Order matters: most specific first.
const TM_REPLACEMENTS_FR = [
  [/bracelet Oyster avec Oysterclasp/g, 'bracelet 3 maillons avec fermoir déployant'],
  [/bracelet Oyster avec Easylink/g, 'bracelet 3 maillons avec extension réglable'],
  [/lunette Cerachrom/g, 'lunette céramique'],
  [/Oysterclasp/g, 'fermoir déployant'],
  [/Oysterflex/g, 'bracelet caoutchouc'],
  [/Oysterlock/g, 'fermoir de sécurité'],
  [/Easylink/g, 'extension réglable'],
  [/Crownclasp/g, 'fermoir invisible'],
  [/Cerachrom/g, 'céramique'],
  [/Chromalight/g, 'Indices luminescents'],
  [/bracelet Oyster/g, 'bracelet 3 maillons'],
  [/Jubilee\b/g, '5 maillons'],
  [/President\b/g, '3 maillons semi-circulaire'],
  // Bare Oyster (without "bracelet" prefix) — last
  [/\bOyster\b/g, '3 maillons'],
];

const MOVEMENT_BY_RANGE = {
  premium: { en: 'Automatic, 28,800 vph', fr: 'Automatique, 28 800 alt/h' },
  essential: { en: 'Miyota automatic, Japanese', fr: 'Miyota automatique, japonais' },
};

const POWER_RESERVE_BY_RANGE = {
  premium: { en: '70 hours', fr: '70 heures' },
  essential: { en: '40 hours', fr: '40 heures' },
};

function genericize(value, replacements = TM_REPLACEMENTS) {
  if (typeof value !== 'string') return value;
  let out = value;
  for (const [pattern, replacement] of replacements) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function genericizeArray(arr, replacements) {
  if (!Array.isArray(arr)) return { arr, changes: 0 };
  let changes = 0;
  const out = arr.map((item) => {
    if (typeof item !== 'string') return item;
    const replaced = genericize(item, replacements);
    if (replaced !== item) changes += 1;
    return replaced;
  });
  return { arr: out, changes };
}

let processed = 0;
let modified = 0;
const summary = { genericized: 0, movementAdded: 0, reserveAdded: 0 };

const files = readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith('.json'));
for (const file of files) {
  processed += 1;
  const path = join(PRODUCTS_DIR, file);
  const raw = readFileSync(path, 'utf-8');
  const original = JSON.parse(raw);
  const product = JSON.parse(raw); // deep clone via re-parse

  if (!product.specs) product.specs = {};

  // 1. Genericize existing specs strings (EN)
  for (const [k, v] of Object.entries(product.specs)) {
    if (typeof v === 'string') {
      const replaced = genericize(v);
      if (replaced !== v) {
        product.specs[k] = replaced;
        summary.genericized += 1;
      }
    }
  }

  // 1b. Genericize keyPoints (EN) + keyPointsFr (FR)
  if (product.keyPoints) {
    const r = genericizeArray(product.keyPoints, TM_REPLACEMENTS);
    if (r.changes) {
      product.keyPoints = r.arr;
      summary.genericized += r.changes;
    }
  }
  if (product.keyPointsFr) {
    const r = genericizeArray(product.keyPointsFr, TM_REPLACEMENTS_FR);
    if (r.changes) {
      product.keyPointsFr = r.arr;
      summary.genericized += r.changes;
    }
  }

  // 1c. Genericize prose fields
  for (const [field, table] of [
    ['description', TM_REPLACEMENTS],
    ['descriptionShort', TM_REPLACEMENTS],
    ['descriptionFr', TM_REPLACEMENTS_FR],
    ['descriptionShortFr', TM_REPLACEMENTS_FR],
  ]) {
    const v = product[field];
    if (typeof v === 'string') {
      const replaced = genericize(v, table);
      if (replaced !== v) {
        product[field] = replaced;
        summary.genericized += 1;
      }
    }
  }

  // 2. Add movement if missing
  if (!product.specs.movement && MOVEMENT_BY_RANGE[product.range]) {
    product.specs.movement = MOVEMENT_BY_RANGE[product.range].en;
    summary.movementAdded += 1;
  }

  // 3. Add powerReserve if missing
  if (!product.specs.powerReserve && POWER_RESERVE_BY_RANGE[product.range]) {
    product.specs.powerReserve = POWER_RESERVE_BY_RANGE[product.range].en;
    summary.reserveAdded += 1;
  }

  // Write back only if changed
  const updated = JSON.stringify(product, null, 2) + '\n';
  if (updated !== raw) {
    writeFileSync(path, updated);
    modified += 1;
  }
}

console.log(`Processed: ${processed} files`);
console.log(`Modified: ${modified} files`);
console.log(`TM strings genericized: ${summary.genericized}`);
console.log(`'movement' added: ${summary.movementAdded}`);
console.log(`'powerReserve' added: ${summary.reserveAdded}`);
