import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import { formatTemplate } from "@/lib/utils/format-template";
import { FilterSection } from "../filter-section";
import {
  OpportunitySortOrder,
  type OpportunityFilterOptions,
  type OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterDisplayGroupProps {
  locale: string;
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  labels: {
    section: string;
    itemsPerPage: string;
    itemsPerPagePlaceholder: string;
    itemsPerPageOption: string;
    sort: string;
    sortPlaceholder: string;
    sortRecent: string;
    sortOldest: string;
  };
  onItemsPerPageChange: (value: number) => void;
  onSortOrderChange: (value: OpportunitySortOrder) => void;
  portalContainer?: HTMLElement | null;
}

export function FilterDisplayGroup({
  locale,
  state,
  options,
  labels,
  onItemsPerPageChange,
  onSortOrderChange,
  portalContainer,
}: FilterDisplayGroupProps): React.ReactNode {
  return (
    <FilterSection label={labels.section}>
      <div className="grid grid-cols-1 gap-3">
        <Field label={labels.itemsPerPage}>
          {(controlProps) => (
            <Select
              value={String(state.itemsPerPage)}
              onValueChange={(value) => onItemsPerPageChange(Number(value))}
            >
              <SelectTrigger {...controlProps}>
                <SelectValue placeholder={labels.itemsPerPagePlaceholder} />
              </SelectTrigger>
              <SelectContent portalContainer={portalContainer ?? undefined}>
                {options.itemsPerPage.map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    {formatTemplate(labels.itemsPerPageOption, {
                      count: value.toLocaleString(locale),
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>

        <Field label={labels.sort}>
          {(controlProps) => (
            <Select value={state.sortOrder} onValueChange={onSortOrderChange}>
              <SelectTrigger {...controlProps}>
                <SelectValue placeholder={labels.sortPlaceholder} />
              </SelectTrigger>
              <SelectContent portalContainer={portalContainer ?? undefined}>
                <SelectItem value={OpportunitySortOrder.Recent}>{labels.sortRecent}</SelectItem>
                <SelectItem value={OpportunitySortOrder.Oldest}>{labels.sortOldest}</SelectItem>
              </SelectContent>
            </Select>
          )}
        </Field>
      </div>
    </FilterSection>
  );
}
