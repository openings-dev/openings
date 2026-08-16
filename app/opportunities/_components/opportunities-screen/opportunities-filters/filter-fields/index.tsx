import type { OpportunitySortOrder } from "@/app/opportunities/_components/opportunities-screen/types";
import { FilterDisplayGroup } from "../filter-display-group";
import { FilterLocationGroup } from "../filter-location-group";
import { FilterScopeGroup } from "../filter-scope-group";
import { FilterSearch } from "../filter-search";
import { FilterTaxonomyGroup } from "../filter-taxonomy-group";
import type { FilterFieldsProps } from "./types";

export function FilterFields({
  state,
  options,
  labels,
  tagPickerVersion,
  authorPickerVersion,
  onFieldChange,
  onToggleTag,
  onToggleAuthor,
  onTagSelected,
  onAuthorSelected,
  advancedOnly = false,
}: FilterFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-start">
      <FilterLocationGroup
        state={state}
        options={options}
        labels={{
          section: labels.locationSectionLabel,
          region: labels.regionLabel,
          regionPlaceholder: labels.regionPlaceholder,
          allRegions: labels.allRegions,
          country: labels.countryLabel,
          countryPlaceholder: labels.countryPlaceholder,
          allCountries: labels.allCountries,
        }}
        onFieldChange={onFieldChange}
        hideCountry={advancedOnly}
      />
      {!advancedOnly ? (
        <FilterSearch
          label={labels.searchLabel}
          placeholder={labels.searchPlaceholder}
          value={state.searchText}
          onChange={(value) => onFieldChange("searchText", value)}
        />
      ) : null}
      <FilterScopeGroup
        state={state}
        options={options}
        labels={{
          section: labels.scopeSectionLabel,
          repository: labels.repositoryLabel,
          repositoryPlaceholder: labels.repositoryPlaceholder,
          allRepositories: labels.allRepositories,
        }}
        onFieldChange={onFieldChange}
      />
      <FilterTaxonomyGroup
        state={state}
        options={options}
        labels={{
          section: labels.taxonomySectionLabel,
          workModeLabel: labels.workModeLabel,
          workModePlaceholder: labels.workModePlaceholder,
          stackLabel: labels.stackLabel,
          stackPlaceholder: labels.stackPlaceholder,
          seniorityLabel: labels.seniorityLabel,
          seniorityPlaceholder: labels.seniorityPlaceholder,
          otherTagsLabel: labels.otherTagsLabel,
          otherTagsPlaceholder: labels.otherTagsPlaceholder,
          noTagsSelected: labels.noTagsSelected,
          authors: labels.authorLabel,
          authorPlaceholder: labels.authorPlaceholder,
          noAuthorsSelected: labels.noAuthorsSelected,
        }}
        tagPickerVersion={tagPickerVersion}
        authorPickerVersion={authorPickerVersion}
        onTagSelected={onTagSelected}
        onToggleTag={onToggleTag}
        onAuthorSelected={onAuthorSelected}
        onToggleAuthor={onToggleAuthor}
        hideStack={advancedOnly}
      />
      <FilterDisplayGroup
        state={state}
        options={options}
        labels={{
          section: labels.displaySectionLabel,
          itemsPerPage: labels.itemsPerPageLabel,
          itemsPerPagePlaceholder: labels.itemsPerPagePlaceholder,
          itemsPerPageOption: labels.itemsPerPageOption,
          sort: labels.sortLabel,
          sortPlaceholder: labels.sortPlaceholder,
          sortRecent: labels.sortRecent,
          sortOldest: labels.sortOldest,
        }}
        onItemsPerPageChange={(value) => onFieldChange("itemsPerPage", value)}
        onSortOrderChange={(value) =>
          onFieldChange("sortOrder", value as OpportunitySortOrder)
        }
      />
    </div>
  );
}
