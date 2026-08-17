"use client";

import * as React from "react";
import { X } from "lucide-react";
import { badgeVariants } from "@/components/ui/badge/constants";
import { formatTemplate } from "@/lib/utils/format-template";
import { cn } from "@/lib/utils/tailwind";

interface SelectedChipListProps {
  items: Array<{ key: string; label: string }>;
  emptyLabel: string;
  removeLabel: string;
  onRemove: (value: string) => void;
  fallbackFocusId: string;
}

export function SelectedChipList({
  items,
  emptyLabel,
  removeLabel,
  onRemove,
  fallbackFocusId,
}: SelectedChipListProps): React.ReactNode {
  const moveFocusAfterRemoval = React.useCallback(
    (fallbackTarget: HTMLElement | null) => {
      window.requestAnimationFrame(() => {
        if (fallbackTarget?.isConnected) {
          fallbackTarget.focus();
          return;
        }

        document.getElementById(fallbackFocusId)?.focus();
      });
    },
    [fallbackFocusId],
  );

  return (
    <div className="flex min-h-5 flex-wrap gap-1.5 pt-0.5">
      {items.length === 0 ? (
        <span className="text-xs text-muted-foreground">{emptyLabel}</span>
      ) : (
        items.map((item, index) => (
          <button
            key={item.key}
            type="button"
            className={cn(
              badgeVariants({ tone: "primary" }),
              "min-h-11 cursor-pointer touch-manipulation px-3 transition-colors hover:border-primary/40 hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label={formatTemplate(removeLabel, { label: item.label })}
            onClick={(event) => {
              const container = event.currentTarget.parentElement;
              const buttons = container
                ? Array.from(container.querySelectorAll<HTMLButtonElement>("button"))
                : [];
              const fallbackTarget = buttons[index + 1] ?? buttons[index - 1] ?? null;
              onRemove(item.key);
              moveFocusAfterRemoval(fallbackTarget);
            }}
          >
            {item.label}
            <X aria-hidden="true" />
          </button>
        ))
      )}
    </div>
  );
}
