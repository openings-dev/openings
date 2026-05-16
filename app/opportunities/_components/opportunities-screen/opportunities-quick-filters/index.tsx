"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils/tailwind";
import {
  compactSelectTriggerStyles,
  textInputStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";
import type { useOpportunitiesScreenController } from "@/app/opportunities/_components/opportunities-screen/controller/use-opportunities-screen-controller";
import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";

interface OpportunitiesQuickFiltersProps {
  controller: ReturnType<typeof useOpportunitiesScreenController>;
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
        className={cn(compactSelectTriggerStyles(), "h-11 rounded-md bg-background/55")}
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
  controller,
}: OpportunitiesQuickFiltersProps) {
  const { messages } = useI18n();
  const filterMessages = messages.opportunities.filters;
  const { normalizedFilters, options } = controller;

  const handleAddTag = React.useCallback(
    (tag: string) => {
      if (!normalizedFilters.tags.includes(tag)) {
        controller.handleToggleTag(tag);
      }
    },
    [controller, normalizedFilters.tags],
  );

  return (
    <section
      className="rounded-lg border border-border/70 bg-card/50 p-2 shadow-[0_24px_90px_-70px_rgb(0_0_0/0.66)] backdrop-blur-xl"
      aria-label={filterMessages.ariaLabel}
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_minmax(160px,0.85fr)_minmax(160px,0.85fr)_minmax(150px,0.75fr)_auto]">
        <div className="relative md:col-span-2 xl:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/65" />
          <input
            type="text"
            value={normalizedFilters.searchText}
            onChange={(event) =>
              controller.handleFieldChange("searchText", event.target.value)
            }
            placeholder={filterMessages.searchPlaceholder}
            className={cn(textInputStyles(), "h-11 rounded-md pl-9")}
          />
        </div>

        <QuickSelect
          placeholder={filterMessages.repositoryPlaceholder}
          allLabel={filterMessages.allRepositories}
          value={normalizedFilters.repository}
          options={options.repositories}
          onValueChange={(value) =>
            controller.handleFieldChange("repository", value)
          }
        />

        <QuickSelect
          placeholder={filterMessages.countryPlaceholder}
          allLabel={filterMessages.allCountries}
          value={normalizedFilters.country}
          options={options.countries}
          onValueChange={(value) => controller.handleFieldChange("country", value)}
        />

        <QuickSelect
          key={`quick-work-mode-${normalizedFilters.tags.join("|")}`}
          placeholder={filterMessages.workModePlaceholder}
          options={options.tagCategories.workModel}
          disabled={options.tagCategories.workModel.length === 0}
          onValueChange={handleAddTag}
        />

        <Button
          type="button"
          variant="outline"
          className="h-11 justify-center rounded-md border-border/70 bg-background/55 px-4 text-sm text-foreground/86 hover:bg-muted/50 md:min-w-32"
          onClick={() =>
            controller.setFiltersExpanded(!controller.filtersExpanded)
          }
        >
          <SlidersHorizontal className="size-4 text-primary" />
          {controller.filtersExpanded ? filterMessages.hide : filterMessages.show}
        </Button>
      </div>
    </section>
  );
}
