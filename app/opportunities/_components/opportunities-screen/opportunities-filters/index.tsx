"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { panelStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type { OpportunitiesFiltersProps } from "@/app/opportunities/_components/opportunities-screen/types";
import { FilterFields } from "./filter-fields";
import { FilterPanelHeader } from "./filter-panel-header";

export function OpportunitiesFilters(props: OpportunitiesFiltersProps) {
  const { messages } = useI18n();
  const filterMessages = messages.opportunities.filters;
  const { isExpanded, activeFiltersCount, onExpandedChange, onToggleTag, onToggleAuthor, onClearFilters } = props;
  const [tagPickerVersion, setTagPickerVersion] = React.useState(0);
  const [authorPickerVersion, setAuthorPickerVersion] = React.useState(0);

  const handleTagSelected = React.useCallback((tag: string) => {
    onToggleTag(tag);
    setTagPickerVersion((value) => value + 1);
  }, [onToggleTag]);

  const handleAuthorSelected = React.useCallback((authorHandle: string) => {
    onToggleAuthor(authorHandle);
    setAuthorPickerVersion((value) => value + 1);
  }, [onToggleAuthor]);

  return (
    <section className={panelStyles} aria-label={filterMessages.ariaLabel}>
      <FilterPanelHeader
        title={filterMessages.title}
        hideLabel={filterMessages.hide}
        showLabel={filterMessages.show}
        resetLabel={filterMessages.reset}
        activeFiltersCount={activeFiltersCount}
        expanded={isExpanded}
        onToggleExpanded={() => onExpandedChange(!isExpanded)}
        onReset={onClearFilters}
      />

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
              {...props}
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
