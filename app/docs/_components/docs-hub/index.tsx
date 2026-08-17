"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Braces,
  ExternalLink,
  GitPullRequest,
  LifeBuoy,
  Palette,
  ScrollText,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { EXTERNAL_ROUTES, PUBLIC_ROUTES } from "@/lib/navigation/routes";
import {
  DocsHubGroupId,
  type DocsHubGroupDefinition,
} from "./types";

const DOCS_GROUPS = Object.freeze<readonly DocsHubGroupDefinition[]>([
  {
    id: DocsHubGroupId.StartHere,
    titleKey: "startHere",
    resources: [
      {
        key: "overview",
        href: PUBLIC_ROUTES.overview,
        icon: BookOpenText,
      },
    ],
  },
  {
    id: DocsHubGroupId.Integration,
    titleKey: "integration",
    resources: [
      {
        key: "apiReference",
        href: PUBLIC_ROUTES.apiReference,
        icon: Braces,
      },
      {
        key: "communityGuide",
        href: PUBLIC_ROUTES.communityGuide,
        icon: UsersRound,
      },
      {
        key: "contributing",
        href: PUBLIC_ROUTES.contributing,
        icon: GitPullRequest,
      },
    ],
  },
  {
    id: DocsHubGroupId.Product,
    titleKey: "product",
    resources: [
      {
        key: "designSystem",
        href: PUBLIC_ROUTES.design,
        icon: Palette,
      },
      {
        key: "support",
        href: EXTERNAL_ROUTES.support,
        icon: LifeBuoy,
        external: true,
      },
      {
        key: "privacy",
        href: PUBLIC_ROUTES.privacy,
        icon: ShieldCheck,
      },
      {
        key: "terms",
        href: PUBLIC_ROUTES.terms,
        icon: ScrollText,
      },
    ],
  },
]);

export function DocsHub(): React.ReactNode {
  const { messages } = useI18n();
  const copy = messages.docsHub;

  return (
    <article className="mx-auto w-full max-w-[90rem] px-4 pb-12 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-16 xl:px-10">
      <header className="grid gap-8 border-b border-line pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
        <div className="min-w-0 lg:col-span-9">
          <p className="text-label font-semibold text-primary-deep">
            {copy.eyebrow}
          </p>
          <h1 className="font-display mt-3 max-w-5xl text-page-title font-semibold tracking-[-0.045em] text-foreground">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-marketing-body text-muted-foreground">
            {copy.description}
          </p>
        </div>
        <div className="hidden justify-self-end font-mono text-technical text-muted-foreground lg:block">
          /docs
        </div>
      </header>

      <nav className="divide-y divide-line" aria-label={copy.navigationLabel}>
        {DOCS_GROUPS.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`docs-group-${group.id}`}
            className="grid gap-5 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
          >
            <h2
              id={`docs-group-${group.id}`}
              className="font-display text-section-title font-semibold tracking-[-0.03em] text-foreground lg:col-span-3"
            >
              {copy.groups[group.titleKey]}
            </h2>
            <ul className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-span-9">
              {group.resources.map((resource) => {
                const resourceCopy = copy.resources[resource.key];
                const Icon = resource.icon;
                const DirectionIcon = resource.external ? ExternalLink : ArrowRight;
                const content = (
                  <>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-primary-soft text-primary-deep">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-card-title font-semibold tracking-[-0.02em] text-foreground">
                        {resourceCopy.title}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                        {resourceCopy.description}
                      </span>
                    </span>
                    <DirectionIcon
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </>
                );
                const className =
                  "group flex min-h-36 min-w-0 items-start gap-4 rounded-card border border-line bg-paper p-5 transition-colors duration-150 hover:border-control-border hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus motion-reduce:transition-none";

                return (
                  <li key={resource.key} className="min-w-0">
                    {resource.external ? (
                      <a className={className} href={resource.href}>
                        {content}
                      </a>
                    ) : (
                      <Link className={className} href={resource.href}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </article>
  );
}
