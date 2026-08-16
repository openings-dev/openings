"use client";

import { LayoutGrid, Rows3 } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { cn } from "@/lib/utils/tailwind";
import {
  toggleGroupStyles,
  toggleItemStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";
import {
  OpportunityViewMode,
  type ViewModeToggleProps,
} from "@/app/opportunities/_components/opportunities-screen/types";

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps): React.ReactNode {
  const { messages } = useI18n();
  const viewModeMessages = messages.opportunities.viewMode;

  return (
    <div
      className={toggleGroupStyles}
      role="group"
      aria-label={viewModeMessages.ariaLabel}
    >
      <button
        type="button"
        className={cn(toggleItemStyles({ active: value === OpportunityViewMode.List }))}
        onClick={() => onChange(OpportunityViewMode.List)}
        aria-pressed={value === OpportunityViewMode.List}
      >
        <Rows3 className="size-4" />
        {viewModeMessages.list}
      </button>
      <button
        type="button"
        className={cn(toggleItemStyles({ active: value === OpportunityViewMode.Grid }))}
        onClick={() => onChange(OpportunityViewMode.Grid)}
        aria-pressed={value === OpportunityViewMode.Grid}
      >
        <LayoutGrid className="size-4" />
        {viewModeMessages.grid}
      </button>
    </div>
  );
}
