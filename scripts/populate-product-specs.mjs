#!/usr/bin/env node
/**
 * Phase 3.1 — populate Sanity product specs from a Sheet export.
 *
 * Reads a CSV or TSV (auto-detected from header) and applies spec values to
 * matching Sanity product documents. Match key: slug.current.
 *
 * Usage:
 *   node scripts/populate-product-specs.mjs <path-to-sheet> [--force] [--dry-run]
 *
 * Expected header columns (any subset, order-agnostic, all optional except `slug`):
 *   slug, weight, crystal, hourMarkers, hands, glassTreatment, dialFinish,
 *   waterResistance, caseThickness, caseMaterial, bezel, bracelet, clasp, lume
 *
 * Behaviour:
 *   - Empty cells are skipped — never blank an existing Sanity value.
 *   - By default, existing non-empty Sanity values are preserved (script logs
 *     "skip" for those). Pass --force to overwrite.
 *   - --dry-run prints the diff without committing.
 *   - Unknown slugs are logged and skipped.
 *
 * Env vars required (read from .env.local if present):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET  (defaults to "production")
 *   SANITY_API_TOKEN            (write-scoped)
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

// ── env loading (minimal .env.local parser, no dep) ───────────────────────
function loadEnvLocal() {
  const envPath = join(REPO_ROOT, '.env.local');
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, 'utf-8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

// ── CLI args ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const filePath = args.find((a) => !a.startsWith('--'));
const force = args.includes('--force');
const dryRun = args.includes('--dry-run');

if (!filePath) {
  console.error('Usage: node scripts/populate-product-specs.mjs <path-to-sheet> [--force] [--dry-run]');
  process.exit(1);
}
if (!existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

// ── Sanity client ─────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';
const token = process.env.SANITY_API_TOKEN?.trim();

if (!projectId || !token) {
  console.error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set.');
  console.error('Put them in .env.local at the repo root.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// ── CSV/TSV parser (quote-aware) ──────────────────────────────────────────
function parseRow(line, sep) {
  const out = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else {
        inQuote = !inQuote;
      }
    } else if (ch === sep && !inQuote) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function parseSheet(raw) {
  const lines = raw.replace(/\r\n/g, '\n').split('\n').filter((l) => l.trim());
  if (lines.length < 2) {
    throw new Error('Sheet must have a header row plus at least one data row.');
  }
  const sep = lines[0].includes('\t') ? '\t' : ',';
  const header = parseRow(lines[0], sep).map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const cells = parseRow(line, sep);
    const obj = {};
    for (let i = 0; i < header.length; i += 1) {
      const key = header[i];
      if (key) obj[key] = (cells[i] ?? '').trim();
    }
    return obj;
  });
  return { header, rows };
}

const SPEC_KEYS = [
  'weight',
  'crystal',
  'hourMarkers',
  'hands',
  'glassTreatment',
  'dialFinish',
  'waterResistance',
  'caseThickness',
  'caseMaterial',
  'bezel',
  'bracelet',
  'clasp',
  'lume',
];

// ── Main ──────────────────────────────────────────────────────────────────
const raw = readFileSync(filePath, 'utf-8');
const { header, rows } = parseSheet(raw);

if (!header.includes('slug')) {
  console.error('Header must include "slug" column.');
  process.exit(1);
}

console.log(`Loaded ${rows.length} rows from ${filePath}`);
console.log(`Mode: ${dryRun ? 'DRY-RUN' : 'WRITE'}${force ? ' · FORCE overwrite' : ''}`);

const summary = { matched: 0, missing: 0, updated: 0, skipped: 0, written: 0 };

for (const row of rows) {
  const slug = row.slug;
  if (!slug) continue;

  // Find document by slug
  const doc = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{_id, specs}`,
    { slug }
  );

  if (!doc) {
    console.log(`  miss  ${slug}  (not found in Sanity)`);
    summary.missing += 1;
    continue;
  }
  summary.matched += 1;

  const patch = {};
  const skipReasons = [];
  for (const key of SPEC_KEYS) {
    const incoming = row[key];
    if (!incoming) continue; // empty cell → don't touch
    const existing = doc.specs?.[key];
    if (existing && existing.trim() && !force) {
      skipReasons.push(`${key}=existing`);
      continue;
    }
    patch[`specs.${key}`] = incoming;
  }

  const fields = Object.keys(patch);
  if (fields.length === 0) {
    console.log(`  skip  ${slug}  (no new fields${skipReasons.length ? ` · ${skipReasons.join(', ')}` : ''})`);
    summary.skipped += 1;
    continue;
  }

  console.log(`  set   ${slug}  ← ${fields.map((f) => f.replace('specs.', '')).join(', ')}`);
  summary.updated += 1;

  if (!dryRun) {
    await client.patch(doc._id).set(patch).commit();
    summary.written += 1;
  }
}

console.log('');
console.log(`Matched : ${summary.matched}`);
console.log(`Missing : ${summary.missing}`);
console.log(`Updated : ${summary.updated}`);
console.log(`Skipped : ${summary.skipped}`);
if (!dryRun) console.log(`Written : ${summary.written} mutations committed`);
else console.log('(dry-run — no mutations committed)');
