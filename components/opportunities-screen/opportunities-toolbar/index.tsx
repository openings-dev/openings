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
  panelStyles,
} from "@/components/opportunities-screen/styles";
import type {
  OpportunitiesToolbarProps,
  OpportunitySortOrder,
} from "@/components/opportunities-screen/types";
import { ViewModeToggle } from "@/components/opportunities-screen/view-mode-toggle";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function OpportunitiesToolbar({
  totalCount,
  rangeLabel,
  sortOrder,
  viewMode,
  currentPage,
  totalPages,
  onSortOrderChange,
  onViewModeChange,
}: OpportunitiesToolbarProps) {
  const { locale, messages } = useI18n();
  const toolbarMessages = messages.opportunities.toolbar;

  return (
    <section className={cn(panelStyles(), "flex flex-col gap-4")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            {formatTemplate(toolbarMessages.opportunitiesCount, {
              count: totalCount.toLocaleString(locale),
            })}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatTemplate(toolbarMessages.pageSummary, {
              range: rangeLabel,
              page: currentPage.toLocaleString(locale),
              totalPages: totalPages.toLocaleString(locale),
            })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-muted/35 px-2 py-1.5">
            <ArrowDownUp className="size-4 text-muted-foreground" />
            <Select
              value={sortOrder}
              onValueChange={(value) =>
                onSortOrderChange(value as OpportunitySortOrder)
              }
            >
              <SelectTrigger
                className={cn(
                  compactSelectTriggerStyles(),
                  "h-7 min-w-36 border-none bg-transparent px-1 text-xs shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
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

          <ViewModeToggle value={viewMode} onChange={onViewModeChange} />
        </div>
      </div>
    </section>
  );
}
