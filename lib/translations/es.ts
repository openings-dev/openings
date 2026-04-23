import type { TranslationMessages } from "./types";

export const esTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Inteligencia global de empleos tech impulsada por comunidades",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Inteligencia laboral impulsada por comunidades",
    languagePlaceholder: "Idioma",
    languageAriaLabel: "Seleccionar idioma",
    languageChanged: "Idioma actualizado a {language}.",
  },
  home: {
    kicker: "Inteligencia open source de empleos",
    title:
      "Empleos tech de repositorios comunitarios de GitHub, en un solo lugar",
    description:
      "openings.dev sigue issues de empleo publicados por comunidades confiables, normaliza cada vacante y permite filtrar por stack, seniority, ubicación y política remota sin saltar entre repositorios.",
  },
  opportunities: {
    header: {
      kicker: "Explorador de oportunidades",
      title: "Descubre vacantes tech premium",
      description:
        "Busca comunidades y repositorios con filtros de alta señal, alterna entre vista de lista y cuadrícula, y revisa oportunidades con claridad tipo GitHub y acabado refinado.",
    },
    feedback: {
      filtersReset: "Filtros restablecidos",
      loadError: "No se pudieron cargar oportunidades en vivo desde GitHub.",
      loadMoreError: "No se pudieron cargar más oportunidades desde GitHub.",
      rateLimited:
        "Se alcanzó el límite de la API de GitHub. Espera unos minutos e inténtalo de nuevo.",
    },
    range: {
      zeroResults: "0 resultados",
      rangeOfTotal: "{start}-{end} de {total}",
    },
    filters: {
      ariaLabel: "Filtros de oportunidades",
      title: "Filtros",
      activeCount: "{count} activos",
      hide: "Ocultar filtros",
      show: "Mostrar filtros",
      reset: "Restablecer",
      searchLabel: "Buscar oportunidad",
      searchPlaceholder: "Busca por título, empresa, repositorio o palabra clave",
      repositoryLabel: "Repositorio",
      repositoryPlaceholder: "Todos los repositorios",
      allRepositories: "Todos los repositorios",
      regionLabel: "Región",
      regionPlaceholder: "Todas las regiones",
      allRegions: "Todas las regiones",
      countryLabel: "País",
      countryPlaceholder: "Todos los países",
      allCountries: "Todos los países",
      tagsLabel: "Etiquetas",
      tagsPlaceholder: "Agregar filtro de etiqueta",
      noTagsSelected: "No hay etiquetas seleccionadas",
      authorLabel: "Autor del issue",
      authorPlaceholder: "Agregar filtro de autor",
      noAuthorsSelected: "No hay autores seleccionados",
      itemsPerPageLabel: "Elementos por página",
      itemsPerPagePlaceholder: "Elementos por página",
      itemsPerPageOption: "{count} elementos",
      sortLabel: "Ordenar por fecha",
      sortPlaceholder: "Ordenar por fecha",
      sortRecent: "Más recientes",
      sortOldest: "Más antiguos primero",
    },
    toolbar: {
      opportunitiesCount: "{count} oportunidades",
      pageSummary: "{range} • Página {page} de {totalPages}",
      sortPlaceholder: "Ordenar por fecha",
      sortRecent: "Más recientes",
      sortOldest: "Más antiguos primero",
    },
    list: {
      totalMatches: "{count} coincidencias totales",
      noMatchesTitle: "No hay coincidencias para los filtros actuales",
      noResultsTitle: "No hay oportunidades disponibles",
      noMatchesDescription:
        "Prueba quitar algunos filtros o ajustar tu búsqueda para ampliar los resultados.",
      noResultsDescription:
        "Nuevas oportunidades aparecerán aquí en cuanto se carguen las fuentes.",
      clearFilters: "Limpiar filtros",
      loadedPage: "Página {page} de {totalPages} cargada",
      scrollToLoadMore: "Desplázate para cargar más",
      allResultsLoaded: "Todos los resultados cargados",
      loadingMore: "Cargando más oportunidades...",
    },
    viewMode: {
      ariaLabel: "Modo de vista",
      list: "Lista",
      grid: "Cuadrícula",
    },
    card: {
      statusOpen: "Abierta",
      salaryPeriodMonth: "mes",
      salaryPeriodYear: "año",
      salaryPeriodHour: "hora",
      communityAvatarAlt: "Avatar de la comunidad {name}",
      authorAvatarAlt: "Avatar de {name}",
    },
  },
  footer: {
    brandTagline: "Inteligencia laboral impulsada por comunidades",
    description:
      "Indexamos empleos tech publicados como issues de GitHub en comunidades de Brasil, Portugal, Angola, LATAM y otros ecosistemas.",
    supportText:
      "Construido en público para candidatos, reclutadores y mantenedores.",
    supportEmailButtonLabel: "Copiar correo de soporte",
    supportEmailCopied: "Correo de soporte copiado.",
    supportEmailCopyError: "No se pudo copiar el correo de soporte.",
    copyrightTemplate: "© {year} {brand}. Todos los derechos reservados.",
    signature: "powered by",
    groups: {
      project: "Proyecto",
      openSource: "Open Source",
      legal: "Legal",
    },
    links: {
      overview: "Resumen",
      apiReference: "Referencia de API",
      status: "Estado",
      github: "GitHub",
      contributing: "Contribuir",
      reportIssue: "Reportar problema",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
    },
    social: {
      githubAriaLabel: "Abrir openings.dev en GitHub",
    },
  },
  documents: {
    sourceLabel: "Archivo fuente: {file}",
    overview: {
      title: "Resumen",
      description:
        "Cómo openings.dev recopila, normaliza y entrega datos globales de empleo tech.",
    },
    apiReference: {
      title: "Referencia de API",
      description:
        "Endpoints principales, filtros y contratos de respuesta de la API pública de empleos.",
    },
    contributing: {
      title: "Contribuir",
      description:
        "Cómo proponer repositorios, reportar problemas y contribuir de forma segura.",
    },
    privacy: {
      title: "Política de Privacidad",
      description:
        "Cómo recopilamos, usamos y protegemos datos en la plataforma.",
    },
    terms: {
      title: "Términos de Servicio",
      description:
        "Reglas y responsabilidades para usar openings.dev y su API pública.",
    },
  },
};
