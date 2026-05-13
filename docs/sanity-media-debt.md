# Sanity media debt - Artemis

> Audit de la dette photo et vidéo dans Sanity Studio.
> Généré le 2026-05-13, dataset `mzy95zit/production`, 78 produits.
> Source: requête GROQ sur tous les `product` (cf AUDIT_V3.md Bug 1).

## Contexte

L'objectif AUDIT_V3 est 4 photos minimum par produit (face, côté gauche, côté droit, dos) + vidéo autoplay muted loop sur 100% des fiches. État actuel:

- **0 photo**: 0 produit
- **1 photo** (Section 1): 18 produits
- **2-3 photos** (Annexe): 53 produits sous le seuil de 4
- **4+ photos**: 7 produits (cible atteinte côté images)
- **Sans vidéo** (Section 2): 23 produits
- **1 photo ET sans vidéo** (Section 3): 18 produits (priorité absolue)

**Comment fixer**: cliquer le lien Studio, drag-drop les fichiers dans `images` et `video`, publish. Ordre recommandé pour images: face d'abord, puis côté gauche, côté droit, dos.

**Note schéma**: une validation warning (jaune, non bloquante) est ajoutée sur `images` pour signaler les SKUs sous le seuil de 4 photos dans Studio. Elle bascule en `.error()` une fois la dette résorbée.

---

## Section 1 — Photos secondaires manquantes (18 SKUs)

Ces produits n'ont qu'une seule photo (face). Manquant: côté gauche, côté droit, dos.

| Tier | SKU | Nom produit | Prix (CAD) | Manquant | Studio |
|---|---|---|---|---|---|
| Premium | `daytona-black-dial` | Daytona (Black Dial) | 1550 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-daytona-black) |
| Premium | `aquanaut-blue-black` | Aquanaut (Blue/Black Dial) | 1400 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-aquanaut-blue) |
| Premium | `nautilus-blue-dial` | Nautilus (Blue Dial) | 1400 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-nautilus-blue) |
| Premium | `submariner-date-black-dial` | Submariner Black (Swiss Movement) | 1250 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-date-black) |
| Premium | `datejust-41-silver-dial` | Datejust 41 (Silver Dial) | 1200 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41) |
| Premium | `panthere-gold-tone` | Panthère de Cartier (Gold Tone) | 1050 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-panthere-gold) |
| Premium | `santos-silver-dial` | Santos de Cartier (Silver Dial) | 1050 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-silver) |
| Essential | `nautilus-black-essential` | Nautilus (Black Dial — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-philippe-nautilus-black-essential) |
| Essential | `nautilus-blue-essential` | Nautilus (Blue Dial — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-philippe-nautilus-blue-essential) |
| Essential | `royal-oak-black-essential` | Royal Oak (Black Dial — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-black-essential) |
| Essential | `royal-oak-blue-essential` | Royal Oak (Blue Dial — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-blue-essential) |
| Essential | `royal-oak-rosegold-essential` | Royal Oak (Rose Gold — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-rosegold-essential) |
| Essential | `royal-oak-skeleton-black-essential` | Royal Oak Skeleton (Black — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-black-essential) |
| Essential | `royal-oak-skeleton-rosegold-essential` | Royal Oak Skeleton (Rose Gold — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-rosegold-essential) |
| Essential | `royal-oak-skeleton-silver-essential` | Royal Oak Skeleton (Silver — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-silver-essential) |
| Essential | `royal-oak-skeleton-white-essential` | Royal Oak Skeleton (White — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-white-essential) |
| Essential | `santos-black-essential` | Santos de Cartier (Black Dial — Essential) | 350 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-black) |
| Essential | `datejust-36-black-dial` | Datejust 36 (Black Dial) | 330 | 3 photos (côté G, côté D, dos) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-36) |

---

## Section 2 — Vidéo manquante (23 SKUs)

Ces produits n'ont pas de vidéo. Format attendu: MP4 vertical (cohérent avec format Sanity actuel), autoplay muted loop, 5-10 secondes.

