import { Search } from "lucide-react";
import { cn } from "@/lib/utils/tailwind";
import { textInputStyles } from "@/app/opportunities/_components/opportunities-screen/styles";

interface FilterSearchProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function FilterSearch({
  label,
  placeholder,
  value,
  onChange,
}: FilterSearchProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="opportunity-search" className="text-xs font-medium text-muted-foreground/90">
        {label}
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/55" />
        <input
          id="opportunity-search"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={cn(textInputStyles, "h-10 pl-8")}
        />
      </div>
    </div>
  );
}
