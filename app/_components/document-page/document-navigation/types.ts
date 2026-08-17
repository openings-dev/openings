import type { DocumentPageKey } from "../types";

export interface DocumentNavigationProps {
  currentDocument: DocumentPageKey;
  ariaLabel: string;
  labels: Record<DocumentPageKey, string>;
}
