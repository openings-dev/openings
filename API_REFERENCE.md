# Static Data Reference

The openings.dev front-end consumes versioned static JSON files published by the `openings-dev/data-pipeline` repository through raw GitHub URLs.

There is no local `/api/opportunities` endpoint in the front-end. Consumers should read the raw static files directly.

## Base URLs

```txt
https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data-pipeline/main
```

Use the first base URL for job-index files. Use the second base URL when reading repository catalog metadata.

## Core Files

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

## Manifest

`api/manifest.json` is the entry point for list and filter clients.

It includes:

- `generatedAt`: index generation timestamp.
- `schemaVersion`: static API schema version.
- `dataHash`: content hash used to keep related files on the same data version.
- `pageSize`: number of opportunities per page file.
- `totals`: open opportunity, page, repository, country, and region counts.
- `files`: relative paths for facets, page lookup, search index, job IDs, and recent order.
- `facets`: top-level counts for repositories, regions, countries, tags, and authors.
- `pages`: ordered page descriptors with `page`, `file`, and `count`.

Example:

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities";

const response = await fetch(`${baseUrl}/api/manifest.json`);
if (!response.ok) throw new Error(`Manifest request failed: ${response.status}`);

const manifest = await response.json();
if (manifest.schemaVersion !== 3) {
  throw new Error(`Unsupported schema version: ${manifest.schemaVersion}`);
}
```

## List Loading

Use `api/order/recent.json` to get opportunity IDs in default recent order, then use `api/page-lookup.json` to map IDs to page files.

Example:

```ts
const [order, lookup] = await Promise.all([
  fetch(`${baseUrl}/api/order/recent.json`),
  fetch(`${baseUrl}/api/page-lookup.json`),
]);

if (!order.ok || !lookup.ok) throw new Error("Could not load list indexes");

const [orderData, lookupData] = await Promise.all([
  order.json(),
  lookup.json(),
]);

const firstId = orderData.ids[0];
const pageFile = lookupData.pageLookup[firstId];
const pageResponse = await fetch(`${baseUrl}/${pageFile}`);
if (!pageResponse.ok) throw new Error(`Page request failed: ${pageResponse.status}`);
const page = await pageResponse.json();
```

## Job Details

`api/job-ids.json` lists static job IDs. Detail records are bucketed by the first two characters after the `gh_` prefix.

Example:

```ts
const id = "gh_d84189d3af685f86cfe258c9";
const bucket = id.replace(/^gh_/, "").slice(0, 2);
const detailsResponse = await fetch(`${baseUrl}/api/jobs/${bucket}.json`);
if (!detailsResponse.ok) {
  throw new Error(`Job request failed: ${detailsResponse.status}`);
}
const details = await detailsResponse.json();

const opportunity = details.items[id];
```

## Repository Catalog

Repository filter validation reads the catalog from:

```txt
https://raw.githubusercontent.com/openings-dev/data-pipeline/main/src/modules/catalog/repositories.json
```

## Data Contract Notes

- Data is generated from public GitHub sources.
- The front-end does not use local JSON data or mocks.
- Raw files are cacheable static assets.
- Clients should treat `generatedAt` as the freshness indicator.
- `schemaVersion` must be checked before consuming fields. A new version can change the contract.
- `dataHash` identifies the set of compatible static files for one published index version.
- Job availability reflects the published index. Always link to the original listing so people can verify current details and next steps.

## Support

Open an issue for static-data questions or contract proposals:

- [GitHub issue forms](https://github.com/openings-dev/web/issues/new/choose)
