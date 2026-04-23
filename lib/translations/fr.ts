import type { TranslationMessages } from "./types";

export const frTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Intelligence globale des offres tech alimentée par les communautés",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Intelligence emploi portée par les communautés",
    languagePlaceholder: "Langue",
    languageAriaLabel: "Sélectionner la langue",
    languageChanged: "Langue définie sur {language}.",
  },
  home: {
    kicker: "Intelligence open source des offres",
    title:
      "Des offres tech issues des communautés GitHub, réunies dans une seule recherche",
    description:
      "openings.dev suit les issues d'emploi publiées par des communautés fiables, normalise chaque offre et permet de filtrer par stack, séniorité, localisation et politique remote sans passer d'un dépôt à l'autre.",
  },
  opportunities: {
    header: {
      kicker: "Explorateur d'opportunités",
      title: "Découvrez des offres tech premium",
      description:
        "Recherchez des communautés et des dépôts avec des filtres précis, basculez entre liste et grille, et analysez les opportunités avec une clarté inspirée de GitHub et une finition premium.",
    },
    feedback: {
      filtersReset: "Filtres réinitialisés",
      loadError: "Impossible de charger les opportunités en direct depuis GitHub.",
      loadMoreError:
        "Impossible de charger davantage d'opportunités depuis GitHub.",
      rateLimited:
        "La limite de l'API GitHub est atteinte. Réessayez dans quelques minutes.",
    },
    range: {
      zeroResults: "0 résultat",
      rangeOfTotal: "{start}-{end} sur {total}",
    },
    filters: {
      ariaLabel: "Filtres d'opportunités",
      title: "Filtres",
      activeCount: "{count} actifs",
      hide: "Masquer les filtres",
      show: "Afficher les filtres",
      reset: "Réinitialiser",
      searchLabel: "Rechercher une opportunité",
      searchPlaceholder:
        "Rechercher par titre, entreprise, dépôt ou mot-clé",
      repositoryLabel: "Dépôt",
      repositoryPlaceholder: "Tous les dépôts",
      allRepositories: "Tous les dépôts",
      regionLabel: "Région",
      regionPlaceholder: "Toutes les régions",
      allRegions: "Toutes les régions",
      countryLabel: "Pays",
      countryPlaceholder: "Tous les pays",
      allCountries: "Tous les pays",
      tagsLabel: "Tags",
      tagsPlaceholder: "Ajouter un filtre de tag",
      noTagsSelected: "Aucun tag sélectionné",
      authorLabel: "Auteur de l'issue",
      authorPlaceholder: "Ajouter un filtre d'auteur",
      noAuthorsSelected: "Aucun auteur sélectionné",
      itemsPerPageLabel: "Éléments par page",
      itemsPerPagePlaceholder: "Éléments par page",
      itemsPerPageOption: "{count} éléments",
      sortLabel: "Trier par date",
      sortPlaceholder: "Trier par date",
      sortRecent: "Plus récentes",
      sortOldest: "Plus anciennes d'abord",
    },
    toolbar: {
      opportunitiesCount: "{count} opportunités",
      pageSummary: "{range} • Page {page} sur {totalPages}",
      sortPlaceholder: "Trier par date",
      sortRecent: "Plus récentes",
      sortOldest: "Plus anciennes d'abord",
    },
    list: {
      totalMatches: "{count} résultats au total",
      noMatchesTitle: "Aucun résultat pour les filtres actuels",
      noResultsTitle: "Aucune opportunité disponible",
      noMatchesDescription:
        "Essayez de retirer certains filtres ou d'ajuster votre recherche pour élargir les résultats.",
      noResultsDescription:
        "Les nouvelles opportunités apparaîtront ici dès que les sources seront chargées.",
      clearFilters: "Effacer les filtres",
      loadedPage: "Page {page} sur {totalPages} chargée",
      scrollToLoadMore: "Faites défiler pour charger plus",
      allResultsLoaded: "Tous les résultats sont chargés",
      loadingMore: "Chargement de nouvelles opportunités...",
    },
    viewMode: {
      ariaLabel: "Mode d'affichage",
      list: "Liste",
      grid: "Grille",
    },
    card: {
      statusOpen: "Ouverte",
      salaryPeriodMonth: "mois",
      salaryPeriodYear: "an",
      salaryPeriodHour: "heure",
      communityAvatarAlt: "Avatar de la communauté {name}",
      authorAvatarAlt: "Avatar de {name}",
    },
  },
  footer: {
    brandTagline: "Intelligence emploi portée par les communautés",
    description:
      "Nous indexons les offres tech publiées en issues GitHub par des communautés du Brésil, du Portugal, d'Angola, d'Amérique latine et d'autres écosystèmes.",
    supportText:
      "Construit en public pour les candidats, recruteurs et mainteneurs.",
    supportEmailButtonLabel: "Copier l'e-mail support",
    supportEmailCopied: "E-mail support copié.",
    supportEmailCopyError: "Impossible de copier l'e-mail support.",
    copyrightTemplate: "© {year} {brand}. Tous droits réservés.",
    signature: "powered by",
    groups: {
      project: "Projet",
      openSource: "Open Source",
      legal: "Mentions légales",
    },
    links: {
      overview: "Vue d'ensemble",
      apiReference: "Référence API",
      status: "Statut",
      github: "GitHub",
      contributing: "Contribuer",
      reportIssue: "Signaler un problème",
      privacyPolicy: "Politique de confidentialité",
      termsOfService: "Conditions d'utilisation",
    },
    social: {
      githubAriaLabel: "Ouvrir openings.dev sur GitHub",
    },
  },
  documents: {
    sourceLabel: "Fichier source : {file}",
    overview: {
      title: "Vue d'ensemble",
      description:
        "Comment openings.dev collecte, normalise et sert des données globales d'offres tech.",
    },
    apiReference: {
      title: "Référence API",
      description:
        "Endpoints clés, filtres et formats de réponse de l'API publique.",
    },
    contributing: {
      title: "Contribuer",
      description:
        "Comment proposer des dépôts, signaler des problèmes et contribuer proprement.",
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Comment nous collectons, utilisons et protégeons les données de la plateforme.",
    },
    terms: {
      title: "Conditions d'utilisation",
      description:
        "Règles et responsabilités liées à l'usage de openings.dev et de son API publique.",
    },
  },
};
