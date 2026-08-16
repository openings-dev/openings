import type { TranslationMessages } from "./types";

export const frTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Offres tech partagées par des communautés GitHub, réunies au même endroit",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Offres partagées par des communautés GitHub",
    nav: {
      discover: "Découvrir",
      communities: "Communautés",
      users: "Utilisateurs",
    },
    primaryNavigationAriaLabel: "Navigation principale",
    switchToLightMode: "Passer au mode clair",
    switchToDarkMode: "Passer au mode sombre",
    languagePlaceholder: "Langue",
    languageAriaLabel: "Sélectionner la langue",
    languageChanged: "Langue définie sur {language}.",
  },
  home: {
    kicker: "Emploi porté par les communautés",
    title:
      "Des offres tech issues des communautés GitHub, réunies dans une seule recherche",
    description:
      "Trouvez les offres publiées dans les issues de communautés GitHub et filtrez par stack, expérience, lieu et télétravail sans passer d’un dépôt à l’autre.",
  },
  notFound: {
    kicker: "Introuvable",
    title: "Page introuvable",
    description: "La page demandée n’existe pas.",
    action: "Voir les opportunités",
  },
  communities: {
    header: {
      kicker: "Communautés",
      title: "Trouvez des opportunités par communauté",
      description:
        "Explorez les communautés GitHub qui partagent des postes ouverts et retrouvez toutes leurs opportunités au même endroit.",
      profileKicker: "Opportunités de la communauté",
      profileTitle: "Opportunités ouvertes chez {name}",
      profileDescription:
        "Consultez les postes partagés par {name}. Chaque annonce renvoie vers l’issue GitHub publique d’origine.",
    },
    filters: {
      title: "Filtres",
      country: "Pays",
      region: "Région",
      allCountries: "Tous les pays",
      allRegions: "Toutes les régions",
      optionWithCount: "{label} ({count})",
      hide: "Masquer les filtres",
      show: "Afficher les filtres",
      clear: "Effacer les filtres",
      searchPlaceholder: "Rechercher des communautés",
      sortLabel: "Trier les communautés",
      sortCount: "Plus d’opportunités",
      sortRecent: "Activité récente",
      sortName: "Nom A–Z",
    },
    list: {
      summary: "{count} communautés trouvées",
      emptyTitle: "Aucune communauté pour les filtres actuels",
      emptyDescription: "Ajustez pays ou région pour élargir les résultats.",
      repositoryLabel: "Dépôt",
      countryLabel: "Pays",
      regionLabel: "Région",
      opportunitiesCount: "{count} opportunités ouvertes",
      openCommunity: "Ouvrir la communauté",
    },
  },
  users: {
    header: {
      kicker: "Utilisateurs",
      title: "Trouvez des opportunités par auteur",
      description:
        "Découvrez les personnes qui partagent des opportunités dans les dépôts communautaires et consultez les postes ouverts de chaque profil.",
      profileKicker: "Profil de publication",
      profileTitle: "Opportunités partagées par {name}",
      profileDescription:
        "Consultez les postes ouverts partagés par @{handle} dans des dépôts publics de communautés GitHub.",
    },
    filters: {
      title: "Filtres",
      country: "Pays",
      region: "Région",
      allCountries: "Tous les pays",
      allRegions: "Toutes les régions",
      optionWithCount: "{label} ({count})",
      hide: "Masquer les filtres",
      show: "Afficher les filtres",
      clear: "Effacer les filtres",
      searchPlaceholder: "Rechercher des utilisateurs",
      sortLabel: "Trier les utilisateurs",
      sortCount: "Plus d’opportunités",
      sortRecent: "Activité récente",
      sortName: "Nom A–Z",
    },
    list: {
      summary: "{count} utilisateurs trouvés",
      emptyTitle: "Aucun utilisateur pour les filtres actuels",
      emptyDescription: "Ajustez pays ou région pour élargir les résultats.",
      handleLabel: "Utilisateur",
      countryLabel: "Pays",
      regionLabel: "Région",
      opportunitiesCount: "{count} opportunités ouvertes",
      openUser: "Ouvrir le profil",
    },
  },
  opportunities: {
    header: {
      kicker: "Explorateur d'opportunités",
      title: "Des offres tech, directement depuis GitHub.",
      description:
        "Découvrez les opportunités partagées par des communautés de confiance et filtrez selon ce qui compte pour vous.",
      opportunitiesLabel: "Opportunités",
      locationLabel: "Localisation",
      lastPostLabel: "Dernière publication",
    },
    feedback: {
      filtersReset: "Filtres réinitialisés",
      loadError: "Impossible de charger les opportunités depuis la source de données.",
      loadMoreError:
        "Impossible de charger davantage d'opportunités depuis la source de données.",
      rateLimited:
        "La source de données est temporairement indisponible. Réessayez dans quelques minutes.",
    },
    range: {
      zeroResults: "0 résultat",
      rangeOfTotal: "{start}-{end} sur {total}",
    },
    status: {
      ariaLabel: "Statut du snapshot d'opportunités",
      title: "Dernière mise à jour de l'API",
      opportunitiesFound: "{count} opportunités trouvées",
      updatedRelative: "Mis à jour {relative}",
      updatedAt: "Dernière mise à jour : {date}",
      updatedUnavailable: "Heure de mise à jour indisponible",
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
      locationSectionLabel: "Localisation",
      repositorySectionLabel: "Dépôt",
      repositoryLabel: "Dépôt",
      repositoryPlaceholder: "Tous les dépôts",
      allRepositories: "Tous les dépôts",
      regionLabel: "Région",
      regionPlaceholder: "Toutes les régions",
      allRegions: "Toutes les régions",
      countryLabel: "Pays",
      countryPlaceholder: "Tous les pays",
      allCountries: "Tous les pays",
      workModeLabel: "Mode de travail",
      workModePlaceholder: "Ajouter un mode",
      stackLabel: "Stack / Technologie",
      stackPlaceholder: "Ajouter une stack",
      seniorityLabel: "Séniorité",
      seniorityPlaceholder: "Ajouter une séniorité",
      otherTagsLabel: "Autres tags",
      otherTagsPlaceholder: "Ajouter un autre tag",
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
      detailsLabel: "Détails de l'opportunité",
      closeDetails: "Fermer les détails",
      postedAt: "Publiée : {date}",
      updatedAt: "Mise à jour : {date}",
      openOriginal: "Ouvrir l'annonce originale",
      share: "Partager l'opportunité",
      shareCopied: "Lien de l'opportunité copié.",
      shareFailed: "Impossible de partager cette opportunité.",
      salaryPeriodMonth: "mois",
      salaryPeriodYear: "an",
      salaryPeriodHour: "heure",
      communityAvatarAlt: "Avatar de la communauté {name}",
      authorAvatarAlt: "Avatar de {name}",
    },
  },
  footer: {
    brandTagline: "Offres partagées par des communautés GitHub",
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
      communities: "Communautés",
      users: "Utilisateurs",
      apiReference: "Référence API",
      maintainers: "Pour mainteneurs",
      status: "Statut",
      github: "GitHub",
      contributing: "Contribuer",
      reportIssue: "Signaler un problème",
      privacyPolicy: "Politique de confidentialité",
      termsOfService: "Conditions d'utilisation",
    },
    social: {
      linksAriaLabel: "Liens sociaux",
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
    maintainers: {
      title: "Pour mainteneurs",
      description:
        "Liens canoniques, extraits README, badges et messages de diffusion pour les communautés listées.",
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
