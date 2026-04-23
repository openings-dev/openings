import type { TranslationMessages } from "./types";

export const ptTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Inteligência global de vagas em tecnologia alimentada por comunidades",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Inteligência de vagas movida por comunidades",
    languagePlaceholder: "Idioma",
    languageAriaLabel: "Selecionar idioma",
    languageChanged: "Idioma alterado para {language}.",
  },
  home: {
    kicker: "Inteligência open source de vagas",
    title: "Vagas de tecnologia no GitHub das comunidades, em um só lugar",
    description:
      "O openings.dev acompanha issues de vagas em comunidades confiáveis, normaliza cada anúncio e permite filtrar por stack, senioridade, localização e política remota sem precisar pular entre repositórios.",
  },
  opportunities: {
    header: {
      kicker: "Explorador de vagas",
      title: "Descubra vagas premium em tecnologia",
      description:
        "Pesquise comunidades e repositórios com filtros de alto sinal, alterne entre visualização em lista e grid, e analise oportunidades com clareza no estilo GitHub e acabamento refinado.",
    },
    feedback: {
      filtersReset: "Filtros redefinidos",
      loadError: "Não foi possível carregar vagas ao vivo do GitHub.",
      loadMoreError: "Não foi possível carregar mais vagas do GitHub.",
      rateLimited:
        "Limite da API do GitHub atingido. Aguarde alguns minutos e tente novamente.",
    },
    range: {
      zeroResults: "0 resultados",
      rangeOfTotal: "{start}-{end} de {total}",
    },
    filters: {
      ariaLabel: "Filtros de oportunidades",
      title: "Filtros",
      activeCount: "{count} ativos",
      hide: "Ocultar filtros",
      show: "Mostrar filtros",
      reset: "Limpar",
      searchLabel: "Buscar oportunidade",
      searchPlaceholder: "Busque por título, empresa, repositório ou palavra-chave",
      repositoryLabel: "Repositório",
      repositoryPlaceholder: "Todos os repositórios",
      allRepositories: "Todos os repositórios",
      regionLabel: "Região",
      regionPlaceholder: "Todas as regiões",
      allRegions: "Todas as regiões",
      countryLabel: "País",
      countryPlaceholder: "Todos os países",
      allCountries: "Todos os países",
      tagsLabel: "Tags",
      tagsPlaceholder: "Adicionar filtro de tag",
      noTagsSelected: "Nenhuma tag selecionada",
      authorLabel: "Autor da issue",
      authorPlaceholder: "Adicionar filtro de autor",
      noAuthorsSelected: "Nenhum autor selecionado",
      itemsPerPageLabel: "Itens por página",
      itemsPerPagePlaceholder: "Itens por página",
      itemsPerPageOption: "{count} itens",
      sortLabel: "Ordenar por data",
      sortPlaceholder: "Ordenar por data",
      sortRecent: "Mais recentes",
      sortOldest: "Mais antigas",
    },
    toolbar: {
      opportunitiesCount: "{count} oportunidades",
      pageSummary: "{range} • Página {page} de {totalPages}",
      sortPlaceholder: "Ordenar por data",
      sortRecent: "Mais recentes",
      sortOldest: "Mais antigas",
    },
    list: {
      totalMatches: "{count} resultados no total",
      noMatchesTitle: "Nenhum resultado para os filtros atuais",
      noResultsTitle: "Nenhuma oportunidade disponível",
      noMatchesDescription:
        "Tente remover alguns filtros ou ajustar sua busca para ampliar os resultados.",
      noResultsDescription:
        "Novas oportunidades aparecerão aqui assim que as fontes forem carregadas.",
      clearFilters: "Limpar filtros",
      loadedPage: "Página {page} de {totalPages} carregada",
      scrollToLoadMore: "Role para carregar mais",
      allResultsLoaded: "Todos os resultados carregados",
      loadingMore: "Carregando mais oportunidades...",
    },
    viewMode: {
      ariaLabel: "Modo de visualização",
      list: "Lista",
      grid: "Grade",
    },
    card: {
      statusOpen: "Aberta",
      salaryPeriodMonth: "mês",
      salaryPeriodYear: "ano",
      salaryPeriodHour: "hora",
      communityAvatarAlt: "Avatar da comunidade {name}",
      authorAvatarAlt: "Avatar de {name}",
    },
  },
  footer: {
    brandTagline: "Inteligência de vagas movida por comunidades",
    description:
      "Indexamos vagas de tecnologia publicadas como issues no GitHub por comunidades do Brasil, Portugal, Angola, LATAM e outros ecossistemas.",
    supportText:
      "Construído em público para candidatos, recrutadores e mantenedores.",
    supportEmailButtonLabel: "Copiar e-mail de suporte",
    supportEmailCopied: "E-mail de suporte copiado.",
    supportEmailCopyError: "Não foi possível copiar o e-mail de suporte.",
    copyrightTemplate: "© {year} {brand}. Todos os direitos reservados.",
    signature: "powered by",
    groups: {
      project: "Projeto",
      openSource: "Open Source",
      legal: "Legal",
    },
    links: {
      overview: "Visão geral",
      apiReference: "Referência da API",
      status: "Status",
      github: "GitHub",
      contributing: "Contribuição",
      reportIssue: "Reportar problema",
      privacyPolicy: "Política de Privacidade",
      termsOfService: "Termos de Serviço",
    },
    social: {
      githubAriaLabel: "Abrir openings.dev no GitHub",
    },
  },
  documents: {
    sourceLabel: "Arquivo de origem: {file}",
    overview: {
      title: "Visão geral",
      description:
        "Como o openings.dev coleta, normaliza e entrega dados globais de vagas em tecnologia.",
    },
    apiReference: {
      title: "Referência da API",
      description:
        "Endpoints principais, filtros e contratos de resposta da API pública de vagas.",
    },
    contributing: {
      title: "Contribuição",
      description:
        "Como sugerir repositórios, reportar problemas e contribuir com segurança.",
    },
    privacy: {
      title: "Política de Privacidade",
      description: "Como coletamos, usamos e protegemos dados na plataforma.",
    },
    terms: {
      title: "Termos de Serviço",
      description:
        "Regras e responsabilidades para uso do openings.dev e da API pública.",
    },
  },
};
