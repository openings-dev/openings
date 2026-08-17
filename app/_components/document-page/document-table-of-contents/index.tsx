import { cn } from "@/lib/utils/tailwind";
import type { DocumentTableOfContentsProps } from "./types";

export function DocumentTableOfContents({
  headings,
  ariaLabel,
}: DocumentTableOfContentsProps): React.ReactNode {
  if (headings.length === 0) return null;

  return (
    <nav aria-label={ariaLabel}>
      <ol className="space-y-1 border-l border-line pl-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "flex min-h-11 min-w-0 items-center rounded-control py-2 pr-2 text-xs leading-5 text-muted-foreground transition-colors [overflow-wrap:anywhere] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                heading.level >= 3 && "pl-3",
                heading.level >= 4 && "pl-6",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
