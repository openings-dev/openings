"use client";

import { ArrowDownUp } from "lucide-react";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { cn } from "@/lib/utils/tailwind";
import {
  compactSelectTriggerStyles,
  controlBarStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";
import { formatTemplate } from "@/lib/utils/format-template";
import {
  OpportunitySortOrder,
  type OpportunitiesToolbarProps,
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
    <div className={controlBarStyles}>
      <p className="font-tabular text-sm font-semibold text-foreground">
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
                compactSelectTriggerStyles,
                "h-8 min-w-28 border-none bg-transparent px-1 text-xs shadow-none hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
              )}
            >
              <SelectValue placeholder={toolbarMessages.sortPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={OpportunitySortOrder.Recent}>{toolbarMessages.sortRecent}</SelectItem>
              <SelectItem value={OpportunitySortOrder.Oldest}>{toolbarMessages.sortOldest}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="h-4 w-px bg-border/60" aria-hidden />

        <ViewModeToggle value={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
}
