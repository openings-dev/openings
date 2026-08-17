import {
  ArrowRight,
  CircleDot,
  Code2,
  ExternalLink,
  FolderGit2,
  ListFilter,
  MapPin,
  Search,
} from "lucide-react";
import type { OpportunityNetworkProps } from "./types";

export function OpportunityNetwork({
  labels,
}: OpportunityNetworkProps): React.ReactNode {
  return (
    <figure
      className="relative isolate min-h-[12.5rem] overflow-hidden rounded-editorial border border-line bg-surface p-3 shadow-floating-sm sm:min-h-[22rem] sm:p-6 lg:min-h-[23rem]"
      aria-label={labels.ariaLabel}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-lavender/70"
        aria-hidden="true"
      />

      <div className="flex h-full flex-col justify-center gap-2 sm:gap-4">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
          <div className="min-w-0 rounded-card border border-line bg-paper p-2.5 sm:p-4">
            <FolderGit2
              className="mb-1.5 size-4 text-primary-deep sm:mb-3 sm:size-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <p className="text-label font-semibold text-foreground">
              {labels.repository}
            </p>
            <div className="mt-2 hidden items-center gap-1.5 text-metadata text-muted-foreground sm:flex">
              <Code2 className="size-3.5" aria-hidden="true" />
              <span>{labels.stack}</span>
            </div>
          </div>

          <ArrowRight
            className="size-4 text-primary-deep sm:size-5"
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <div className="min-w-0 rounded-card border border-line bg-paper p-2.5 sm:p-4">
            <CircleDot
              className="mb-1.5 size-4 text-primary-deep sm:mb-3 sm:size-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <p className="text-label font-semibold text-foreground">
              {labels.publicIssue}
            </p>
            <div className="mt-2 hidden items-center gap-1.5 text-metadata text-muted-foreground sm:flex">
              <MapPin className="size-3.5" aria-hidden="true" />
              <span>{labels.location}</span>
            </div>
          </div>
        </div>

        <div className="flex min-h-11 items-center justify-center gap-2 rounded-control border border-primary/20 bg-primary-soft px-3 text-center text-label font-semibold text-primary-deep">
          <ListFilter className="size-4 shrink-0" aria-hidden="true" />
          <span>{labels.indexedForSearch}</span>
        </div>

        <div className="rounded-card border border-positive-foreground/20 bg-positive p-2.5 text-positive-foreground sm:p-4">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface/70 sm:size-9">
              <Search className="size-4" strokeWidth={1.9} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-5">
                {labels.opportunity}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-metadata font-medium opacity-80">
                <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{labels.originalSource}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
