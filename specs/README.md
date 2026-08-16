# Openings Refactor Specifications

> Execute the repository-wide code refactor in ordered, behavior-preserving stages.

## Contract

These specifications refactor code only. They do not redesign screens, change product behavior, alter public routes or remote schemas, or add an automated test framework. Equivalent Tailwind and Lucide substitutions are allowed.

Before each specification, confirm the previous one is complete and read the relevant [knowledge documents](../.knowledge/README.md). If current code has moved, update exact paths in the active spec before implementation without expanding its architectural scope.

## Order and status

| Order | Specification | Depends on | Status |
| --- | --- | --- | --- |
| 00 | [Documentation and refactor design](00_documentation_and_refactor_design.md) | — | Complete |
| 01 | [Baseline and invariants](01_baseline_and_invariants.md) | 00 | Complete |
| 02 | [Naming, types, enums, and constants](02_naming_types_enums_and_constants.md) | 01 | Complete |
| 03 | [Tailwind and styling architecture](03_tailwind_and_styling_architecture.md) | 02 | Complete |
| 04 | [Shared primitives and providers](04_shared_primitives_and_providers.md) | 03 | Complete |
| 05 | [Application shell, header, and footer](05_shell_header_and_footer.md) | 04 | Complete |
| 06 | [Markdown content and document routes](06_markdown_content_and_document_routes.md) | 02 | Complete |
| 07 | [Internationalization](07_internationalization.md) | 02, 04 | Complete |
| 08 | [Remote data and domain models](08_remote_data_and_domain_models.md) | 02 | Complete |
| 09 | [Community and user directories](09_community_and_user_directories.md) | 04, 07, 08 | Complete |
| 10 | [Opportunity controller and filter state](10_opportunity_controller_and_filter_state.md) | 07, 08 | Complete |
| 11 | [Opportunity presentation](11_opportunity_presentation.md) | 03, 04, 10 | Complete |
| 12 | [Routes and rendering boundaries](12_routes_and_rendering_boundaries.md) | 05–11 | Complete |
| 13 | [Cleanup and final verification](13_cleanup_and_final_verification.md) | 12 | Complete |

## Global invariants

- `output: "export"` remains enabled.
- The frontend continues to read only public remote Openings data.
- Existing routes, query parameters, compatibility redirects, locale behavior, themes, responsive layouts, motion, accessibility, and user interactions remain equivalent.
- No local opportunity data, API route, authentication system, backend proxy, visual redesign, or test framework is added.
- Every ordinary component ends in its own kebab-case folder with `index.tsx`.
- Every stage passes its required validations before the next stage begins.

## Validation levels

- Source-only refactor: `npm run lint`
- Rendering, route, data, asset, or configuration refactor: `npm run lint && npm run build`
- Maintainer document changes: add `npm run test:outreach`
- Final stage: run all available commands separately and record their exit status

## Execution guidance

Each plan is designed for task-by-task execution. Check off steps in the active file, review its diff before committing, and use the listed commit boundary. Do not combine unrelated stages into a large commit.
