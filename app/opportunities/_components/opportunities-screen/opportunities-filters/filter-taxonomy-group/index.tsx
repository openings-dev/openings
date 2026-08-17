import { Field } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { LockKeyhole } from "lucide-react";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import {
  classifyOpportunityTag,
  OpportunityTagCategory,
} from "@/app/opportunities/_components/opportunities-screen/controller/tag-categories";
import type {
  OpportunityFilterOptions,
  OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { FilterSection } from "../filter-section";
import { SelectedChipList } from "../selected-chip-list";
import { TagCategoryPicker } from "./tag-category-picker";

interface FilterTaxonomyGroupProps {
  locale: string;
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  labels: {
    section: string;
    workModeLabel: string;
    workModePlaceholder: string;
    seniorityLabel: string;
    seniorityPlaceholder: string;
    otherTagsLabel: string;
    otherTagsPlaceholder: string;
    noTagsSelected: string;
    authors: string;
    authorPlaceholder: string;
    noAuthorsSelected: string;
    removeFilter: string;
  };
  portalContainer?: HTMLElement | null;
  authorsLocked?: boolean;
  onTagSelected: (tag: string) => void;
  onToggleTag: (tag: string) => void;
  onAuthorSelected: (author: string) => void;
  onToggleAuthor: (author: string) => void;
}

export function FilterTaxonomyGroup({
  locale,
  state,
  options,
  labels,
  portalContainer,
  authorsLocked,
  onTagSelected,
  onToggleTag,
  onAuthorSelected,
  onToggleAuthor,
}: FilterTaxonomyGroupProps): React.ReactNode {
  const selectedTags = state.tags
    .filter(
      (tag) =>
        classifyOpportunityTag(tag).category !== OpportunityTagCategory.Stack,
    )
    .map((tag) => ({
      key: tag,
      label: options.tags.find((option) => option.value === tag)?.label ?? tag,
    }));
  const selectedAuthors = state.authors.map((author) => ({
    key: author,
    label:
      options.authors.find((option) => option.value === author)?.label ?? author,
  }));

  return (
    <FilterSection label={labels.section}>
      <div className="grid grid-cols-1 gap-4">
        <TagCategoryPicker
          locale={locale}
          controlId="advanced-work-model-filter"
          label={labels.workModeLabel}
          placeholder={labels.workModePlaceholder}
          options={options.tagCategories.workModel}
          portalContainer={portalContainer}
          onSelect={onTagSelected}
        />
        <TagCategoryPicker
          locale={locale}
          controlId="advanced-seniority-filter"
          label={labels.seniorityLabel}
          placeholder={labels.seniorityPlaceholder}
          options={options.tagCategories.seniority}
          portalContainer={portalContainer}
          onSelect={onTagSelected}
        />
        <TagCategoryPicker
          locale={locale}
          controlId="advanced-other-tags-filter"
          label={labels.otherTagsLabel}
          placeholder={labels.otherTagsPlaceholder}
          options={options.tagCategories.other}
          portalContainer={portalContainer}
          onSelect={onTagSelected}
        />
        <SelectedChipList
          items={selectedTags}
          emptyLabel={labels.noTagsSelected}
          removeLabel={labels.removeFilter}
          onRemove={onToggleTag}
          fallbackFocusId="advanced-work-model-filter"
        />

        <div className="grid gap-1.5 border-t border-line pt-4">
          {authorsLocked ? (
            <Field label={labels.authors}>
              <div className="flex min-h-11 items-center">
                {selectedAuthors.length > 0 ? (
                  selectedAuthors.map((author) => (
                    <Badge key={author.key} tone="primary" className="min-h-11 px-3">
                      <LockKeyhole aria-hidden="true" />
                      @{author.key}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {labels.noAuthorsSelected}
                  </span>
                )}
              </div>
            </Field>
          ) : (
            <>
              <Field label={labels.authors} controlId="advanced-author-filter">
                {(controlProps) => (
                  <Select
                    value=""
                    onValueChange={onAuthorSelected}
                  >
                    <SelectTrigger {...controlProps}>
                      <SelectValue placeholder={labels.authorPlaceholder} />
                    </SelectTrigger>
                    <SelectContent portalContainer={portalContainer ?? undefined}>
                      {options.authors.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} ({option.count.toLocaleString(locale)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
              <SelectedChipList
                items={selectedAuthors}
                emptyLabel={labels.noAuthorsSelected}
                removeLabel={labels.removeFilter}
                onRemove={onToggleAuthor}
                fallbackFocusId="advanced-author-filter"
              />
            </>
          )}
        </div>
      </div>
    </FilterSection>
  );
}
