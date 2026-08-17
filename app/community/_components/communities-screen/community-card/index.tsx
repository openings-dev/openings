"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { DirectoryEntityCard } from "@/app/_components/directory/directory-entity-card";
import { buildCommunityPath } from "@/lib/opportunities/routing";
import {
  formatLocationSegments,
  validDateToMs,
} from "@/lib/opportunities/summary-helpers";
import { formatTemplate } from "@/lib/utils/format-template";
import type { CommunityCardProps } from "../types";

export function CommunityCard({
  item,
  locale,
  listMessages,
}: CommunityCardProps): React.ReactNode {
  const communityInitial = item.name.trim().charAt(0).toUpperCase() || "#";
  const location = formatLocationSegments([item.region, item.country]);
  const activityMs = validDateToMs(item.lastPostedAt);
  const activityDate = activityMs === null ? null : new Date(activityMs);
  const details = [
    location
      ? {
          icon: MapPin,
          label: listMessages.locationLabel,
          value: location,
        }
      : null,
    activityDate
      ? {
          icon: CalendarDays,
          label: listMessages.latestActivityLabel,
          value: new Intl.DateTimeFormat(locale, {
            dateStyle: "medium",
            timeZone: "UTC",
          }).format(activityDate),
          dateTime: activityDate.toISOString(),
        }
      : null,
  ].filter((detail): detail is NonNullable<typeof detail> => detail !== null);
  const opportunitiesLabel =
    item.opportunitiesCount === 1
      ? listMessages.opportunityCountOne
      : formatTemplate(listMessages.opportunitiesCount, {
          count: item.opportunitiesCount.toLocaleString(locale),
        });

  return (
    <DirectoryEntityCard
      href={buildCommunityPath(item.repository)}
      avatarUrl={item.avatarUrl}
      avatarFallback={communityInitial}
      title={item.name}
      subtitle={item.repository}
      details={details}
      opportunitiesLabel={opportunitiesLabel}
      actionLabel={listMessages.openCommunity}
    />
  );
}
