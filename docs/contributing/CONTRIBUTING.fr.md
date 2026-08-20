# Contribuer à openings.dev

Merci de contribuer à l’amélioration d’`openings.dev`.

## Périmètre

Ce dépôt contient le front-end statique Next.js. Il ne stocke ni ne génère les données des offres.

Utilisez ce dépôt pour :

- Les améliorations de l’interface et de l’expérience utilisateur.
- Les corrections de routage, de pages statiques et d’accessibilité.
- Les améliorations des services de données distants dans `lib/opportunities`.
- Les mises à jour de la documentation du front-end.

Utilisez [`openings-dev/data-pipeline`](https://github.com/openings-dev/data-pipeline) pour :

- Les changements apportés au catalogue des dépôts sources.
- La logique d’ingestion et de normalisation des données GitHub.
- La génération des instantanés et des fichiers de l’API statique.

## Règles relatives aux données

- N’ajoutez pas au front-end de données d’offres locales, de jeux de données factices, de fixtures, de fichier `db.json` ou d’instantanés JSON.
- N’importez pas de fichiers `.json` locaux pour les données des offres.
- Ne réintroduisez pas de route locale `/api/opportunities`.
- Conservez la construction des URL de données brutes dans `lib/opportunities/static-api.ts`.
- Conservez la lecture de l’API statique dans `lib/opportunities/api.ts`.
- Conservez la lecture des instantanés dans `lib/opportunities/snapshot.ts`.

## Environnement de développement

Prérequis :

- Node.js `>=20.9.0`
- npm

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:3000`.

Ne créez `.env.local` que pour tester une autre branche de données distante :

```bash
NEXT_PUBLIC_OPENINGS_DATA_BASE_URL=https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities
NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL=https://raw.githubusercontent.com/openings-dev/data-pipeline/main
```

## Structure du projet

```txt
app/                      routes de l’App Router et interface propre à chaque route
components/               shell partagé, providers, icônes et composants d’interface
lib/opportunities/        services de données distants, utilitaires de routage et types du domaine
lib/translations/         messages localisés de l’interface
lib/utils/                utilitaires partagés
docs/                     fichiers Markdown localisés affichés par l’application
```

## Processus de pull request

1. Créez une branche depuis `main`.
2. Limitez la modification à un objectif précis.
3. Exécutez les vérifications :

```bash
npm run lint
npm run build
```

4. Ouvrez une pull request en ajoutant :

- Un résumé clair.
- Des captures d’écran pour les changements visuels.
- Des notes de validation qui indiquent les commandes exécutées.
- Toute substitution de source de données utilisée pendant les vérifications.

## Liste de contrôle de la pull request

- [ ] Aucun fichier de données local ni import JSON n’a été ajouté.
- [ ] L’accès aux données distantes reste centralisé dans `lib/opportunities`.
- [ ] Les composants restent ciblés et réutilisables.
- [ ] La documentation a été mise à jour lorsque le comportement ou la configuration a changé.
- [ ] `npm run lint` et `npm run build` s’exécutent sans erreur en local.

## Code de conduite

En participant, vous acceptez de respecter le [Code de conduite](https://github.com/openings-dev/web/blob/main/CODE_OF_CONDUCT.md).
