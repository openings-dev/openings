import type { TranslationMessages } from "./types";

export const enTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Global tech jobs intelligence powered by community repositories",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Tech jobs from GitHub communities",
    languagePlaceholder: "Language",
    languageAriaLabel: "Select language",
    languageChanged: "Language set to {language}.",
  },
  home: {
    kicker: "Open-source jobs intelligence",
    title: "Tech jobs from community GitHub repos, in one searchable place",
    description:
      "openings.dev tracks job issues published by trusted communities, normalizes every post, and helps you filter by stack, seniority, location, and remote policy without jumping between repositories.",
  },
  opportunities: {
    header: {
      kicker: "Opportunity Explorer",
      title: "Discover premium tech openings",
      description:
        "Search communities and repositories with high-signal filters, switch between compact list and grid views, and review opportunities with GitHub-like clarity and refined visual density.",
    },
    feedback: {
      filtersReset: "Filters reset",
      loadError: "Could not load live opportunities from GitHub.",
      loadMoreError: "Could not load more opportunities from GitHub.",
      rateLimited:
        "GitHub API rate limit reached. Please wait a few minutes and try again.",
    },
    range: {
      zeroResults: "0 results",
      rangeOfTotal: "{start}-{end} of {total}",
    },
    filters: {
      ariaLabel: "Opportunity filters",
      title: "Filters",
      activeCount: "{count} active",
      hide: "Hide filters",
      show: "Show filters",
      reset: "Reset",
      searchLabel: "Search opportunity",
      searchPlaceholder: "Search title, company, repository, or keyword",
      repositoryLabel: "Repository",
      repositoryPlaceholder: "All repositories",
      allRepositories: "All repositories",
      regionLabel: "Region",
      regionPlaceholder: "All regions",
      allRegions: "All regions",
      countryLabel: "Country",
      countryPlaceholder: "All countries",
      allCountries: "All countries",
      tagsLabel: "Tags",
      tagsPlaceholder: "Add tag filter",
      noTagsSelected: "No tags selected",
      authorLabel: "Issue author",
      authorPlaceholder: "Add author filter",
      noAuthorsSelected: "No authors selected",
      itemsPerPageLabel: "Items per page",
      itemsPerPagePlaceholder: "Items per page",
      itemsPerPageOption: "{count} items",
      sortLabel: "Sort by date",
      sortPlaceholder: "Sort by date",
      sortRecent: "Most recent",
      sortOldest: "Oldest first",
    },
    toolbar: {
      opportunitiesCount: "{count} opportunities",
      pageSummary: "{range} • Page {page} of {totalPages}",
      sortPlaceholder: "Sort by date",
      sortRecent: "Most recent",
      sortOldest: "Oldest first",
    },
    list: {
      totalMatches: "{count} total matches",
      noMatchesTitle: "No matches for current filters",
      noResultsTitle: "No opportunities available",
      noMatchesDescription:
        "Try removing some filters or updating your search query to broaden the results.",
      noResultsDescription:
        "New opportunities will appear here as soon as sources are loaded.",
      clearFilters: "Clear filters",
      loadedPage: "Loaded page {page} of {totalPages}",
      scrollToLoadMore: "Scroll to load more",
      allResultsLoaded: "All results loaded",
      loadingMore: "Loading more opportunities...",
    },
    viewMode: {
      ariaLabel: "View mode",
      list: "List",
      grid: "Grid",
    },
    card: {
      statusOpen: "Open",
      salaryPeriodMonth: "month",
      salaryPeriodYear: "year",
      salaryPeriodHour: "hour",
      communityAvatarAlt: "{name} avatar",
      authorAvatarAlt: "{name} avatar",
    },
  },
  footer: {
    brandTagline: "Tech jobs from GitHub communities",
    description:
      "We index tech jobs posted as GitHub issues across communities in Brazil, Portugal, Angola, LATAM, and beyond.",
    supportText: "Built in public for candidates, recruiters, and maintainers.",
    supportEmailButtonLabel: "Copy support email",
    supportEmailCopied: "Support email copied.",
    supportEmailCopyError: "Could not copy support email.",
    copyrightTemplate: "© {year} {brand}. All rights reserved.",
    signature: "powered by",
    groups: {
      project: "Project",
      openSource: "Open Source",
      legal: "Legal",
    },
    links: {
      overview: "Overview",
      apiReference: "API Reference",
      status: "Status",
      github: "GitHub",
      contributing: "Contributing",
      reportIssue: "Report issue",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
    },
    social: {
      githubAriaLabel: "Open openings.dev on GitHub",
    },
  },
  documents: {
    sourceLabel: "Source file: {file}",
    overview: {
      title: "Overview",
      description:
        "How openings.dev collects, normalizes, and serves global tech job data.",
    },
    apiReference: {
      title: "API Reference",
      description:
        "Core endpoints, filters, and response contracts for the public jobs API.",
    },
    contributing: {
      title: "Contributing",
      description:
        "How to propose repositories, report issues, and contribute safely.",
    },
    privacy: {
      title: "Privacy Policy",
      description: "How we collect, use, and protect data across the platform.",
    },
    terms: {
      title: "Terms of Service",
      description:
        "Rules and responsibilities for using openings.dev and its public API.",
    },
  },
};
