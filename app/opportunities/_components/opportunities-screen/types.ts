import type {
  CommunityProfileSummary,
  OpportunityItem,
  OpportunitySortOrder,
  OpportunityViewMode,
  UserProfileSummary,
} from "@/lib/opportunities/types";

export {
  OpportunityIssueState,
  OpportunitySalaryPeriod,
  OpportunitySortOrder,
  OpportunitySourceType,
  OpportunityViewMode,
} from "@/lib/opportunities/types";
export type {
  CommunityProfileSummary,
  OpportunityCommunity,
  OpportunityFilterFacets,
  OpportunityItem,
  OpportunityPerson,
  OpportunitySalary,
  UserProfileSummary,
} from "@/lib/opportunities/types";

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

export interface FilterOption { value: string; label: string; count: number }
export interface OpportunityTagCategoryOptions {
  workModel: FilterOption[];
  stack: FilterOption[];
  seniority: FilterOption[];
  other: FilterOption[];
}
export interface OpportunityFilterOptions {
  repositories: FilterOption[];
  regions: FilterOption[];
  countries: FilterOption[];
  tags: FilterOption[];
  tagCategories: OpportunityTagCategoryOptions;
  authors: FilterOption[];
  itemsPerPage: number[];
}
export type OnFilterFieldChange = <TField extends keyof OpportunityFiltersState>(
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
  selectedOpportunityId: string | null;
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
  onSelectOpportunity: (item: OpportunityItem) => void;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
  hideCommunityIdentity: boolean;
  hideAuthorIdentity: boolean;
}
export interface OpportunityCardProps extends Pick<OpportunitiesListProps,
  "viewMode" | "onSelectOpportunity" | "onCommunitySelect" | "onAuthorSelect" |
  "hideCommunityIdentity" | "hideAuthorIdentity"> {
  item: OpportunityItem;
  isSelected: boolean;
}
export interface ViewModeToggleProps {
  value: OpportunityViewMode;
  onChange: (mode: OpportunityViewMode) => void;
}
export interface OpportunitiesScreenProps {
  forcedRepository?: string;
  forcedAuthor?: string;
  forcedAuthorProfile?: UserProfileSummary | null;
  forcedRepositoryProfile?: CommunityProfileSummary | null;
}
export interface OpportunityDrawerProps {
  item: OpportunityItem | null;
  open: boolean;
  onClose: () => void;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
}
