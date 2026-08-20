# Riferimento dei dati statici

Il front-end di openings.dev legge file JSON statici pubblicati dal repository `openings-dev/data-pipeline` tramite gli URL raw di GitHub. Non esistono un endpoint locale `/api/opportunities` o un server API gestito dal front-end.

## URL base

```txt
https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data-pipeline/main
```

Il primo URL contiene i file pubblicati delle offerte. Il secondo permette di accedere ai metadati del catalogo dei repository.

## File principali

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

## File `manifest.json`

`api/manifest.json` è il punto di ingresso per i client che mostrano o filtrano le offerte. Il contratto attuale usa `schemaVersion: 3` e include:

- `generatedAt`: data e ora di generazione dei file.
- `dataHash`: identificatore del contenuto della versione pubblicata.
- `pageSize`: numero massimo di offerte in ogni file di pagina.
- `pages`: elenco ordinato dei file di pagina disponibili.
- `totals`: conteggi in `openOpportunities`, `pages`, `repositories`, `countries` e `regions`.
- `files`: percorsi relativi di `facets`, `pageLookup`, `search`, `jobIds` e `order`.
- `facets`: conteggi di primo livello in `repositories`, `regions`, `countries`, `tags` e `authors`.

Controlla sempre lo stato HTTP e la versione del contratto prima di leggere gli altri file:

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities";

const response = await fetch(`${baseUrl}/api/manifest.json`);

if (!response.ok) {
  throw new Error(`Impossibile caricare il manifest: ${response.status}`);
}

const manifest = await response.json();

if (manifest.schemaVersion !== 3) {
  throw new Error(`Versione non supportata: ${manifest.schemaVersion}`);
}
```

## Caricamento degli elenchi

Il file indicato da `manifest.files.order` contiene gli ID nell'ordinamento predefinito, dal più recente. `manifest.files.pageLookup` associa ogni ID al relativo file di pagina.

```ts
const [orderResponse, lookupResponse] = await Promise.all([
  fetch(`${baseUrl}/${manifest.files.order}`),
  fetch(`${baseUrl}/${manifest.files.pageLookup}`),
]);

if (!orderResponse.ok || !lookupResponse.ok) {
  throw new Error("Impossibile caricare gli indici delle offerte");
}

const order = await orderResponse.json();
const lookup = await lookupResponse.json();
const firstId = order.ids[0];
const pageFile = lookup.pageLookup[firstId];
const pageResponse = await fetch(`${baseUrl}/${pageFile}`);

if (!pageResponse.ok) {
  throw new Error(`Impossibile caricare la pagina: ${pageResponse.status}`);
}

const page = await pageResponse.json();
```

## Dettagli di un'offerta

Il file indicato da `manifest.files.jobIds` elenca gli ID disponibili. I record di dettaglio sono raggruppati in base ai primi due caratteri dopo il prefisso `gh_`.

```ts
const id = "gh_d84189d3af685f86cfe258c9";
const bucket = id.replace(/^gh_/, "").slice(0, 2);
const detailsResponse = await fetch(`${baseUrl}/api/jobs/${bucket}.json`);

if (!detailsResponse.ok) {
  throw new Error(`Impossibile caricare l'offerta: ${detailsResponse.status}`);
}

const details = await detailsResponse.json();
const opportunity = details.items[id];
```

## Catalogo dei repository

La validazione del filtro dei repository legge il catalogo da:

```txt
https://raw.githubusercontent.com/openings-dev/data-pipeline/main/src/modules/catalog/repositories.json
```

## Note sul contratto

- I file vengono generati da fonti pubbliche delle comunità GitHub.
- Il front-end non usa dati JSON locali o contenuti di esempio come sostituti quando una richiesta non riesce.
- I file sono risorse statiche memorizzabili nella cache. Usa `dataHash` per identificare un cambiamento nei contenuti.
- `generatedAt` indica quando è stato generato l'insieme pubblicato; non garantisce che un'offerta sia ancora aperta.
- Controlla la fonte originale di ogni annuncio prima di candidarti o riutilizzare i dati.

## Supporto

Per fare una domanda sui file o proporre una modifica al contratto, apri una segnalazione tramite:

- [Moduli di segnalazione di openings.dev](https://github.com/openings-dev/web/issues/new/choose)
