"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils/tailwind";

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>): React.ReactNode {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group/select flex h-[2.875rem] min-h-[2.875rem] w-full min-w-0 touch-manipulation items-center justify-between gap-2 rounded-control border border-control bg-surface px-3 text-sm font-normal text-foreground transition-[background-color,border-color,box-shadow] duration-200 hover:bg-surface-muted focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive data-[placeholder]:text-muted-foreground data-[state=open]:border-primary data-[state=open]:bg-primary-soft [&>[data-slot='select-value']]:min-w-0 [&>[data-slot='select-value']]:truncate [&>[data-slot='select-value']]:text-left [&>[data-slot='select-value']]:whitespace-nowrap [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          className="size-4 transition-transform duration-200 group-data-[state=open]/select:rotate-180"
          aria-hidden="true"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
