# Cómo contribuir a openings.dev

Gracias por ayudar a mejorar `openings.dev`.

## Alcance

Este repositorio contiene el front-end estático en Next.js. No almacena ni genera datos de vacantes.

Usa este repositorio para:

- Mejoras de UI y UX.
- Correcciones de rutas, páginas estáticas y accesibilidad.
- Mejoras en los servicios de datos remotos de `lib/opportunities`.
- Actualizaciones de la documentación del front-end.

Usa [`openings-dev/data-pipeline`](https://github.com/openings-dev/data-pipeline) para:

- Cambios en el catálogo de repositorios de origen.
- Lógica de ingesta y normalización de GitHub.
- Generación de snapshots y archivos de la API estática.

## Reglas de datos

- No añadas datos locales de vacantes, conjuntos de datos simulados, fixtures, `db.json` ni snapshots JSON al front-end.
- No importes archivos `.json` locales para obtener datos de vacantes.
- No vuelvas a introducir una ruta local `/api/opportunities`.
- Mantén la construcción de las URLs de datos sin procesar en `lib/opportunities/static-api.ts`.
- Mantén las lecturas de la API estática en `lib/opportunities/api.ts`.
- Mantén las lecturas de snapshots en `lib/opportunities/snapshot.ts`.

## Configuración del entorno de desarrollo

Requisitos:

- Node.js `>=20.9.0`
- npm

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

Crea un archivo `.env.local` solo cuando pruebes otra rama de datos remotos:

```bash
NEXT_PUBLIC_OPENINGS_DATA_BASE_URL=https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities
NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL=https://raw.githubusercontent.com/openings-dev/data-pipeline/main
```

## Estructura del proyecto

```txt
app/                      rutas del App Router e interfaz específica de cada ruta
components/               estructura compartida, providers, iconos y componentes de UI
lib/opportunities/        servicios de datos remotos, helpers de enrutamiento y tipos del dominio
lib/translations/         mensajes localizados de la interfaz
lib/utils/                utilidades compartidas
docs/                     archivos Markdown localizados que renderiza la aplicación
```

## Flujo de pull requests

1. Crea una rama a partir de `main`.
2. Mantén el cambio enfocado.
3. Ejecuta las comprobaciones:

```bash
npm run lint
npm run build
```

4. Abre un pull request con:

- Un resumen claro.
- Capturas de pantalla para los cambios visuales.
- Notas de prueba que enumeren los comandos ejecutados.
- Cualquier sustitución de la fuente de datos que hayas usado durante las pruebas.

## Lista de comprobación del pull request

- [ ] No se han añadido archivos de datos locales ni importaciones de JSON.
- [ ] El acceso a datos remotos sigue centralizado en `lib/opportunities`.
- [ ] Los componentes se mantienen enfocados y reutilizables.
- [ ] La documentación se ha actualizado cuando ha cambiado el comportamiento o la configuración.
- [ ] `npm run lint` y `npm run build` se ejecutan correctamente en local.

## Código de conducta

Al participar, aceptas seguir el [Código de conducta](https://github.com/openings-dev/web/blob/main/CODE_OF_CONDUCT.md).
