---
name: nextjs-patterns
description: Patterns et conventions Next.js 16 App Router pour Artemis Watches
user-invocable: false
---

## Next.js 16 App Router — Patterns Artemis

### Structure des pages
- Layout root : `app/layout.tsx` — pass-through (juste `{children}`)
- Layout locale : `app/[locale]/layout.tsx` — metadata, fonts, providers, NextIntlClientProvider
- Pages : `app/[locale]/[route]/page.tsx` — Server Components par défaut
- Client Components : uniquement quand nécessaire (`"use client"`)

### i18n avec next-intl
- Routing : `i18n/routing.ts` (locales: ['en', 'fr'], defaultLocale, localePrefix: 'as-needed')
- Navigation : `import { Link } from '@/i18n/navigation'` — PAS `next/link`
- Server : `const t = await getTranslations('namespace')`
- Client : `const t = useTranslations('namespace')`

### Images
- TOUJOURS utiliser `next/image` avec `<Image>` component
- Format WebP obligatoire (config : `images.formats: ['image/avif', 'image/webp']`)
- Remote patterns : Supabase (`**.supabase.co`) configuré dans next.config.ts
- Pour les héros : `priority={true}` et `placeholder="blur"`
- JAMAIS de GIFs — fichiers orphelins à supprimer

### Data produit
- Fichiers JSON statiques dans `data/products/`
- Chargement via `getProductBySlug()`, `getProductsByCollection()` dans `lib/products.ts`
- Localisation via `localizeProduct(product, locale)` — substitue les champs FR

### Metadata SEO
- TOUJOURS utiliser `generateMetadata()` dynamique (pas de metadata statique)
- Localiser title + description selon la locale
- Inclure `alternates.languages` pour les versions EN et FR
- JSON-LD : Product, BreadcrumbList, Organization déjà en place
