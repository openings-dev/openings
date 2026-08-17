import { Suspense } from "react";
import { OpportunitiesScreen } from "@/app/opportunities/_components/opportunities-screen";
import { ProfileHero } from "@/app/opportunities/_components/opportunities-screen/profile-hero";
import { profileScreenPropsFromSource } from "@/app/opportunities/_components/opportunities-screen/controller/profile-summary";
import type { ShareableProfileSource } from "@/app/opportunities/_components/opportunities-screen/types";

interface OpportunitiesPageProps {
  profile?: ShareableProfileSource;
  showHeader?: boolean;
}

function OpportunitiesFallback(): React.ReactNode {
  return (
    <section id="opportunity-results" className="mx-auto w-full max-w-[90rem] scroll-mt-20 px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 xl:px-10 xl:pt-12">
      <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
        <div className="h-4 w-40 animate-pulse rounded-control bg-surface-muted" />
        <div className="mt-4 h-8 w-2/3 animate-pulse rounded-control bg-surface-muted/80" />
        <div className="mt-3 h-4 w-full animate-pulse rounded-control bg-surface-muted/70" />
      </div>
    </section>
  );
}

export function OpportunitiesPage({
  profile,
  showHeader = true,
}: OpportunitiesPageProps): React.ReactNode {
  const screenProps = profile
    ? profileScreenPropsFromSource(profile)
    : { showHeader };

  return (
    <>
      {profile ? <ProfileHero source={profile} /> : null}
      <Suspense fallback={<OpportunitiesFallback />}>
        <OpportunitiesScreen {...screenProps} />
      </Suspense>
    </>
  );
}
