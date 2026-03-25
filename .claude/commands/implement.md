---
description: Implémenter une feature sur Artemis Watches avec le workflow Research→Plan→Implement
argument-hint: [description-feature]
---

## Workflow RPI — Research → Plan → Implement

### PHASE 1 : RESEARCH
Lis en profondeur le code existant lié à cette feature. Comprends :
- Les patterns actuels utilisés dans le projet
- Les composants existants qui pourraient être réutilisés
- Les types TypeScript pertinents
- Les conventions du design system (noir/or/blanc cassé)

Écris tes findings dans `docs/research/{feature-slug}.md`. Pas d'opinions, juste des faits.
Puis ARRÊTE-TOI et montre-moi le research document. Attends mon GO.

### PHASE 2 : PLAN
Crée un plan phasé avec code snippets dans `docs/plans/{feature-slug}.md`.
Chaque phase doit avoir :
- Description claire
- Fichiers à modifier/créer
- Code snippets montrant les changements
- Critère de validation (comment vérifier que ça marche)

Puis ARRÊTE-TOI et montre-moi le plan. Attends mon GO.

### PHASE 3 : IMPLEMENT
Implémente phase par phase. Après chaque phase :
- Vérifie `npm run build`
- Commit avec "feat({feature-slug}): phase N — description"
- Confirme que le critère de validation passe

$ARGUMENTS contient la description de la feature.
