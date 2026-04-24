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
    nav: {
      discover: "Descubrir",
      communities: "Comunidades",
      users: "Usuarios",
    },
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
  communities: {
    header: {
      kicker: "Comunidades",
      title: "Comunidades disponibles en el sistema",
      description:
        "Explora comunidades registradas, filtra por país y región, y abre cada comunidad para ver las oportunidades publicadas.",
    },
    filters: {
      title: "Filtros",
      country: "País",
      region: "Región",
      allCountries: "Todos los países",
      allRegions: "Todas las regiones",
      optionWithCount: "{label} ({count})",
      hide: "Ocultar filtros",
      show: "Mostrar filtros",
      clear: "Limpiar filtros",
    },
    list: {
      summary: "{count} comunidades encontradas",
      emptyTitle: "No hay comunidades para los filtros actuales",
      emptyDescription: "Ajusta país o región para ampliar los resultados.",
      repositoryLabel: "Repositorio",
      countryLabel: "País",
      regionLabel: "Región",
      opportunitiesCount: "{count} oportunidades abiertas",
      openCommunity: "Abrir comunidad",
    },
  },
  users: {
    header: {
      kicker: "Usuarios",
      title: "Usuarios activos en el sistema",
      description:
        "Explora autores registrados, filtra por país y región y abre el perfil para ver las oportunidades publicadas por cada persona.",
    },
    filters: {
      title: "Filtros",
      country: "País",
      region: "Región",
      allCountries: "Todos los países",
      allRegions: "Todas las regiones",
      optionWithCount: "{label} ({count})",
      hide: "Ocultar filtros",
      show: "Mostrar filtros",
      clear: "Limpiar filtros",
    },
    list: {
      summary: "{count} usuarios encontrados",
      emptyTitle: "No hay usuarios para los filtros actuales",
      emptyDescription: "Ajusta país o región para ampliar los resultados.",
      handleLabel: "Usuario",
      countryLabel: "País",
      regionLabel: "Región",
      opportunitiesCount: "{count} oportunidades abiertas",
      openUser: "Abrir perfil",
    },
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
      loadError: "No se pudieron cargar oportunidades desde la fuente de datos.",
      loadMoreError:
        "No se pudieron cargar más oportunidades desde la fuente de datos.",
      rateLimited:
        "La fuente de datos no está disponible temporalmente. Espera unos minutos e inténtalo de nuevo.",
    },
    range: {
      zeroResults: "0 resultados",
      rangeOfTotal: "{start}-{end} de {total}",
    },
    status: {
      ariaLabel: "Estado del snapshot de oportunidades",
      title: "Última actualización de la API",
      opportunitiesFound: "{count} oportunidades encontradas",
      updatedRelative: "Actualizado {relative}",
      updatedAt: "Última actualización: {date}",
      updatedUnavailable: "Hora de actualización no disponible",
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
      locationSectionLabel: "Ubicación",
      repositorySectionLabel: "Repositorio",
      repositoryLabel: "Repositorio",
      repositoryPlaceholder: "Todos los repositorios",
      allRepositories: "Todos los repositorios",
      regionLabel: "Región",
      regionPlaceholder: "Todas las regiones",
      allRegions: "Todas las regiones",
      countryLabel: "País",
      countryPlaceholder: "Todos los países",
      allCountries: "Todos los países",
      workModeLabel: "Modalidad de trabajo",
      workModePlaceholder: "Agregar modalidad",
      stackLabel: "Stack / Tecnología",
      stackPlaceholder: "Agregar stack",
      seniorityLabel: "Seniority",
      seniorityPlaceholder: "Agregar seniority",
      otherTagsLabel: "Otras etiquetas",
      otherTagsPlaceholder: "Agregar otra etiqueta",
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
      detailsLabel: "Detalles de la vacante",
      closeDetails: "Cerrar detalles",
      postedAt: "Publicada: {date}",
      updatedAt: "Actualizada: {date}",
      openOriginal: "Abrir publicación original",
      share: "Compartir vacante",
      shareCopied: "Enlace de la vacante copiado.",
      shareFailed: "No se pudo compartir esta vacante.",
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
      communities: "Comunidades",
      users: "Usuarios",
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
