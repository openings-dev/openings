# Referencia de API

Este documento describe la dirección de la API pública de openings.dev.

La API expone el mismo índice normalizado de vacantes usado por la aplicación web, para facilitar integraciones, automatizaciones y análisis en productos de terceros.

## Estado

La API es pública y evoluciona continuamente. Algunos contratos pueden cambiar mientras maduran filtros y reglas de normalización.

## Objetivos de diseño

- Esquema consistente entre repositorios de origen.
- Paginación predecible para sincronización incremental.
- Identificadores estables para deduplicación.
- Campos claros para stack, seniority, remoto y ubicación.

## Soporte

Para dudas o sugerencias de integración:

- [GitHub Issues](https://github.com/openings-dev/openings/issues)
