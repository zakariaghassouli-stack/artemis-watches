# Sanity Studio cleanup checklist

Editorial debt to flush from Sanity Studio before retiring the
`containsBannedTrademark` mask in `lib/queries.ts`. The local JSON
catalog (`data/products/*.json`) was scrubbed in Phase 2.5, but the
Sanity copies of the same SKUs still hold pre-scrub trademark content
in their `description`, `keyPoints`, `specs`, and FR equivalents — the
runtime mask hides it from the public site, but the source of truth is
still dirty.

Once this checklist is fully ticked, open `lib/queries.ts` and delete:

- `BANNED_RENDER_PATTERN` regex (line ~17)
- `containsBannedTrademark`, `arrayHasBannedTrademark`,
  `specsHaveBannedTrademark` helpers (lines ~19-30)
- All the `shouldUseCanonical*` branches inside `normalizeSanityProducts`
  (lines ~338-396)
- The fallback projection at the bottom of `normalizeSanityProducts`

After that, update memory:

- `project_sanity_editorial_debt.md` → mark resolved
- `reference_artemis_site_repo.md` → drop the line about the mask

Estimated removal effort post-cleanup: ~30 minutes (single PR with build
+ tsc + lint + the canonical grep guards).

---

## A. Site settings — announcement bar (FR)

**Singleton**: `siteSettings`
**Field**: `announcementBar.fr`
**Studio path**: `/studio/structure/siteSettings`

**Observed value (prod HTML)**:
> Nouveau client ? Obtenez 10 % sur votre première commande — Magasiner →

**Target value**:
> Nouveau client ? Obtenez 10 % sur votre première commande.

**Rationale**: the trailing " — Magasiner →" embeds the CTA text + arrow
inside the announcement message. The component already renders a
separate `Link` for the CTA (using `messages.announcement.cta`), which
was cleaned in Sprint A (commit `9402273`) and now reads "Magasiner" /
"Shop Now" without the arrow. Leaving the duplicated CTA inside the
Sanity message both renders the arrow back into the bar and produces a
visually redundant `Magasiner Magasiner →` pair.

Also check `announcementBar.en` for the symmetric `Shop Now →` suffix
and trim if present.

After save: hit `/api/revalidate?secret=…` (or wait ~60 s for ISR) and
re-verify the home HTML does not contain `Magasiner →`.

---

## B. Ten Premium SKUs — TM drift on Sanity description / keyPoints / specs

The mask currently catches `swiss`, `suisse`, `cerachrom`,
`cérachrome`, `chromalight`, `oysterclasp`, `jubilee`, `jubilé`,
`glidelock`, `parachrom`, `chronergy`. Each Premium SKU below was scrubbed
in the local JSON during Phase 2.5 but the corresponding Sanity document
still holds drifted content — Studio is the source of truth for editors,
so this is where the cleanup must happen.

**Workflow for each SKU**:

1. Open `/studio/structure/product` (the production embedded Studio).
2. Filter / search by the slug listed below.
3. For each of these fields, search for the banned terms above and
   rewrite using the corresponding plain-language alternative:

   | Field (EN + FR) | Look for | Rewrite as |
   |---|---|---|
   | `longDescription` / `longDescriptionFr` | "Cerachrom" / "Chromalight" / "Oysterclasp" / "Jubilee" / "Jubilé" / "Glidelock" / "Parachrom" / "Chronergy" / "Swiss" / "Suisse" | "ceramic bezel insert" / "luminescent indices" / "concealed folding clasp" / "five-piece links bracelet" / "extension link system" / "alternative high-frequency movement" / drop the "Swiss / Suisse" claim entirely (no replacement) |
   | `shortDescription` / `shortDescriptionFr` | same as above | same as above |
   | `highlights` / `highlightsFr` | same as above | same as above |
   | `specs.bezel`, `specs.bracelet`, `specs.clasp`, `specs.crystal`, `specs.lume`, `specs.movement` | same as above | use the generic phrasing already present in the local JSON (e.g. `"Five-piece links"` instead of `"Jubilee"`, `"Hidden folding clasp"` instead of `"Oysterclasp"`) |

4. Compare your edit against the local JSON for the same SKU at
   `data/products/<slug>.json` — that file is already clean, so its
   `description`, `keyPoints`, and `specs` are the canonical reference.
5. Save the document. The runtime mask is permissive (case-insensitive,
   partial-word match), so leaving any of the banned roots will keep
   the local JSON fallback active until it disappears entirely.

