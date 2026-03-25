---
name: perf-optimization
description: Guide d'optimisation performance pour Artemis Watches
user-invocable: false
---

## Performance — Artemis Watches

### Images
- Toutes les images produit sont déjà en WebP — maintenir ce standard
- 20 fichiers .GIF orphelins à supprimer (non référencés, ~770KB de poids mort)
- 1 fichier .HEIC à supprimer
- next/image avec width/height explicites
- Hero images : `priority={true}`, `placeholder="blur"`, blurDataURL
- Galerie : lazy loading par défaut

### Bundle (déjà optimisé)
- `optimizePackageImports: ['framer-motion', 'lucide-react']` dans next.config.ts
- Server Components par défaut (réduit le JS client)
- Dynamic imports pour composants lourds si nécessaire

### Fonts (déjà optimisé)
- next/font/google pour Playfair Display et Inter
- `display: 'swap'` configuré
- `subsets: ['latin']`
- Variables CSS : `--font-inter`, `--font-playfair`

### Core Web Vitals cibles
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
