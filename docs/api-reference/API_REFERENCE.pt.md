# Referência da API

Este documento descreve a direção da API pública do openings.dev.

A API expõe o mesmo índice de vagas normalizado usado pela aplicação web, permitindo integrações, automações e análises em produtos de terceiros.

## Status

A API é pública e está em evolução contínua. Alguns contratos podem mudar conforme os filtros e regras de normalização amadurecem.

## Objetivos de design

- Schema consistente entre diferentes repositórios de origem.
- Paginação previsível para sincronização incremental.
- Identificadores estáveis para deduplicação.
- Campos explícitos para stack, senioridade, remoto e localização.

## Suporte

Para dúvidas e sugestões de integração:

- [GitHub Issues](https://github.com/openings-dev/openings/issues)
