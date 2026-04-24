export const ALL_FILTER_VALUE = "all";

export interface LocationScopedItem {
  region: string;
  country: string;
}

export interface LocationFilterOption {
  value: string;
  count: number;
}

export interface LocationFilterState {
  region: string;
  country: string;
}

export interface LocationFiltersMessages {
  title: string;
  region: string;
  country: string;
  allRegions: string;
  allCountries: string;
  optionWithCount: string;
  hide: string;
  show: string;
  clear: string;
}

export interface PreferredLocation {
  country: string;
  region: string;
}
