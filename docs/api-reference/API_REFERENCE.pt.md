# Referência de dados estáticos

O front-end do openings.dev consome arquivos JSON estáticos versionados, publicados pelo repositório `openings-dev/data-pipeline` por meio de URLs brutas do GitHub.

Não existe um endpoint local `/api/opportunities` no front-end. Os consumidores devem ler os arquivos estáticos brutos diretamente.

## URLs base

```txt
https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data-pipeline/main
```

Use a primeira URL base para os arquivos do índice de vagas. Use a segunda ao ler os metadados do catálogo de repositórios.

## Arquivos principais

```txt
api/manifest.json
api/order/recent.json
api/page-lookup.json
api/pages/page-0001.json
api/jobs/<bucket>.json
api/job-ids.json
api/facet-index.json
api/search-index.json
index.json
countries/<country-code>/index.json
countries/<country-code>/repositories/<repository-slug>.json
```

## Arquivo de manifest

`api/manifest.json` é o ponto de entrada para clientes que listam e filtram vagas.

Ele inclui:

- `generatedAt`: data e hora de geração do índice.
- `schemaVersion`: versão do schema da API estática.
- `dataHash`: hash de conteúdo usado para manter os arquivos relacionados na mesma versão dos dados.
- `pageSize`: número de vagas em cada arquivo de página.
- `totals`: totais de vagas abertas, páginas, repositórios, países e regiões em `openOpportunities`, `pages`, `repositories`, `countries` e `regions`.
- `files`: caminhos relativos de facetas, mapeamento de páginas, índice de pesquisa, IDs de vagas e ordenação por recência em `facets`, `pageLookup`, `search`, `jobIds` e `order`.
- `facets`: totais de primeiro nível em `repositories`, `regions`, `countries`, `tags` e `authors`.
- `pages`: lista ordenada das páginas, com `page`, `file` e `count`.

Exemplo:

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities";

const response = await fetch(`${baseUrl}/api/manifest.json`);
if (!response.ok) throw new Error(`Falha ao carregar o manifest: ${response.status}`);

const manifest = await response.json();
if (manifest.schemaVersion !== 3) {
  throw new Error(`Versão de schema incompatível: ${manifest.schemaVersion}`);
}
```

## Carregamento de listas

Use `api/order/recent.json` para obter os IDs das vagas na ordem padrão, da mais recente para a mais antiga. Em seguida, use `api/page-lookup.json` para mapear esses IDs para os arquivos de página.

Exemplo:

```ts
const [order, lookup] = await Promise.all([
  fetch(`${baseUrl}/api/order/recent.json`),
  fetch(`${baseUrl}/api/page-lookup.json`),
]);

if (!order.ok || !lookup.ok) throw new Error("Não foi possível carregar os índices");

const [orderData, lookupData] = await Promise.all([
  order.json(),
  lookup.json(),
]);

const firstId = orderData.ids[0];
const pageFile = lookupData.pageLookup[firstId];
const pageResponse = await fetch(`${baseUrl}/${pageFile}`);
if (!pageResponse.ok) throw new Error(`Falha ao carregar a página: ${pageResponse.status}`);
const page = await pageResponse.json();
```

## Detalhes das vagas

`api/job-ids.json` lista os IDs estáticos das vagas. Os registros detalhados são agrupados pelos dois primeiros caracteres depois do prefixo `gh_`.

Exemplo:

```ts
const id = "gh_d84189d3af685f86cfe258c9";
const bucket = id.replace(/^gh_/, "").slice(0, 2);
const detailsResponse = await fetch(`${baseUrl}/api/jobs/${bucket}.json`);
if (!detailsResponse.ok) {
  throw new Error(`Falha ao carregar a vaga: ${detailsResponse.status}`);
}
const details = await detailsResponse.json();

const opportunity = details.items[id];
```

## Catálogo de repositórios

A validação do filtro de repositórios lê o catálogo em:

```txt
https://raw.githubusercontent.com/openings-dev/data-pipeline/main/src/modules/catalog/repositories.json
```

## Observações sobre o contrato de dados

- Os dados são gerados a partir de fontes públicas do GitHub.
- O front-end não usa dados JSON locais nem mocks.
- Os arquivos brutos são recursos estáticos que podem ser armazenados em cache.
- Os clientes devem tratar `generatedAt` como o indicador de atualização.
- Verifique `schemaVersion` antes de consumir os campos. Uma nova versão pode alterar o contrato.
- `dataHash` identifica o conjunto de arquivos estáticos compatíveis de uma versão publicada do índice.
- A disponibilidade reflete o índice publicado. Mantenha o link para o anúncio original, onde as pessoas podem conferir os detalhes atuais e os próximos passos.

## Suporte

Abra uma issue para tirar dúvidas sobre os dados estáticos ou propor mudanças no contrato:

- [Formulários de issue no GitHub](https://github.com/openings-dev/web/issues/new/choose)
