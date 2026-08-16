import { FilterSelect } from "../filter-select";
import { FilterSection } from "../filter-section";
import type {
  OpportunityFilterOptions,
  OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterLocationGroupProps {
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  labels: {
    section: string;
    region: string;
    regionPlaceholder: string;
    allRegions: string;
    country: string;
    countryPlaceholder: string;
    allCountries: string;
  };
  onFieldChange: (field: "region" | "country", value: string) => void;
  hideCountry?: boolean;
}

export function FilterLocationGroup({
  state,
  options,
  labels,
  onFieldChange,
  hideCountry = false,
}: FilterLocationGroupProps) {
  return (
    <FilterSection label={labels.section}>
      <div className="grid grid-cols-1 gap-3">
        {!hideCountry ? <div className="space-y-1">
          <p className="text-xs text-muted-foreground/85">{labels.region}</p>
          <FilterSelect
            value={state.region}
            placeholder={labels.regionPlaceholder}
            allLabel={labels.allRegions}
            options={options.regions}
            onValueChange={(value) => onFieldChange("region", value)}
          />
        </div> : null}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground/85">{labels.country}</p>
          <FilterSelect
            value={state.country}
            placeholder={labels.countryPlaceholder}
            allLabel={labels.allCountries}
            options={options.countries}
            onValueChange={(value) => onFieldChange("country", value)}
          />
        </div>
      </div>
    </FilterSection>
  );
}
