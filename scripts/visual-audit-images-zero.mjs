#!/usr/bin/env node
/**
 * Visual audit of images[0] across all SKUs with >= 3 photos.
 *
 * Generates a single HTML file with a responsive grid of thumbnails,
 * each linked to its Sanity slug. Pre-checks the 3 Wimbledon SKUs
 * known to have packshot atelier instead of face shot. Lets Zaki
 * scan-and-check ones that need reorder, then export a Markdown
 * todo list to clipboard.
 *
 * Run: node scripts/visual-audit-images-zero.mjs
 * Output: /tmp/visual-audit.html (auto-opens on macOS)
 *
 * Cache: reads /tmp/audit-images-zero.json if present, otherwise
 * queries Sanity (public dataset, no auth).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';

const CACHE_PATH = '/tmp/audit-images-zero.json';
const OUTPUT_PATH = '/tmp/visual-audit.html';
const PROJECT_ID = 'mzy95zit';
const DATASET = 'production';
const API_VERSION = 'v2024-01-01';

const PRE_CHECKED_BAD = new Set([
  'datejust-41-wimbledon-smooth-essential',
  'datejust-41-wimbledon-essential',
  'datejust-wimbledon-gold-essential',
]);

async function fetchSanity() {
  const query = `*[_type == "product" && count(images) >= 3]{"slug":slug.current,"photoCount":count(images),range,price,"firstImageUrl":images[0].asset->url,"firstImageFilename":images[0].asset->originalFilename} | order(range desc, price desc, slug asc)`;
  const url = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity API HTTP ${res.status}`);
  const json = await res.json();
  return json.result ?? [];
}

async function loadData() {
  if (existsSync(CACHE_PATH)) {
    try {
      const cached = JSON.parse(readFileSync(CACHE_PATH, 'utf-8'));
      if (cached.result?.length) {
        console.log(`Using cached data: ${cached.result.length} SKUs from ${CACHE_PATH}`);
        return cached.result;
      }
    } catch {}
  }
  console.log('Querying Sanity API...');
  const result = await fetchSanity();
  writeFileSync(CACHE_PATH, JSON.stringify({ result }, null, 2));
  console.log(`Cached ${result.length} SKUs to ${CACHE_PATH}`);
  return result;
}

function sortSkus(skus) {
  const rank = (r) => (r === 'premium' ? 0 : 1);
  return [...skus].sort((a, b) => {
    const r = rank(a.range) - rank(b.range);
    if (r !== 0) return r;
    return (b.price ?? 0) - (a.price ?? 0);
  });
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateHtml(skus) {
  const premiumCount = skus.filter((s) => s.range === 'premium').length;
  const essentialCount = skus.filter((s) => s.range === 'essential').length;
  const preCheckedCount = skus.filter((s) => PRE_CHECKED_BAD.has(s.slug)).length;

  const cards = skus
    .map((sku) => {
      const isPreChecked = PRE_CHECKED_BAD.has(sku.slug);
      const url = sku.firstImageUrl ? `${sku.firstImageUrl}?w=480&h=480&fit=crop` : '';
      return `
    <article class="card${isPreChecked ? ' pre-checked' : ''}" data-slug="${escapeHtml(sku.slug)}" data-tier="${escapeHtml(sku.range)}" data-price="${sku.price ?? ''}">
      <label class="thumb-wrap">
        <input type="checkbox" class="check" data-slug="${escapeHtml(sku.slug)}" ${isPreChecked ? 'checked' : ''} />
        ${url ? `<img src="${escapeHtml(url)}" alt="${escapeHtml(sku.slug)} images[0]" loading="lazy" />` : '<div class="no-img">no image</div>'}
        ${isPreChecked ? '<span class="pre-check-badge">already known bad</span>' : ''}
      </label>
      <div class="meta">
        <p class="slug">${escapeHtml(sku.slug)}</p>
        <p class="tier-price"><span class="tier ${escapeHtml(sku.range)}">${sku.range === 'premium' ? 'Premium' : 'Essential'}</span> · ${sku.price ?? '-'} CAD</p>
        <p class="filename">${escapeHtml(sku.firstImageFilename ?? '(no filename)')}</p>
        ${isPreChecked ? '<p class="note">Drag-drop reorder needed in Sanity.</p>' : ''}
      </div>
    </article>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Visual audit: images[0] catalog review</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0A0A0A;
      color: #F5F3EF;
      line-height: 1.4;
      padding: 24px;
    }
    header {
      position: sticky;
      top: 0;
      z-index: 10;
      background: rgba(10, 10, 10, 0.95);
      backdrop-filter: blur(8px);
      padding: 16px 0;
      margin: -24px -24px 24px;
      padding-left: 24px;
      padding-right: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    h1 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .stats {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 12px;
    }
    .stats strong { color: #C9A96E; }
    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    button {
      padding: 8px 16px;
      background: #C9A96E;
      color: #0A0A0A;
      border: none;
      border-radius: 3px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      font-family: inherit;
    }
    button:hover { background: #B8924A; }
    button.secondary {
      background: transparent;
      color: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    button.secondary:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.4); }
    .checked-counter {
      display: inline-flex;
      align-items: center;
      padding: 8px 12px;
      background: rgba(201, 169, 110, 0.08);
      border: 1px solid rgba(201, 169, 110, 0.2);
      border-radius: 3px;
      font-size: 12px;
      color: #C9A96E;
      font-weight: 600;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 24px;
    }
    .card {
      background: #111;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      overflow: hidden;
      transition: border-color 0.2s, transform 0.2s;
    }
    .card:hover { border-color: rgba(201, 169, 110, 0.3); }
    .card.pre-checked { border-color: rgba(231, 137, 60, 0.55); }
    .card.has-check { border-color: rgba(201, 169, 110, 0.55); }
    .thumb-wrap {
      display: block;
      position: relative;
      aspect-ratio: 1 / 1;
      background: #1c1c1c;
      cursor: pointer;
      overflow: hidden;
    }
    .thumb-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .no-img {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.3);
      font-size: 12px;
    }
    .check {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 24px;
      height: 24px;
      cursor: pointer;
      z-index: 2;
      accent-color: #C9A96E;
    }
    .pre-check-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px 10px;
      background: rgba(231, 137, 60, 0.18);
      border: 1px solid rgba(231, 137, 60, 0.55);
      border-radius: 999px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #E7893C;
    }
    .meta {
      padding: 14px 16px 16px;
    }
    .slug {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
      color: #F5F3EF;
      margin-bottom: 6px;
      word-break: break-all;
    }
    .tier-price {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.55);
      margin-bottom: 6px;
    }
    .tier {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 2px;
      font-weight: 700;
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .tier.premium { background: rgba(201, 169, 110, 0.15); color: #C9A96E; }
    .tier.essential { background: rgba(255, 255, 255, 0.06); color: rgba(255, 255, 255, 0.65); }
    .filename {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.32);
      word-break: break-all;
    }
    .note {
      margin-top: 6px;
      font-size: 10px;
      color: #E7893C;
      font-style: italic;
    }
    #export-output {
      position: fixed;
      bottom: 24px;
      right: 24px;
      max-width: 420px;
      max-height: 60vh;
      overflow: auto;
      background: #1c1c1c;
      border: 1px solid #C9A96E;
      border-radius: 4px;
      padding: 16px;
      display: none;
      z-index: 100;
    }
    #export-output.visible { display: block; }
    #export-output pre {
      font-family: ui-monospace, monospace;
      font-size: 11px;
      color: #F5F3EF;
      white-space: pre-wrap;
      max-height: 40vh;
      overflow: auto;
      background: #0A0A0A;
      padding: 10px;
      border-radius: 3px;
      margin-bottom: 10px;
    }
    #export-output button { margin-right: 8px; }
  </style>
</head>
<body>
  <header>
    <h1>Visual audit: images[0] catalog review</h1>
    <p class="stats">
      <strong>${skus.length}</strong> SKUs (≥ 3 photos): <strong>${premiumCount}</strong> Premium · <strong>${essentialCount}</strong> Essential · <strong>${preCheckedCount}</strong> already confirmed bad (orange).
    </p>
    <div class="actions">
      <button id="export-btn" type="button">Export markdown</button>
      <button class="secondary" id="reset-btn" type="button">Reset checks (keep pre-checked)</button>
      <button class="secondary" id="select-all-btn" type="button">Select all</button>
      <button class="secondary" id="clear-all-btn" type="button">Clear all</button>
      <span class="checked-counter" id="counter">0 selected</span>
    </div>
  </header>

  <div class="grid" id="grid">
${cards}
  </div>

  <div id="export-output">
    <pre id="export-text"></pre>
    <button id="copy-btn" type="button">Copy to clipboard</button>
    <button class="secondary" id="close-export-btn" type="button">Close</button>
  </div>

  <script>
    const STORAGE_KEY = 'audit-zero-checked';
    const PRE_CHECKED = ${JSON.stringify([...PRE_CHECKED_BAD])};

    function loadChecked() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return new Set(raw ? JSON.parse(raw) : PRE_CHECKED);
      } catch {
        return new Set(PRE_CHECKED);
      }
    }

    function saveChecked(set) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
      } catch {}
    }

    let checked = loadChecked();
    const checkboxes = document.querySelectorAll('.check');
    const counter = document.getElementById('counter');

    function syncUI() {
      checkboxes.forEach((cb) => {
        const slug = cb.dataset.slug;
        const isChecked = checked.has(slug);
        cb.checked = isChecked;
        const card = cb.closest('.card');
        if (card) {
          card.classList.toggle('has-check', isChecked && !card.classList.contains('pre-checked'));
        }
      });
      counter.textContent = checked.size + ' selected';
    }

    checkboxes.forEach((cb) => {
      cb.addEventListener('change', () => {
        const slug = cb.dataset.slug;
        if (cb.checked) checked.add(slug);
        else checked.delete(slug);
        saveChecked(checked);
        syncUI();
      });
    });

    document.getElementById('export-btn').addEventListener('click', () => {
      const sortedChecked = [...document.querySelectorAll('.card')]
        .filter((card) => checked.has(card.dataset.slug))
        .map((card) => ({
          slug: card.dataset.slug,
          tier: card.dataset.tier === 'premium' ? 'Premium' : 'Essential',
          price: card.dataset.price,
          isPre: card.classList.contains('pre-checked'),
        }));

      const lines = ['## SKUs to reorder images[0]', ''];
      lines.push('Total: ' + sortedChecked.length + ' SKU' + (sortedChecked.length === 1 ? '' : 's'));
      lines.push('');
      sortedChecked.forEach((s) => {
        const note = s.isPre ? ' (already confirmed bad)' : '';
        lines.push('- [ ] ' + s.slug + ' (' + s.tier + ', ' + s.price + ' CAD)' + note);
      });

      document.getElementById('export-text').textContent = lines.join('\\n');
      document.getElementById('export-output').classList.add('visible');
    });

    document.getElementById('copy-btn').addEventListener('click', async () => {
      const text = document.getElementById('export-text').textContent;
      try {
        await navigator.clipboard.writeText(text);
        const btn = document.getElementById('copy-btn');
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = orig), 1500);
      } catch (e) {
        alert('Copy failed: ' + e.message);
      }
    });

    document.getElementById('close-export-btn').addEventListener('click', () => {
      document.getElementById('export-output').classList.remove('visible');
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
      if (!confirm('Reset to only the pre-checked Wimbledon SKUs?')) return;
      checked = new Set(PRE_CHECKED);
      saveChecked(checked);
      syncUI();
    });

    document.getElementById('select-all-btn').addEventListener('click', () => {
      checkboxes.forEach((cb) => checked.add(cb.dataset.slug));
      saveChecked(checked);
      syncUI();
    });

    document.getElementById('clear-all-btn').addEventListener('click', () => {
      checked.clear();
      saveChecked(checked);
      syncUI();
    });

    syncUI();
  </script>
</body>
</html>
`;
}

async function main() {
  const data = await loadData();
  const sorted = sortSkus(data);
  const html = generateHtml(sorted);
  writeFileSync(OUTPUT_PATH, html, 'utf-8');

  const premium = sorted.filter((s) => s.range === 'premium').length;
  const essential = sorted.filter((s) => s.range === 'essential').length;
  const preChecked = sorted.filter((s) => PRE_CHECKED_BAD.has(s.slug)).length;

  console.log('');
  console.log(`Visual audit HTML generated: ${OUTPUT_PATH}`);
  console.log(`  Total SKUs: ${sorted.length}`);
  console.log(`  Premium:    ${premium}`);
  console.log(`  Essential:  ${essential}`);
  console.log(`  Pre-checked (already confirmed bad): ${preChecked}`);
  console.log('');
  console.log(`Open in browser: file://${OUTPUT_PATH}`);

  if (process.platform === 'darwin') {
    spawn('open', [OUTPUT_PATH], { detached: true, stdio: 'ignore' });
    console.log('Auto-opened in default browser (macOS).');
  }
}

main().catch((e) => {
  console.error('Error:', e.message);
  process.exit(1);
});
