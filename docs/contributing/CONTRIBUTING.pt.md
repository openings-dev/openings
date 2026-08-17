# Como contribuir com o openings.dev

Agradecemos por ajudar a melhorar o `openings.dev`.

## Escopo

Este repositório contém o front-end estático em Next.js. Ele não armazena nem gera dados de vagas.

Use este repositório para:

- Melhorias de UI e UX.
- Correções de rotas, páginas estáticas e acessibilidade.
- Melhorias nos serviços de dados remotos em `lib/opportunities`.
- Atualizações na documentação do front-end.

Use o repositório [`openings-dev/data`](https://github.com/openings-dev/data) para:

- Alterações no catálogo de repositórios de origem.
- Lógica de ingestão e normalização do GitHub.
- Geração de snapshots e arquivos da API estática.

## Regras para os dados

- Não adicione dados locais de vagas, conjuntos de dados simulados, fixtures, `db.json` nem snapshots em JSON ao front-end.
- Não importe arquivos `.json` locais para obter dados de vagas.
- Não recrie uma rota local `/api/opportunities`.
- Mantenha a construção das URLs de dados brutos em `lib/opportunities/static-api.ts`.
- Mantenha as leituras da API estática em `lib/opportunities/api.ts`.
- Mantenha as leituras de snapshots em `lib/opportunities/snapshot.ts`.

## Configuração do ambiente de desenvolvimento

Requisitos:

- Node.js `>=20.9.0`
- npm

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Crie um arquivo `.env.local` somente ao testar outra branch dos dados remotos:

```bash
NEXT_PUBLIC_OPENINGS_DATA_BASE_URL=https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL=https://raw.githubusercontent.com/openings-dev/data/main
```

## Estrutura do projeto

```txt
app/                      rotas do App Router e UI específica de cada rota
components/               estrutura compartilhada, providers, ícones e componentes de UI
lib/opportunities/        serviços de dados remotos, helpers de roteamento e tipos do domínio
lib/translations/         mensagens localizadas da interface
lib/utils/                utilitários compartilhados
docs/                     arquivos Markdown localizados renderizados pela aplicação
```

## Fluxo de pull requests

1. Crie uma branch a partir de `main`.
2. Mantenha a alteração focada.
3. Execute as verificações:

```bash
npm run lint
npm run build
```

4. Abra um pull request com:

- Um resumo claro.
- Capturas de tela para alterações visuais.
- Notas de teste com os comandos executados.
- Qualquer sobrescrita da fonte de dados usada durante os testes.

## Checklist do pull request

- [ ] Nenhum arquivo de dados local nem importação de JSON foi adicionado.
- [ ] O acesso aos dados remotos continua centralizado em `lib/opportunities`.
- [ ] Os componentes continuam focados e reutilizáveis.
- [ ] A documentação foi atualizada quando houve mudanças de comportamento ou configuração.
- [ ] `npm run lint` e `npm run build` passam localmente.

## Código de Conduta

Ao participar, você concorda em seguir o [Código de Conduta](https://github.com/openings-dev/openings/blob/main/CODE_OF_CONDUCT.md).
