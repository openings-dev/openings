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
  activeFiltersCount: number;
  onOpenAdvancedFilters: () => void;
  onFieldChange: OnFilterFieldChange;
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
  activeFiltersCount,
  onOpenAdvancedFilters,
  onFieldChange,
}: OpportunitiesQuickFiltersProps) {
  const { messages } = useI18n();
  const filterMessages = messages.opportunities.filters;
  const stackValues = React.useMemo(
    () => new Set(options.tagCategories.stack.map((option) => option.value)),
    [options.tagCategories.stack],
  );
  const selectedStack = filters.tags.find((tag) => stackValues.has(tag)) ?? "all";
  const handleStackChange = React.useCallback((value: string) => {
    const tagsWithoutStack = filters.tags.filter((tag) => !stackValues.has(tag));
    onFieldChange("tags", value === "all" ? tagsWithoutStack : [...tagsWithoutStack, value]);
  }, [filters.tags, onFieldChange, stackValues]);

  return (
    <section
      className="rounded-xl border-2 border-border bg-card p-3 shadow-soft-md"
      aria-label={filterMessages.ariaLabel}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.6fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)_auto]">
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
          placeholder={filterMessages.countryPlaceholder}
          allLabel={filterMessages.allCountries}
          value={filters.country}
          options={options.countries}
          onValueChange={(value) => onFieldChange("country", value)}
        />

        <QuickSelect
          placeholder={filterMessages.stackPlaceholder}
          allLabel={filterMessages.noTagsSelected}
          value={selectedStack}
          options={options.tagCategories.stack}
          disabled={options.tagCategories.stack.length === 0}
          onValueChange={handleStackChange}
        />

        <Button
          type="button"
          className="h-11 justify-center px-5 md:min-w-44"
          onClick={onOpenAdvancedFilters}
        >
          <SlidersHorizontal className="size-4" />
          {filterMessages.show}
          {activeFiltersCount > 0 ? (
            <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs">
              {activeFiltersCount}
            </span>
          ) : null}
        </Button>
      </div>
    </section>
  );
}
