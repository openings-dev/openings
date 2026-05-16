import type { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind";

interface FilterSectionProps {
  label: string;
  className?: string;
  children: ReactNode;
}

export function FilterSection({ label, className, children }: FilterSectionProps) {
  return (
    <section className={cn("space-y-2.5 border-t border-border/65 pt-4 first:border-t-0 first:pt-0", className)}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-foreground/72">
        {label}
      </p>
      {children}
    </section>
  );
}
