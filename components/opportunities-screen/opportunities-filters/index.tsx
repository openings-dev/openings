"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
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
  chipStyles,
  compactSelectTriggerStyles,
  filterFieldStyles,
  filterGridStyles,
  filterLabelStyles,
  panelStyles,
  textInputStyles,
} from "@/components/opportunities-screen/styles";
import type {
  OpportunitiesFiltersProps,
  OpportunitySortOrder,
} from "@/components/opportunities-screen/types";

interface FilterFieldsProps extends OpportunitiesFiltersProps {
  onTagSelected: (tag: string) => void;
  onAuthorSelected: (authorHandle: string) => void;
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

function FilterFields({
  state,
  options,
  onFieldChange,
  onToggleTag,
  onToggleAuthor,
  onTagSelected,
  onAuthorSelected,
}: FilterFieldsProps) {
  const { messages } = useI18n();
  const opportunitiesMessages = messages.opportunities;
  const filterMessages = opportunitiesMessages.filters;

  return (
    <div className={filterGridStyles()}>
      <div className={cn(filterFieldStyles(), "xl:col-span-2")}>
        <label htmlFor="opportunity-search" className={filterLabelStyles()}>
          {filterMessages.searchLabel}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="opportunity-search"
            type="text"
            value={state.searchText}
            onChange={(event) => onFieldChange("searchText", event.target.value)}
            placeholder={filterMessages.searchPlaceholder}
            className={cn(textInputStyles(), "pl-9")}
          />
        </div>
      </div>

      <div className={filterFieldStyles()}>
        <span className={filterLabelStyles()}>{filterMessages.repositoryLabel}</span>
        <Select
          value={state.repository}
          onValueChange={(value) => onFieldChange("repository", value)}
        >
          <SelectTrigger className={compactSelectTriggerStyles()}>
            <SelectValue placeholder={filterMessages.repositoryPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{filterMessages.allRepositories}</SelectItem>
            {options.repositories.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={filterFieldStyles()}>
        <span className={filterLabelStyles()}>{filterMessages.regionLabel}</span>
        <Select
          value={state.region}
          onValueChange={(value) => onFieldChange("region", value)}
        >
          <SelectTrigger className={compactSelectTriggerStyles()}>
            <SelectValue placeholder={filterMessages.regionPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{filterMessages.allRegions}</SelectItem>
            {options.regions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={filterFieldStyles()}>
        <span className={filterLabelStyles()}>{filterMessages.countryLabel}</span>
        <Select
          value={state.country}
          onValueChange={(value) => onFieldChange("country", value)}
        >
          <SelectTrigger className={compactSelectTriggerStyles()}>
            <SelectValue placeholder={filterMessages.countryPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{filterMessages.allCountries}</SelectItem>
            {options.countries.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn(filterFieldStyles(), "xl:col-span-2")}>
        <span className={filterLabelStyles()}>{filterMessages.tagsLabel}</span>
        <Select onValueChange={onTagSelected}>
          <SelectTrigger className={compactSelectTriggerStyles()}>
            <SelectValue placeholder={filterMessages.tagsPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {options.tags.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex min-h-6 flex-wrap gap-1.5 pt-1">
          {state.tags.length === 0 ? (
            <span className="text-xs text-muted-foreground">
              {filterMessages.noTagsSelected}
            </span>
          ) : (
            state.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={chipStyles({ active: true })}
                onClick={() => onToggleTag(tag)}
              >
                {tag}
                <X className="size-3" />
              </button>
            ))
          )}
        </div>
      </div>

      <div className={cn(filterFieldStyles(), "xl:col-span-2")}>
        <span className={filterLabelStyles()}>{filterMessages.authorLabel}</span>
        <Select onValueChange={onAuthorSelected}>
          <SelectTrigger className={compactSelectTriggerStyles()}>
            <SelectValue placeholder={filterMessages.authorPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {options.authors.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex min-h-6 flex-wrap gap-1.5 pt-1">
          {state.authors.length === 0 ? (
            <span className="text-xs text-muted-foreground">
              {filterMessages.noAuthorsSelected}
            </span>
          ) : (
            state.authors.map((author) => {
              const authorLabel =
                options.authors.find((option) => option.value === author)?.label ??
                author;

              return (
                <button
                  key={author}
                  type="button"
                  className={chipStyles({ active: true })}
                  onClick={() => onToggleAuthor(author)}
                >
                  {authorLabel}
                  <X className="size-3" />
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className={filterFieldStyles()}>
        <span className={filterLabelStyles()}>{filterMessages.itemsPerPageLabel}</span>
        <Select
          value={String(state.itemsPerPage)}
          onValueChange={(value) => onFieldChange("itemsPerPage", Number(value))}
        >
          <SelectTrigger className={compactSelectTriggerStyles()}>
            <SelectValue placeholder={filterMessages.itemsPerPagePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {options.itemsPerPage.map((value) => (
              <SelectItem key={value} value={String(value)}>
                {formatTemplate(filterMessages.itemsPerPageOption, { count: value })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={filterFieldStyles()}>
        <span className={filterLabelStyles()}>{filterMessages.sortLabel}</span>
        <Select
          value={state.sortOrder}
          onValueChange={(value) =>
            onFieldChange("sortOrder", value as OpportunitySortOrder)
          }
        >
          <SelectTrigger className={compactSelectTriggerStyles()}>
            <SelectValue placeholder={filterMessages.sortPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">{filterMessages.sortRecent}</SelectItem>
            <SelectItem value="oldest">{filterMessages.sortOldest}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function OpportunitiesFilters(props: OpportunitiesFiltersProps) {
  const { messages } = useI18n();
  const opportunitiesMessages = messages.opportunities;
  const filterMessages = opportunitiesMessages.filters;
  const {
    isExpanded,
    activeFiltersCount,
    onExpandedChange,
    onToggleTag,
    onToggleAuthor,
    onClearFilters,
  } = props;
  const [tagPickerVersion, setTagPickerVersion] = React.useState(0);
  const [authorPickerVersion, setAuthorPickerVersion] = React.useState(0);

  const handleTagSelected = React.useCallback(
    (tag: string) => {
      onToggleTag(tag);
      setTagPickerVersion((value) => value + 1);
    },
    [onToggleTag],
  );

  const handleAuthorSelected = React.useCallback(
    (authorHandle: string) => {
      onToggleAuthor(authorHandle);
      setAuthorPickerVersion((value) => value + 1);
    },
    [onToggleAuthor],
  );

  return (
    <section className={panelStyles()} aria-label={filterMessages.ariaLabel}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 bg-muted/45 text-muted-foreground">
            <SlidersHorizontal className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">{filterMessages.title}</h2>
            <p className="text-xs text-muted-foreground">
              {formatTemplate(filterMessages.activeCount, {
                count: activeFiltersCount,
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-2.5"
            onClick={() => onExpandedChange(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="opportunities-filters-content"
          >
            {isExpanded ? filterMessages.hide : filterMessages.show}
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                isExpanded && "rotate-180",
              )}
            />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2.5"
            onClick={onClearFilters}
          >
            <RotateCcw className="size-3.5" />
            {filterMessages.reset}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            id="opportunities-filters-content"
            className="mt-4"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <FilterFields
              key={`expanded-${tagPickerVersion}-${authorPickerVersion}`}
              {...props}
              onTagSelected={handleTagSelected}
              onAuthorSelected={handleAuthorSelected}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
