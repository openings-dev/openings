import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";
import type { DocumentPageKey } from "../types";
import type { DocumentNavigationProps } from "./types";

const DOCUMENT_DESTINATIONS: ReadonlyArray<{
  key: DocumentPageKey;
  href: string;
}> = [
  { key: "overview", href: "/overview" },
  { key: "apiReference", href: "/docs/api" },
  { key: "maintainers", href: "/docs/maintainers" },
  { key: "contributing", href: "/docs/contributing" },
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
];

export function DocumentNavigation({
  currentDocument,
  ariaLabel,
  labels,
}: DocumentNavigationProps): React.ReactNode {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="space-y-1">
        {DOCUMENT_DESTINATIONS.map(({ key, href }) => {
          const active = key === currentDocument;
          return (
            <li key={key}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-h-11 min-w-0 items-center rounded-control px-3 text-sm transition-colors [overflow-wrap:anywhere] before:absolute before:bottom-2.5 before:left-0 before:top-2.5 before:w-0.5 before:rounded-pill before:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-primary-soft font-semibold text-primary-deep before:opacity-100"
                    : "text-muted-foreground before:opacity-0 hover:bg-surface-muted hover:text-foreground",
                )}
              >
                {labels[key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
