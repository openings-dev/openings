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
        "flex h-10 w-full touch-manipulation items-center justify-between gap-2 rounded-lg border border-border/90 bg-surface-elevated px-3 text-sm text-foreground shadow-soft-sm transition-[border-color,background-color,box-shadow] hover:border-input hover:bg-surface focus:outline-none focus:ring-2 focus:ring-ring/70 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-45 data-[placeholder]:text-subtle-foreground data-[state=open]:border-ring/55 data-[state=open]:shadow-soft-md [&_svg:not([class*='text-'])]:text-subtle-foreground [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
