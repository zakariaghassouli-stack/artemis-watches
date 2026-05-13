# Audit Conversion V1 - Artemis (persona attention 8s)

> Baseline post-Sprint AUDIT_V3, date 2026-05-13, ref commit `3bc1c49` (HEAD main).
> Pages auditées : 7. Composants globaux audit : 4. Frictions identifiées : 15.

## 1. Synthèse

Le sprint AUDIT_V3 a réglé les 5 frictions catalysantes (galerie cassée, hero rétréci, em-dashes, FAQ nav, CTA WhatsApp PDP). Le site est désormais cohérent et techniquement propre. Trois axes restent en friction pour le persona TDAH :

1. **4 pop-ups/banners actifs simultanément en 0-8s** (AnnouncementBar, CookieBanner, WhatsAppFAB à 1.5s, PromoPopup à 8s) écrasent le fold landing avant que l'utilisateur lise le H1. C'est la friction #1 du site.
2. **4 pages clés sans CTA WhatsApp above-the-fold** (/collections, /collections/rolex, /collections/rolex/daytona, /mouvements) cassent le funnel de conversion direct messagerie. PDP est désormais OK (Sprint AUDIT_V3 Fix 1) mais les pages d'entrée du funnel ne le sont pas.
3. **18 PDPs ont 1 photo unique** (cf docs/sanity-media-debt.md), dette donnée Sanity, pas code. Galerie vide = perte de confiance immédiate sur les SKUs concernés (dont des Premium 1 200 CAD+).

Top 3 frictions H-impact à régler dans le prochain sprint : #1 cleanup pop-ups, #4 CTA WhatsApp omniprésent collections/mouvements, #3 upload photos PDPs vides.

## 2. Méthode

Persona : client mobile-first, attention span 8 secondes, intolérant friction. Audit fait en lecture code (pas screenshots) : inventaire mécanique délégué à un subagent Explore (offsets, sections, mots, animations, pop-ups), synthèse + scoring TDAH + priorisation effectuée inline. 7 pages × 6 critères + 4 composants globaux. Offsets calculés en cumul des CSS clamp à 1440px desktop et 375px mobile.

## 3. Inventaire structurel

### Composants globaux (chargés sur toutes pages)

| Composant | Trigger | Position | Dismissible | Impact fold |
|---|---|---|---|---|
| AnnouncementBar | Load (default enabled via Sanity) | Top fixed sous header, 36px | Oui (X icon, sessionStorage) | **+36px à tous fold offsets** |
| WhatsAppFAB | Load + 1.5s | Bottom-right fixed 56x56 | Non (toujours visible) | Distraction périphérique |
| CookieBanner | Load si pas de consent | Bottom fixed full-width ~60px | Oui (Essential / Accept all) | **+60px mange fold mobile** |
| PromoPopup | Load + 8s, ou exit-intent desktop | Modal overlay z-index 9001 | Oui (X / "No thanks") | **Bloque toute la page** |

### Page 1 - Landing `/`

- **Sections** : 12 (Hero, TierOneSourcing, PreparationMontreal, TrustBar, FeaturedCollections, TiersCards, BestSellers, AuthenticityAssumed, HowToOrder, SignupPromo, FAQAccordion. Testimonials commenté)
- **Offset 1er CTA WhatsApp** : ~438px desktop / ~452px mobile (single-col reflow met image hero en haut)
- **Mots hero** : 32 (overline 9 + H1 6 + subheadline 11 + 3 bullets 6)
- **Interactifs above-fold (1440x900)** : 5 (Navbar menus, CTA WA primary, CTA Explore secondary, FAB, scroll indicator non-interactif)
- **Animations above-fold** : 6 ScrollReveal (delays 0/80/160/200/240/280ms). **2 dépassent 200ms** sur le CTA principal et les bullets
- **Pop-ups/banners** : 4 globaux empilés (worst case offender)

### Page 2 - PDP générique

