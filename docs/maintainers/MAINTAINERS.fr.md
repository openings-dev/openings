# Partager la page Openings de votre communauté

Si votre communauté figure dans Openings, elle dispose d’une page publique consacrée aux offres déjà publiées dans ses sources GitHub configurées. Cette page facilite la recherche et le partage, tout en renvoyant chaque annonce vers sa source d’origine.

Openings ne modifie pas le contenu source, ne reçoit pas de candidature et n’accède à aucun dépôt privé ni à aucune donnée de candidature.

Pour une communauté déjà incluse, remplacez `OWNER/REPO` par le nom de son dépôt GitHub :

```txt
https://openings.dev/communities/OWNER/REPO
```

Exemple :

```txt
https://openings.dev/communities/qa-brasil/vagas
```

## Lien pour le README

```md
[Voir les offres de cette communauté sur openings.dev](https://openings.dev/communities/OWNER/REPO)
```

## Badge pour le README

```md
[![Offres ouvertes sur openings.dev](https://img.shields.io/badge/openings.dev-open_jobs-111827?logo=github)](https://openings.dev/communities/OWNER/REPO)
```

## Message court

```md
Les offres publiques de cette communauté sont également consultables sur openings.dev :
https://openings.dev/communities/OWNER/REPO

Cette page permet de rechercher, filtrer et partager les annonces. Pour vérifier les informations actuelles et la marche à suivre, consultez la source d’origine indiquée sur l’offre.
```

## Correction ou retrait

Pour demander une correction ou le retrait d’une page, utilisez le formulaire public en indiquant l’URL concernée et la modification souhaitée. Si la demande ne doit pas être publique, écrivez à `support@openings.dev` :

- [Formulaire de correction ou de retrait](https://github.com/openings-dev/web/issues/new?template=content_correction.yml)
