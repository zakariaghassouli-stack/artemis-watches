---
description: Créer un plan d'implémentation phasé avec gates de validation
argument-hint: [nom-feature]
---

## Créer un plan d'implémentation

Avant de planifier, vérifie s'il existe un research document dans `docs/research/`.
Si oui, lis-le. Si non, fais d'abord un `/research` rapide.

Crée un plan structuré dans `docs/plans/$ARGUMENTS.md` avec :

### Pour chaque phase :
- **Objectif** : Ce qu'on accomplit
- **Fichiers** : Quels fichiers sont touchés
- **Changements** : Code snippets précis (basés sur le code ACTUEL, pas inventé)
- **Validation** : Comment vérifier que la phase est complète
- **Dépendances** : Quelles phases doivent être faites avant

### Règles :
- Maximum 5 phases par plan
- Chaque phase doit pouvoir être complétée en moins de 50% du context window
- Inclure les imports et types TypeScript dans les snippets
- Tout texte UI DOIT passer par next-intl
