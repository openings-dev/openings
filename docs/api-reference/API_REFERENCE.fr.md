# Référence des fichiers de données publics

Le front-end d’openings.dev lit des fichiers JSON statiques publiés par le dépôt `openings-dev/data` via les URL de contenu brut de GitHub. Il ne propose pas de service applicatif ni de route locale `/api/opportunities`.

Ces fichiers forment un contrat de données public. Un client doit vérifier la réponse HTTP et la version du schéma avant d’utiliser son contenu.

## URL de base

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
```

Le catalogue des dépôts se trouve sous une seconde base :

```txt
https://raw.githubusercontent.com/openings-dev/data/main
```

## Fichiers principaux

```txt
api/manifest.json
api/order/recent.json
api/page-lookup.json
api/pages/page-0001.json
api/jobs/<bucket>.json
api/job-ids.json
api/facet-index.json
api/search-index.json
index.json
countries/<country-code>/index.json
countries/<country-code>/repositories/<repository-slug>.json
```

## Lire le fichier manifeste

`api/manifest.json` est le point d’entrée du jeu de données. Le schéma actuel est la version `3`.

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";

async function readJson(path: string) {
  const response = await fetch(`${baseUrl}/${path}`);

  if (!response.ok) {
    throw new Error(`Impossible de charger ${path} (${response.status})`);
  }

  return response.json();
}

const manifest = await readJson("api/manifest.json");

if (manifest.schemaVersion !== 3) {
  throw new Error(`Version de schéma non prise en charge : ${manifest.schemaVersion}`);
}
```

Le fichier manifeste contient :

- `generatedAt` : date de génération des fichiers. Elle ne garantit pas qu’une offre soit encore ouverte.
- `schemaVersion` : version du contrat JSON.
- `pageSize` : nombre maximal d’offres par fichier de page.
- `dataHash` : empreinte du contenu publié, utile pour détecter un changement de données.
- `totals` : totaux pour `openOpportunities`, `pages`, `repositories`, `countries` et `regions`.
- `files` : chemins relatifs vers `facets`, `pageLookup`, `search`, `jobIds` et `order`.
- `facets` : nombres par dépôt, région, pays, tag et auteur, ainsi que `authorLabels`.
- `pages` : liste ordonnée des fichiers de page avec leur numéro et leur nombre d’éléments.

## Charger une liste

Utilisez le chemin `manifest.files.order` pour obtenir les identifiants classés du plus récent au plus ancien. `manifest.files.pageLookup` associe ensuite chaque identifiant au fichier de page qui le contient.

```ts
const [order, lookup] = await Promise.all([
  readJson(manifest.files.order),
  readJson(manifest.files.pageLookup),
]);

const firstId = order.ids[0];
const pageFile = lookup.pageLookup[firstId];
const page = await readJson(pageFile);
```

Pour parcourir les pages sans partir d’un identifiant, utilisez directement `manifest.pages` :

```ts
const firstPage = await readJson(manifest.pages[0].file);
```

## Charger le détail d’une offre

`api/job-ids.json` répertorie les identifiants disponibles. Les enregistrements détaillés sont regroupés à partir des deux premiers caractères qui suivent le préfixe `gh_`.

```ts
const id = "gh_d84189d3af685f86cfe258c9";
const bucket = id.replace(/^gh_/, "").slice(0, 2);
const details = await readJson(`api/jobs/${bucket}.json`);
const opportunity = details.items[id];
```

## Catalogue des dépôts

Le catalogue utilisé pour valider le filtre par dépôt est publié à cette adresse :

```txt
https://raw.githubusercontent.com/openings-dev/data/main/src/modules/catalog/repositories.json
```

## Règles d’utilisation du contrat

- Traitez les fichiers comme des ressources statiques pouvant être mises en cache.
- Utilisez `dataHash` pour savoir si le contenu a changé et `generatedAt` pour connaître l’heure de génération.
- Ne déduisez pas de `generatedAt` qu’une offre est encore disponible.
- Conservez le lien de source de chaque annonce. La source d’origine permet de vérifier les informations actuelles et la marche à suivre.
- Prévoyez un comportement explicite en cas d’erreur HTTP ou de version de schéma inconnue.

## Assistance

Pour poser une question sur les fichiers ou proposer une évolution du contrat, ouvrez un ticket :

- [Formulaires de signalement d’openings.dev](https://github.com/openings-dev/openings/issues/new/choose)
