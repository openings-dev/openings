"use client";

import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import type { OpportunitiesFiltersProps } from "@/app/opportunities/_components/opportunities-screen/types";
import { FilterFields } from "./filter-fields";

export function OpportunitiesFilters(props: OpportunitiesFiltersProps): React.ReactNode {
  const { messages } = useI18n();
  const filterMessages = messages.opportunities.filters;
  const { open, resultCount, activeFiltersCount, onOpenChange, onToggleTag, onToggleAuthor, onClearFilters } = props;
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [tagPickerVersion, setTagPickerVersion] = React.useState(0);
  const [authorPickerVersion, setAuthorPickerVersion] = React.useState(0);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleTagSelected = React.useCallback((tag: string) => {
    onToggleTag(tag);
    setTagPickerVersion((value) => value + 1);
  }, [onToggleTag]);

  const handleAuthorSelected = React.useCallback((authorHandle: string) => {
    onToggleAuthor(authorHandle);
    setAuthorPickerVersion((value) => value + 1);
  }, [onToggleAuthor]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="advanced-filters-title"
      className="m-auto max-h-[92dvh] w-[min(960px,calc(100%-2rem))] overflow-hidden rounded-xl border-2 border-border bg-card p-0 text-foreground shadow-soft-lg backdrop:bg-foreground/55 backdrop:backdrop-blur-[2px] max-sm:h-[calc(100dvh-1rem)] max-sm:max-h-none max-sm:w-[calc(100%-1rem)]"
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="flex max-h-[92dvh] flex-col max-sm:h-full max-sm:max-h-none">
        <header className="flex items-start justify-between gap-6 border-b-2 border-border bg-accent px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-accent-foreground">
              <SlidersHorizontal className="size-4" />
              {filterMessages.ariaLabel}
            </div>
            <h2 id="advanced-filters-title" className="text-2xl font-black tracking-tight sm:text-3xl">
              {filterMessages.title}
            </h2>
          </div>
          <Button type="button" variant="outline" size="icon" aria-label={filterMessages.hide} onClick={() => onOpenChange(false)}>
            <X className="size-5" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <FilterFields
            {...props}
            advancedOnly
            labels={{
              locationSectionLabel: filterMessages.locationSectionLabel,
              scopeSectionLabel: filterMessages.repositorySectionLabel,
              taxonomySectionLabel: filterMessages.tagsLabel,
              displaySectionLabel: filterMessages.itemsPerPageLabel,
              searchLabel: filterMessages.searchLabel,
              searchPlaceholder: filterMessages.searchPlaceholder,
              repositoryLabel: filterMessages.repositoryLabel,
              repositoryPlaceholder: filterMessages.repositoryPlaceholder,
              allRepositories: filterMessages.allRepositories,
              regionLabel: filterMessages.regionLabel,
              regionPlaceholder: filterMessages.regionPlaceholder,
              allRegions: filterMessages.allRegions,
              countryLabel: filterMessages.countryLabel,
              countryPlaceholder: filterMessages.countryPlaceholder,
              allCountries: filterMessages.allCountries,
              workModeLabel: filterMessages.workModeLabel,
              workModePlaceholder: filterMessages.workModePlaceholder,
              stackLabel: filterMessages.stackLabel,
              stackPlaceholder: filterMessages.stackPlaceholder,
              seniorityLabel: filterMessages.seniorityLabel,
              seniorityPlaceholder: filterMessages.seniorityPlaceholder,
              otherTagsLabel: filterMessages.otherTagsLabel,
              otherTagsPlaceholder: filterMessages.otherTagsPlaceholder,
              tagsLabel: filterMessages.tagsLabel,
              tagsPlaceholder: filterMessages.tagsPlaceholder,
              noTagsSelected: filterMessages.noTagsSelected,
              authorLabel: filterMessages.authorLabel,
              authorPlaceholder: filterMessages.authorPlaceholder,
              noAuthorsSelected: filterMessages.noAuthorsSelected,
              itemsPerPageLabel: filterMessages.itemsPerPageLabel,
              itemsPerPagePlaceholder: filterMessages.itemsPerPagePlaceholder,
              itemsPerPageOption: filterMessages.itemsPerPageOption,
              sortLabel: filterMessages.sortLabel,
              sortPlaceholder: filterMessages.sortPlaceholder,
              sortRecent: filterMessages.sortRecent,
              sortOldest: filterMessages.sortOldest,
            }}
            tagPickerVersion={tagPickerVersion}
            authorPickerVersion={authorPickerVersion}
            onTagSelected={handleTagSelected}
            onAuthorSelected={handleAuthorSelected}
          />
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t-2 border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <Button type="button" variant="ghost" onClick={onClearFilters} disabled={activeFiltersCount === 0}>
            {filterMessages.reset}
          </Button>
          <Button type="button" onClick={() => onOpenChange(false)}>
            {filterMessages.show} · {resultCount}
          </Button>
        </footer>
      </div>
    </dialog>
  );
}
