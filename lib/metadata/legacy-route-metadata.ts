import type { Metadata } from "next";
import { createPageMetadata } from "./site-metadata";

export function createLegacyRouteMetadata(canonicalPath: string): Metadata {
  const metadata = createPageMetadata({
    title: "Page moved",
    description: "This page is available at a new openings.dev address.",
    path: canonicalPath,
  });

  return {
    ...metadata,
    robots: {
      index: false,
      follow: true,
    },
  };
}
