"use client";

import { opportunitiesScreenStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { OpportunitiesScreenContent } from "@/app/opportunities/_components/opportunities-screen/opportunities-screen-content";
import { OpportunitiesScreenHeader } from "@/app/opportunities/_components/opportunities-screen/opportunities-screen-header";
import { useOpportunitiesScreenController } from "@/app/opportunities/_components/opportunities-screen/controller/use-opportunities-screen-controller";
import type { OpportunitiesScreenProps } from "@/app/opportunities/_components/opportunities-screen/types";

export function OpportunitiesScreen({
  showHeader = true,
  ...controllerProps
}: OpportunitiesScreenProps): React.ReactNode {
  const controller = useOpportunitiesScreenController(controllerProps);

  return (
    <section className={opportunitiesScreenStyles}>
      {showHeader ? (
        <OpportunitiesScreenHeader
          kicker={controller.headerKicker}
          title={controller.headerTitle}
          description={controller.headerDescription}
        />
      ) : null}
      <OpportunitiesScreenContent controller={controller} />
    </section>
  );
}
