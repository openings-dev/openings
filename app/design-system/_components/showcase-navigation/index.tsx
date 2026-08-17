import { LocalizedCopy } from "../localized-copy";
import type { ShowcaseNavigationProps } from "./types";

export function ShowcaseNavigation({
  items,
}: ShowcaseNavigationProps): React.ReactNode {
  return (
    <nav
      className="sticky top-18 z-20 -mx-4 overflow-x-auto border-y border-line bg-background/95 px-4 py-2 [scrollbar-width:none] backdrop-blur-sm [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:overflow-visible sm:px-6 lg:mx-0 lg:rounded-control lg:border lg:bg-surface lg:px-2"
      aria-labelledby="design-system-navigation-label"
    >
      <span id="design-system-navigation-label" className="sr-only">
        <LocalizedCopy select={(messages) => messages.designSystem.navigationLabel} />
      </span>
      <ul className="flex min-w-max items-center gap-1 sm:grid sm:min-w-0 sm:grid-cols-4 xl:flex xl:flex-nowrap">
        {items.map((item) => (
          <li key={item.id} className="sm:min-w-0">
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-full sm:justify-center xl:w-auto"
            >
              <LocalizedCopy
                select={(messages) => messages.designSystem.sections[item.labelKey]}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
