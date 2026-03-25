# Artemis Watches

## WHAT
Site e-commerce de montres de luxe. Next.js 16.1.6 (App Router) + TypeScript 5 + React 19 + Tailwind CSS 4 + Framer Motion.
Bilingue FR/EN via next-intl 4.8.3. DB : Prisma 7.5 + PostgreSQL (Supabase). Auth : NextAuth 5. Paiements : Stripe.
State : Zustand (cart, search, wishlist). Deploy : Vercel. Marché : Montréal/Québec.

## Project Structure
- `app/[locale]/` — Pages par locale (en/fr). Layout, homepage, collections, produits, auth, legal
- `components/` — 42 composants React (home/, product/, cart/, search/, layout/, shared/)
- `data/products/` — 13 fiches produit JSON (Rolex, Cartier, AP, Patek). Champs FR inclus.
- `lib/` — Utilitaires (products, brands, currency, email, whatsapp, stripe, prisma)
- `messages/` — Traductions next-intl (fr.json ~48K, en.json ~44K)
- `store/` — Zustand stores (cart, search, wishlist)
- `types/` — Interfaces TypeScript (Product, ProductSpecs, etc.)
- `i18n/` — Config next-intl (routing, request, navigation)
- `prisma/` — Schema Prisma (auth, orders)
- `public/images/` — Assets produit (.webp)

## WHY
Destination e-commerce premium pour montres de luxe à Montréal. 4 marques (Rolex, Cartier, AP, Patek).
Deux gammes : Essential ($320-$340) et Premium ($950-$1550). UX luxe, SEO bilingue, conversion.

## HOW — Build & Dev
- `npm run dev` — Dev server (localhost:3000)
- `npm run build` — `prisma generate && next build`
- `npm run lint` — ESLint
- `npx tsc --noEmit` — Typecheck

## HOW — Conventions
- i18n : utiliser `useTranslations()` / `getTranslations()` — JAMAIS de texte hardcodé
- Données produit bilingues : champs `descriptionFr`, `keyPointsFr`, etc. dans les JSON
- TypeScript strict. Pas de `any`.
- Tailwind uniquement. Pas de CSS modules.
- Images : next/image + WebP obligatoire. Pas de GIFs.
- Commits atomiques en français : "feat: localiser metadata SEO"
- Toujours vérifier `npm run build` avant de commit.

## Design System
- Palette : noir (#0A0A0A), or (#C9A96E / #D4B882), blanc cassé (#F5F0E8), gris (#6B6965)
- Fonts : Playfair Display (headings, prix) + Inter (body, labels)
- Animations : Framer Motion, subtiles (ease-out, fade-in). Pas de bounce/shake.

@types/product.ts
@i18n/routing.ts
