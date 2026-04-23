import type { RepositoryConfig } from "@/lib/constants/repositories";

export type OpportunitySortOrder = "recent" | "oldest";
export type OpportunityViewMode = "list" | "grid";
export type OpportunitySourceType =
  | "github-issue"
  | "github-discussion"
  | "community-board";

export interface OpportunityPerson {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
}

export interface OpportunityCommunity {
  id: string;
  name: string;
  avatarUrl: string;
  repository: string;
  url: string;
}

export interface OpportunitySalary {
  currency: string;
  min?: number;
  max?: number;
  period: "month" | "year" | "hour";
}

export interface OpportunityItem {
  id: string;
  title: string;
  excerpt: string;
  issueState: "open" | "closed";
  repository: RepositoryConfig["repository"];
  repositoryUrl: string;
  region: string;
  country: string;
  tags: string[];
  author: OpportunityPerson;
  community: OpportunityCommunity;
  companyName?: string;
  salary?: OpportunitySalary;
  createdAt: string;
  updatedAt: string;
  url: string;
  sourceType: OpportunitySourceType;
}

export interface OpportunityFiltersState {
  repository: string;
  region: string;
  country: string;
  tags: string[];
  authors: string[];
  searchText: string;
  sortOrder: OpportunitySortOrder;
  itemsPerPage: number;
  viewMode: OpportunityViewMode;
  page: number;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface OpportunityFilterOptions {
  repositories: FilterOption[];
  regions: FilterOption[];
  countries: FilterOption[];
  tags: FilterOption[];
  authors: FilterOption[];
  itemsPerPage: number[];
}

export type OnFilterFieldChange = <
  TField extends keyof OpportunityFiltersState,
>(
  field: TField,
  value: OpportunityFiltersState[TField],
) => void;

export interface OpportunitiesFiltersProps {
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  isExpanded: boolean;
  activeFiltersCount: number;
  onExpandedChange: (open: boolean) => void;
  onFieldChange: OnFilterFieldChange;
  onToggleTag: (tag: string) => void;
  onToggleAuthor: (authorHandle: string) => void;
  onClearFilters: () => void;
}

export interface OpportunitiesToolbarProps {
  totalCount: number;
  rangeLabel: string;
  sortOrder: OpportunitySortOrder;
  viewMode: OpportunityViewMode;
  currentPage: number;
  totalPages: number;
  onSortOrderChange: (value: OpportunitySortOrder) => void;
  onViewModeChange: (value: OpportunityViewMode) => void;
}

export interface OpportunitiesListProps {
  items: OpportunityItem[];
  viewMode: OpportunityViewMode;
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  hasActiveFilters: boolean;
  rangeLabel: string;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  skeletonCount: number;
  onLoadMore: () => void;
  onClearFilters: () => void;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
}

export interface OpportunityCardProps {
  item: OpportunityItem;
  viewMode: OpportunityViewMode;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
}

export interface ViewModeToggleProps {
  value: OpportunityViewMode;
  onChange: (mode: OpportunityViewMode) => void;
}
