import { cache } from "react";
import {
  createSocialCardImage,
  SOCIAL_CARD_CONTENT_TYPE,
  SOCIAL_CARD_SIZE,
} from "@/lib/metadata/social-card";
import { createOpportunitySocialCard } from "@/lib/metadata/social-card-presentations";
import { fetchOpportunityById } from "@/lib/opportunities/api";

interface JobSocialImageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-static";

const getOpportunity = cache(fetchOpportunityById);

async function resolveOpportunity(params: JobSocialImageProps["params"]) {
  const { id: encodedId } = await params;
  const id = decodeURIComponent(encodedId);
  const opportunity = await getOpportunity(id);

  if (!opportunity) {
    throw new Error(`Cannot generate a social card for unknown job ${id}.`);
  }

  return opportunity;
}

export async function generateImageMetadata({
  params,
}: JobSocialImageProps) {
  const opportunity = await resolveOpportunity(params);

  return [
    {
      id: "primary",
      alt: `${opportunity.title} — Open job on openings.dev`,
      size: SOCIAL_CARD_SIZE,
      contentType: SOCIAL_CARD_CONTENT_TYPE,
    },
  ];
}

export default async function JobSocialImage({
  params,
}: JobSocialImageProps): Promise<ReturnType<typeof createSocialCardImage>> {
  const opportunity = await resolveOpportunity(params);
  return createSocialCardImage(createOpportunitySocialCard(opportunity));
}
