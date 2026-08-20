# Visión general de openings.dev

`openings.dev` ayuda a encontrar vacantes tecnológicas que ya se comparten en comunidades públicas de GitHub. Reúne los anuncios en una interfaz de búsqueda y conserva el enlace a la fuente original de cada vacante.

La disponibilidad y los pasos para presentar una candidatura pueden cambiar. Compruébalos siempre en la publicación original.

## Qué puedes hacer

- Buscar vacantes abiertas por texto, repositorio, ubicación, etiquetas o cuenta de GitHub autora del anuncio.
- Ordenar los resultados y elegir entre las vistas de lista y cuadrícula.
- Consultar páginas de comunidades y autores creadas a partir de sus anuncios indexados.
- Abrir una vacante mediante el parámetro compartible `?job=<id>` en la página de búsqueda.
- Volver a la publicación y al repositorio de origen para comprobar los detalles actuales.

## Cómo funciona

1. El pipeline independiente `openings-dev/data-pipeline` lee las fuentes públicas de las comunidades de GitHub configuradas.
2. Normaliza los anuncios compatibles y genera archivos JSON estáticos con páginas, facetas, índices de búsqueda y detalles de las vacantes.
3. Publica esos archivos en GitHub. El front-end los lee desde `raw.githubusercontent.com`.
4. La interfaz resuelve la búsqueda, los filtros, el orden y la paginación a partir de esos archivos.
5. Las páginas estáticas de comunidades y autores se generan con el mismo conjunto de datos durante el build.

## Arquitectura del front-end

El front-end usa Next.js App Router y se exporta como sitio estático. No contiene una API local de vacantes ni guarda una copia local del inventario.

- `app/` contiene las rutas y las pantallas propias de cada ruta.
- `components/` contiene la estructura compartida y los componentes reutilizables.
- `lib/opportunities/` se ocupa de las URLs remotas, la validación, la normalización, las consultas y los tipos del dominio.
- `lib/utils/` contiene utilidades independientes del framework.
- `docs/` y los archivos Markdown de la raíz proporcionan el contenido de documentación y políticas.

## Límites del producto

- Front-end: `openings-dev/web`.
- Pipeline de datos y archivos JSON estáticos: `openings-dev/data-pipeline`.
- Fuentes: publicaciones públicas compatibles de comunidades de GitHub.
- Datos locales de vacantes en el front-end: ninguno.
- Ruta local de API para vacantes: ninguna.

Openings es una herramienta de descubrimiento. No verifica a los empleadores, no recibe candidaturas y no sustituye la publicación original.
