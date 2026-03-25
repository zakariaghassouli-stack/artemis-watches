# Plan de remédiation Artemis Watches
## Score audit : 7.8/10 (basé sur analyse code source du 25 mars 2026)

---

## SPRINT 1 — Nettoyage + SEO localisé (Priorité P0)
**Statut** : ⬜ À faire
**Effort** : 2-3 heures

### Tâche 1.1 : Supprimer les fichiers orphelins
- [ ] Supprimer les 20 fichiers .GIF de public/images/ (non référencés dans le code)
- [ ] Supprimer IMG_4323 2.HEIC de public/images/
- [ ] Vérifier que le build passe après suppression

### Tâche 1.2 : Localiser les metadata du layout
- [ ] Modifier `app/[locale]/layout.tsx` : remplacer le metadata statique par `generateMetadata()` dynamique
- [ ] Utiliser `getTranslations()` pour title, description, keywords selon la locale
- [ ] Corriger `openGraph.locale` : 'fr_CA' quand locale === 'fr', 'en_CA' sinon
- [ ] Ajouter les clés correspondantes dans messages/fr.json et messages/en.json

### Tâche 1.3 : Localiser les metadata de la homepage
- [ ] Modifier `app/[locale]/page.tsx` : remplacer le metadata statique par `generateMetadata()`
- [ ] Title FR : "ARTEMIS — Boutique de Montres de Luxe | Montréal"
- [ ] Description FR localisée

### Tâche 1.4 : Ajouter les champs SEO FR aux produits
- [ ] Ajouter `seoTitleFr` et `seoDescriptionFr` aux 13 fichiers JSON dans data/products/
- [ ] Modifier `generateMetadata()` dans la page produit pour utiliser les champs FR quand locale === 'fr'

### Tâche 1.5 : Passer la locale par défaut à français
- [ ] Modifier i18n/routing.ts : `defaultLocale: 'fr'`
- [ ] Vérifier que les redirections fonctionnent correctement

### Validation :
- `find public/images -iname "*.gif" -o -iname "*.heic"` retourne 0 résultats
- En naviguant sur /fr, les meta tags (title, description, OG) sont en français
- `npm run build` passe sans erreur

---

## SPRINT 2 — Images produit (Priorité P1)
**Statut** : ⬜ À faire
**Effort** : 2-3 heures (+ photos à fournir)

### Tâche 2.1 : Corriger l'image de la Panthère de Cartier
- [ ] La Panthère utilise actuellement cartier-santos-silver-dial.webp (mauvais produit)
- [ ] Ajouter une image distincte pour la Panthère de Cartier
- [ ] Mettre à jour data/products/cartier-panthere.json

### Tâche 2.2 : Ajouter des images distinctes pour Santos Essential
- [ ] Santos Essential (Black) utilise aussi cartier-santos-silver-dial.webp
- [ ] Ajouter une image spécifique cadran noir
- [ ] Mettre à jour data/products/cartier-santos-essential.json

### Tâche 2.3 : Enrichir les galeries produit
- [ ] Ajouter 2-4 images supplémentaires par produit (quand photos disponibles)
- [ ] Priorité : les 6 best-sellers (Submariner, GMT, Datejust 41, Royal Oak, Santos, Daytona)
- [ ] Format : WebP, images carrées ou 4:5, optimisées

### Validation :
- Aucun produit ne partage la même image qu'un autre produit différent
- Les best-sellers ont au minimum 3 images chacun
- Toutes les images sont en .webp

---

## SPRINT 3 — Conversion polish (Priorité P2)
**Statut** : ⬜ À faire
**Effort** : 2-3 heures

### Tâche 3.1 : Ajouter des reviews
- [ ] Ajouter 2-3 reviews crédibles pour chaque best-seller (6 produits)
- [ ] Format : { id, rating, title, body, author, city, verified, date }
- [ ] Villes : Montréal, Toronto, Vancouver, Ottawa (crédibilité canadienne)

### Tâche 3.2 : Configurer les prix de comparaison
- [ ] Ajouter `compareAtPrice` pour les produits Premium (prix "valeur perçue" plus élevé)
- [ ] Ex : Submariner: price 1200, compareAtPrice 1450

### Tâche 3.3 : Vérifier les alt texts localisés
- [ ] Auditer `getProductImageAlt()` dans lib/products.ts
- [ ] S'assurer que les alt texts sont en français quand locale === 'fr'

### Validation :
- Les best-sellers affichent des reviews avec étoiles
- Les prix barrés s'affichent correctement sur les produits concernés
- Lighthouse Performance > 90
