import type { Metadata } from "next";
import { DesignSystemShowcase } from "@/app/design-system/_components/design-system-showcase";
import { PUBLIC_ROUTES } from "@/lib/navigation/routes";
import { createPageMetadata } from "@/lib/metadata/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Design system",
  description:
    "Review the brand foundations, shared components, content standards, UI states, and responsive rules used by openings.dev.",
  path: PUBLIC_ROUTES.design,
});

export default function DesignPage(): React.ReactNode {
  return <DesignSystemShowcase />;
}
