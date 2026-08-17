import type { Metadata } from "next";
import { createProjectDocumentPage } from "@/app/_components/document-page/create-project-document-page";
import { ProjectDocumentKey } from "@/lib/content/document-types";
import { createPageMetadata } from "@/lib/metadata/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Project overview",
  description:
    "Learn how openings.dev turns public community job listings into a searchable index while preserving every original source.",
  path: "/overview",
  openGraphType: "article",
});

export default createProjectDocumentPage(ProjectDocumentKey.Overview, "overview");
