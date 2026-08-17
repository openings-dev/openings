import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";

interface TagCategoryPickerProps {
  locale: string;
  controlId: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
  portalContainer?: HTMLElement | null;
  onSelect: (value: string) => void;
}

export function TagCategoryPicker({
  locale,
  controlId,
  label,
  placeholder,
  options,
  portalContainer,
  onSelect,
}: TagCategoryPickerProps): React.ReactNode {
  return (
    <Field label={label} controlId={controlId}>
      {(controlProps) => (
        <Select
          value=""
          onValueChange={onSelect}
          disabled={options.length === 0}
        >
          <SelectTrigger {...controlProps}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent portalContainer={portalContainer ?? undefined}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count.toLocaleString(locale)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
}
