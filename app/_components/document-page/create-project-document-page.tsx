import { readProjectDocumentBundle } from "@/lib/content/read-project-document";
import type { ProjectDocumentKey } from "@/lib/content/document-types";
import { DocumentPage } from ".";
import type { DocumentPageKey } from "./types";

export function createProjectDocumentPage(
  sourceDocumentKey: ProjectDocumentKey,
  pageDocumentKey: DocumentPageKey,
) {
  return async function ProjectDocumentRoutePage(): Promise<React.ReactNode> {
    const document = await readProjectDocumentBundle(sourceDocumentKey);

    return (
      <DocumentPage
        documentKey={pageDocumentKey}
        markdownByLocale={document.markdownByLocale}
        sourceFileByLocale={document.sourceFileByLocale}
      />
    );
  };
}
