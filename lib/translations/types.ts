export interface DocumentMessages {
  title: string;
  description: string;
}

export interface TranslationMessages {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brandName: string;
    brandTagline: string;
    nav: {
      discover: string;
      communities: string;
      users: string;
    };
    primaryNavigationAriaLabel: string;
    switchToLightMode: string;
    switchToDarkMode: string;
    languagePlaceholder: string;
    languageAriaLabel: string;
    languageChanged: string;
  };
  home: {
    kicker: string;
    title: string;
    description: string;
  };
  notFound: {
    kicker: string;
    title: string;
    description: string;
    action: string;
  };
  communities: {
    header: {
      kicker: string;
      title: string;
      description: string;
      profileKicker: string;
      profileTitle: string;
      profileDescription: string;
    };
    filters: {
      title: string;
      country: string;
      region: string;
      allCountries: string;
      allRegions: string;
      optionWithCount: string;
      hide: string;
      show: string;
      clear: string;
    };
    list: {
      summary: string;
      emptyTitle: string;
      emptyDescription: string;
      repositoryLabel: string;
      countryLabel: string;
      regionLabel: string;
      opportunitiesCount: string;
      openCommunity: string;
    };
  };
  users: {
    header: {
      kicker: string;
      title: string;
      description: string;
      profileKicker: string;
      profileTitle: string;
      profileDescription: string;
    };
    filters: {
      title: string;
      country: string;
      region: string;
      allCountries: string;
      allRegions: string;
      optionWithCount: string;
      hide: string;
      show: string;
      clear: string;
    };
    list: {
      summary: string;
      emptyTitle: string;
      emptyDescription: string;
      handleLabel: string;
      countryLabel: string;
      regionLabel: string;
      opportunitiesCount: string;
      openUser: string;
    };
  };
  opportunities: {
    header: {
      kicker: string;
      title: string;
      description: string;
      opportunitiesLabel: string;
      locationLabel: string;
      lastPostLabel: string;
    };
    feedback: {
      filtersReset: string;
      loadError: string;
      loadMoreError: string;
      rateLimited: string;
    };
    range: {
      zeroResults: string;
      rangeOfTotal: string;
    };
    status: {
      ariaLabel: string;
      title: string;
      opportunitiesFound: string;
      updatedRelative: string;
      updatedAt: string;
      updatedUnavailable: string;
    };
    filters: {
      ariaLabel: string;
      title: string;
      activeCount: string;
      hide: string;
      show: string;
      reset: string;
      searchLabel: string;
      searchPlaceholder: string;
      locationSectionLabel: string;
      repositorySectionLabel: string;
      repositoryLabel: string;
      repositoryPlaceholder: string;
      allRepositories: string;
      regionLabel: string;
      regionPlaceholder: string;
      allRegions: string;
      countryLabel: string;
      countryPlaceholder: string;
      allCountries: string;
      workModeLabel: string;
      workModePlaceholder: string;
      stackLabel: string;
      stackPlaceholder: string;
      seniorityLabel: string;
      seniorityPlaceholder: string;
      otherTagsLabel: string;
      otherTagsPlaceholder: string;
      tagsLabel: string;
      tagsPlaceholder: string;
      noTagsSelected: string;
      authorLabel: string;
      authorPlaceholder: string;
      noAuthorsSelected: string;
      itemsPerPageLabel: string;
      itemsPerPagePlaceholder: string;
      itemsPerPageOption: string;
      sortLabel: string;
      sortPlaceholder: string;
      sortRecent: string;
      sortOldest: string;
    };
    toolbar: {
      opportunitiesCount: string;
      pageSummary: string;
      sortPlaceholder: string;
      sortRecent: string;
      sortOldest: string;
    };
    list: {
      totalMatches: string;
      noMatchesTitle: string;
      noResultsTitle: string;
      noMatchesDescription: string;
      noResultsDescription: string;
      clearFilters: string;
      loadedPage: string;
      scrollToLoadMore: string;
      allResultsLoaded: string;
      loadingMore: string;
    };
    viewMode: {
      ariaLabel: string;
      list: string;
      grid: string;
    };
    card: {
      statusOpen: string;
      detailsLabel: string;
      closeDetails: string;
      postedAt: string;
      updatedAt: string;
      openOriginal: string;
      share: string;
      shareCopied: string;
      shareFailed: string;
      salaryPeriodMonth: string;
      salaryPeriodYear: string;
      salaryPeriodHour: string;
      communityAvatarAlt: string;
      authorAvatarAlt: string;
    };
  };
  footer: {
    brandTagline: string;
    description: string;
    supportText: string;
    supportEmailButtonLabel: string;
    supportEmailCopied: string;
    supportEmailCopyError: string;
    copyrightTemplate: string;
    signature: string;
    groups: {
      project: string;
      openSource: string;
      legal: string;
    };
    links: {
      overview: string;
      communities: string;
      users: string;
      apiReference: string;
      maintainers: string;
      status: string;
      github: string;
      contributing: string;
      reportIssue: string;
      privacyPolicy: string;
      termsOfService: string;
    };
    social: {
      linksAriaLabel: string;
      githubAriaLabel: string;
    };
  };
  documents: {
    sourceLabel: string;
    overview: DocumentMessages;
    apiReference: DocumentMessages;
    maintainers: DocumentMessages;
    contributing: DocumentMessages;
    privacy: DocumentMessages;
    terms: DocumentMessages;
  };
}
