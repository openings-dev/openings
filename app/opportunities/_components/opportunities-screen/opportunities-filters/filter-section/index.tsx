import type { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind";

interface FilterSectionProps {
  label: string;
  className?: string;
  children: ReactNode;
}

export function FilterSection({ label, className, children }: FilterSectionProps): React.ReactNode {
  return (
    <section className={cn("space-y-2.5 rounded-lg border-2 border-border bg-surface p-4", className)}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-foreground/72">
        {label}
      </p>
      {children}
    </section>
  );
}
