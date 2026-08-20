# Présentation d’openings.dev

`openings.dev` rassemble des offres d’emploi tech partagées dans des communautés GitHub publiques afin de les rendre plus faciles à rechercher et à comparer. Chaque offre reste liée à sa source d’origine, où les candidats peuvent vérifier les informations actuelles et la marche à suivre.

Le front-end utilise l’App Router de Next.js et produit des pages statiques. Il ne contient pas de copie locale des offres : il lit les fichiers JSON publics publiés par le dépôt distinct `openings-dev/data-pipeline`.

## Ce que fait Openings

- Recherche des offres par intitulé, stack, niveau d’expérience, localisation et mode de travail.
- Filtre et trie les résultats par dépôt, région, pays, tag et compte auteur sur GitHub.
- Génère des pages publiques pour les communautés et les comptes GitHub à l’origine des annonces indexées.
- Affiche le détail d’une offre dans la recherche au moyen du paramètre `?job=<id>`.
- Conserve pour chaque annonce le lien vers sa source et son dépôt GitHub.
- Publie la documentation du projet et ses politiques à partir des fichiers Markdown du dépôt.

## Flux de données

1. Le pipeline `openings-dev/data-pipeline` lit les sources GitHub publiques configurées.
2. Il normalise les annonces, construit les facettes de recherche et publie des fichiers JSON statiques paginés.
3. Le front-end lit ces fichiers depuis `raw.githubusercontent.com`.
4. La recherche associe les filtres aux identifiants et aux fichiers qui contiennent les offres correspondantes.
5. Les pages de communauté et d’auteur GitHub sont générées au build à partir des mêmes données publiques.

## Limites actuelles

- Front-end : `openings-dev/web`.
- Pipeline et fichiers de données publics : `openings-dev/data-pipeline`.
- Fichiers d’offres locaux dans le front-end : aucun.
- Route API locale pour les offres : aucune.
- Sources prises en charge : annonces issues de sources GitHub publiques configurées.

## Vue d’ensemble de l’architecture

- `app/` contient les routes et leurs écrans.
- `components/` contient la structure partagée et les composants d’interface réutilisables.
- `lib/opportunities/` contient l’accès aux fichiers distants, le routage et les types du domaine.
- `lib/utils/` contient les utilitaires indépendants du framework.
- `docs/` et les fichiers Markdown à la racine alimentent les routes de documentation.

## Périmètre du produit

Openings facilite la découverte d’offres tech déjà publiées par des communautés. Il ne vérifie pas les employeurs, ne garantit pas qu’une offre soit encore ouverte, ne reçoit pas de candidature et ne remplace pas la source d’origine.
