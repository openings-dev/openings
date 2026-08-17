export const PUBLIC_ROUTES = {
  home: "/",
  communities: "/communities",
  authors: "/authors",
  design: "/design",
  overview: "/overview",
  apiReference: "/docs/api",
  communityGuide: "/docs/maintainers",
  contributing: "/docs/contributing",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const LEGACY_ROUTES = {
  communities: "/community",
  authors: "/users",
  design: "/design-system",
} as const;

export const EXTERNAL_ROUTES = {
  githubRepository: "https://github.com/openings-dev/openings",
  reportIssue:
    "https://github.com/openings-dev/openings/issues/new/choose",
  support: "mailto:support@openings.dev",
} as const;
