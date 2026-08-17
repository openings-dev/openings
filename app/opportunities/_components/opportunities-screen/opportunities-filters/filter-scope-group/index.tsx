import { Field } from "@/components/ui/field";
import { FilterSelect } from "../filter-select";
import { FilterSection } from "../filter-section";
import type { OpportunityFilterOptions, OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterScopeGroupProps {
  locale: string;
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  labels: {
    section: string;
    repository: string;
    repositoryPlaceholder: string;
    allRepositories: string;
  };
  portalContainer?: HTMLElement | null;
  locked?: boolean;
  onFieldChange: (field: "repository", value: string) => void;
}

export function FilterScopeGroup({
  locale,
  state,
  options,
  labels,
  portalContainer,
  locked,
  onFieldChange,
}: FilterScopeGroupProps) {
  return (
    <FilterSection label={labels.section}>
      <Field label={labels.repository}>
        <FilterSelect
          locale={locale}
          value={state.repository}
          placeholder={labels.repositoryPlaceholder}
          allLabel={labels.allRepositories}
          options={options.repositories}
          portalContainer={portalContainer}
          disabled={locked}
          onValueChange={(value) => onFieldChange("repository", value)}
        />
      </Field>
    </FilterSection>
  );
}
