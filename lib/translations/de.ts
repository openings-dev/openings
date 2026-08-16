import type { TranslationMessages } from "./types";

export const deTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description: "Tech-Jobs aus GitHub-Communities, gesammelt an einem Ort",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Jobs aus GitHub-Communities",
    nav: {
      discover: "Entdecken",
      communities: "Communities",
      users: "Nutzer",
    },
    primaryNavigationAriaLabel: "Hauptnavigation",
    switchToLightMode: "Zum hellen Modus wechseln",
    switchToDarkMode: "Zum dunklen Modus wechseln",
    languagePlaceholder: "Sprache",
    languageAriaLabel: "Sprache auswählen",
    languageChanged: "Sprache auf {language} geändert.",
  },
  home: {
    kicker: "Jobs aus der Community",
    title: "Tech-Jobs aus GitHub-Communities an einem durchsuchbaren Ort",
    description:
      "Finde Jobs aus den Issues von GitHub-Communities und filtere nach Stack, Erfahrung, Standort und Remote-Modell, ohne zwischen Repositories zu wechseln.",
  },
  notFound: {
    kicker: "Nicht gefunden",
    title: "Seite nicht gefunden",
    description: "Die angeforderte Seite existiert nicht.",
    action: "Stellen ansehen",
  },
  communities: {
    header: {
      kicker: "Communities",
      title: "Jobs nach Community finden",
      description:
        "Entdecke GitHub-Communities, die offene Stellen teilen, und finde alle Jobs einer Community an einem Ort.",
      profileKicker: "Jobs der Community",
      profileTitle: "Offene Stellen von {name}",
      profileDescription:
        "Entdecke die von {name} geteilten Stellen. Jede Anzeige führt zur ursprünglichen öffentlichen GitHub-Issue.",
    },
    filters: {
      title: "Filter",
      country: "Land",
      region: "Region",
      allCountries: "Alle Länder",
      allRegions: "Alle Regionen",
      optionWithCount: "{label} ({count})",
      hide: "Filter ausblenden",
      show: "Filter anzeigen",
      clear: "Filter löschen",
    },
    list: {
      summary: "{count} Communities gefunden",
      emptyTitle: "Keine Communities für die aktuellen Filter",
      emptyDescription: "Passe Land oder Region an, um mehr Ergebnisse zu sehen.",
      repositoryLabel: "Repository",
      countryLabel: "Land",
      regionLabel: "Region",
      opportunitiesCount: "{count} offene Opportunities",
      openCommunity: "Community öffnen",
    },
  },
  users: {
    header: {
      kicker: "Nutzer",
      title: "Jobs nach Herausgeber finden",
      description:
        "Entdecke die Personen, die Jobs in Community-Repositories teilen, und sieh alle offenen Stellen jedes Profils.",
      profileKicker: "Herausgeberprofil",
      profileTitle: "Von {name} geteilte Stellen",
      profileDescription:
        "Entdecke offene Stellen, die @{handle} in öffentlichen GitHub-Community-Repositories geteilt hat.",
    },
    filters: {
      title: "Filter",
      country: "Land",
      region: "Region",
      allCountries: "Alle Länder",
      allRegions: "Alle Regionen",
      optionWithCount: "{label} ({count})",
      hide: "Filter ausblenden",
      show: "Filter anzeigen",
      clear: "Filter löschen",
    },
    list: {
      summary: "{count} Nutzer gefunden",
      emptyTitle: "Keine Nutzer für die aktuellen Filter",
      emptyDescription: "Passe Land oder Region an, um mehr Ergebnisse zu sehen.",
      handleLabel: "Nutzer",
      countryLabel: "Land",
      regionLabel: "Region",
      opportunitiesCount: "{count} offene Opportunities",
      openUser: "Profil öffnen",
    },
  },
  opportunities: {
    header: {
      kicker: "Opportunity Explorer",
      title: "Tech-Jobs direkt von GitHub.",
      description:
        "Entdecke Stellen aus vertrauenswürdigen Communities und filtere nach dem, was für dich wichtig ist.",
      opportunitiesLabel: "Stellen",
      locationLabel: "Standort",
      lastPostLabel: "Letzte Veröffentlichung",
    },
    feedback: {
      filtersReset: "Filter zurückgesetzt",
      loadError: "Opportunities aus der Datenquelle konnten nicht geladen werden.",
      loadMoreError:
        "Weitere Opportunities aus der Datenquelle konnten nicht geladen werden.",
      rateLimited:
        "Die Datenquelle ist vorübergehend nicht verfügbar. Bitte in ein paar Minuten erneut versuchen.",
    },
    range: {
      zeroResults: "0 Ergebnisse",
      rangeOfTotal: "{start}-{end} von {total}",
    },
    status: {
      ariaLabel: "Status des Opportunity-Snapshots",
      title: "Letztes API-Update",
      opportunitiesFound: "{count} Opportunities gefunden",
      updatedRelative: "Aktualisiert {relative}",
      updatedAt: "Letzte Aktualisierung: {date}",
      updatedUnavailable: "Aktualisierungszeit nicht verfügbar",
    },
    filters: {
      ariaLabel: "Opportunity-Filter",
      title: "Filter",
      activeCount: "{count} aktiv",
      hide: "Filter ausblenden",
      show: "Filter anzeigen",
      reset: "Zurücksetzen",
      searchLabel: "Opportunity suchen",
      searchPlaceholder:
        "Nach Titel, Unternehmen, Repository oder Stichwort suchen",
      locationSectionLabel: "Standort",
      repositorySectionLabel: "Repository",
      repositoryLabel: "Repository",
      repositoryPlaceholder: "Alle Repositories",
      allRepositories: "Alle Repositories",
      regionLabel: "Region",
      regionPlaceholder: "Alle Regionen",
      allRegions: "Alle Regionen",
      countryLabel: "Land",
      countryPlaceholder: "Alle Länder",
      allCountries: "Alle Länder",
      workModeLabel: "Arbeitsmodell",
      workModePlaceholder: "Arbeitsmodell hinzufügen",
      stackLabel: "Stack / Technologie",
      stackPlaceholder: "Stack hinzufügen",
      seniorityLabel: "Senioritätslevel",
      seniorityPlaceholder: "Seniorität hinzufügen",
      otherTagsLabel: "Weitere Tags",
      otherTagsPlaceholder: "Weiteren Tag hinzufügen",
      tagsLabel: "Tags",
      tagsPlaceholder: "Tag-Filter hinzufügen",
      noTagsSelected: "Keine Tags ausgewählt",
      authorLabel: "Issue-Autor",
      authorPlaceholder: "Autorenfilter hinzufügen",
      noAuthorsSelected: "Keine Autoren ausgewählt",
      itemsPerPageLabel: "Einträge pro Seite",
      itemsPerPagePlaceholder: "Einträge pro Seite",
      itemsPerPageOption: "{count} Einträge",
      sortLabel: "Nach Datum sortieren",
      sortPlaceholder: "Nach Datum sortieren",
      sortRecent: "Neueste zuerst",
      sortOldest: "Älteste zuerst",
    },
    toolbar: {
      opportunitiesCount: "{count} Opportunities",
      pageSummary: "{range} • Seite {page} von {totalPages}",
      sortPlaceholder: "Nach Datum sortieren",
      sortRecent: "Neueste zuerst",
      sortOldest: "Älteste zuerst",
    },
    list: {
      totalMatches: "{count} Treffer gesamt",
      noMatchesTitle: "Keine Treffer für die aktuellen Filter",
      noResultsTitle: "Keine Opportunities verfügbar",
      noMatchesDescription:
        "Versuche einige Filter zu entfernen oder die Suche anzupassen, um mehr Ergebnisse zu sehen.",
      noResultsDescription:
        "Neue Opportunities erscheinen hier, sobald Quellen geladen sind.",
      clearFilters: "Filter löschen",
      loadedPage: "Seite {page} von {totalPages} geladen",
      scrollToLoadMore: "Scrollen, um mehr zu laden",
      allResultsLoaded: "Alle Ergebnisse geladen",
      loadingMore: "Weitere Opportunities werden geladen...",
    },
    viewMode: {
      ariaLabel: "Ansichtsmodus",
      list: "Liste",
      grid: "Raster",
    },
    card: {
      statusOpen: "Offen",
      detailsLabel: "Opportunity-Details",
      closeDetails: "Details schließen",
      postedAt: "Veröffentlicht: {date}",
      updatedAt: "Aktualisiert: {date}",
      openOriginal: "Originale Ausschreibung öffnen",
      share: "Opportunity teilen",
      shareCopied: "Opportunity-Link kopiert.",
      shareFailed: "Diese Opportunity konnte nicht geteilt werden.",
      salaryPeriodMonth: "Monat",
      salaryPeriodYear: "Jahr",
      salaryPeriodHour: "Stunde",
      communityAvatarAlt: "Community-Avatar {name}",
      authorAvatarAlt: "Avatar von {name}",
    },
  },
  footer: {
    brandTagline: "Jobs aus GitHub-Communities",
    description:
      "Wir indexieren Tech-Jobs, die als GitHub-Issues in Communities aus Brasilien, Portugal, Angola, LATAM und weiteren Ökosystemen veröffentlicht werden.",
    supportText: "Öffentlich gebaut für Kandidaten, Recruiter und Maintainer.",
    supportEmailButtonLabel: "Support-E-Mail kopieren",
    supportEmailCopied: "Support-E-Mail kopiert.",
    supportEmailCopyError: "Support-E-Mail konnte nicht kopiert werden.",
    copyrightTemplate: "© {year} {brand}. Alle Rechte vorbehalten.",
    signature: "powered by",
    groups: {
      project: "Projekt",
      openSource: "Open Source",
      legal: "Rechtliches",
    },
    links: {
      overview: "Überblick",
      communities: "Communities",
      users: "Nutzer",
      apiReference: "API-Referenz",
      maintainers: "Für Maintainer",
      status: "Status",
      github: "GitHub",
      contributing: "Mitwirken",
      reportIssue: "Problem melden",
      privacyPolicy: "Datenschutzerklärung",
      termsOfService: "Nutzungsbedingungen",
    },
    social: {
      linksAriaLabel: "Soziale Links",
      githubAriaLabel: "openings.dev auf GitHub öffnen",
    },
  },
  documents: {
    sourceLabel: "Quelldatei: {file}",
    overview: {
      title: "Überblick",
      description:
        "Wie openings.dev globale Tech-Job-Daten erfasst, normalisiert und bereitstellt.",
    },
    apiReference: {
      title: "API-Referenz",
      description:
        "Zentrale Endpunkte, Filter und Antwortformate der öffentlichen Jobs-API.",
    },
    maintainers: {
      title: "Für Maintainer",
      description:
        "Kanonische Links, README-Snippets, Badges und Outreach-Texte für gelistete Communities.",
    },
    contributing: {
      title: "Mitwirken",
      description:
        "Wie man Repositories vorschlägt, Probleme meldet und sicher beiträgt.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Wie wir Daten auf der Plattform erheben, verwenden und schützen.",
    },
    terms: {
      title: "Nutzungsbedingungen",
      description:
        "Regeln und Verantwortlichkeiten für openings.dev und die öffentliche API.",
    },
  },
};
