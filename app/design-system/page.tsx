import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata/site-metadata";
import { DesignSystemShowcase } from "./_components/design-system-showcase";

export const metadata: Metadata = createPageMetadata({
  title: "Design system",
  description:
    "Review the brand foundations, shared components, content standards, UI states, and responsive rules used by openings.dev.",
  path: "/design-system",
});

export default function DesignSystemPage(): React.ReactNode {
  return <DesignSystemShowcase />;
}