- **Sections** : 7 (Hero gallery+info, SpecsTable, ProductTabs, ProductFAQ, RelatedProducts, RecentlyViewed, MobileStickyBar)
- **Offset 1er CTA WhatsApp** : ~474px desktop (CTA hero ajouté Sprint AUDIT_V3) / **~653px mobile** (gallery 1/1 = 375px avant ProductInfo)
- **Mots hero** : ~15 visibles (varie selon SKU : nom + prix + range badge + 2-3 trust badges)
- **Interactifs above-fold** : 10-15 (Navbar, Breadcrumb, thumbnails 1-6, hero CTA WA, Add to Cart, Wishlist, range selector si variants, size selector si applicable, FAB)
- **Animations above-fold** : 0 (ProductGallery + ProductInfo sont client components sans ScrollReveal)
- **Pop-ups/banners** : 4 globaux + MobileStickyBar mobile (visible après 600px scroll)

#### Sub-variations PDP (impact données)

| SKU | Photos | Vidéo | Tier | Prix | Galerie ressenti |
|---|---|---|---|---|---|
| `daytona-panda-essential` | 3 | non | Essential | 350 CAD | Acceptable, manque 1 photo + vidéo |
| `gmt-master-ii-batgirl-essential` | 3 | non | Essential | 350 CAD | Idem |
| `submariner-label-noir-essential` | **5** | **oui** | Essential | 350 CAD | **Riche, cas optimal post-fix gallery** |
| `submariner-date-black-dial` | **1** | non | **Premium 1 250 CAD** | Catastrophique pour le tier prix |

