# Refonte V2 — Pivot vitrine → WhatsApp

## Stratégie

Le site Artemis est repositionné d'une expérience e-commerce transactionnelle
vers une **vitrine catalogue qui redirige les commandes vers WhatsApp**.
Stripe checkout est en stand-by (code commenté, prêt à réactiver), pas supprimé.

**Pourquoi** :
- Marketplace + Kijiji + WhatsApp génèrent 100% du revenu Artemis aujourd'hui
- Site servait de vitrine sans déclencher de DM
- Pivot WhatsApp-only = zéro friction checkout + maximum credibility avant
  le clic CTA

## Phases du pivot

- **Sprint 1** (Pivot V2) : bugs résiduels + Stripe stand-by + FAQ migration
  + About simplifié + CTA WhatsApp enforcement → MERGÉ
- **Sprint 2** (Pivot V2) : architecture (ce sprint actuel) → REFONTE_V2.md
  + routes redirects + audit pré-PR
- **Sprint 3** (Prompt 3, semaine prochaine) : nouvelles pages /mouvements
  + /notre-approche
- **Sprint 4** (Prompt 3) : landing page refonte
- **Sprint 5** (Prompt 3) : système badge stock
- **Sprint 6** (Prompt 3) : upsell box & papiers

## Feature flags de réversibilité

Le pivot est **réversible en 30 secondes** via 2 variables d'env Vercel :

| Flag | Default | Mode 'true' | Surfaces gated |
|------|---------|-------------|----------------|
| NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED | unset / 'false' | Restore Stripe Checkout flow | /api/checkout (503 sinon), CartDrawer (Stripe POST vs wa.me redirect) |
| NEXT_PUBLIC_ENABLE_CART | unset / 'false' | Restore Add to Cart buttons | PDP secondary CTA, MobileStickyBar, checkoutNote |

### Matrice combinatoire des 2 flags

| CART | STRIPE | Mode | Description |
|------|--------|------|-------------|
| off | off | Pivot V2 pur (default) | Pas de Add to Cart, redirect WhatsApp, copy adaptée |
| on | off | Cart visible, checkout WhatsApp | Cas hybride : Cart UX visible mais flow WhatsApp |
| off | on | ⚠️ Incohérent | Pas de bouton pour mettre en panier mais route checkout ouverte. À éviter. |
| on | on | Legacy complet | Restauration intégrale du flow Stripe |

**Rollback Stripe** : Vercel UI → Settings → Environment Variables →
flip flag → Redeploy. ~30 secondes, aucun code push requis.

## Décisions clés

- **Stock badge default** : "En stock prêt à expédier" générique (sans
  chiffre) pour Essential
- **Exceptions stock** : Datejust 2tone + Datejust Chocolate =
  "Sur commande · 10-14 jours"
- **Footnote Suisse* (page /mouvements, Prompt 3)** :
  "Architecture inspirée des calibres suisses (Rolex 32xx series).
  Production VSF/Clean/ARF."
- **BNPL/Klarna** : pas actif sur Stripe, retiré de toutes les surfaces UI
- **Reviews** : feat/reviews-migration en attente collecte Zaki ≥6
  verifiedReview granted
- **About page** : compactée à Hero + Stats(2) + Values(2). "200+ commandes
  livrées" + "4 marques curées" comme social proof chiffré
- **FAQ** : page standalone supprimée, accordéon home conservé, FAQ accordéon
  PDP enrichi 8 questions Phase 3.1

## Garde-fous (à respecter en permanence)

### Termes bannis publics

Swiss, Suisse (sauf /mouvements footnote), Cerachrom, Chromalight,
Oysterclasp, Jubilee, Jubilé, Glidelock, Parachrom, Chronergy, Dandong,
numéros calibre Rolex (3235, 4131, 3230, 3255), Klarna, Afterpay, Sezzle,
installments, "paiement en 4", "4 paiements"

### Termes interdits absolus

replica, fake, copie, réplique, knockoff (jamais sur surface publique)

### Termes acceptables

Premium, factory, tier 1, super clone (interne FAQ avec parcimonie),
génération moderne, automatique, VSF, ARF, Clean, ZF, APSF, AF

### Helpers code à préserver

- containsBannedTrademark (lib/queries.ts:17) : reste en place tant que
  Sanity Studio editorial debt non nettoyée (~10 Premium SKUs)
- BANNED_RENDER_PATTERN : regex source du helper

### Mécaniques interdites

- Scarcity factice (countdown, "seulement X en stock", urgency stacking)
- Reviews fabriquées (cf. hotfix 3fbfc32 + a188875)
- Claims étanchéité chiffrés sans test réel sur Premium

## Repository structure (pour onboarding)

- **main HEAD** : `be77d4a` (Sprint A mergé) + Sprint 1-2 (en PR)
- **feat/reviews-migration** : branche locale, attente collecte Zaki
- **docs/sanity-cleanup-checklist.md** : dette éditoriale Sanity Studio
  (10 Premium SKUs + announcementBar + orphan keys)

## Routes audit (Sprint 2)

Audit complet des routes app/[locale]/ effectué Sprint 2 Tâche 2.2.

Conclusion : aucune route ne nécessite de redirect 301 supplémentaire pour
le Pivot V2.

Raisons :
- Pas de /cart standalone (drawer composant uniquement)
- Pas de /checkout standalone (seule /api/checkout existe, gated par flag)
- /account/orders + /account/wishlist : runtime redirects locale-aware
  conservés (next-intl, fonctionnels, noindex donc SEO peu impacté)
- /order/success : conservée pour sessions Stripe historiques +
  réactivations futures
- /reviews : stub conservé (état d'attente avant collecte ≥6 verifiedReview
  granted dans Sanity)
- /account/* : écosystème conservé (cohérence avec stand-by Stripe réversible)
- /faq : déjà redirected via Tâche 1.4 (next.config.ts)

Le pivot est couvert par 2 feature flags + 1 redirect existant + UI guards
sur les surfaces commerciales. Pas de surface route à toucher.
