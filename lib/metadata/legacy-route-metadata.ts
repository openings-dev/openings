import type { Metadata } from "next";
import { resolveCanonicalUrl } from "./site-metadata";

export function createLegacyRouteMetadata(canonicalPath: string): Metadata {
  return {
    title: "Page moved",
    description: "This page is available at a new openings.dev address.",
    alternates: {
      canonical: resolveCanonicalUrl(canonicalPath),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
