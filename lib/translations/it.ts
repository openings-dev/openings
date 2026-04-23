import type { TranslationMessages } from "./types";

export const itTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Intelligence globale per offerte tech alimentata dalle community",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Intelligence lavoro guidata dalle community",
    languagePlaceholder: "Lingua",
    languageAriaLabel: "Seleziona lingua",
    languageChanged: "Lingua impostata su {language}.",
  },
  home: {
    kicker: "Intelligence open source per offerte",
    title:
      "Offerte tech dai repository GitHub delle community, in un'unica ricerca",
    description:
      "openings.dev monitora issue di lavoro pubblicate da community affidabili, normalizza ogni annuncio e permette filtri per stack, seniority, localizzazione e policy remote senza passare da un repository all'altro.",
  },
  opportunities: {
    header: {
      kicker: "Esplora opportunità",
      title: "Scopri offerte tech premium",
      description:
        "Cerca community e repository con filtri ad alto segnale, passa tra vista lista e griglia, e analizza le opportunità con chiarezza in stile GitHub e finitura premium.",
    },
    feedback: {
      filtersReset: "Filtri reimpostati",
      loadError: "Impossibile caricare opportunità live da GitHub.",
      loadMoreError: "Impossibile caricare altre opportunità da GitHub.",
      rateLimited:
        "Limite API GitHub raggiunto. Attendi qualche minuto e riprova.",
    },
    range: {
      zeroResults: "0 risultati",
      rangeOfTotal: "{start}-{end} di {total}",
    },
    filters: {
      ariaLabel: "Filtri opportunità",
      title: "Filtri",
      activeCount: "{count} attivi",
      hide: "Nascondi filtri",
      show: "Mostra filtri",
      reset: "Reimposta",
      searchLabel: "Cerca opportunità",
      searchPlaceholder: "Cerca per titolo, azienda, repository o parola chiave",
      repositoryLabel: "Repository",
      repositoryPlaceholder: "Tutti i repository",
      allRepositories: "Tutti i repository",
      regionLabel: "Regione",
      regionPlaceholder: "Tutte le regioni",
      allRegions: "Tutte le regioni",
      countryLabel: "Paese",
      countryPlaceholder: "Tutti i paesi",
      allCountries: "Tutti i paesi",
      tagsLabel: "Tag",
      tagsPlaceholder: "Aggiungi filtro tag",
      noTagsSelected: "Nessun tag selezionato",
      authorLabel: "Autore issue",
      authorPlaceholder: "Aggiungi filtro autore",
      noAuthorsSelected: "Nessun autore selezionato",
      itemsPerPageLabel: "Elementi per pagina",
      itemsPerPagePlaceholder: "Elementi per pagina",
      itemsPerPageOption: "{count} elementi",
      sortLabel: "Ordina per data",
      sortPlaceholder: "Ordina per data",
      sortRecent: "Più recenti",
      sortOldest: "Più vecchie prima",
    },
    toolbar: {
      opportunitiesCount: "{count} opportunità",
      pageSummary: "{range} • Pagina {page} di {totalPages}",
      sortPlaceholder: "Ordina per data",
      sortRecent: "Più recenti",
      sortOldest: "Più vecchie prima",
    },
    list: {
      totalMatches: "{count} risultati totali",
      noMatchesTitle: "Nessun risultato per i filtri correnti",
      noResultsTitle: "Nessuna opportunità disponibile",
      noMatchesDescription:
        "Prova a rimuovere alcuni filtri o ad aggiornare la ricerca per ampliare i risultati.",
      noResultsDescription:
        "Le nuove opportunità appariranno qui non appena le fonti saranno caricate.",
      clearFilters: "Cancella filtri",
      loadedPage: "Pagina {page} di {totalPages} caricata",
      scrollToLoadMore: "Scorri per caricare altro",
      allResultsLoaded: "Tutti i risultati caricati",
      loadingMore: "Caricamento di altre opportunità...",
    },
    viewMode: {
      ariaLabel: "Modalità di visualizzazione",
      list: "Lista",
      grid: "Griglia",
    },
    card: {
      statusOpen: "Aperta",
      salaryPeriodMonth: "mese",
      salaryPeriodYear: "anno",
      salaryPeriodHour: "ora",
      communityAvatarAlt: "Avatar della community {name}",
      authorAvatarAlt: "Avatar di {name}",
    },
  },
  footer: {
    brandTagline: "Intelligence lavoro guidata dalle community",
    description:
      "Indicizziamo offerte tech pubblicate come issue GitHub da community in Brasile, Portogallo, Angola, LATAM e altri ecosistemi.",
    supportText: "Costruito in pubblico per candidati, recruiter e maintainer.",
    supportEmailButtonLabel: "Copia e-mail supporto",
    supportEmailCopied: "E-mail di supporto copiata.",
    supportEmailCopyError: "Impossibile copiare l'e-mail di supporto.",
    copyrightTemplate: "© {year} {brand}. Tutti i diritti riservati.",
    signature: "powered by",
    groups: {
      project: "Progetto",
      openSource: "Open Source",
      legal: "Legale",
    },
    links: {
      overview: "Panoramica",
      apiReference: "Riferimento API",
      status: "Stato",
      github: "GitHub",
      contributing: "Contribuire",
      reportIssue: "Segnala problema",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Termini di Servizio",
    },
    social: {
      githubAriaLabel: "Apri openings.dev su GitHub",
    },
  },
  documents: {
    sourceLabel: "File sorgente: {file}",
    overview: {
      title: "Panoramica",
      description:
        "Come openings.dev raccoglie, normalizza e distribuisce dati globali sulle offerte tech.",
    },
    apiReference: {
      title: "Riferimento API",
      description:
        "Endpoint principali, filtri e contratti di risposta dell'API pubblica.",
    },
    contributing: {
      title: "Contribuire",
      description:
        "Come proporre repository, segnalare problemi e contribuire in modo sicuro.",
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "Come raccogliamo, utilizziamo e proteggiamo i dati sulla piattaforma.",
    },
    terms: {
      title: "Termini di Servizio",
      description:
        "Regole e responsabilità per l'uso di openings.dev e della sua API pubblica.",
    },
  },
};
