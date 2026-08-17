import type { Metadata } from "next";
import { DocsHub } from "./_components/docs-hub";
import { createPageMetadata } from "@/lib/metadata/site-metadata";
import { PUBLIC_ROUTES } from "@/lib/navigation/routes";

export const metadata: Metadata = createPageMetadata({
  title: "Documentation",
  description:
    "Explore the openings.dev product overview, static data reference, community guides, contribution resources, and policies.",
  path: PUBLIC_ROUTES.docs,
  socialImageAlt: "openings.dev documentation and project resources",
});

export default function DocsPage(): React.ReactNode {
  return <DocsHub />;
}
