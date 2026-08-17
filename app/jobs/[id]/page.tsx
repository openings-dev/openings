import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpportunityDetails } from "@/app/opportunities/_components/opportunity-details";
import { OpportunityDetailsMode } from "@/app/opportunities/_components/opportunity-details/types";
import { createOpportunityMetadata } from "@/lib/metadata/opportunity-metadata";
import { resolvePublicSiteUrl } from "@/lib/metadata/site-metadata";
import { fetchOpportunityById } from "@/lib/opportunities/api";
import {
  buildCommunityPath,
  buildOpportunityPath,
  buildUserPath,
} from "@/lib/opportunities/routing";
import { listStaticOpportunityIds } from "@/lib/opportunities/static-api";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const ids = await listStaticOpportunityIds();
  return ids.map((id) => ({ id }));
}

const resolveOpportunity = cache(async (params: JobPageProps["params"]) => {
  const { id: encodedId } = await params;
  const id = decodeURIComponent(encodedId);
  return fetchOpportunityById(id);
});

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const item = await resolveOpportunity(params);
  if (!item) return {};
  return createOpportunityMetadata(item);
}

export default async function JobPage({
  params,
}: JobPageProps): Promise<React.ReactNode> {
  const item = await resolveOpportunity(params);
  if (!item) notFound();

  return (
    <OpportunityDetails
      item={item}
      mode={OpportunityDetailsMode.Page}
      shareUrl={resolvePublicSiteUrl(buildOpportunityPath(item.id))}
      communityHref={buildCommunityPath(item.repository)}
      authorHref={buildUserPath(item.author.handle)}
    />
  );
}
