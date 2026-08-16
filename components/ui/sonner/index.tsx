"use client";

import { useTheme } from "@/components/providers/theme-provider/use-theme";
import { ResolvedTheme } from "@/components/providers/theme-provider/types";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps): React.ReactNode {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === ResolvedTheme.Dark ? "dark" : "light"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:rounded-xl group-[.toaster]:border-border/90 group-[.toaster]:bg-surface-elevated group-[.toaster]:text-foreground group-[.toaster]:shadow-soft-lg",
          title: "group-[.toast]:font-semibold",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:rounded-lg group-[.toast]:bg-primary group-[.toast]:font-semibold group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:rounded-lg group-[.toast]:bg-surface group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