### 1. Rolex Submariner Date — Black Dial (Premium)
- Local JSON: `data/products/rolex-submariner-date-black.json`
- Sanity slug: `submariner-date-black-dial`
- PDP URL: `/collections/rolex/submariner/submariner-date-black-dial`
- Studio: `/studio/structure/product` → search `submariner-date-black-dial`

### 2. Rolex Submariner Date — Blue Dial (Premium)
- Local JSON: `data/products/rolex-submariner-date-blue.json`
- Sanity slug: `submariner-date-blue-dial`
- PDP URL: `/collections/rolex/submariner/submariner-date-blue-dial`
- Studio: `/studio/structure/product` → search `submariner-date-blue-dial`

### 3. Rolex Datejust 41 (Premium)
- Local JSON: `data/products/rolex-datejust-41.json`
- Sanity slug: `datejust-41-silver-dial`
- PDP URL: `/collections/rolex/datejust/datejust-41-silver-dial`
- Studio: `/studio/structure/product` → search `datejust-41-silver-dial`

### 4. Rolex GMT-Master II — Pepsi (Premium)
- Local JSON: `data/products/rolex-gmt-master-ii.json`
- Sanity slug: `gmt-master-ii-pepsi`
- PDP URL: `/collections/rolex/gmt-master-ii/gmt-master-ii-pepsi`
- Studio: `/studio/structure/product` → search `gmt-master-ii-pepsi`

### 5. Rolex Daytona — Black Dial (Premium)
- Local JSON: `data/products/rolex-daytona.json`
- Sanity slug: `daytona-black-dial`
- PDP URL: `/collections/rolex/daytona/daytona-black-dial`
- Studio: `/studio/structure/product` → search `daytona-black-dial`

### 6. Cartier Santos — Silver Dial (Premium)
- Local JSON: `data/products/cartier-santos-silver.json`
- Sanity slug: `santos-silver-dial`
- PDP URL: `/collections/cartier/santos/santos-silver-dial`
- Studio: `/studio/structure/product` → search `santos-silver-dial`

### 7. Cartier Panthère — Gold Tone (Premium)
- Local JSON: `data/products/cartier-panthere.json`
- Sanity slug: `panthere-gold-tone`
- PDP URL: `/collections/cartier/panthere/panthere-gold-tone`
- Studio: `/studio/structure/product` → search `panthere-gold-tone`

### 8. Audemars Piguet Royal Oak — Blue Dial (Premium)
- Local JSON: `data/products/ap-royal-oak-blue.json`
- Sanity slug: `royal-oak-blue-dial`
- PDP URL: `/collections/audemars-piguet/royal-oak/royal-oak-blue-dial`
- Studio: `/studio/structure/product` → search `royal-oak-blue-dial`

### 9. Patek Philippe Nautilus — Blue Dial (Premium)
- Local JSON: `data/products/patek-nautilus.json`
- Sanity slug: `nautilus-blue-dial`
- PDP URL: `/collections/patek-philippe/nautilus/nautilus-blue-dial`
- Studio: `/studio/structure/product` → search `nautilus-blue-dial`

### 10. Patek Philippe Aquanaut — Blue/Black (Premium)
- Local JSON: `data/products/patek-aquanaut.json`
- Sanity slug: `aquanaut-blue-black`
- PDP URL: `/collections/patek-philippe/aquanaut/aquanaut-blue-black`
- Studio: `/studio/structure/product` → search `aquanaut-blue-black`

---

## Verification after Studio cleanup

Run from the repo root:

```bash
# Confirm Sanity GROQ no longer returns banned terms in the public projection.
# (Requires sanity CLI or curl against the public CDN endpoint.)
curl -s "https://mzy95zit.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%3D%3D%22product%22%5D%7Bslug%2Cname%2CshortDescription%2CshortDescriptionFr%2CkeyPoints%2ChighlightsFr%2Cspecs%7D" \
  | grep -iE 'swiss|suisse|cerachrom|cérachrome|chromalight|oysterclasp|jubilee|jubilé|glidelock|parachrom|chronergy'
```

A clean exit (no output) means the Studio cleanup is complete and the
mask in `lib/queries.ts` can be retired in a follow-up PR.

If any hit remains, re-open the SKU in Studio, scrub the matching field,
save, and re-run.

---

## Memory updates after retiring the mask

Once the mask is removed in code:

1. Edit
   `~/.claude/projects/-Users-zakidz-artemis-automation/memory/project_sanity_editorial_debt.md`
   to mark the chantier resolved (date the resolution, link to the
   removal PR).
2. Edit `reference_artemis_site_repo.md` to drop the bullet that
   describes the `containsBannedTrademark` fallback so future sessions
   don't reintroduce it.
3. Update `MEMORY.md` description line accordingly.
