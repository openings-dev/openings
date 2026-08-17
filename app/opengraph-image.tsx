import {
  createSocialCardImage,
  SOCIAL_CARD_CONTENT_TYPE,
  SOCIAL_CARD_SIZE,
} from "@/lib/metadata/social-card";

export const alt = "openings.dev — Tech jobs shared through public GitHub communities";
export const size = SOCIAL_CARD_SIZE;
export const contentType = SOCIAL_CARD_CONTENT_TYPE;
export const dynamic = "force-static";

export default function OpenGraphImage(): ReturnType<typeof createSocialCardImage> {
  return createSocialCardImage({
    eyebrow: "Open source · Public listings",
    title: "Tech jobs shared through public GitHub communities.",
    description:
      "Search here, review the details, then open the original public listing for current information.",
    facts: [
      { label: "Discovery", value: "Search and filter" },
      { label: "Provenance", value: "Original public source" },
    ],
    actionLabel: "Browse current jobs",
  });
}
