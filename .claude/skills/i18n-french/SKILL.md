---
name: i18n-french
description: Règles d'internationalisation next-intl pour Artemis Watches (FR/EN)
user-invocable: false
---

## i18n — next-intl (bilingue FR/EN)

### Règle #1 : Utiliser next-intl — JAMAIS de texte hardcodé
Le site utilise next-intl 4.8.3. Toutes les chaînes UI passent par :
- Client Components : `const t = useTranslations('namespace')`
- Server Components : `const t = await getTranslations('namespace')`

Messages stockés dans `messages/fr.json` et `messages/en.json`.
20 namespaces : announcement, nav, home, collections, footer, product, wishlist,
whatsapp, cookies, search, reviewsPage, faqPage, about, contact, common, cart,
popup, orderSuccess, auth, brands.

### Règle #2 : Données produit bilingues
Les fichiers JSON dans `data/products/` contiennent des champs FR :
- `descriptionFr`, `descriptionShortFr`, `keyPointsFr`
- `seoTitleFr`, `seoDescriptionFr` (à ajouter si manquant)
La fonction `localizeProduct()` dans `lib/products.ts` substitue automatiquement.

### Règle #3 : Metadata SEO localisées
Utiliser `generateMetadata()` avec `getTranslations()` — JAMAIS de metadata statique.
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('title'), description: t('description') };
}
```

### Règle #4 : Navigation localisée
Utiliser `import { Link } from '@/i18n/navigation'` au lieu de `next/link`.
Le routing est configuré avec `localePrefix: 'as-needed'`.

### Traductions standards
| Contexte | Namespace.clé |
|----------|---------------|
| Ajouter au panier | product.addToCart |
| Acheter maintenant | product.buyNow |
| Commander via WhatsApp | product.orderWhatsApp |
| Livraison gratuite | product.freeShipping |
| Rechercher | search.placeholder |
