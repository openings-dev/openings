import { Suspense } from "react";
import { OpportunitiesScreen } from "@/app/opportunities/_components/opportunities-screen";
import type {
  CommunityProfileSummary,
  UserProfileSummary,
} from "@/app/opportunities/_components/opportunities-screen/types";

interface OpportunitiesPageProps {
  forcedRepository?: string;
  forcedAuthor?: string;
  forcedAuthorProfile?: UserProfileSummary | null;
  forcedRepositoryProfile?: CommunityProfileSummary | null;
}

function OpportunitiesFallback() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-[0_16px_40px_-30px_rgb(0_0_0/0.45)] backdrop-blur">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-8 w-2/3 animate-pulse rounded bg-muted/80" />
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted/70" />
      </div>
    </section>
  );
}

export function OpportunitiesPage({
  forcedRepository,
  forcedAuthor,
  forcedAuthorProfile,
  forcedRepositoryProfile,
}: OpportunitiesPageProps) {
  return (
    <Suspense fallback={<OpportunitiesFallback />}>
      <OpportunitiesScreen
        forcedRepository={forcedRepository}
        forcedAuthor={forcedAuthor}
        forcedAuthorProfile={forcedAuthorProfile}
        forcedRepositoryProfile={forcedRepositoryProfile}
      />
    </Suspense>
  );
}
