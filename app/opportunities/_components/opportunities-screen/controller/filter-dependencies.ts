import type { Dispatch, SetStateAction } from "react";
import { ALL_FILTER_VALUE } from "./defaults";
import type { RepositoryFilterRegistry } from "./repository-filter-registry";
import type {
  OnFilterFieldChange,
  OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";

type OpportunityLocationScope = Pick<
  OpportunityFiltersState,
  "repository" | "region" | "country"
>;

function countryBelongsToRegion(
  country: string,
  region: string,
  registry: RepositoryFilterRegistry | null,
) {
  if (!registry) return true;
  return registry.regionsByCountry.get(country)?.has(region) ?? false;
}

export function normalizeFilterDependencies<TFilters extends OpportunityLocationScope>(
  filters: TFilters,
  registry: RepositoryFilterRegistry | null = null,
): TFilters {
  const next = { ...filters };

  if (next.repository !== ALL_FILTER_VALUE) {
    next.region = ALL_FILTER_VALUE;
    next.country = ALL_FILTER_VALUE;
    return next;
  }

  if (
    next.region !== ALL_FILTER_VALUE &&
    next.country !== ALL_FILTER_VALUE &&
    !countryBelongsToRegion(next.country, next.region, registry)
  ) {
    next.country = ALL_FILTER_VALUE;
  }

  return next;
}

export function applyFilterFieldChange<TField extends keyof OpportunityFiltersState>(
  previous: OpportunityFiltersState,
  field: TField,
  value: OpportunityFiltersState[TField],
  registry: RepositoryFilterRegistry | null = null,
) {
  if (Object.is(previous[field], value)) {
    return previous;
  }

  const next = { ...previous, [field]: value } as OpportunityFiltersState;

  if (field === "repository") {
    next.region = ALL_FILTER_VALUE;
    next.country = ALL_FILTER_VALUE;
  }

  if (field === "region") {
    next.country = ALL_FILTER_VALUE;
  }

  if (field !== "page" && field !== "viewMode") {
    next.page = 1;
  }

  return normalizeFilterDependencies(next, registry);
}

export function createFilterFieldChangeHandler(params: {
  forcedRepository: string | null;
  forcedAuthor: string | null;
  registry: RepositoryFilterRegistry | null;
  setFilters: Dispatch<SetStateAction<OpportunityFiltersState>>;
}) {
  return function handleFieldChange<TField extends keyof OpportunityFiltersState>(
    field: TField,
    value: OpportunityFiltersState[TField],
  ) {
    params.setFilters((previous) => {
      if (field === "repository" && params.forcedRepository) {
        return previous;
      }

      if (field === "authors" && params.forcedAuthor) {
        return previous;
      }

      return applyFilterFieldChange(previous, field, value, params.registry);
    });
  } satisfies OnFilterFieldChange;
}
