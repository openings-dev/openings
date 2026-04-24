"use client";

import { ArrowDownUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils/tailwind";
import {
  compactSelectTriggerStyles,
  controlBarStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import type {
  OpportunitiesToolbarProps,
  OpportunitySortOrder,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { ViewModeToggle } from "@/app/opportunities/_components/opportunities-screen/view-mode-toggle";

export function OpportunitiesToolbar({
  totalCount,
  sortOrder,
  viewMode,
  onSortOrderChange,
  onViewModeChange,
}: OpportunitiesToolbarProps) {
  const { locale, messages } = useI18n();
  const toolbarMessages = messages.opportunities.toolbar;

  return (
    <div className={controlBarStyles()}>
      <p className="tabular-nums text-sm font-medium text-foreground">
        {formatTemplate(toolbarMessages.opportunitiesCount, {
          count: totalCount.toLocaleString(locale),
        })}
      </p>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <ArrowDownUp className="size-3.5 shrink-0" />
          <Select
            value={sortOrder}
            onValueChange={(value) =>
              onSortOrderChange(value as OpportunitySortOrder)
            }
          >
            <SelectTrigger
              className={cn(
                compactSelectTriggerStyles(),
                "h-7 min-w-28 border-none bg-transparent px-1 text-xs shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
              )}
            >
              <SelectValue placeholder={toolbarMessages.sortPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">{toolbarMessages.sortRecent}</SelectItem>
              <SelectItem value="oldest">{toolbarMessages.sortOldest}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="h-4 w-px bg-border/60" aria-hidden />

        <ViewModeToggle value={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
}
