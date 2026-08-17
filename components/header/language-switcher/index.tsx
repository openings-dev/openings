"use client";

import * as React from "react";
import { toast } from "sonner";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import type { LanguageSwitcherProps } from "../types";

export function LanguageSwitcher({
  className,
  portalContainer,
  locale,
  locales,
  placeholder,
  ariaLabel,
  changedTemplate,
  announceChange = true,
  feedbackMode = "toast",
  onLocaleChange,
}: LanguageSwitcherProps): React.ReactNode {
  const [inlineAnnouncement, setInlineAnnouncement] = React.useState("");

  const handleValueChange = (value: string) => {
    const nextLocale = locales.find((entry) => entry.code === value);
    if (!nextLocale) {
      return;
    }

    onLocaleChange(nextLocale.code);

    if (announceChange) {
      const announcement = changedTemplate.replace(
        "{language}",
        nextLocale.nativeLabel,
      );

      if (feedbackMode === "inline") {
        setInlineAnnouncement(announcement);
      } else {
        toast.success(nextLocale.nativeLabel, {
          description: announcement,
          duration: 1600,
        });
      }
    }
  };

  return (
    <div className={className}>
      <Select value={locale} onValueChange={handleValueChange}>
        <SelectTrigger
          aria-label={ariaLabel}
          className="min-w-[8.5rem] gap-1.5 bg-transparent px-2.5 font-medium hover:bg-surface-muted"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className="min-w-[150px]"
          align="end"
          portalContainer={portalContainer}
        >
          {locales.map((entry) => (
            <SelectItem key={entry.code} value={entry.code}>
              <span lang={entry.code} className="text-[13px] font-medium">
                {entry.nativeLabel}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {feedbackMode === "inline" ? (
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {inlineAnnouncement}
        </p>
      ) : null}
    </div>
  );
}
