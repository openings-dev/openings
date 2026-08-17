import type { Metadata } from "next";
import { createProjectDocumentPage } from "@/app/_components/document-page/create-project-document-page";
import { ProjectDocumentKey } from "@/lib/content/document-types";
import { createPageMetadata } from "@/lib/metadata/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy policy",
  description:
    "Read how openings.dev displays public listing and GitHub author data, stores theme and language preferences, and handles external links.",
  path: "/privacy",
  openGraphType: "article",
});

export default createProjectDocumentPage(ProjectDocumentKey.Privacy, "privacy");
