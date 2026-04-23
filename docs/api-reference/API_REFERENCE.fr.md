# Référence API

Ce document décrit l'orientation de l'API publique de openings.dev.

L'API expose le même index normalisé d'offres que l'application web afin de faciliter les intégrations, automatisations et analyses tierces.

## Statut

L'API est publique et évolutive. Certains contrats peuvent changer pendant la maturation des filtres et règles de normalisation.

## Objectifs de conception

- Schéma cohérent entre les dépôts sources.
- Pagination prévisible pour la synchronisation incrémentale.
- Identifiants stables pour la déduplication.
- Champs explicites pour stack, séniorité, remote et localisation.

## Support

Pour questions et retours d'intégration :

- [GitHub Issues](https://github.com/openings-dev/openings/issues)
