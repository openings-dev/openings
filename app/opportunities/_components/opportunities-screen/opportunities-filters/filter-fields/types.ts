import type { OpportunitiesFiltersProps } from "@/app/opportunities/_components/opportunities-screen/types";

export interface FilterFieldsLabels {
  locationSectionLabel: string;
  scopeSectionLabel: string;
  taxonomySectionLabel: string;
  displaySectionLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  repositoryLabel: string;
  repositoryPlaceholder: string;
  allRepositories: string;
  regionLabel: string;
  regionPlaceholder: string;
  allRegions: string;
  countryLabel: string;
  countryPlaceholder: string;
  allCountries: string;
  workModeLabel: string;
  workModePlaceholder: string;
  stackLabel: string;
  stackPlaceholder: string;
  seniorityLabel: string;
  seniorityPlaceholder: string;
  otherTagsLabel: string;
  otherTagsPlaceholder: string;
  tagsLabel: string;
  tagsPlaceholder: string;
  noTagsSelected: string;
  authorLabel: string;
  authorPlaceholder: string;
  noAuthorsSelected: string;
  itemsPerPageLabel: string;
  itemsPerPagePlaceholder: string;
  itemsPerPageOption: string;
  sortLabel: string;
  sortPlaceholder: string;
  sortRecent: string;
  sortOldest: string;
}

export interface FilterFieldsProps extends OpportunitiesFiltersProps {
  advancedOnly?: boolean;
  labels: FilterFieldsLabels;
  tagPickerVersion: number;
  authorPickerVersion: number;
  onTagSelected: (tag: string) => void;
  onAuthorSelected: (authorHandle: string) => void;
}
