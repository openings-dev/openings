import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();

function readProjectFile(path) {
  const fullPath = join(rootDir, path);

  if (!existsSync(fullPath)) {
    throw new Error(`Missing required file: ${path}`);
  }

  return readFileSync(fullPath, "utf8");
}

function assertContains(path, expected) {
  const content = readProjectFile(path);

  if (!content.includes(expected)) {
    throw new Error(`Expected ${path} to include: ${expected}`);
  }
}

function assertMatches(path, pattern) {
  const content = readProjectFile(path);

  if (!pattern.test(content)) {
    throw new Error(`Expected ${path} to match ${pattern}`);
  }
}

const canonicalCommunityUrl = "https://openings.dev/community/OWNER/REPO";

assertContains(
  "lib/opportunities/routing.ts",
  'return `/community/${encodedOwner}/${encodedName}`;',
);
assertContains(
  "app/community/[owner]/[name]/page.tsx",
  "generateStaticParams",
);
assertContains(
  "app/community/[owner]/[name]/page.tsx",
  "getSnapshotCommunityByRepository",
);
assertContains(
  "app/community/[owner]/[name]/page.tsx",
  "forcedRepositoryProfile",
);
assertContains("app/docs/maintainers/page.tsx", "ProjectDocumentKey.Maintainers");
assertContains("lib/content/document-types.ts", 'Maintainers = "maintainers"');
assertContains("lib/content/document-config.ts", "ProjectDocumentKey.Maintainers");
assertContains("app/_components/document-page/types.ts", '| "maintainers"');
assertContains("components/footer/index.tsx", "footerMessages.links.maintainers");
assertContains("MAINTAINERS.md", canonicalCommunityUrl);
assertContains("docs/maintainers/MAINTAINERS.pt.md", canonicalCommunityUrl);
assertContains("docs/maintainers/MAINTAINERS.es.md", canonicalCommunityUrl);
assertContains("docs/maintainers/MAINTAINERS.it.md", canonicalCommunityUrl);
assertContains("docs/maintainers/MAINTAINERS.fr.md", canonicalCommunityUrl);
assertContains("docs/maintainers/MAINTAINERS.de.md", canonicalCommunityUrl);
assertMatches("MAINTAINERS.md", /img\.shields\.io\/badge\/openings\.dev/i);
assertMatches("docs/maintainers/MAINTAINERS.pt.md", /img\.shields\.io\/badge\/openings\.dev/i);
assertMatches("docs/maintainers/MAINTAINERS.es.md", /img\.shields\.io\/badge\/openings\.dev/i);
assertMatches("docs/maintainers/MAINTAINERS.it.md", /img\.shields\.io\/badge\/openings\.dev/i);
assertMatches("docs/maintainers/MAINTAINERS.fr.md", /img\.shields\.io\/badge\/openings\.dev/i);
assertMatches("docs/maintainers/MAINTAINERS.de.md", /img\.shields\.io\/badge\/openings\.dev/i);

console.log("Maintainer outreach contract is valid.");
