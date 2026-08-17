import type { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind";

interface FilterSectionProps {
  label: string;
  className?: string;
  children: ReactNode;
}

export function FilterSection({ label, className, children }: FilterSectionProps): React.ReactNode {
  return (
    <section
      className={cn(
        "min-w-0 space-y-3 border-t border-line pt-5 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0",
        className,
      )}
    >
      <h3 className="text-label font-semibold text-foreground">
        {label}
      </h3>
      {children}
    </section>
  );
}
