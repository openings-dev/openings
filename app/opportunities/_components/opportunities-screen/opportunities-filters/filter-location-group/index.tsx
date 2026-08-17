import { Field } from "@/components/ui/field";
import type {
  OpportunityFilterOptions,
  OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { FilterSection } from "../filter-section";
import { FilterSelect } from "../filter-select";

interface FilterLocationGroupProps {
  locale: string;
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  labels: {
    section: string;
    region: string;
    regionPlaceholder: string;
    allRegions: string;
  };
  portalContainer?: HTMLElement | null;
  onFieldChange: (field: "region", value: string) => void;
}

export function FilterLocationGroup({
  locale,
  state,
  options,
  labels,
  portalContainer,
  onFieldChange,
}: FilterLocationGroupProps): React.ReactNode {
  return (
    <FilterSection label={labels.section}>
      <Field label={labels.region}>
        <FilterSelect
          locale={locale}
          value={state.region}
          placeholder={labels.regionPlaceholder}
          allLabel={labels.allRegions}
          options={options.regions}
          portalContainer={portalContainer}
          onValueChange={(value) => onFieldChange("region", value)}
        />
      </Field>
    </FilterSection>
  );
}
