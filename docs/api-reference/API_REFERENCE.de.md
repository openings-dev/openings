# Referenz der öffentlichen Datendateien

Das Frontend von openings.dev liest statische JSON-Dateien, die das Repository `openings-dev/data` über die Rohdaten-URLs von GitHub veröffentlicht. Es stellt weder einen Anwendungsdienst noch eine lokale Route `/api/opportunities` bereit.

Die Dateien bilden einen öffentlichen Datenvertrag. Clients sollten den HTTP-Status und die Schemaversion prüfen, bevor sie Inhalte verarbeiten.

## Basis-URL

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
```

Der Repository-Katalog liegt unter einer zweiten Basis-URL:

```txt
https://raw.githubusercontent.com/openings-dev/data/main
```

## Kerndateien

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

## Manifestdatei lesen

`api/manifest.json` ist der Einstiegspunkt des Datensatzes. Die aktuelle Schemaversion ist `3`.

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";

async function readJson(path: string) {
  const response = await fetch(`${baseUrl}/${path}`);

  if (!response.ok) {
    throw new Error(`${path} konnte nicht geladen werden (${response.status})`);
  }

  return response.json();
}

const manifest = await readJson("api/manifest.json");

if (manifest.schemaVersion !== 3) {
  throw new Error(`Nicht unterstützte Schemaversion: ${manifest.schemaVersion}`);
}
```

Die Manifestdatei enthält:

- `generatedAt`: Zeitpunkt der Dateierzeugung. Er garantiert nicht, dass eine Stelle noch offen ist.
- `schemaVersion`: Version des JSON-Vertrags.
- `pageSize`: maximale Anzahl der Stellen pro Seitendatei.
- `dataHash`: Fingerabdruck des veröffentlichten Inhalts, mit dem sich Datenänderungen erkennen lassen.
- `totals`: Summen für `openOpportunities`, `pages`, `repositories`, `countries` und `regions`.
- `files`: relative Pfade zu `facets`, `pageLookup`, `search`, `jobIds` und `order`.
- `facets`: Anzahlen nach Repository, Region, Land, Tag und Autor sowie `authorLabels`.
- `pages`: geordnete Liste der Seitendateien mit Seitennummer und Anzahl der enthaltenen Einträge.

## Eine Liste laden

Über `manifest.files.order` erhältst du die IDs in der Standardreihenfolge von neu nach alt. `manifest.files.pageLookup` ordnet anschließend jede ID der passenden Seitendatei zu.

```ts
const [order, lookup] = await Promise.all([
  readJson(manifest.files.order),
  readJson(manifest.files.pageLookup),
]);

const firstId = order.ids[0];
const pageFile = lookup.pageLookup[firstId];
const page = await readJson(pageFile);
```

Wenn du ohne vorgegebene ID durch die Seiten gehen möchtest, nutze direkt `manifest.pages`:

```ts
const firstPage = await readJson(manifest.pages[0].file);
```

## Details einer Stelle laden

`api/job-ids.json` führt die verfügbaren IDs auf. Detaildatensätze werden anhand der ersten beiden Zeichen nach dem Präfix `gh_` gruppiert.

```ts
const id = "gh_d84189d3af685f86cfe258c9";
const bucket = id.replace(/^gh_/, "").slice(0, 2);
const details = await readJson(`api/jobs/${bucket}.json`);
const opportunity = details.items[id];
```

## Repository-Katalog

Der Katalog zur Prüfung des Repository-Filters ist hier veröffentlicht:

```txt
https://raw.githubusercontent.com/openings-dev/data/main/src/modules/catalog/repositories.json
```

## Regeln für den Datenvertrag

- Behandle die Dateien als cachefähige statische Ressourcen.
- Nutze `dataHash`, um Inhaltsänderungen zu erkennen, und `generatedAt`, um den Erzeugungszeitpunkt zu lesen.
- Leite aus `generatedAt` nicht ab, dass eine Stelle noch verfügbar ist.
- Behalte bei jeder Anzeige den Quelllink bei. Nur in der Originalquelle lassen sich aktuelle Angaben und die nächsten Schritte prüfen.
- Behandle HTTP-Fehler und unbekannte Schemaversionen ausdrücklich.

## Support

Stelle Fragen zu den Dateien und Vorschläge zum Datenvertrag über ein Issue-Formular:

- [Issue-Formulare von openings.dev](https://github.com/openings-dev/openings/issues/new/choose)