| Tier | SKU | Nom produit | Prix (CAD) | Photos actuelles | Studio |
|---|---|---|---|---|---|
| Premium | `daytona-black-dial` | Daytona (Black Dial) | 1550 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-daytona-black) |
| Premium | `gmt-master-ii-pepsi` | GMT-Master II (Pepsi — Red/Blue Bezel) | 1450 | 4 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-gmt-master-ii-pepsi) |
| Premium | `royal-oak-blue-dial` | Royal Oak (Blue Dial · 41mm) | 1450 | 3 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-blue) |
| Premium | `aquanaut-blue-black` | Aquanaut (Blue/Black Dial) | 1400 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-aquanaut-blue) |
| Premium | `nautilus-blue-dial` | Nautilus (Blue Dial) | 1400 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-nautilus-blue) |
| Premium | `submariner-date-black-dial` | Submariner Black (Swiss Movement) | 1250 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-date-black) |
| Premium | `submariner-date-blue-dial` | Submariner Bluesy (Japanese Movement) | 1250 | 2 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-date-blue) |
| Premium | `datejust-41-silver-dial` | Datejust 41 (Silver Dial) | 1200 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41) |
| Premium | `panthere-gold-tone` | Panthère de Cartier (Gold Tone) | 1050 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-panthere-gold) |
| Premium | `santos-silver-dial` | Santos de Cartier (Silver Dial) | 1050 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-silver) |
| Essential | `aquanaut-black-essential` | Aquanaut (Black — Essential) | 350 | 3 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-philippe-aquanaut-black-essential) |
| Essential | `nautilus-black-essential` | Nautilus (Black Dial — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-philippe-nautilus-black-essential) |
| Essential | `nautilus-blue-essential` | Nautilus (Blue Dial — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-philippe-nautilus-blue-essential) |
| Essential | `royal-oak-black-essential` | Royal Oak (Black Dial — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-black-essential) |
| Essential | `royal-oak-blue-essential` | Royal Oak (Blue Dial — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-blue-essential) |
| Essential | `royal-oak-rosegold-essential` | Royal Oak (Rose Gold — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-rosegold-essential) |
| Essential | `royal-oak-skeleton-black-essential` | Royal Oak Skeleton (Black — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-black-essential) |
| Essential | `royal-oak-skeleton-rosegold-essential` | Royal Oak Skeleton (Rose Gold — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-rosegold-essential) |
| Essential | `royal-oak-skeleton-silver-essential` | Royal Oak Skeleton (Silver — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-silver-essential) |
| Essential | `royal-oak-skeleton-white-essential` | Royal Oak Skeleton (White — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-white-essential) |
| Essential | `santos-black-essential` | Santos de Cartier (Black Dial — Essential) | 350 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-black) |
| Essential | `datejust-36-black-dial` | Datejust 36 (Black Dial) | 330 | 1 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-36) |
| Essential | `oyster-perpetual-41-blue-essential` | Oyster Perpetual 41 (Blue Dial — Essential) | 320 | 3 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-oyster-perpetual-41-blue-essential) |

---

## Section 3 — Priorité absolue (18 SKUs, 1 photo ET sans vidéo)

Ces produits cumulent les deux dettes. Ce sont les fiches les plus pauvres du site, à traiter en premier.

| Tier | SKU | Nom produit | Prix (CAD) | Studio |
|---|---|---|---|---|
| Premium | `daytona-black-dial` | Daytona (Black Dial) | 1550 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-daytona-black) |
| Premium | `aquanaut-blue-black` | Aquanaut (Blue/Black Dial) | 1400 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-aquanaut-blue) |
| Premium | `nautilus-blue-dial` | Nautilus (Blue Dial) | 1400 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-nautilus-blue) |
| Premium | `submariner-date-black-dial` | Submariner Black (Swiss Movement) | 1250 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-date-black) |
| Premium | `datejust-41-silver-dial` | Datejust 41 (Silver Dial) | 1200 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41) |
| Premium | `panthere-gold-tone` | Panthère de Cartier (Gold Tone) | 1050 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-panthere-gold) |
| Premium | `santos-silver-dial` | Santos de Cartier (Silver Dial) | 1050 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-silver) |
| Essential | `nautilus-black-essential` | Nautilus (Black Dial — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-philippe-nautilus-black-essential) |
| Essential | `nautilus-blue-essential` | Nautilus (Blue Dial — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-philippe-nautilus-blue-essential) |
| Essential | `royal-oak-black-essential` | Royal Oak (Black Dial — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-black-essential) |
| Essential | `royal-oak-blue-essential` | Royal Oak (Blue Dial — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-blue-essential) |
| Essential | `royal-oak-rosegold-essential` | Royal Oak (Rose Gold — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-rosegold-essential) |
| Essential | `royal-oak-skeleton-black-essential` | Royal Oak Skeleton (Black — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-black-essential) |
| Essential | `royal-oak-skeleton-rosegold-essential` | Royal Oak Skeleton (Rose Gold — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-rosegold-essential) |
| Essential | `royal-oak-skeleton-silver-essential` | Royal Oak Skeleton (Silver — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-silver-essential) |
| Essential | `royal-oak-skeleton-white-essential` | Royal Oak Skeleton (White — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-skeleton-white-essential) |
| Essential | `santos-black-essential` | Santos de Cartier (Black Dial — Essential) | 350 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-black) |
| Essential | `datejust-36-black-dial` | Datejust 36 (Black Dial) | 330 | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-36) |

