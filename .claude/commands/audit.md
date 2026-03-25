---
description: Auditer le site Artemis Watches — diagnostic complet qualité, performance, UX, i18n
---

## Audit Artemis Watches

Tu es un auditeur senior e-commerce luxe. Effectue un audit complet du site.

### Checklist d'audit :
1. **i18n metadata** : Vérifie que `app/[locale]/layout.tsx` et `app/[locale]/page.tsx` utilisent `generateMetadata()` avec `getTranslations()` — pas de metadata statique en anglais.
2. **CTA** : Vérifie que chaque page produit a des boutons Add to Cart + Buy Now + WhatsApp.
3. **Variantes** : Vérifie que le Range Selector (Essential/Premium) et Size Selector fonctionnent.
4. **Performance** : Cherche les fichiers .GIF/.HEIC orphelins dans public/images/.
5. **Images** : Vérifie qu'aucun produit ne partage la même image qu'un produit différent.
6. **SEO** : Vérifie les champs `seoTitleFr`/`seoDescriptionFr` dans data/products/*.json.
7. **Mobile** : Vérifie MobileStickyBar et responsive sur les pages critiques.

### Output :
Produis un rapport structuré avec :
- Score global /10
- Liste des issues critiques (P0), majeures (P1), mineures (P2)
- Recommandation de fix pour chaque issue
- Estimation d'effort par fix

Écris le rapport dans `docs/audit-report.md`.
