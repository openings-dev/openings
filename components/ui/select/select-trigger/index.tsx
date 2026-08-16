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
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
