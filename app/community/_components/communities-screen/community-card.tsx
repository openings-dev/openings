"use client";

import { MapPin, Rows3, Building2 } from "lucide-react";
import { DirectoryEntityCard } from "@/app/_components/directory";
import { buildCommunityPath } from "@/lib/opportunities/routing";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import type { CommunitySummary } from "@/lib/opportunities/communities";

interface CommunityCardProps {
  item: CommunitySummary;
  locale: string;
  listMessages: {
    repositoryLabel: string;
    countryLabel: string;
    regionLabel: string;
    opportunitiesCount: string;
    openCommunity: string;
  };
}

export function CommunityCard({ item, locale, listMessages }: CommunityCardProps) {
  const communityInitial = item.name.trim().charAt(0).toUpperCase() || "#";
  const details = [
    {
      icon: Building2,
      label: listMessages.repositoryLabel,
      value: item.repository,
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
      href={buildCommunityPath(item.repository)}
      avatarUrl={item.avatarUrl}
      avatarAlt={item.name}
      avatarFallback={communityInitial}
      title={item.name}
      subtitle={item.repository}
      details={details}
      opportunitiesLabel={formatTemplate(listMessages.opportunitiesCount, {
        count: item.opportunitiesCount.toLocaleString(locale),
      })}
      actionLabel={listMessages.openCommunity}
    />
  );
}
