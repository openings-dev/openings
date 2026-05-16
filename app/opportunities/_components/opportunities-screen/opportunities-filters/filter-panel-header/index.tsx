import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";

interface FilterPanelHeaderProps {
  title: string;
  hideLabel: string;
  showLabel: string;
  resetLabel: string;
  activeFiltersCount: number;
  expanded: boolean;
  onToggleExpanded: () => void;
  onReset: () => void;
}

export function FilterPanelHeader({
  title,
  hideLabel,
  showLabel,
  resetLabel,
  activeFiltersCount,
  expanded,
  onToggleExpanded,
  onReset,
}: FilterPanelHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="size-3.5 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {activeFiltersCount > 0 ? (
          <span className="inline-flex items-center rounded-full bg-primary/12 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-primary">
            {activeFiltersCount}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={onToggleExpanded}
          aria-expanded={expanded}
          aria-controls="opportunities-filters-content"
        >
          {expanded ? hideLabel : showLabel}
          <ChevronDown
            className={cn("size-3.5 transition-transform duration-200", expanded && "rotate-180")}
          />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={onReset}
        >
          <RotateCcw className="size-3" />
          {resetLabel}
        </Button>
      </div>
    </div>
  );
}
