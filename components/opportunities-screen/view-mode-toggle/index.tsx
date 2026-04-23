"use client";

import { LayoutGrid, Rows3 } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils/tailwind";
import {
  toggleGroupStyles,
  toggleItemStyles,
} from "@/components/opportunities-screen/styles";
import type { ViewModeToggleProps } from "@/components/opportunities-screen/types";

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  const { messages } = useI18n();
  const viewModeMessages = messages.opportunities.viewMode;

  return (
    <div
      className={toggleGroupStyles()}
      role="group"
      aria-label={viewModeMessages.ariaLabel}
    >
      <button
        type="button"
        className={cn(toggleItemStyles({ active: value === "list" }))}
        onClick={() => onChange("list")}
        aria-pressed={value === "list"}
      >
        <Rows3 className="size-4" />
        {viewModeMessages.list}
      </button>
      <button
        type="button"
        className={cn(toggleItemStyles({ active: value === "grid" }))}
        onClick={() => onChange("grid")}
        aria-pressed={value === "grid"}
      >
        <LayoutGrid className="size-4" />
        {viewModeMessages.grid}
      </button>
    </div>
  );
}