---

## Annexe — Sous le seuil de 4 photos (53 SKUs, 2-3 photos)

Ces produits ont déjà une vraie galerie (2-3 angles) mais restent sous la cible AUDIT_V3 de 4 photos minimum. Priorité secondaire après les Sections 1-3.

| Tier | SKU | Nom produit | Prix (CAD) | Photos | Manquant | Studio |
|---|---|---|---|---|---|---|
| Premium | `royal-oak-blue-dial` | Royal Oak (Blue Dial · 41mm) | 1450 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;ap-royal-oak-blue) |
| Premium | `submariner-date-blue-dial` | Submariner Bluesy (Japanese Movement) | 1250 | 2 | 2 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-date-blue) |
| Essential | `aquanaut-black-essential` | Aquanaut (Black — Essential) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;patek-philippe-aquanaut-black-essential) |
| Essential | `daytona-black-essential` | Cosmograph Daytona (Black Dial — Essential) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-daytona-black-essential) |
| Essential | `daytona-blue-essential` | Cosmograph Daytona (Blue Dial — Essential) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-daytona-blue-essential) |
| Essential | `daytona-panda-essential` | Cosmograph Daytona (Panda — White Dial) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-daytona-panda-essential) |
| Essential | `gmt-master-ii-batgirl-essential` | GMT-Master II (Batgirl — Blue/Black Bezel) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-gmt-master-ii-batgirl-essential) |
| Essential | `gmt-master-ii-brucewayne-essential` | GMT-Master II (Bruce Wayne — All-Black) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-gmt-master-ii-brucewayne-essential) |
| Essential | `gmt-master-ii-pepsi-essential` | GMT-Master II (Pepsi — Red/Blue Bezel) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-gmt-master-ii-pepsi-essential) |
| Essential | `gmt-master-ii-rootbeer-essential` | GMT-Master II (Root Beer — Brown/Gold Bezel) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-gmt-master-ii-rootbeer-essential) |
| Essential | `gmt-master-ii-sprite-essential` | GMT-Master II (Sprite — Green/Black Bezel) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-gmt-master-ii-sprite-essential) |
| Essential | `gmt-master-ii-zombie-essential` | GMT-Master II (Zombie — Yellow/Black Bezel) | 350 | 2 | 2 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-gmt-master-ii-zombie-essential) |
| Essential | `santos-black-essential` | Santos de Cartier (Black Dial — Essential) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-black-essential) |
| Essential | `santos-blue-essential` | Santos de Cartier (Blue Dial — Essential) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-blue-essential) |
| Essential | `santos-gold-essential` | Santos de Cartier (Gold Dial — Essential) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-gold-essential) |
| Essential | `santos-silver-essential` | Santos de Cartier (Silver Dial — Essential) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-silver-essential) |
| Essential | `santos-skeleton-essential` | Santos de Cartier Skeleton (Skeleton Dial — Essential) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-santos-skeleton-essential) |
| Essential | `submariner-black-date-essential` | Submariner Black (Japanese Movement) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-blackdate-essential) |
| Essential | `submariner-black-no-date-essential` | Submariner - No Date (Japanese Movement) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-black-nodate-essential) |
| Essential | `submariner-bluesy-essential` | Submariner Bluesy (Japanese Movement) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-bluesy-essential) |
| Essential | `submariner-hulk-essential` | Submariner Hulk (Japanese Movement) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-hulk-essential) |
| Essential | `submariner-smurf-essential` | Submariner Smurf (Japanese Movement) | 350 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-smurf-essential) |
| Essential | `submariner-starbucks-essential` | Submariner Starbucks (Japanese Movement) | 350 | 2 | 2 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-submariner-starbucks-essential) |
| Essential | `datejust-2tone-essential` | Datejust (Two-Tone Steel & Gold) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-2tone-essential) |
| Essential | `datejust-41-black-essential` | Datejust 41 (Black Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41-black-essential) |
| Essential | `datejust-41-chocolate-essential` | Datejust 41 (Chocolate Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41-chocolate-essential) |
| Essential | `datejust-41-green-essential` | Datejust 41 (Green Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41-green-essential) |
| Essential | `datejust-41-grey-essential` | Datejust 41 (Grey Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41-grey-essential) |
| Essential | `datejust-41-white-essential` | Datejust 41 (White Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41-white-essential) |
| Essential | `datejust-41-wimbledon-essential` | Datejust 41 (Wimbledon — Fluted Bezel) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41-wimbledon-essential) |
| Essential | `datejust-41-wimbledon-smooth-essential` | Datejust 41 (Wimbledon — Smooth Bezel) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-41-wimbledon-smooth-essential) |
| Essential | `datejust-wimbledon-gold-essential` | Datejust (Wimbledon Gold — Fluted) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-wimbledon-gold-essential) |
| Essential | `day-date-blue-essential` | Day-Date 40 (Blue Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-day-date-blue-essential) |
| Essential | `day-date-brown-essential` | Day-Date 40 (Brown Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-day-date-brown-essential) |
| Essential | `day-date-gold-essential` | Day-Date 40 (Champagne Gold Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-day-date-gold-essential) |
| Essential | `day-date-green-essential` | Day-Date 40 (Green Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-day-date-green-essential) |
| Essential | `day-date-ombre-essential` | Day-Date 40 (Ombré Dial — Essential) | 330 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-day-date-ombre-essential) |
| Essential | `explorer-black-essential` | Explorer (Black Dial — Essential) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-explorer-black-essential) |
| Essential | `explorer-ii-essential` | Explorer II (White Dial — Essential) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-explorer-ii-essential) |
| Essential | `land-dweller-blue-essential` | Land-Dweller (Blue Dial — Essential) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-land-dweller-blue-essential) |
| Essential | `land-dweller-rosegold-essential` | Land-Dweller (Rose Gold — Essential) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-land-dweller-rosegold-essential) |
| Essential | `land-dweller-white-essential` | Land-Dweller (White Dial — Essential) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-land-dweller-white-essential) |
| Essential | `oyster-perpetual-41-black-essential` | Oyster Perpetual 41 (Black Dial — Essential) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-oyster-perpetual-41-black-essential) |
| Essential | `oyster-perpetual-41-blue-essential` | Oyster Perpetual 41 (Blue Dial — Essential) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-oyster-perpetual-41-blue-essential) |
| Essential | `oyster-perpetual-41-grey-essential` | Oyster Perpetual Grey (Japanese Movement) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-oyster-perpetual-41-grey-essential) |
| Essential | `oyster-perpetual-41-pistachio-essential` | Oyster Perpetual - Pistachio (Japanese Movement) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-oyster-perpetual-41-green-essential) |
| Essential | `sky-dweller-rosegold-essential` | Sky-Dweller Rosegold (Japanese Movement) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-sky-dweller-rosegold-essential) |
| Essential | `sky-dweller-steel-essential` | Sky-Dweller Blue (Steel — Essential) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-sky-dweller-steel-essential) |
| Essential | `yacht-master-silver-essential` | Yacht-Master 40 (Japanese Movement) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-yacht-master-silver-essential) |
| Essential | `yacht-master-steel-essential` | Yacht-Master 40 (Japanese Movement) | 320 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-yacht-master-steel-essential) |
| Essential | `datejust-31-gold-essential` | Datejust 31 (Gold Dial — Essential) | 300 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-31-gold-essential) |
| Essential | `datejust-31-pink-essential` | Datejust 31 (Pink Dial — Essential) | 300 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;rolex-datejust-31-pink-essential) |
| Essential | `panthere-essential` | Panthère de Cartier (Steel — Essential) | 280 | 3 | 1 photo(s) | [Ouvrir](https://artemis-sigma-tan.vercel.app/studio/structure/product;cartier-panthere-essential) |
