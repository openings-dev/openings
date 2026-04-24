import type {
  OpportunityFilterFacets,
  OpportunityItem,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { openingsDataUrl } from "@/lib/opportunities/static-api";
import type { OpportunityServerFilters } from "./server-filters";

const EMPTY_FACETS: OpportunityFilterFacets = {
  repositories: {},
  regions: {},
  countries: {},
  tags: {},
  authors: {},
  authorLabels: {},
};

type DimensionKey = "repositories" | "regions" | "countries" | "tags" | "authors";
type FacetIndexDimensions = Record<DimensionKey, Record<string, string[]>>;

interface StaticManifest {
  generatedAt: string | null;
  pageSize: number;
  totals: { openOpportunities: number };
  files: {
    facets: string;
    pageLookup: string;
    search: string;
    order: string;
  };
  facets: OpportunityFilterFacets;
}

interface StaticFacetIndex {
  dimensions: FacetIndexDimensions;
  labels: { authors?: Record<string, string> };
}

interface StaticSearchIndex {
  items: Array<{ id: string; text: string }>;
}

interface StaticPageLookup {
  pageLookup: Record<string, string>;
}

interface StaticPagePayload {
  items: OpportunityItem[];
}

export interface OpportunitiesApiMeta {
  snapshotGeneratedAt: string | null;
  deployedAt: string | null;
  lastUpdatedAt: string | null;
  totalCount: number;
  filteredCount: number;
  facets: OpportunityFilterFacets;
}

export interface OpportunitiesApiPayload {
  items: OpportunityItem[];
  nextCursor: string | null;
  hasMore: boolean;
  rateLimited: boolean;
  retryAfterSeconds: number | null;
  meta: OpportunitiesApiMeta;
}

const jsonCache = new Map<string, Promise<unknown>>();

interface FetchStaticJsonOptions {
  cache?: RequestCache;
}

async function fetchStaticJson<T>(
  path: string,
  options: FetchStaticJsonOptions = {},
): Promise<T> {
  const url = openingsDataUrl(path);
  const cacheMode = options.cache ?? "force-cache";
  const cacheKey = `${cacheMode}:${url}`;
  const cached = jsonCache.get(cacheKey);
  if (cached) return cached as Promise<T>;

  const promise = fetch(url, { cache: cacheMode }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load data file ${path} (${response.status})`);
    }
    return response.json() as Promise<T>;
  });
  jsonCache.set(cacheKey, promise);
  promise.catch(() => {
    if (jsonCache.get(cacheKey) === promise) {
      jsonCache.delete(cacheKey);
    }
  });
  return promise;
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseOffset(value: string | null) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function uniqueIds(ids: string[]) {
  return [...new Set(ids)];
}

function unionDimensionIds(dimension: Record<string, string[]>, values: string[]) {
  return uniqueIds(values.flatMap((value) => dimension[value] ?? []));
}

function selectedDimensionIds(
  dimensions: FacetIndexDimensions,
  filters: OpportunityServerFilters,
  key: DimensionKey,
) {
  if (key === "repositories" && filters.repository !== "all") {
    return dimensions.repositories[filters.repository] ?? [];
  }
  if (key === "regions" && filters.region !== "all") {
    return dimensions.regions[filters.region] ?? [];
  }
  if (key === "countries" && filters.country !== "all") {
    return dimensions.countries[filters.country] ?? [];
  }
  if (key === "tags" && filters.tags.length > 0) {
    return unionDimensionIds(dimensions.tags, filters.tags);
  }
  if (key === "authors" && filters.authors.length > 0) {
    return unionDimensionIds(dimensions.authors, filters.authors);
  }
  return null;
}

function buildSearchHits(searchIndex: StaticSearchIndex, searchText: string) {
  const query = normalizeSearchText(searchText);
  if (!query) return null;
  return new Set(
    searchIndex.items
      .filter((entry) => entry.text.includes(query))
      .map((entry) => entry.id),
  );
}

async function orderedIdsForFilters(params: {
  manifest: StaticManifest;
  facetIndex: StaticFacetIndex;
  filters: OpportunityServerFilters;
  searchHits: Set<string> | null;
  ignore?: DimensionKey;
}) {
  const selectors = ([
    "repositories",
    "regions",
    "countries",
    "tags",
    "authors",
  ] as const)
    .filter((key) => key !== params.ignore)
    .map((key) =>
      selectedDimensionIds(params.facetIndex.dimensions, params.filters, key),
    )
    .filter((ids): ids is string[] => ids !== null);
  const order = selectors.sort((left, right) => left.length - right.length)[0] ??
    (await fetchStaticJson<{ ids: string[] }>(params.manifest.files.order)).ids;
  const selectorSets = selectors.map((ids) => new Set(ids));

  return order.filter(
    (id) =>
      (!params.searchHits || params.searchHits.has(id)) &&
      selectorSets.every((set) => set.has(id)),
  );
}

function countDimension(ids: string[], dimension: Record<string, string[]>) {
  const base = new Set(ids);
  const counts: Record<string, number> = {};

  for (const [value, optionIds] of Object.entries(dimension)) {
    const count = optionIds.reduce(
      (total, id) => total + (base.has(id) ? 1 : 0),
      0,
    );
    if (count > 0) counts[value] = count;
  }

  return counts;
}

async function buildFacets(params: {
  manifest: StaticManifest;
  facetIndex: StaticFacetIndex;
  filters: OpportunityServerFilters;
  searchHits: Set<string> | null;
}): Promise<OpportunityFilterFacets> {
  const base = await orderedIdsForFilters(params);
  const repositoryBase = await orderedIdsForFilters({ ...params, ignore: "repositories" });
  const regionBase = await orderedIdsForFilters({ ...params, ignore: "regions" });
  const countryBase = await orderedIdsForFilters({ ...params, ignore: "countries" });

  return {
    repositories: countDimension(repositoryBase, params.facetIndex.dimensions.repositories),
    regions: countDimension(regionBase, params.facetIndex.dimensions.regions),
    countries: countDimension(countryBase, params.facetIndex.dimensions.countries),
    tags: countDimension(base, params.facetIndex.dimensions.tags),
    authors: countDimension(base, params.facetIndex.dimensions.authors),
    authorLabels: params.facetIndex.labels.authors ?? {},
  };
}

async function loadItems(ids: string[], manifest: StaticManifest) {
  const lookup = await fetchStaticJson<StaticPageLookup>(manifest.files.pageLookup);
  const files = uniqueIds(ids.map((id) => lookup.pageLookup[id]).filter(Boolean));
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

export function buildApiUrl() {
  return openingsDataUrl("api/manifest.json");
}

export async function fetchOpportunityById(id: string) {
  const bucket = id.replace(/^gh_/, "").slice(0, 2) || "unknown";
  const payload = await fetchStaticJson<{ items?: Record<string, OpportunityItem> }>(
    `api/jobs/${encodeURIComponent(bucket)}.json`,
  );
  return payload.items?.[id] ?? null;
}

export async function fetchOpportunitiesPage(
  filters: OpportunityServerFilters,
  params: { cursor: string | null; limit: number; signal?: AbortSignal },
) {
  if (params.signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const manifest = await fetchStaticJson<StaticManifest>("api/manifest.json", {
    cache: "no-store",
  });
  const facetIndex = await fetchStaticJson<StaticFacetIndex>(manifest.files.facets);
  const searchIndex = filters.searchText
    ? await fetchStaticJson<StaticSearchIndex>(manifest.files.search)
    : null;
  const searchHits = searchIndex ? buildSearchHits(searchIndex, filters.searchText) : null;
  const recentIds = await orderedIdsForFilters({
    manifest,
    facetIndex,
    filters,
    searchHits,
  });
  const orderedIds = filters.sortOrder === "oldest" ? [...recentIds].reverse() : recentIds;
  const offset = parseOffset(params.cursor);
  const limit = Math.max(1, params.limit);
  const pageIds = orderedIds.slice(offset, offset + limit);
  const [items, facets] = await Promise.all([
    loadItems(pageIds, manifest),
    buildFacets({ manifest, facetIndex, filters, searchHits }),
  ]);
  const nextOffset = offset + pageIds.length;

  return {
    items,
    nextCursor: nextOffset < orderedIds.length ? String(nextOffset) : null,
    hasMore: nextOffset < orderedIds.length,
    rateLimited: false,
    retryAfterSeconds: null,
    meta: {
      snapshotGeneratedAt: manifest.generatedAt,
      deployedAt: null,
      lastUpdatedAt: manifest.generatedAt,
      totalCount: manifest.totals.openOpportunities,
      filteredCount: orderedIds.length,
      facets: Object.keys(facets.repositories).length > 0 ? facets : EMPTY_FACETS,
    },
  } satisfies OpportunitiesApiPayload;
}
