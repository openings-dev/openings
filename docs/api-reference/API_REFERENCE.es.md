# Referencia de datos estáticos

El front-end de openings.dev lee archivos JSON estáticos publicados por el repositorio `openings-dev/data-pipeline` mediante URLs sin procesar de GitHub. No existe un endpoint local `/api/opportunities` ni un servidor de API propio del front-end.

## URLs base

```txt
https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data-pipeline/main
```

La primera URL contiene los archivos de vacantes publicados. La segunda permite acceder a los metadatos del catálogo de repositorios.

## Archivos principales

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

## `manifest.json`

`api/manifest.json` es el punto de entrada para los clientes que muestran o filtran vacantes. El contrato actual usa `schemaVersion: 3` e incluye:

- `generatedAt`: fecha y hora en que se generaron los archivos.
- `dataHash`: identificador de contenido de la versión publicada.
- `pageSize`: número máximo de vacantes por archivo de página.
- `pages`: lista ordenada de archivos de página disponibles.
- `totals`: recuentos en `openOpportunities`, `pages`, `repositories`, `countries` y `regions`.
- `files`: rutas relativas de `facets`, `pageLookup`, `search`, `jobIds` y `order`.
- `facets`: recuentos de primer nivel en `repositories`, `regions`, `countries`, `tags` y `authors`.

Comprueba siempre el estado HTTP y la versión del contrato antes de consumir los demás archivos:

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities";

const response = await fetch(`${baseUrl}/api/manifest.json`);

if (!response.ok) {
  throw new Error(`No se pudo cargar el manifest: ${response.status}`);
}

const manifest = await response.json();

if (manifest.schemaVersion !== 3) {
  throw new Error(`Versión no compatible: ${manifest.schemaVersion}`);
}
```

## Carga de listas

El archivo indicado por `manifest.files.order` contiene los IDs en el orden reciente predeterminado. `manifest.files.pageLookup` relaciona cada ID con su archivo de página.

```ts
const [orderResponse, lookupResponse] = await Promise.all([
  fetch(`${baseUrl}/${manifest.files.order}`),
  fetch(`${baseUrl}/${manifest.files.pageLookup}`),
]);

if (!orderResponse.ok || !lookupResponse.ok) {
  throw new Error("No se pudieron cargar los índices de vacantes");
}

const order = await orderResponse.json();
const lookup = await lookupResponse.json();
const firstId = order.ids[0];
const pageFile = lookup.pageLookup[firstId];
const pageResponse = await fetch(`${baseUrl}/${pageFile}`);

if (!pageResponse.ok) {
  throw new Error(`No se pudo cargar la página: ${pageResponse.status}`);
}

const page = await pageResponse.json();
```

## Detalles de una vacante

El archivo indicado por `manifest.files.jobIds` enumera los IDs disponibles. Los registros detallados se agrupan según los dos primeros caracteres que siguen al prefijo `gh_`.

```ts
const id = "gh_d84189d3af685f86cfe258c9";
const bucket = id.replace(/^gh_/, "").slice(0, 2);
const detailsResponse = await fetch(`${baseUrl}/api/jobs/${bucket}.json`);

if (!detailsResponse.ok) {
  throw new Error(`No se pudo cargar la vacante: ${detailsResponse.status}`);
}

const details = await detailsResponse.json();
const opportunity = details.items[id];
```

## Catálogo de repositorios

La validación del filtro de repositorios lee el catálogo desde:

```txt
https://raw.githubusercontent.com/openings-dev/data-pipeline/main/src/modules/catalog/repositories.json
```

## Notas sobre el contrato

- Los archivos se generan a partir de fuentes públicas de comunidades de GitHub.
- El front-end no usa datos JSON locales ni contenido de ejemplo como sustituto si falla una solicitud.
- Los archivos son recursos estáticos y pueden almacenarse en caché. Usa `dataHash` para identificar un cambio de contenido.
- `generatedAt` indica cuándo se generó el conjunto publicado; no garantiza que una vacante siga abierta.
- Comprueba la fuente original de cada anuncio antes de presentar una candidatura o reutilizar sus datos.

## Soporte

Para plantear una duda sobre los archivos o proponer un cambio de contrato, abre una incidencia en:

- [Formularios de incidencias de openings.dev](https://github.com/openings-dev/web/issues/new/choose)
