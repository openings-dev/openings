import type { Metadata } from "next";
import { createProjectDocumentPage } from "@/app/_components/document-page/create-project-document-page";
import { ProjectDocumentKey } from "@/lib/content/document-types";
import { createPageMetadata } from "@/lib/metadata/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contributing",
  description:
    "Learn how to set up openings.dev locally, propose a focused change, and contribute through the public repository.",
  path: "/docs/contributing",
  openGraphType: "article",
});

export default createProjectDocumentPage(ProjectDocumentKey.Contributing, "contributing");
