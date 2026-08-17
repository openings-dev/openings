"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { DirectoryEntityCard } from "@/app/_components/directory/directory-entity-card";
import { buildUserPath } from "@/lib/opportunities/routing";
import {
  formatLocationSegments,
  validDateToMs,
} from "@/lib/opportunities/summary-helpers";
import { formatTemplate } from "@/lib/utils/format-template";
import type { UserCardProps } from "../types";

export function UserCard({
  item,
  locale,
  listMessages,
}: UserCardProps): React.ReactNode {
  const avatarFallback = item.name.trim().charAt(0).toUpperCase() || "@";
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
      href={buildUserPath(item.handle)}
      avatarUrl={item.avatarUrl}
      avatarFallback={avatarFallback}
      title={item.name}
      subtitle={`@${item.handle}`}
      details={details}
      opportunitiesLabel={opportunitiesLabel}
      actionLabel={listMessages.openPublisher}
    />
  );
}
