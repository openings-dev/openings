import type { TranslationMessages } from "./types";

export const deTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description: "Globale Tech-Job-Intelligence aus Community-Repositories",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Community-getriebene Job-Intelligence",
    languagePlaceholder: "Sprache",
    languageAriaLabel: "Sprache auswählen",
    languageChanged: "Sprache auf {language} geändert.",
  },
  home: {
    kicker: "Open-Source-Job-Intelligence",
    title: "Tech-Jobs aus GitHub-Communities an einem durchsuchbaren Ort",
    description:
      "openings.dev verfolgt Job-Issues aus verlässlichen Communities, normalisiert jeden Eintrag und ermöglicht Filter nach Stack, Seniorität, Standort und Remote-Regelung ohne Wechsel zwischen Repositories.",
  },
  opportunities: {
    header: {
      kicker: "Opportunity Explorer",
      title: "Premium-Tech-Jobs entdecken",
      description:
        "Durchsuche Communities und Repositories mit präzisen Filtern, wechsle zwischen Listen- und Rasteransicht und prüfe Chancen mit GitHub-ähnlicher Klarheit und hochwertigem Finish.",
    },
    feedback: {
      filtersReset: "Filter zurückgesetzt",
      loadError: "Live-Opportunities von GitHub konnten nicht geladen werden.",
      loadMoreError:
        "Weitere Opportunities von GitHub konnten nicht geladen werden.",
      rateLimited:
        "GitHub-API-Limit erreicht. Bitte in ein paar Minuten erneut versuchen.",
    },
    range: {
      zeroResults: "0 Ergebnisse",
      rangeOfTotal: "{start}-{end} von {total}",
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
      repositoryLabel: "Repository",
      repositoryPlaceholder: "Alle Repositories",
      allRepositories: "Alle Repositories",
      regionLabel: "Region",
      regionPlaceholder: "Alle Regionen",
      allRegions: "Alle Regionen",
      countryLabel: "Land",
      countryPlaceholder: "Alle Länder",
      allCountries: "Alle Länder",
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
      salaryPeriodMonth: "Monat",
      salaryPeriodYear: "Jahr",
      salaryPeriodHour: "Stunde",
      communityAvatarAlt: "Community-Avatar {name}",
      authorAvatarAlt: "Avatar von {name}",
    },
  },
  footer: {
    brandTagline: "Community-getriebene Job-Intelligence",
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
      apiReference: "API-Referenz",
      status: "Status",
      github: "GitHub",
      contributing: "Mitwirken",
      reportIssue: "Problem melden",
      privacyPolicy: "Datenschutzerklärung",
      termsOfService: "Nutzungsbedingungen",
    },
    social: {
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
