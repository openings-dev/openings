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

export interface StaticManifestPage {
  page: number;
  file: string;
  count: number;
}

export interface StaticManifestTotals {
  openOpportunities: number;
  pages: number;
  repositories: number;
  countries: number;
  regions: number;
}

export interface StaticManifest {
  schemaVersion: 3;
  generatedAt: string;
  dataHash: string;
  pageSize: number;
  totals: StaticManifestTotals;
  files: {
    facets: string;
    pageLookup: string;
    search: string;
    jobIds: string;
    order: string;
  };
  facets: OpportunityFilterFacets;
  pages: StaticManifestPage[];
}

export interface StaticFacetIndex {
  generatedAt: string;
  dimensions: OpportunityFacetIndexDimensions;
  labels: { authors?: Record<string, string> };
}

export interface StaticSearchIndex {
  generatedAt: string;
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
