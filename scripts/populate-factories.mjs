#!/usr/bin/env node
/**
 * Phase 2.6 — populate factoryOptions + factoryChoice on Premium SKUs.
 *
 * Reads every data/products/*.json, matches Premium pieces by
 * collectionSlug, writes factoryOptions and (when relevant) factoryChoice.
 * Idempotent: re-running produces zero diff once applied.
 *
 * Run from repo root:
 *   node scripts/populate-factories.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = join(__dirname, '..', 'data', 'products');

const FACTORY_MAPPING = {
  'submariner': ['VSF', 'ARF'],
  'gmt-master-ii': ['VSF', 'ARF'],
  'datejust': ['VSF', 'ARF'],
  'daytona': ['Clean', 'VSF'],
  'royal-oak': ['ZF', 'APSF'],
  'nautilus': ['ZF'],
  'aquanaut': ['ZF'],
  'santos': ['AF'],
  'panthere': ['AF'],
};

// Daytona explicitly lets the customer pick. Everything else with 2+
// factories is "subject to availability" (Artemis ships whichever is in
// stock when the order lands).
const FACTORY_CHOICE_OVERRIDES = {
  'daytona': 'customer-choice',
};

function arrayEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function patchProduct(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const product = JSON.parse(raw);

  if (product.range !== 'premium') return { changed: false, skipped: 'not premium' };

  const factories = FACTORY_MAPPING[product.collectionSlug];
  if (!factories) {
    return { changed: false, skipped: `no mapping for ${product.collectionSlug}` };
  }

  const choice = factories.length > 1
    ? (FACTORY_CHOICE_OVERRIDES[product.collectionSlug] ?? 'subject-to-availability')
    : null;

  const factoryOptionsMatches = arrayEqual(product.factoryOptions, factories);
  const factoryChoiceMatches = (product.factoryChoice ?? null) === choice;
  if (factoryOptionsMatches && factoryChoiceMatches) {
    return { changed: false, skipped: 'already correct' };
  }

  product.factoryOptions = factories;
  if (choice !== null) {
    product.factoryChoice = choice;
  } else {
    delete product.factoryChoice;
  }

  // Preserve trailing newline if the file had one.
  const trailingNewline = raw.endsWith('\n') ? '\n' : '';
  writeFileSync(filePath, JSON.stringify(product, null, 2) + trailingNewline, 'utf8');
  return { changed: true, factories, choice };
}

const files = readdirSync(PRODUCTS_DIR)
  .filter((name) => name.endsWith('.json'))
  .sort();

let changedCount = 0;
let skippedCount = 0;

for (const name of files) {
  const filePath = join(PRODUCTS_DIR, name);
  const result = patchProduct(filePath);
  if (result.changed) {
    const suffix = result.choice ? ` [${result.choice}]` : '';
    console.log(`  patched  ${name}  ->  ${result.factories.join(' · ')}${suffix}`);
    changedCount++;
  } else {
    skippedCount++;
  }
}

console.log(`\n${changedCount} patched, ${skippedCount} skipped.`);
