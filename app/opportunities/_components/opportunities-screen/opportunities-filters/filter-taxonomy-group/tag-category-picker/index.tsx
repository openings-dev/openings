import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import { compactSelectTriggerStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";

interface TagCategoryPickerProps {
  selectKey: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
  onSelect: (value: string) => void;
}

export function TagCategoryPicker({
  selectKey,
  label,
  placeholder,
  options,
  onSelect,
}: TagCategoryPickerProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground/85">{label}</p>
      <Select key={selectKey} onValueChange={onSelect} disabled={options.length === 0}>
        <SelectTrigger className={compactSelectTriggerStyles}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label} ({option.count})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
