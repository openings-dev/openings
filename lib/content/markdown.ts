import { readFile } from "node:fs/promises";
import {
  AVAILABLE_LOCALES,
  type LocaleCode,
} from "@/lib/constants/locales";

export type ProjectDocumentKey =
  | "overview"
  | "api-reference"
  | "contributing"
  | "privacy"
  | "terms";

interface ProjectDocumentPathConfig {
  url: URL;
  displayPath: string;
}

const PROJECT_DOCUMENT_PATH = {
  overview: {
    en: {
      url: new URL("../../OVERVIEW.md", import.meta.url),
      displayPath: "OVERVIEW.md",
    },
    pt: {
      url: new URL("../../docs/overview/OVERVIEW.pt.md", import.meta.url),
      displayPath: "docs/overview/OVERVIEW.pt.md",
    },
    es: {
      url: new URL("../../docs/overview/OVERVIEW.es.md", import.meta.url),
      displayPath: "docs/overview/OVERVIEW.es.md",
    },
    it: {
      url: new URL("../../docs/overview/OVERVIEW.it.md", import.meta.url),
      displayPath: "docs/overview/OVERVIEW.it.md",
    },
    fr: {
      url: new URL("../../docs/overview/OVERVIEW.fr.md", import.meta.url),
      displayPath: "docs/overview/OVERVIEW.fr.md",
    },
    de: {
      url: new URL("../../docs/overview/OVERVIEW.de.md", import.meta.url),
      displayPath: "docs/overview/OVERVIEW.de.md",
    },
  },
  "api-reference": {
    en: {
      url: new URL("../../API_REFERENCE.md", import.meta.url),
      displayPath: "API_REFERENCE.md",
    },
    pt: {
      url: new URL("../../docs/api-reference/API_REFERENCE.pt.md", import.meta.url),
      displayPath: "docs/api-reference/API_REFERENCE.pt.md",
    },
    es: {
      url: new URL("../../docs/api-reference/API_REFERENCE.es.md", import.meta.url),
      displayPath: "docs/api-reference/API_REFERENCE.es.md",
    },
    it: {
      url: new URL("../../docs/api-reference/API_REFERENCE.it.md", import.meta.url),
      displayPath: "docs/api-reference/API_REFERENCE.it.md",
    },
    fr: {
      url: new URL("../../docs/api-reference/API_REFERENCE.fr.md", import.meta.url),
      displayPath: "docs/api-reference/API_REFERENCE.fr.md",
    },
    de: {
      url: new URL("../../docs/api-reference/API_REFERENCE.de.md", import.meta.url),
      displayPath: "docs/api-reference/API_REFERENCE.de.md",
    },
  },
  contributing: {
    en: {
      url: new URL("../../CONTRIBUTING.md", import.meta.url),
      displayPath: "CONTRIBUTING.md",
    },
    pt: {
      url: new URL("../../docs/contributing/CONTRIBUTING.pt.md", import.meta.url),
      displayPath: "docs/contributing/CONTRIBUTING.pt.md",
    },
    es: {
      url: new URL("../../docs/contributing/CONTRIBUTING.es.md", import.meta.url),
      displayPath: "docs/contributing/CONTRIBUTING.es.md",
    },
    it: {
      url: new URL("../../docs/contributing/CONTRIBUTING.it.md", import.meta.url),
      displayPath: "docs/contributing/CONTRIBUTING.it.md",
    },
    fr: {
      url: new URL("../../docs/contributing/CONTRIBUTING.fr.md", import.meta.url),
      displayPath: "docs/contributing/CONTRIBUTING.fr.md",
    },
    de: {
      url: new URL("../../docs/contributing/CONTRIBUTING.de.md", import.meta.url),
      displayPath: "docs/contributing/CONTRIBUTING.de.md",
    },
  },
  privacy: {
    en: {
      url: new URL("../../PRIVACY.md", import.meta.url),
      displayPath: "PRIVACY.md",
    },
    pt: {
      url: new URL("../../docs/privacy/PRIVACY.pt.md", import.meta.url),
      displayPath: "docs/privacy/PRIVACY.pt.md",
    },
    es: {
      url: new URL("../../docs/privacy/PRIVACY.es.md", import.meta.url),
      displayPath: "docs/privacy/PRIVACY.es.md",
    },
    it: {
      url: new URL("../../docs/privacy/PRIVACY.it.md", import.meta.url),
      displayPath: "docs/privacy/PRIVACY.it.md",
    },
    fr: {
      url: new URL("../../docs/privacy/PRIVACY.fr.md", import.meta.url),
      displayPath: "docs/privacy/PRIVACY.fr.md",
    },
    de: {
      url: new URL("../../docs/privacy/PRIVACY.de.md", import.meta.url),
      displayPath: "docs/privacy/PRIVACY.de.md",
    },
  },
  terms: {
    en: {
      url: new URL("../../TERMS.md", import.meta.url),
      displayPath: "TERMS.md",
    },
    pt: {
      url: new URL("../../docs/terms/TERMS.pt.md", import.meta.url),
      displayPath: "docs/terms/TERMS.pt.md",
    },
    es: {
      url: new URL("../../docs/terms/TERMS.es.md", import.meta.url),
      displayPath: "docs/terms/TERMS.es.md",
    },
    it: {
      url: new URL("../../docs/terms/TERMS.it.md", import.meta.url),
      displayPath: "docs/terms/TERMS.it.md",
    },
    fr: {
      url: new URL("../../docs/terms/TERMS.fr.md", import.meta.url),
      displayPath: "docs/terms/TERMS.fr.md",
    },
    de: {
      url: new URL("../../docs/terms/TERMS.de.md", import.meta.url),
      displayPath: "docs/terms/TERMS.de.md",
    },
  },
} satisfies Record<ProjectDocumentKey, Record<LocaleCode, ProjectDocumentPathConfig>>;

export interface ProjectDocumentContent {
  fileName: string;
  markdown: string;
}

export interface ProjectDocumentBundle {
  markdownByLocale: Record<LocaleCode, string>;
  sourceFileByLocale: Record<LocaleCode, string>;
}

export async function readProjectDocumentBundle(
  key: ProjectDocumentKey,
): Promise<ProjectDocumentBundle> {
  const paths = PROJECT_DOCUMENT_PATH[key];
  const fallbackTarget = paths.en;
  let baseMarkdown = "";

  try {
    baseMarkdown = await readFile(fallbackTarget.url, "utf-8");
  } catch {
    baseMarkdown = `# Missing file\n\nCould not read \`${fallbackTarget.displayPath}\` from the project root.`;
  }

  const entries = await Promise.all(
    AVAILABLE_LOCALES.map(async ({ code }) => {
      const localizedTarget = paths[code];

      try {
        const localizedMarkdown = await readFile(localizedTarget.url, "utf-8");
        return [
          code,
          {
            markdown: localizedMarkdown,
            fileName: localizedTarget.displayPath,
          },
        ] as const;
      } catch {
        return [
          code,
          {
            markdown: baseMarkdown,
            fileName: fallbackTarget.displayPath,
          },
        ] as const;
      }
    }),
  );

  const markdownByLocale = Object.fromEntries(
    entries.map(([locale, payload]) => [locale, payload.markdown]),
  ) as Record<LocaleCode, string>;

  const sourceFileByLocale = Object.fromEntries(
    entries.map(([locale, payload]) => [locale, payload.fileName]),
  ) as Record<LocaleCode, string>;

  return { markdownByLocale, sourceFileByLocale };
}
