#!/usr/bin/env node
/**
 * Verify Sanity media debt status for the 18 SKUs listed in
 * docs/sanity-media-debt.md Section 1 (1-photo / 0-video baseline).
 *
 * Public Sanity Studio dataset, no auth token required.
 * Run: node scripts/verify-media-debt.mjs
 */

const PROJECT_ID = 'mzy95zit';
const DATASET = 'production';
const API_VERSION = 'v2024-01-01';

// SKUs from docs/sanity-media-debt.md Section 1 (baseline: 1 photo, 0 video)
const TARGET_SLUGS = [
  // Premium high-value (Phase 1 of session)
  'daytona-black-dial',
  'aquanaut-blue-black',
  'nautilus-blue-dial',
  'submariner-date-black-dial',
  'datejust-41-silver-dial',
  'panthere-gold-tone',
  'santos-silver-dial',
  // Essential (Phase 2 of session)
  'nautilus-black-essential',
  'nautilus-blue-essential',
  'royal-oak-black-essential',
  'royal-oak-blue-essential',
  'royal-oak-rosegold-essential',
  'royal-oak-skeleton-black-essential',
  'royal-oak-skeleton-rosegold-essential',
  'royal-oak-skeleton-silver-essential',
  'royal-oak-skeleton-white-essential',
  'santos-black-essential',
  'datejust-36-black-dial',
];

// Baseline (pre-session): every SKU had 1 photo, 0 video. Recorded for diff.
const BASELINE = {
  photos: 1,
  video: 0,
};

function buildQuery(slugs) {
  const slugList = slugs.map((s) => `"${s}"`).join(',');
  return `*[_type == "product" && slug.current in [${slugList}]]{"slug":slug.current,name,"photos":count(images),"hasVideo":defined(video)}`;
}

function classify(photos, hasVideo) {
  if (photos >= 3 && hasVideo) return 'done';
  if (photos >= 2 || (photos >= 3 && !hasVideo)) return 'partial';
  return 'todo';
}

function statusIcon(s) {
  if (s === 'done') return 'done';
  if (s === 'partial') return 'partial';
  return 'todo';
}

async function main() {
  const query = buildQuery(TARGET_SLUGS);
  const url = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

  let json;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Sanity API error: HTTP ${res.status}`);
      process.exit(1);
    }
    json = await res.json();
  } catch (err) {
    console.error('Network error querying Sanity:', err.message);
    process.exit(1);
  }

  const results = json.result ?? [];
  const bySlug = new Map(results.map((r) => [r.slug, r]));

  // Build report rows in declared order
  const rows = TARGET_SLUGS.map((slug) => {
    const r = bySlug.get(slug);
    if (!r) {
      return {
        SKU: slug,
        'Photos before': BASELINE.photos,
        'Photos after': 'NOT FOUND',
        'Video before': BASELINE.video,
        'Video after': 'NOT FOUND',
        Status: 'error',
      };
    }
    const photosAfter = r.photos ?? 0;
    const videoAfter = r.hasVideo ? 1 : 0;
    return {
      SKU: slug,
      'Photos before': BASELINE.photos,
      'Photos after': photosAfter,
      'Video before': BASELINE.video,
      'Video after': videoAfter,
      Status: statusIcon(classify(photosAfter, r.hasVideo)),
    };
  });

  console.log('\nSanity Media Debt Verification');
  console.log(`Dataset: ${PROJECT_ID}/${DATASET}`);
  console.log(`Target SKUs: ${TARGET_SLUGS.length} (Section 1 of docs/sanity-media-debt.md)\n`);

  console.table(rows);

  const counts = rows.reduce(
    (acc, r) => {
      acc[r.Status] = (acc[r.Status] ?? 0) + 1;
      return acc;
    },
    { done: 0, partial: 0, todo: 0, error: 0 }
  );
  const total = TARGET_SLUGS.length;
  const pct = Math.round((counts.done / total) * 100);

  console.log('\nSummary');
  console.log(`  Total SKUs:  ${total}`);
  console.log(`  Done:        ${counts.done}  (photos >= 3 AND video)`);
  console.log(`  Partial:     ${counts.partial}  (some progress, not yet at target)`);
  console.log(`  Todo:        ${counts.todo}  (still 1 photo, 0 video baseline)`);
  if (counts.error > 0) {
    console.log(`  Errors:      ${counts.error}  (slug not found in Sanity)`);
  }
  console.log(`  % complete:  ${pct}%`);
  console.log('');
}

main();
