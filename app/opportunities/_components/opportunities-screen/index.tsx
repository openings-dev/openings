"use client";

import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { opportunitiesScreenStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { OpportunitiesScreenContent } from "@/app/opportunities/_components/opportunities-screen/opportunities-screen-content";
import { OpportunitiesScreenHeader } from "@/app/opportunities/_components/opportunities-screen/opportunities-screen-header";
import { useOpportunitiesScreenController } from "@/app/opportunities/_components/opportunities-screen/controller/use-opportunities-screen-controller";
import type { OpportunitiesScreenProps } from "@/app/opportunities/_components/opportunities-screen/types";

export function OpportunitiesScreen(props: OpportunitiesScreenProps): React.ReactNode {
  const controller = useOpportunitiesScreenController(props);
  const { messages } = useI18n();

  return (
    <section className={opportunitiesScreenStyles}>
      <OpportunitiesScreenHeader
        kicker={controller.headerKicker}
        title={controller.headerTitle}
        description={controller.headerDescription}
        profile={controller.profileHeader}
        opportunitiesLabel={messages.opportunities.header.opportunitiesLabel}
        locationLabel={messages.opportunities.header.locationLabel}
        lastPostLabel={messages.opportunities.header.lastPostLabel}
      />
      <OpportunitiesScreenContent controller={controller} />
    </section>
  );
}
