#!/usr/bin/env node
/**
 * Sprint 5.3 — initialize stockStatus + leadTimeDays for every Sanity product.
 *
 * Rules (validated with Zaki on 2026-05-13):
 *   - Essential pieces default to stockStatus: 'in_stock'.
 *   - Premium pieces default to stockStatus: 'on_order' with leadTimeDays: 14.
 *   - Real stockouts are EXPLICIT and override the range default:
 *       * Datejust 2tone (any range)  → on_order, leadTimeDays: 14
 *       * Datejust Chocolate (any range) → on_order, leadTimeDays: 14
 *   - Wimbledon variants are *design* variants, NOT stockouts:
 *       * Wimbledon Fluted Essential  → in_stock
 *       * Wimbledon Smooth Essential  → in_stock
 *       * Wimbledon Premium stays Premium (on_order) — no special case.
 *
 * Idempotent: a product that already has stockStatus is skipped unless
 * `--force` is passed. Use --dry-run to preview without writing.
 *
 * Run from repo root after merging Sprint 5:
 *   node scripts/init-stock-status.mjs              # apply
 *   node scripts/init-stock-status.mjs --dry-run    # preview
 *   node scripts/init-stock-status.mjs --force      # re-apply on already-set products
 *
 * After running, Zaki adjusts manual exceptions in Sanity Studio when a new
 * stockout appears (no code change needed — only the Studio Stock Status
 * radio + optional Lead Time number).
 */
import nextEnv from '@next/env';
import { createClient } from '@sanity/client';

// @next/env ships as CommonJS, so we import the default export and pull
// loadEnvConfig off it — the bare named-import syntax does not work in ESM.
nextEnv.loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  process.env.SANITY_STUDIO_DATASET?.trim() ||
  'production';
const token = process.env.SANITY_API_TOKEN?.trim();

if (!projectId || !token) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN. Set them in .env before running.'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const argv = new Set(process.argv.slice(2));
const FORCE = argv.has('--force');
const DRY_RUN = argv.has('--dry-run');

/**
 * Resolve the Pivot V2 stock target for a Sanity product row. Returns the
 * patch object to apply, or null when the product hits an explicit Wimbledon
 * design-variant exemption that confirms the Essential default.
 */
function resolveTarget(p) {
  const name = (p.name ?? '').toLowerCase();
  const variant = (p.variant ?? '').toLowerCase();
  const collection = (p.collection ?? '').toLowerCase();
  const haystack = `${name} ${variant} ${collection}`;

  // Hard exceptions — real stockouts, override range default.
  const isDatejust2tone =
    haystack.includes('datejust') &&
    (haystack.includes('2tone') ||
      haystack.includes('2-tone') ||
      haystack.includes('two-tone'));
  const isDatejustChocolate =
    haystack.includes('datejust') && haystack.includes('chocolate');
  if (isDatejust2tone || isDatejustChocolate) {
    return { stockStatus: 'on_order', leadTimeDays: 14, reason: 'stockout' };
  }

  // Wimbledon design variants (Fluted / Smooth) stay in_stock for Essential.
  // Premium Wimbledon (if exists) keeps the standard Premium default below.
  const isWimbledonEssential =
    haystack.includes('wimbledon') && p.range === 'essential';
  if (isWimbledonEssential) {
    return {
      stockStatus: 'in_stock',
      leadTimeDays: null,
      reason: 'wimbledon-essential',
    };
  }

  // Default by range.
  if (p.range === 'premium') {
    return { stockStatus: 'on_order', leadTimeDays: 14, reason: 'premium' };
  }
  return { stockStatus: 'in_stock', leadTimeDays: null, reason: 'essential' };
}

async function run() {
  const products = await client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      brand,
      collection,
      variant,
      range,
      stockStatus,
      leadTimeDays
    }`
  );

  console.log(`Fetched ${products.length} products from Sanity.`);
  console.log(
    `Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'APPLY'}${FORCE ? ' --force' : ''}\n`
  );

  let applied = 0;
  let skipped = 0;
  const counts = { stockout: 0, 'wimbledon-essential': 0, premium: 0, essential: 0 };

  for (const p of products) {
    const target = resolveTarget(p);
    counts[target.reason] += 1;

    const sameStatus = p.stockStatus === target.stockStatus;
    const sameLead = (p.leadTimeDays ?? null) === (target.leadTimeDays ?? null);
    const hasAny = p.stockStatus !== undefined && p.stockStatus !== null;

    if (hasAny && !FORCE) {
      skipped += 1;
      console.log(
        `SKIP  ${p.name} (${p.range}) — already set to ${p.stockStatus}` +
          (p.leadTimeDays ? ` · ${p.leadTimeDays}d` : '')
      );
      continue;
    }

    if (sameStatus && sameLead) {
      skipped += 1;
      console.log(`NOOP  ${p.name} (${p.range}) — already matches target`);
      continue;
    }

    const patch = {
      stockStatus: target.stockStatus,
      leadTimeDays: target.leadTimeDays,
    };
    const arrow = `${p.stockStatus ?? '∅'} → ${target.stockStatus}${
      target.leadTimeDays ? ` · ${target.leadTimeDays}d` : ''
    }`;
    const tag =
      target.reason === 'stockout' || target.reason === 'wimbledon-essential'
        ? ` [${target.reason}]`
        : '';

    if (DRY_RUN) {
      console.log(`PLAN  ${p.name} (${p.range}) — ${arrow}${tag}`);
    } else {
      await client.patch(p._id).set(patch).commit();
      console.log(`APPLY ${p.name} (${p.range}) — ${arrow}${tag}`);
    }
    applied += 1;
  }

  console.log(`\nSummary`);
  console.log(`  total:    ${products.length}`);
  console.log(`  applied:  ${applied}${DRY_RUN ? ' (dry-run)' : ''}`);
  console.log(`  skipped:  ${skipped}`);
  console.log(`  rules hit:`);
  console.log(`    stockout (Datejust 2tone/Chocolate): ${counts.stockout}`);
  console.log(`    wimbledon-essential:                 ${counts['wimbledon-essential']}`);
  console.log(`    premium (default on_order 14d):      ${counts.premium}`);
  console.log(`    essential (default in_stock):        ${counts.essential}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
