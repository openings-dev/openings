"use client";

import type React from "react";
import { useTheme } from "@/components/providers/theme-provider/use-theme";
import { ResolvedTheme } from "@/components/providers/theme-provider/types";
import { cn } from "@/lib/utils/tailwind";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({
  className,
  style,
  toastOptions,
  ...props
}: ToasterProps): React.ReactNode {
  const { resolvedTheme } = useTheme();
  const classNames = toastOptions?.classNames;

  return (
    <Sonner
      theme={resolvedTheme === ResolvedTheme.Dark ? "dark" : "light"}
      className={cn("toaster group font-sans", className)}
      style={{
        fontFamily:
          'var(--font-figtree), "Figtree", ui-sans-serif, system-ui, sans-serif',
        ...style,
      }}
      toastOptions={{
        ...toastOptions,
        unstyled: true,
        classNames: {
          ...classNames,
          toast: cn(
            "group/toast toast flex w-[var(--width)] max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-floating border border-line bg-surface-elevated p-4 text-sm text-foreground shadow-floating-md [overflow-wrap:anywhere]",
            classNames?.toast,
          ),
          content: cn(
            "flex min-w-0 flex-1 flex-col gap-1",
            classNames?.content,
          ),
          icon: cn(
            "flex size-4 shrink-0 items-center justify-start [&>svg]:size-4",
            classNames?.icon,
          ),
          title: cn(
            "text-sm font-semibold leading-5",
            classNames?.title,
          ),
          description: cn(
            "text-sm leading-5 text-muted-foreground [overflow-wrap:anywhere] group-data-[type=error]/toast:text-destructive-soft-foreground group-data-[type=info]/toast:text-info-foreground group-data-[type=success]/toast:text-positive-foreground group-data-[type=warning]/toast:text-warning-foreground",
            classNames?.description,
          ),
          success: cn(
            "group-[.toaster]:border-positive-foreground/25 group-[.toaster]:bg-positive group-[.toaster]:text-positive-foreground",
            classNames?.success,
          ),
          error: cn(
            "group-[.toaster]:border-destructive-soft-foreground/25 group-[.toaster]:bg-destructive-soft group-[.toaster]:text-destructive-soft-foreground",
            classNames?.error,
          ),
          info: cn(
            "group-[.toaster]:border-info-foreground/25 group-[.toaster]:bg-info group-[.toaster]:text-info-foreground",
            classNames?.info,
          ),
          warning: cn(
            "group-[.toaster]:border-warning-foreground/25 group-[.toaster]:bg-warning group-[.toaster]:text-warning-foreground",
            classNames?.warning,
          ),
          actionButton: cn(
            "ms-auto min-h-11 shrink-0 rounded-pill border-0 bg-primary px-3 font-semibold text-primary-foreground",
            classNames?.actionButton,
          ),
          cancelButton: cn(
            "ms-auto min-h-11 shrink-0 rounded-control border border-line bg-surface px-3 font-medium text-muted-foreground",
            classNames?.cancelButton,
          ),
          closeButton: cn(
            "absolute start-0 top-0 z-10 flex size-6 -translate-x-[35%] -translate-y-[35%] cursor-pointer items-center justify-center rounded-full border border-line bg-surface-elevated p-0 text-muted-foreground shadow-floating-sm rtl:translate-x-[35%] group-data-[type=error]/toast:text-destructive-soft-foreground group-data-[type=info]/toast:text-info-foreground group-data-[type=success]/toast:text-positive-foreground group-data-[type=warning]/toast:text-warning-foreground",
            classNames?.closeButton,
          ),
        },
      }}
      {...props}
    />
  );
}
