import type { Metadata } from "next";

export const SITE_NAME = "openings.dev";
export const SITE_ORIGIN = new URL("https://openings.dev");
export const SITE_DEFAULT_DESCRIPTION =
  "Find tech jobs shared by public GitHub communities, then open the original listing to verify current details.";
export const DEFAULT_SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "openings.dev — Technology jobs shared by public GitHub communities",
} as const;
export const DEFAULT_TWITTER_IMAGE = {
  ...DEFAULT_SOCIAL_IMAGE,
  url: "/twitter-image",
} as const;

type OpenGraphType = "website" | "article";

interface CreatePageMetadataParams {
  title: string;
  description: string;
  path: string;
  openGraphType?: OpenGraphType;
}

export function resolveCanonicalUrl(path: string): string {
  const pathname = path.split(/[?#]/u, 1)[0] ?? "/";
  const normalizedPath = `/${pathname.replace(/^\/+|\/{2,}/gu, "/").replace(/^\//u, "")}`;
  const canonical = new URL(normalizedPath, SITE_ORIGIN);
  return canonical.toString();
}

export function resolvePublicSiteUrl(path: string): string {
  const candidate = new URL(path, SITE_ORIGIN);
  return new URL(`${candidate.pathname}${candidate.search}`, SITE_ORIGIN).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  openGraphType = "website",
}: CreatePageMetadataParams): Metadata {
  const canonical = resolveCanonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: openGraphType,
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}
