"use client";

import * as React from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResponsiveFilterPanel } from "@/app/_hooks/use-responsive-filter-panel";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import { cn } from "@/lib/utils/tailwind";
import type {
  LocationFilterOption,
  LocationFiltersMessages,
  LocationFilterState,
} from "./types";

interface LocationFiltersPanelProps {
  locale: string;
  filtersMessages: LocationFiltersMessages;
  state: LocationFilterState;
  regions: LocationFilterOption[];
  countries: LocationFilterOption[];
  onRegionChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onClear: () => void;
}

function optionLabel(template: string, locale: string, value: string, count: number) {
  return formatTemplate(template, {
    label: value,
    count: count.toLocaleString(locale),
  });
}

export function LocationFiltersPanel({
  locale,
  filtersMessages,
  state,
  regions,
  countries,
  onRegionChange,
  onCountryChange,
  onClear,
}: LocationFiltersPanelProps) {
  const contentId = React.useId();
  const [isExpanded, setIsExpanded] = useResponsiveFilterPanel();

  return (
    <aside className="rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-3.5 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">
            {filtersMessages.title}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={contentId}
          >
            {isExpanded ? filtersMessages.hide : filtersMessages.show}
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform duration-200",
                isExpanded && "rotate-180",
              )}
            />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={onClear}
          >
            <RotateCcw className="size-3" />
            {filtersMessages.clear}
          </Button>
        </div>
      </div>

      {isExpanded ? (
        <div
          id={contentId}
          className="mt-4 grid gap-3 md:grid-cols-2 md:items-end"
        >
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {filtersMessages.region}
            </label>
            <select
              className="h-10 w-full rounded-lg border border-input/75 bg-background/70 px-3 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              value={state.region}
              onChange={(event) => onRegionChange(event.target.value)}
            >
              <option value="all">{filtersMessages.allRegions}</option>
              {regions.map((entry) => (
                <option key={entry.value} value={entry.value}>
                  {optionLabel(
                    filtersMessages.optionWithCount,
                    locale,
                    entry.value,
                    entry.count,
                  )}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {filtersMessages.country}
            </label>
            <select
              className="h-10 w-full rounded-lg border border-input/75 bg-background/70 px-3 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              value={state.country}
              onChange={(event) => onCountryChange(event.target.value)}
            >
              <option value="all">{filtersMessages.allCountries}</option>
              {countries.map((entry) => (
                <option key={entry.value} value={entry.value}>
                  {optionLabel(
                    filtersMessages.optionWithCount,
                    locale,
                    entry.value,
                    entry.count,
                  )}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
