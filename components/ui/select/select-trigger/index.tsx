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
        "flex h-10 w-full touch-manipulation items-center justify-between gap-2 rounded-lg border-2 border-border bg-surface-elevated px-3 text-sm font-medium text-foreground shadow-soft-sm transition-[background-color,box-shadow,transform] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-surface hover:shadow-soft-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-45 data-[placeholder]:text-subtle-foreground data-[state=open]:bg-accent [&_svg:not([class*='text-'])]:text-subtle-foreground [&_svg]:shrink-0",
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
