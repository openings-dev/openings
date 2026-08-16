import type { OpportunityItem } from "./types";
import type {
  StaticFacetIndex,
  StaticManifest,
  StaticSearchIndex,
} from "./api-types";
import { fetchStaticJson } from "./fetch-static-json";
import { uniqueOpportunityIds } from "./index-operations";

interface StaticPageLookup {
  pageLookup: Record<string, string>;
}

interface StaticPagePayload {
  items: OpportunityItem[];
}

export function loadOpportunityManifest() {
  return fetchStaticJson<StaticManifest>("api/manifest.json", {
    cache: "no-store",
  });
}

export function loadOpportunityFacetIndex(manifest: StaticManifest) {
  return fetchStaticJson<StaticFacetIndex>(manifest.files.facets);
}

export function loadOpportunitySearchIndex(manifest: StaticManifest) {
  return fetchStaticJson<StaticSearchIndex>(manifest.files.search);
}

export async function loadOpportunityOrder(manifest: StaticManifest) {
  return (await fetchStaticJson<{ ids: string[] }>(manifest.files.order)).ids;
}

export async function loadOpportunityItems(
  ids: string[],
  manifest: StaticManifest,
) {
  const lookup = await fetchStaticJson<StaticPageLookup>(manifest.files.pageLookup);
  const files = uniqueOpportunityIds(
    ids.map((id) => lookup.pageLookup[id]).filter(Boolean),
  );
  const pages = await Promise.all(
    files.map((file) => fetchStaticJson<StaticPagePayload>(file)),
  );
  const itemsById = new Map(
    pages.flatMap((page) => page.items.map((item) => [item.id, item] as const)),
  );
  return ids
    .map((id) => itemsById.get(id))
    .filter((item): item is OpportunityItem => Boolean(item));
}

export async function loadOpportunityById(id: string) {
  const bucket = id.replace(/^gh_/, "").slice(0, 2) || "unknown";
  const payload = await fetchStaticJson<{
    items?: Record<string, OpportunityItem>;
  }>(`api/jobs/${encodeURIComponent(bucket)}.json`);
  return payload.items?.[id] ?? null;
}
