import type {
  OpportunityFilterFacets,
  OpportunityItem,
} from "@/app/opportunities/_components/opportunities-screen/types";
import type { OpportunityServerFilters } from "./server-filters";

const EMPTY_FACETS: OpportunityFilterFacets = {
  repositories: {},
  regions: {},
  countries: {},
  tags: {},
  authors: {},
  authorLabels: {},
};

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

function parseFacetCountRecord(value: unknown) {
  if (!value || typeof value !== "object") {
    return {};
  }
  return Object.entries(value as Record<string, unknown>).reduce<Record<string, number>>(
    (accumulator, [key, count]) => {
      if (typeof count === "number" && Number.isFinite(count) && count >= 0) {
        accumulator[key] = Math.floor(count);
      }
      return accumulator;
    },
    {},
  );
}

function parseFacetLabelRecord(value: unknown) {
  if (!value || typeof value !== "object") {
    return {};
  }
  return Object.entries(value as Record<string, unknown>).reduce<Record<string, string>>(
    (accumulator, [key, label]) => {
      if (typeof label === "string") {
        accumulator[key] = label;
      }
      return accumulator;
    },
    {},
  );
}

function parseFacets(value: unknown): OpportunityFilterFacets {
  if (!value || typeof value !== "object") {
    return EMPTY_FACETS;
  }

  const record = value as Partial<OpportunityFilterFacets>;
  return {
    repositories: parseFacetCountRecord(record.repositories),
    regions: parseFacetCountRecord(record.regions),
    countries: parseFacetCountRecord(record.countries),
    tags: parseFacetCountRecord(record.tags),
    authors: parseFacetCountRecord(record.authors),
    authorLabels: parseFacetLabelRecord(record.authorLabels),
  };
}

export function buildApiUrl(
  filters: OpportunityServerFilters,
  cursor: string | null,
  limit: number,
) {
  const params = new URLSearchParams();

  if (filters.repository !== "all") params.set("repository", filters.repository);
  if (filters.region !== "all") params.set("region", filters.region);
  if (filters.country !== "all") params.set("country", filters.country);
  if (filters.tags.length > 0) params.set("tags", filters.tags.join(","));
  if (filters.authors.length > 0) params.set("authors", filters.authors.join(","));
  if (filters.searchText.trim()) params.set("search", filters.searchText.trim());
  if (filters.sortOrder !== "recent") params.set("sort", filters.sortOrder);
  if (cursor) params.set("cursor", cursor);
  params.set("limit", String(limit));

  const query = params.toString();
  return query ? `/api/opportunities?${query}` : "/api/opportunities";
}

export function parseApiPayload(payload: unknown): OpportunitiesApiPayload {
  if (!payload || typeof payload !== "object") {
    return {
      items: [],
      nextCursor: null,
      hasMore: false,
      rateLimited: false,
      retryAfterSeconds: null,
      meta: {
        snapshotGeneratedAt: null,
        deployedAt: null,
        lastUpdatedAt: null,
        totalCount: 0,
        filteredCount: 0,
        facets: EMPTY_FACETS,
      },
    };
  }

  const data = payload as Partial<OpportunitiesApiPayload>;
  const metaRecord =
    data.meta && typeof data.meta === "object"
      ? (data.meta as Partial<OpportunitiesApiMeta>)
      : null;
  const retryAfterSeconds =
    typeof data.retryAfterSeconds === "number" && Number.isFinite(data.retryAfterSeconds) && data.retryAfterSeconds > 0
      ? Math.floor(data.retryAfterSeconds)
      : null;

  return {
    items: Array.isArray(data.items) ? data.items : [],
    nextCursor: typeof data.nextCursor === "string" ? data.nextCursor : null,
    hasMore: Boolean(data.hasMore),
    rateLimited: Boolean(data.rateLimited),
    retryAfterSeconds,
    meta: {
      snapshotGeneratedAt:
        typeof metaRecord?.snapshotGeneratedAt === "string"
          ? metaRecord.snapshotGeneratedAt
          : null,
      deployedAt:
        typeof metaRecord?.deployedAt === "string"
          ? metaRecord.deployedAt
          : null,
      lastUpdatedAt:
        typeof metaRecord?.lastUpdatedAt === "string"
          ? metaRecord.lastUpdatedAt
          : null,
      totalCount:
        typeof metaRecord?.totalCount === "number" &&
        Number.isFinite(metaRecord.totalCount) &&
        metaRecord.totalCount >= 0
          ? Math.floor(metaRecord.totalCount)
          : 0,
      filteredCount:
        typeof metaRecord?.filteredCount === "number" &&
        Number.isFinite(metaRecord.filteredCount) &&
        metaRecord.filteredCount >= 0
          ? Math.floor(metaRecord.filteredCount)
          : 0,
      facets: parseFacets(metaRecord?.facets),
    },
  };
}

export async function fetchOpportunitiesPage(
  filters: OpportunityServerFilters,
  params: { cursor: string | null; limit: number; signal?: AbortSignal },
) {
  const response = await fetch(buildApiUrl(filters, params.cursor, params.limit), {
    cache: "force-cache",
    signal: params.signal,
  });
  const payload = parseApiPayload(await response.json().catch(() => null));

  if (response.status === 429 || payload.rateLimited) {
    return { ...payload, rateLimited: true };
  }

  if (!response.ok) {
    throw new Error(`Failed to load opportunities (${response.status})`);
  }

  return payload;
}
