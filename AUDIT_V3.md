# AUDIT_V3 - Audit Conversion + Fix Sprint Artemis

> Document de référence pour Claude Code. À committer à la racine du repo Artemis.
> Version: V3
> Site cible: https://artemis-sigma-tan.vercel.app/

---

## Mission

Audit complet du site sous l'angle "client TDAH, attention span 8 secondes" + corrections immédiates des points bloquants déjà identifiés. Objectif final: lever les frictions qui empêchent le clic vers WhatsApp.

**Règle absolue**: aucun em-dash ni en-dash dans le code, les copies, les données Sanity ou les commits. Utiliser virgule, point, deux-points, ou parenthèses.

---

## PARTIE 1: AUDIT CONVERSION

Livrable: rapport structuré, format tableau Markdown.

### Persona test

Client mobile-first, scroll rapide, attention span 8 secondes, intolérant à la friction. Ferme l'onglet si rien n'accroche en 3 secondes.

### Grille d'évaluation par page

1. **Above-the-fold**: qu'est-ce qui est visible en 0 scroll sur 1440px et 375px?
2. **Hiérarchie visuelle**: où va l'oeil en premier, deuxième, troisième?
3. **CTA WhatsApp**: visible sans scroll? combien de clics pour y accéder?
4. **Charge cognitive**: nombre d'éléments concurrents par écran (cible 3 max).
5. **Frictions**: pop-ups, animations parasites, textes longs, choix multiples.
6. **Mobile parity**: tous les points ci-dessus en vue 375px.

### Pages à auditer

- Landing
- Page produit (tester sur Submariner Date, GMT Batgirl, Daytona Panda)
- Notre approche
- Mouvements
- Collections

### Format du livrable

| Page | Problème | Impact conversion (H/M/L) | Fix recommandé | Effort (H/M/L) |
|---|---|---|---|---|

Trier par impact décroissant. Maximum 15 lignes (priorisation forcée).

---

## PARTIE 2: BUGS P0

À fixer immédiatement, avant toute autre action.

### Bug 1: Galerie produit (persistant)

**Symptôme**: vidéo ne se lance pas sur certains produits, photos face, côté, dos non visibles.

**Confirmation**: les fichiers sont dans la base de données Sanity. Le bug est côté composant ou requête.

**Investigation séquencée**:

1. Inspecter le schema Sanity du type `product`: vérifier les champs `images[]`, `video`, `mediaGallery`.
2. Inspecter le composant `ProductGallery` (path probable: `src/components/product/ProductGallery.tsx`): vérifier le rendu conditionnel et les fallbacks.
3. Comparer un produit qui fonctionne vs un qui ne fonctionne pas (extraire les deux objets Sanity en JSON).
4. Ouvrir DevTools Network sur une page produit cassée: chercher les 404 sur le CDN Sanity (`cdn.sanity.io`).
5. Vérifier la query GROQ qui récupère les médias.

**Acceptation**: 4 photos minimum par produit (face, côté gauche, côté droit, dos) + vidéo autoplay muted loop sur 100% des fiches produit.

### Bug 2: Landing page rétrécie

**Symptôme**: la landing ne prend plus toute la largeur, ne remplit pas l'écran.

**Investigation**:

1. Inspecter le layout root: containers `max-w-*`, padding, margin auto.
2. Vérifier le composant `Hero` et son wrapper.
3. Vérifier les viewport units (`100vh`, `100vw`) et les éventuels `overflow-hidden` parasites.

**Acceptation**: hero plein écran sur desktop 1440px et 1920px, mobile 375px sans débordement horizontal.

---

## PARTIE 3: CORRECTIONS UX (P1)

### Fix 1: CTA WhatsApp above-the-fold sur page produit

**Symptôme**: obligé de scroller pour voir "Commander sur WhatsApp".

**Fix**:

- Placer le bouton dans la section hero du produit, à droite des images (desktop), sous le titre et le prix (mobile).
- Style: bouton large, couleur primary Artemis ou WhatsApp green, texte "Commander sur WhatsApp", icône WhatsApp à gauche.
- Sticky sur mobile (bottom bar fixe) pour rester visible en scrollant.
- Lien pré-rempli: `https://wa.me/15145609765?text=Bonjour%2C%20je%20suis%20intéressé%20par%20la%20[MODÈLE]%20réf%20[REF]%20(gamme%20[ESSENTIAL%2FPREMIUM])`

