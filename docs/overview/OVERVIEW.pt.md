# Visão geral do openings.dev

O Openings ajuda pessoas a encontrar vagas de tecnologia publicadas em comunidades públicas no GitHub. Os anúncios ficam mais fáceis de buscar sem substituir sua fonte original.

O front-end usa o Next.js App Router e é exportado como páginas estáticas. Ele não armazena dados de vagas localmente. A aplicação consome arquivos JSON brutos publicados pelo repositório separado `openings-dev/data` como uma interface pública de dados estáticos.

## O que a plataforma faz

- Lista vagas de tecnologia abertas publicadas em repositórios públicos configurados no GitHub.
- Oferece filtros por repositório, região, país, tags e autores no GitHub, além de opções de ordenação e visualização.
- Gera páginas estáticas de comunidades e autores com base nos dados remotos. Os detalhes de uma vaga são abertos na rota de descoberta pelo parâmetro `?job=<id>`.
- Renderiza a documentação do projeto e as páginas de políticas a partir de arquivos Markdown locais.
- Preserva a procedência dos dados com links para o anúncio público e o repositório de origem.

## Fluxo de dados

1. O pipeline `openings-dev/data` lê os repositórios públicos do GitHub configurados.
2. O pipeline normaliza os anúncios públicos, cria as facetas, grava os arquivos paginados e os publica no GitHub.
3. O front-end lê esses arquivos em `raw.githubusercontent.com`.
4. A filtragem e a paginação da interface resolvem IDs, páginas e grupos de detalhes de vagas por meio dos dados estáticos remotos.
5. Os parâmetros estáticos das páginas de comunidades e autores são gerados a partir dos mesmos dados durante o build.

## Limites atuais

- Front-end: `openings-dev/openings`.
- Pipeline e dados estáticos brutos: `openings-dev/data`.
- Arquivos locais de dados de vagas no front-end: nenhum.
- Rota local de API para vagas: nenhuma.
- Tipos de fonte aceitos: issues, discussões e painéis públicos de comunidades no GitHub.

## Resumo da arquitetura

- `app/` contém as rotas e as telas específicas de cada rota.
- `components/` contém a estrutura compartilhada da aplicação e os componentes de interface reutilizáveis.
- `lib/opportunities/` contém os serviços de dados remotos, os helpers de roteamento e os tipos do domínio de vagas.
- `lib/utils/` contém utilitários independentes de framework.
- `docs/` e os arquivos Markdown na raiz fornecem o conteúdo das rotas de documentação.

## Escopo atual

O projeto facilita a descoberta de vagas públicas de tecnologia que já foram publicadas em repositórios de comunidades. Ele não é um ATS empresarial, uma plataforma de currículos nem um substituto para o repositório de origem.
