"use client";

import * as React from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useResponsiveFilterPanel } from "@/app/_hooks/use-responsive-filter-panel";
import { formatTemplate } from "@/lib/utils/format-template";
import { cn } from "@/lib/utils/tailwind";
import { ALL_FILTER_VALUE } from "../types";
import type {
  LocationFilterOption,
  LocationFiltersMessages,
  LocationFilterState,
} from "../types";

interface LocationFiltersPanelProps {
  locale: string;
  filtersMessages: LocationFiltersMessages;
  state: LocationFilterState;
  regions: LocationFilterOption[];
  countries: LocationFilterOption[];
  onRegionChange: (value: string) => void;
  onCountryChange: (value: string) => void;
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
}: LocationFiltersPanelProps): React.ReactNode {
  const contentId = React.useId();
  const [isExpanded, setIsExpanded] = useResponsiveFilterPanel();
  const activeValues = [
    state.country !== ALL_FILTER_VALUE
      ? { label: filtersMessages.country, value: state.country }
      : null,
    state.region !== ALL_FILTER_VALUE
      ? { label: filtersMessages.region, value: state.region }
      : null,
  ].filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return (
    <div className="mt-4 border-t border-line pt-4">
      <div className="flex min-h-11 items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-label font-medium text-foreground">
            {filtersMessages.title}
          </p>
          {activeValues.length > 0 ? (
            <div className="mt-2 flex min-w-0 flex-wrap gap-1.5 md:hidden">
              {activeValues.map((entry) => (
                <Badge key={entry.label} tone="primary" size="compact">
                  <MapPin aria-hidden="true" />
                  {entry.label}: {entry.value}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="shrink-0 md:hidden"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? filtersMessages.hide : filtersMessages.show}
          <ChevronDown
            className={cn(
              "transition-transform duration-200",
              isExpanded && "rotate-180",
            )}
            aria-hidden="true"
          />
        </Button>
      </div>

      <div
        id={contentId}
        className={cn(
          "mt-3 grid gap-4 md:grid md:grid-cols-2 md:items-end",
          !isExpanded && "hidden",
        )}
      >
        <Field label={filtersMessages.country} controlId="directory-country">
          <select
            value={state.country}
            className="h-11 min-h-11 w-full rounded-control border border-control bg-surface px-3 text-base font-medium text-foreground outline-none transition-[background-color,border-color,box-shadow] hover:bg-surface-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            onChange={(event) => onCountryChange(event.target.value)}
          >
            <option value={ALL_FILTER_VALUE}>{filtersMessages.allCountries}</option>
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
        </Field>

        <Field label={filtersMessages.region} controlId="directory-region">
          <select
            value={state.region}
            className="h-11 min-h-11 w-full rounded-control border border-control bg-surface px-3 text-base font-medium text-foreground outline-none transition-[background-color,border-color,box-shadow] hover:bg-surface-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            onChange={(event) => onRegionChange(event.target.value)}
          >
            <option value={ALL_FILTER_VALUE}>{filtersMessages.allRegions}</option>
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
        </Field>
      </div>
    </div>
  );
}
