"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";

interface StackMultiSelectProps {
  applyLabel: string;
  clearLabel: string;
  disabled?: boolean;
  locale: string;
  options: FilterOption[];
  placeholder: string;
  selectedCountLabel: string;
  selectedValues: string[];
  triggerId: string;
  onApply: (values: string[]) => void;
}

export function StackMultiSelect({
  applyLabel,
  clearLabel,
  disabled,
  locale,
  options,
  placeholder,
  selectedCountLabel,
  selectedValues,
  triggerId,
  onApply,
}: StackMultiSelectProps): React.ReactNode {
  const detailsRef = React.useRef<HTMLDetailsElement>(null);
  const [draftValues, setDraftValues] = React.useState(selectedValues);
  const selectedSet = React.useMemo(() => new Set(selectedValues), [selectedValues]);
  const draftSet = React.useMemo(() => new Set(draftValues), [draftValues]);
  const selectedLabels = options
    .filter((option) => selectedSet.has(option.value))
    .map((option) => option.label);
  const triggerLabel = selectedLabels.length === 0
    ? placeholder
    : selectedLabels.length <= 2
      ? selectedLabels.join(", ")
      : selectedCountLabel;

  function handleToggle(event: React.SyntheticEvent<HTMLDetailsElement>): void {
    if (event.currentTarget.open) setDraftValues(selectedValues);
  }

  function toggleValue(value: string): void {
    setDraftValues((current) =>
      current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value],
    );
  }

  function applySelection(): void {
    onApply(draftValues);
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <details ref={detailsRef} className="group relative" onToggle={handleToggle}>
      <summary
        id={triggerId}
        aria-disabled={disabled || undefined}
        onClick={(event) => {
          if (disabled) event.preventDefault();
        }}
        className={cn(
          "flex h-[2.875rem] min-h-[2.875rem] cursor-pointer list-none items-center justify-between gap-2 rounded-control border border-control bg-surface px-3 text-sm text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
          disabled && "pointer-events-none cursor-not-allowed bg-surface-muted opacity-50",
        )}
      >
        <span className={cn("truncate", selectedLabels.length === 0 && "text-muted-foreground")}>
          {triggerLabel}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>

      <div className="absolute right-0 top-[calc(100%+0.5rem)] z-40 w-[min(22rem,calc(100vw-2rem))] rounded-floating border border-line bg-surface-elevated p-2 shadow-floating-md">
        <div className="max-h-64 overflow-y-auto py-1">
          {options.map((option) => {
            const checked = draftSet.has(option.value);
            return (
              <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-control px-3 py-2 text-sm hover:bg-surface-muted">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleValue(option.value)}
                />
                <span className={cn("grid size-5 shrink-0 place-items-center rounded-[0.375rem] border", checked ? "border-primary-deep bg-primary text-primary-foreground" : "border-control bg-paper")} aria-hidden="true">
                  {checked ? <Check className="size-3.5" /> : null}
                </span>
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                <span className="font-mono text-xs text-muted-foreground">{option.count.toLocaleString(locale)}</span>
              </label>
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-line pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={() => setDraftValues([])} disabled={draftValues.length === 0}>
            {clearLabel}
          </Button>
          <Button type="button" size="sm" onClick={applySelection}>
            {applyLabel}
          </Button>
        </div>
      </div>
    </details>
  );
}
