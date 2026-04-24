"use client";

import { MapPin, Rows3, User } from "lucide-react";
import { DirectoryEntityCard } from "@/app/_components/directory";
import { buildUserPath } from "@/lib/opportunities/routing";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import type { UserSummary } from "@/lib/opportunities/users";

interface UserCardProps {
  item: UserSummary;
  locale: string;
  listMessages: {
    handleLabel: string;
    countryLabel: string;
    regionLabel: string;
    opportunitiesCount: string;
    openUser: string;
  };
}

export function UserCard({ item, locale, listMessages }: UserCardProps) {
  const avatarFallback = item.name.trim().charAt(0).toUpperCase() || "@";
  const details = [
    {
      icon: User,
      label: listMessages.handleLabel,
      value: `@${item.handle}`,
    },
    {
      icon: MapPin,
      label: listMessages.countryLabel,
      value: item.country,
    },
    {
      icon: Rows3,
      label: listMessages.regionLabel,
      value: item.region,
    },
  ];

  return (
    <DirectoryEntityCard
      href={buildUserPath(item.handle)}
      avatarUrl={item.avatarUrl}
      avatarAlt={item.name}
      avatarFallback={avatarFallback}
      title={item.name}
      subtitle={`@${item.handle}`}
      details={details}
      opportunitiesLabel={formatTemplate(listMessages.opportunitiesCount, {
        count: item.opportunitiesCount.toLocaleString(locale),
      })}
      actionLabel={listMessages.openUser}
    />
  );
}
