"use client";

import { opportunitiesScreenStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { OpportunitiesScreenContent } from "@/app/opportunities/_components/opportunities-screen/opportunities-screen-content";
import { OpportunitiesScreenHeader } from "@/app/opportunities/_components/opportunities-screen/opportunities-screen-header";
import { useOpportunitiesScreenController } from "@/app/opportunities/_components/opportunities-screen/controller/use-opportunities-screen-controller";
import type { OpportunitiesScreenProps } from "@/app/opportunities/_components/opportunities-screen/types";

export function OpportunitiesScreen(props: OpportunitiesScreenProps) {
  const controller = useOpportunitiesScreenController(props);

  return (
    <section className={opportunitiesScreenStyles}>
      <OpportunitiesScreenHeader
        kicker={controller.headerKicker}
        title={controller.headerTitle}
        description={controller.headerDescription}
        profile={controller.profileHeader}
      />
      <OpportunitiesScreenContent controller={controller} />
    </section>
  );
}
