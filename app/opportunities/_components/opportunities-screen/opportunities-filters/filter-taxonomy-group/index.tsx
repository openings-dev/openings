import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import { compactSelectTriggerStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { FilterSection } from "../filter-section";
import { SelectedChipList } from "../selected-chip-list";
import { TagCategoryPicker } from "./tag-category-picker";
import type { OpportunityFilterOptions, OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterTaxonomyGroupProps {
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  tagPickerVersion: number;
  authorPickerVersion: number;
  labels: {
    section: string;
    workModeLabel: string;
    workModePlaceholder: string;
    stackLabel: string;
    stackPlaceholder: string;
    seniorityLabel: string;
    seniorityPlaceholder: string;
    otherTagsLabel: string;
    otherTagsPlaceholder: string;
    noTagsSelected: string;
    authors: string;
    authorPlaceholder: string;
    noAuthorsSelected: string;
  };
  onTagSelected: (tag: string) => void;
  onToggleTag: (tag: string) => void;
  onAuthorSelected: (author: string) => void;
  onToggleAuthor: (author: string) => void;
}

export function FilterTaxonomyGroup({
  state,
  options,
  tagPickerVersion,
  authorPickerVersion,
  labels,
  onTagSelected,
  onToggleTag,
  onAuthorSelected,
  onToggleAuthor,
}: FilterTaxonomyGroupProps) {
  const selectedTags = state.tags.map((tag) => ({
    key: tag,
    label: options.tags.find((option) => option.value === tag)?.label ?? tag,
  }));

  const selectedAuthors = state.authors.map((author) => ({
    key: author,
    label: options.authors.find((option) => option.value === author)?.label ?? author,
  }));

  return (
    <FilterSection label={labels.section}>
      <div className="grid grid-cols-1 gap-3">
        <TagCategoryPicker
          selectKey={`work-model-${tagPickerVersion}`}
          label={labels.workModeLabel}
          placeholder={labels.workModePlaceholder}
          options={options.tagCategories.workModel}
          onSelect={onTagSelected}
        />
        <TagCategoryPicker
          selectKey={`stack-${tagPickerVersion}`}
          label={labels.stackLabel}
          placeholder={labels.stackPlaceholder}
          options={options.tagCategories.stack}
          onSelect={onTagSelected}
        />
        <TagCategoryPicker
          selectKey={`seniority-${tagPickerVersion}`}
          label={labels.seniorityLabel}
          placeholder={labels.seniorityPlaceholder}
          options={options.tagCategories.seniority}
          onSelect={onTagSelected}
        />
        <TagCategoryPicker
          selectKey={`other-tags-${tagPickerVersion}`}
          label={labels.otherTagsLabel}
          placeholder={labels.otherTagsPlaceholder}
          options={options.tagCategories.other}
          onSelect={onTagSelected}
        />
        <SelectedChipList
          items={selectedTags}
          emptyLabel={labels.noTagsSelected}
          onRemove={onToggleTag}
        />

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground/85">{labels.authors}</p>
          <Select key={authorPickerVersion} onValueChange={onAuthorSelected}>
            <SelectTrigger className={compactSelectTriggerStyles}>
              <SelectValue placeholder={labels.authorPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {options.authors.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SelectedChipList
            items={selectedAuthors}
            emptyLabel={labels.noAuthorsSelected}
            onRemove={onToggleAuthor}
          />
        </div>
      </div>
    </FilterSection>
  );
}
