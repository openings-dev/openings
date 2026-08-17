import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import type { FieldControlProps } from "@/components/ui/field/types";
import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterSelectProps extends FieldControlProps {
  locale: string;
  value: string;
  placeholder: string;
  allLabel?: string;
  options: FilterOption[];
  portalContainer?: HTMLElement | null;
  disabled?: boolean;
  onValueChange: (value: string) => void;
}

export function FilterSelect({
  locale,
  value,
  placeholder,
  allLabel,
  options,
  portalContainer,
  disabled,
  onValueChange,
  id,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        id={id}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired ?? required}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent portalContainer={portalContainer ?? undefined}>
        {allLabel ? <SelectItem value="all">{allLabel}</SelectItem> : null}
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label} ({option.count.toLocaleString(locale)})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
