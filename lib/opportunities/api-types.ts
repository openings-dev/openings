import type { OpportunityFilterFacets, OpportunityItem } from "./types";
import type { OpportunitySortOrder } from "./types";

export interface OpportunityServerFilters {
  repository: string;
  region: string;
  country: string;
  tags: string[];
  authors: string[];
  searchText: string;
  sortOrder: OpportunitySortOrder;
}

export type OpportunityDimensionKey =
  | "repositories"
  | "regions"
  | "countries"
  | "tags"
  | "authors";

export type OpportunityFacetIndexDimensions = Record<
  OpportunityDimensionKey,
  Record<string, string[]>
>;

export interface StaticManifest {
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

export interface StaticFacetIndex {
  dimensions: OpportunityFacetIndexDimensions;
  labels: { authors?: Record<string, string> };
}

export interface StaticSearchIndex {
  items: Array<{ id: string; text: string }>;
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
