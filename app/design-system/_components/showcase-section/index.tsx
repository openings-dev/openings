import { cn } from "@/lib/utils/tailwind";
import type { ShowcaseSectionProps } from "./types";

export function ShowcaseSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: ShowcaseSectionProps): React.ReactNode {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-28 border-t border-line py-12 sm:py-16", className)}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-12">
        <header className="max-w-xl">
          <p className="text-label font-semibold text-primary-deep">{eyebrow}</p>
          <h2
            id={`${id}-title`}
            className="font-display mt-2 text-section-title font-semibold tracking-[-0.035em] text-foreground"
          >
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {description}
          </p>
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