**Acceptation**: bouton 100% visible en 0 scroll sur 1440px et 375px.

### Fix 2: Purge totale des em-dashes

**Symptôme**: présence d'em-dashes qui donnent une signature LLM-generated.

**Méthode**:

```bash
grep -rn $'\xe2\x80\x94' src/ public/ sanity/
grep -rn $'\xe2\x80\x93' src/ public/ sanity/
```

Remplacer:

- em-dash (U+2014) par virgule, point, deux-points ou parenthèses selon contexte.
- en-dash (U+2013) idem.

**Périmètre**: composants React, copy, données Sanity (faire un export, sed global, réimport), metadata SEO, alt-texts.

**Acceptation**: 0 occurrence d'em-dash ou en-dash dans le repo et dans Sanity.

### Fix 3: Suppression FAQ de la navigation

**Symptôme**: lien FAQ redondant dans la nav alors que la FAQ existe déjà en bas de landing et en bas de chaque fiche produit.

**Fix**: retirer le lien FAQ du header, footer et sidebar mobile. Conserver les deux instances déjà en place.

### Fix 4: Fusion "Notre histoire" et "Notre approche"

**Symptôme**: deux pages redondantes qui disent presque la même chose.

**Fix**:

1. Créer une seule page `/notre-approche` (slug retenu pour SEO).
2. Structure cible (1 écran, scroll minimal):
   - Hero: une phrase de positionnement, 8 mots max.
   - 3 piliers en cartes: Authenticité assumée, 2 gammes claires, Garanties solides.
   - CTA final: "Voir la collection".
3. Rediriger `/notre-histoire` vers `/notre-approche` via un 301 dans `next.config.js`.

**Acceptation**: une seule page, redondance éliminée, scroll inférieur à 2 écrans.

### Fix 5: Page Mouvements, élaguer et visualiser

**Symptôme**: tableau du haut excellent, mais texte redondant en dessous qui réexplique la même chose.

**Fix**:

1. Garder le tableau comparatif tel quel.
2. Supprimer tout le texte explicatif redondant qui suit.
3. Ajouter une section "Les 3 mouvements en image" sous le tableau:

| Mouvement | Image | Tier Artemis |
|---|---|---|
| Mingzhu (Chine) | photo macro | Non commercialisé |
| Miyota (Japon) | photo macro | Essential |
| Dandong via VSF (Suisse) | photo macro | Premium |

**Sources libres pour les images** (à fetcher):

- Wikimedia Commons (licence CC).
- Watchuseek, RWI forums (usage éditorial).
- Sites manufacturiers officiels (Citizen pour Miyota, ETA archives).

**Placeholder**: ajouter un commentaire `{/* TODO: remplacer par photo Zaki */}` sous chaque image en attendant les photos macro de Zaki.

**Acceptation**: page tient en 1 écran desktop, scroll inférieur à 1.5 écran mobile, 0 texte redondant.

---

## ORDRE D'EXÉCUTION

| Jour | Bloc | Livrable |
|---|---|---|
| 1 | Partie 2 (bugs P0) | Galerie produit fonctionnelle + landing plein écran |
| 2 | Fix 1 + Fix 2 | WhatsApp CTA above-the-fold + repo purgé d'em-dashes |
| 3 | Fix 3 + Fix 4 + Fix 5 | Nav nettoyée, /notre-approche fusionnée, /mouvements élaguée |
| 4 | Partie 1 (audit) | Rapport tableau priorisé, post-fixes |

**Cible**: site optimisé conversion en 4 jours, audit final servant de baseline mesurable.

---

## RAPPELS

- Ton confiance tranquille, pas de scarcité, pas de hype.
- French Canadian copy uniquement.
- Fonts: Outfit ou Satoshi, jamais Inter.
- Background: noir #000000 si cohérent avec le design system Artemis actuel.
- Animations: Framer Motion uniquement.
- Aucune mention de "réplique" sur Marketplace, ce document reste interne au repo.