(Sub-agent erronément reporté submariner-label-noir-essential à 3 photos : verification curl Sanity API confirme 5 images + 1 video MP4. Le doc `docs/sanity-media-debt.md` annexe section confirme également l'inventaire.)

### Page 3 - `/notre-approche`

- **Sections** : 7 (Hero, Authenticité, Stats, Tableau, Garanties, CTA final, Footnote)
- **Offset 1er CTA WhatsApp** : ~466px desktop / ~400px mobile (single-col compact)
- **Mots hero** : 28 (overline 1 + H1 2 + subhero 25)
- **Interactifs above-fold** : 6 (Navbar, Breadcrumb, CTA primary "Voir collection", CTA secondary "Discuter sur WhatsApp", FAB)
- **Animations above-fold** : 4 ScrollReveal (delays 0/80/140/200ms). **1 à 200ms** sur le CTA
- **Pop-ups/banners** : 4 globaux

### Page 4 - `/mouvements`

- **Sections** : 4 (Hero, Comparison table, 3 visual cards Sprint AUDIT_V3, Final CTA)
- **Offset 1er CTA WhatsApp** : **~1700-2000px** (CTA est en Final CTA section, après tableau + 3 cards). **Pas de CTA dans le hero**. FAB fallback périphérique.
- **Mots hero** : 46 (H1 1 + intro 45), **intro très lourd pour persona TDAH**
- **Interactifs above-fold** : 4 (Navbar, Breadcrumb, FAB, scroll indicator). **Zéro CTA hero**.
- **Animations above-fold** : 2 ScrollReveal (delays 0/120ms, OK)
- **Pop-ups/banners** : 4 globaux

### Page 5 - `/collections` (landing collections)

- **Sections** : 2 (Hero, Brand grid 4 cards)
- **Offset 1er CTA WhatsApp** : **N/A**, aucun CTA WhatsApp sur la page
- **Mots hero** : 16 (H1 "Collections" 1 + subtitle 15)
- **Interactifs above-fold** : 8+ (Navbar, FAB, 4 brand cards + tag links)
- **Animations above-fold** : 6 ScrollReveal. **1 à delay 280ms** (4ème brand card)
- **Pop-ups/banners** : 4 globaux

### Page 6 - `/collections/rolex` (brand page)

- **Sections** : 2 (Hero compact, BrandCatalogClient grid + filters)
- **Offset 1er CTA WhatsApp** : **N/A**, aucun CTA WhatsApp dans le hero
- **Mots hero** : ~8 (H1 "Rolex" 1 + subtitle ~4 + pieces badge ~3)
- **Interactifs above-fold** : 12+ (Navbar, Breadcrumb, 4 filter dropdowns, sort dropdown, product cards, FAB)
- **Animations above-fold** : 0 (filters/grid client-side)
- **Pop-ups/banners** : 4 globaux

### Page 7 - `/collections/rolex/daytona` (collection page)

- **Sections** : 2 (Hero, ProductGridClient)
- **Offset 1er CTA WhatsApp** : **N/A**, aucun CTA WhatsApp
- **Mots hero** : 27 (Breadcrumb 3 + H1 1 + description 20 + price range 3)
- **Interactifs above-fold** : 10+ (Navbar, Breadcrumb 3, filter pills 3, sort dropdown, product cards, FAB)
- **Animations above-fold** : 0
- **Pop-ups/banners** : 4 globaux

## 4. Scoring TDAH 6 critères

Critères :
- **A** Above-the-fold clarity : persona comprend ce qu'on vend en 3s ?
- **B** CTA WhatsApp accessibility : visible sans scroll + sticky ?
- **C** Charge cognitive above-fold : nombre éléments concurrents (cible ≤3)
- **D** Friction d'entrée : pop-ups/banners/animations parasites
- **E** Mobile parity 375px vs 1440px
- **F** Hiérarchie visuelle : œil va au bon endroit ?

Scoring H = bon / M = moyen / L = faible

| Page | A clarity | B CTA WA | C cognitive | D friction | E mobile | F hiérarchie |
|---|---|---|---|---|---|---|
| Landing `/` | M | M | L | **L** | M | M |
| PDP générique | H | H | M | L | M | H |
| /notre-approche | H | H | H | L | H | H |
| /mouvements | M | **L** | H | L | H | M |
| /collections | M | **L** | M | L | H | M |
| /collections/rolex | M | **L** | M | L | M | **L** |
| /collections/rolex/daytona | H | **L** | M | L | M | M |

**Patterns** :
- Critère D (friction d'entrée) : **L sur 7/7 pages**, les 4 pop-ups globaux écrasent toutes les pages. Friction systémique.
- Critère B (CTA WA) : **L sur 4/7 pages**, toutes les pages "navigation catalogue" (collections + mouvements) ratent le funnel direct.
- Critère A (clarity) : **H sur 3 pages seulement**, PDPs + /notre-approche + collection page sont clairs. Landing + brand pages flous.

## 5. Top 15 frictions priorisées

Tri impact-décroissant. Estimation effort : H = 1+ sprint / M = 1-2 jours / L = quelques heures.

| # | Page | Problème | Impact | Fix recommandé | Effort |
|---|---|---|---|---|---|
| 1 | All | **PromoPopup déclenche à 8s + exit-intent** : interrompt persona en pleine action. Le persona TDAH part déjà à 8s, le popup amplifie l'exit | H | Drop le popup, ou retarder à 30-45s + retirer exit-intent (paradoxal). Si garde : tester avec dismissal rate threshold | L |
| 2 | All | **4 banners actifs en 0-8s** (AnnouncementBar load + CookieBanner load + WhatsAppFAB à 1.5s + PromoPopup à 8s) | H | Stagger : CookieBanner inline minimal en sticky bottom, WhatsAppFAB déjà OK, AnnouncementBar dismissible OK, PromoPopup voir #1 | M |
| 3 | PDP (18 SKUs) | **18 PDPs ont 1 photo seule** (dont 7 Premium 1 050-1 550 CAD). Galerie vide = perte confiance immédiate | H | Upload manuel des photos via Sanity Studio (cf docs/sanity-media-debt.md). Pas de fix code possible | H |
| 4 | /collections, /collections/rolex, /collections/rolex/daytona, /mouvements | **Aucun CTA WhatsApp above-fold sur 4 pages clés du funnel** | H | Ajouter ContactCTA hero (variant secondary, size md) sur chaque hero. Cohérent avec /notre-approche pattern | M |
| 5 | PDP mobile | **CTA hero à ~653px sur iPhone 13 (sous fold)** : la gallery 1/1 mange 375px de haut. Sticky bar compense après 600px scroll mais latence cognitive | H | Layout mobile alternatif : (a) gallery aspectRatio 1.4 au lieu 1/1 ; (b) gallery 60vh max au lieu 100vw ; (c) inverser ordre = info d'abord, gallery scrollable | M |
| 6 | Landing | **Hero overline "MONTRÉAL · ROLEX · CARTIER · AUDEMARS PIGUET · PATEK"** : 9 mots, 5 bullet points, lit comme une liste de courses | M | Simplifier en `MONTRÉAL` ou `RARE PLUG MONTRÉAL`. Les 4 marques sont visibles partout via FeaturedCollections section + Navbar | L |
| 7 | Landing | **12 sections au total** : scroll long, persona ne se rend pas en bas. TierOneSourcing + AuthenticityAssumed = doublon partiel /notre-approche | M | Drop TierOneSourcing (déjà couvert /notre-approche), garder AuthenticityAssumed sur landing comme value-prop visuelle. Réduit à 11 sections | M |
| 8 | Landing | **CTA hero ScrollReveal delay 240ms** : le CTA principal apparaît après 240ms d'animation. Persona perçoit du retard | M | Retirer ScrollReveal sur le CTA `delay={240}` dans Hero.tsx. Garder fade-in sur subheadline + bullets, mais CTA = rendu immédiat | L |
| 9 | /mouvements | **Hero = H1 1 mot + intro 45 mots** : intro lourd, pas de CTA. Persona scroll sans ancre conversion | M | (a) Raccourcir intro à 15-20 mots ; (b) ajouter CTA hero "Discuter d'une pièce" cohérent avec /notre-approche | L |
| 10 | PDP gallery | **Vidéo en dernière thumb après 5+ images** : sur mobile scroll horizontal, persona peut rater son existence | M | Badge "VIDÉO" persistent sur la vidéo thumb (icône play déjà présent mais subtil). Considérer auto-playing video preview comme première thumb | L |
| 11 | /collections | **Aucun signal prix above-fold** : brand cards sans range "à partir de XXX CAD". Persona doit cliquer pour voir prix | M | Ajouter `Starting from XXX CAD` sous le nom de chaque BrandCard. Donnée déjà calculable via `getProductsByBrand().sort(price)[0]` | L |
| 12 | /collections/rolex | **4 dropdowns filtres visibles d'un coup** sur brand page : intimidant. Brand filter inutile sur la brand page (déjà filtré) | M | (a) Retirer le filter Brand (redondant) ; (b) Compacter Range + Sort en 1 ligne ; (c) Cacher filters par défaut, toggle "Filtres" comme Shopify | M |
| 13 | PDP H1 | **Bullet `·` séparateur multiple** : "Cosmograph Daytona · Panda · White Dial" = 2 bullets visuels, lourd | L | Limiter à 1 bullet entre name et variant. Si variant a 2 parts (e.g. "Panda · White Dial"), garder en virgule interne : "Cosmograph Daytona · Panda, White Dial" | L |
| 14 | Landing | **Hero image right column = Submariner face** : pas particulièrement vendeur (montre noire sur fond noir, peu lisible) | L | Tester avec image lifestyle (poignet, contexte luxe) ou packshot très high-key avec gold accent. A/B test si Vercel Analytics permet | M |
| 15 | /notre-approche, /mouvements | **Pages noindex** : invisible Google. Décision "SEO vs prudence" Sprint AUDIT_V3 a tranché noindex à cause footnote architecture/calibres | L | Réécrire footnote neutre (ban "Rolex 32xx", ban "Swiss") puis flip à `index: true`. Tradeoff TM-safety : à arbitrer avec Zaki | L |

## 6. Recommandations sprint suivant

Synthèse en 5 priorités pour le prochain sprint, avec mapping vers frictions :

### Priorité 1 : Anti-friction d'entrée (frictions #1, #2)

**Objectif** : sur landing, le persona doit pouvoir lire le H1 sans interruption visuelle dans les 3 premières secondes.

**Actions** :
- Drop ou retarder PromoPopup à 30-45s, retirer exit-intent
- CookieBanner : passer en sticky bottom inline 1-ligne (pas overlay)
- AnnouncementBar : par défaut dismissé après 1 vue (sessionStorage déjà OK, vérifier comportement)

**Effort** : 1-2 jours. **Impact attendu** : -10 à -20% bounce rate landing.

### Priorité 2 : CTA WhatsApp omniprésent funnel catalogue (friction #4)

**Objectif** : combler le trou de funnel sur les 4 pages catalogue/mouvements où le CTA WA n'existe pas above-fold.

**Actions** :
- Ajouter ContactCTA hero sur /collections, /collections/[brand], /collections/[brand]/[collection], /mouvements
- Variant : secondary gold size md, cohérent avec /notre-approche
- Source analytics : nouvelle valeur par page (`source: 'collections_hero'`, etc.)

**Effort** : 1 jour. **Impact attendu** : +5-10% WhatsApp CTR sur ces pages.

### Priorité 3 : Photo debt PDPs (friction #3)

**Objectif** : passer les 18 SKUs avec 1 photo à minimum 4 photos. Priorité absolue sur les 7 Premium 1 050+ CAD.

**Actions** :
- Upload manuel via Sanity Studio (cf liens dans docs/sanity-media-debt.md Section 1)
- Pas de fix code requis. Schema validation warning déjà en place

**Effort** : H (1-2 jours par tranche de 5 SKUs si Zaki shoot lui-même). **Impact attendu** : confiance perçue +20% sur les SKUs concernés.

### Priorité 4 : PDP mobile redesign (friction #5)

**Objectif** : CTA hero PDP devient above-fold sur iPhone 13 (375x812).

**Actions** :
- A/B tester layout : (a) gallery aspectRatio 1.4 ; (b) gallery 60vh max ; (c) order info d'abord
- Mesurer scroll depth + WA CTR mobile vs current

**Effort** : 2 jours. **Impact attendu** : +30% WA CTR mobile (PDP).

### Priorité 5 : Landing slim-down (frictions #6, #7, #8)

**Objectif** : hero plus impactant, moins de sections, rendu CTA immédiat.

**Actions** :
- Simplifier overline ("MONTRÉAL" ou drop)
- Drop TierOneSourcing section (doublon /notre-approche)
- Retirer ScrollReveal sur CTA hero (rendu immédiat)

**Effort** : 1 jour. **Impact attendu** : +5% CTA hero CTR, -1 section fold.

## 7. Métriques baseline suggérées

8 métriques à brancher (Vercel Analytics + GA4 ou Posthog) pour mesurer impact du prochain sprint.

| # | Métrique | Cible | Outil | Notes |
|---|---|---|---|---|
| 1 | Bounce rate par page (landing, PDP, /collections, /mouvements, /notre-approche) | <60% | Vercel Analytics ou GA4 | Granularité : par device (desktop/mobile) |
| 2 | Scroll depth median par page | >70% atteint 50% du fold | Posthog ou GA4 scroll events | Identifie les pages où persona décroche tôt |
| 3 | Time to first WhatsApp CTA click (sec) | <30s | Custom event | Nécessite timer JS branché sur whatsappClick |
| 4 | WhatsApp CTA click rate par source analytics | >5% sur sources hero | Existing `whatsappClick` event split par `source` (home_hero, product_hero, product_page, product_sticky, etc.) | Source code déjà en place |
| 5 | PDP → WhatsApp click rate | >8% des visiteurs PDP cliquent un CTA WA | GA4 funnel | Compare avec metric #4 par source PDP |
| 6 | Mobile vs desktop conversion split | Gap <10pts | GA4 segment | Mesure parité mobile (critère E scoring) |
| 7 | Pop-up dismissal rate (PromoPopup) | Si >85% dismiss = popup nuit | Custom event | Données pour décider drop ou keep |
| 8 | Time on page médian par page | >25s landing, >45s PDP | GA4 | Métriques engagement |

**Note infra** : `lib/analytics.ts` (`whatsappClick`) émet déjà des events avec source. Brancher à Vercel Analytics ou Posthog pour collecte. Sans ces métriques, le rapport reste qualitatif et la mesure d'impact du prochain sprint sera approximative.

---

**Fin audit V1.** Prochain audit V2 recommandé après le sprint suivant pour comparer scoring TDAH avant/après et valider l'efficacité des fixes.
