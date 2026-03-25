---
name: luxury-design-system
description: Design system luxe Artemis Watches — palette, typo, animations, composants
user-invocable: false
---

## Design System Artemis Watches

### Palette
```css
--color-noir: #0A0A0A;
--color-or: #C9A96E;
--color-or-clair: #D4B882;
--color-blanc-casse: #F5F0E8;
--color-gris-luxe: #6B6965;
--color-fond-carte: #111111;
```

### Typographie
- **Headings** : Playfair Display (serif) — élégant, classique
- **Body** : Inter — lisible, moderne
- **Prix** : Playfair Display, taille plus grande, couleur or
- **Labels** : Inter uppercase, letter-spacing: 0.1em, gris luxe

### Animations (Framer Motion)
```typescript
// Fade in standard
const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" } };

// Stagger enfants
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

// Hover carte produit
const cardHover = { whileHover: { y: -8, transition: { duration: 0.3 } } };
```

### INTERDIT
- Couleurs vives (rouge, bleu électrique, vert fluo)
- Animations bounce, shake, jello
- Ombres colorées
- Gradients arc-en-ciel
- Coins très arrondis (max border-radius: 8px)
- Texte hardcodé (utiliser next-intl)
