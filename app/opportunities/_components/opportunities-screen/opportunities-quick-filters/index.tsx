"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { cn } from "@/lib/utils/tailwind";
import {
  compactSelectTriggerStyles,
  textInputStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";
import type {
  FilterOption,
  OnFilterFieldChange,
  OpportunityFilterOptions,
  OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";

interface OpportunitiesQuickFiltersProps {
  filters: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  filtersExpanded: boolean;
  onFiltersExpandedChange: (expanded: boolean) => void;
  onFieldChange: OnFilterFieldChange;
  onToggleTag: (tag: string) => void;
}

interface QuickSelectProps {
  value?: string;
  placeholder: string;
  allLabel?: string;
  options: FilterOption[];
  disabled?: boolean;
  onValueChange: (value: string) => void;
}

function QuickSelect({
  value,
  placeholder,
  allLabel,
  options,
  disabled,
  onValueChange,
}: QuickSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={cn(compactSelectTriggerStyles, "h-11")}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allLabel ? <SelectItem value="all">{allLabel}</SelectItem> : null}
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label} ({option.count})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function OpportunitiesQuickFilters({
  filters,
  options,
  filtersExpanded,
  onFiltersExpandedChange,
  onFieldChange,
  onToggleTag,
}: OpportunitiesQuickFiltersProps) {
  const { messages } = useI18n();
  const filterMessages = messages.opportunities.filters;
  const handleAddTag = React.useCallback(
    (tag: string) => {
      if (!filters.tags.includes(tag)) {
        onToggleTag(tag);
      }
    },
    [filters.tags, onToggleTag],
  );

  return (
    <section
      className="rounded-2xl border border-border/80 bg-surface-elevated p-2.5 shadow-soft-md"
      aria-label={filterMessages.ariaLabel}
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_minmax(160px,0.85fr)_minmax(160px,0.85fr)_minmax(150px,0.75fr)_auto]">
        <div className="relative md:col-span-2 xl:col-span-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
          <input
            type="text"
            value={filters.searchText}
            onChange={(event) => onFieldChange("searchText", event.target.value)}
            placeholder={filterMessages.searchPlaceholder}
            className={cn(textInputStyles, "h-11 pl-10 shadow-none")}
          />
        </div>

        <QuickSelect
          placeholder={filterMessages.repositoryPlaceholder}
          allLabel={filterMessages.allRepositories}
          value={filters.repository}
          options={options.repositories}
          onValueChange={(value) => onFieldChange("repository", value)}
        />

        <QuickSelect
          placeholder={filterMessages.countryPlaceholder}
          allLabel={filterMessages.allCountries}
          value={filters.country}
          options={options.countries}
          onValueChange={(value) => onFieldChange("country", value)}
        />

        <QuickSelect
          key={`quick-work-mode-${filters.tags.join("|")}`}
          placeholder={filterMessages.workModePlaceholder}
          options={options.tagCategories.workModel}
          disabled={options.tagCategories.workModel.length === 0}
          onValueChange={handleAddTag}
        />

        <Button
          type="button"
          variant="outline"
          className="h-11 justify-center px-4 md:min-w-32"
          onClick={() => onFiltersExpandedChange(!filtersExpanded)}
        >
          <SlidersHorizontal className="size-4 text-primary" />
          {filtersExpanded ? filterMessages.hide : filterMessages.show}
        </Button>
      </div>
    </section>
  );
}
