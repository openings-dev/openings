# Openings Refactor Specifications

> Execute the repository-wide code refactor in ordered, behavior-preserving stages.

## Contract

Specs 00–13 refactor code without redesigning screens. Specs 14–24 record the earlier Calm Professional refinement. Specs 25–29 harden quality and accessibility. Specs 30–33 reposition community and user destinations as public, shareable profile pages and intentionally add `/users/[handle]`. Specs 34–40 replace the active visual baseline with Buffer Bold and the Soft Grape palette. None of these programs changes remote schemas or adds an automated test framework.

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
| 14 | [Calm Professional visual refinement design](14_visual_refinement_design.md) | 13 | Complete |
| 15 | [Visual baseline and audit](15_visual_baseline_and_audit.md) | 14 | Complete |
| 16 | [Visual foundations](16_visual_foundations.md) | 15 | Complete |
| 17 | [Shared controls and states](17_shared_controls_and_states.md) | 16 | Complete |
| 18 | [Shell, navigation, headers, and footer](18_shell_navigation_headers_and_footer.md) | 17 | Complete |
| 19 | [Opportunity filters and toolbar](19_opportunity_filters_and_toolbar.md) | 17, 18 | Complete |
| 20 | [Opportunity results and cards](20_opportunity_results_and_cards.md) | 16, 17, 19 | Complete |
| 21 | [Opportunity details and Markdown](21_opportunity_details_and_markdown.md) | 16, 17, 20 | Complete |
| 22 | [Community and user directories](22_community_and_user_directories.md) | 16–18 | Complete |
| 23 | [Documents and legal pages](23_documents_and_legal_pages.md) | 16–18 | Complete |
| 24 | [Responsive, accessibility, and final visual audit](24_responsive_accessibility_and_final_visual_audit.md) | 18–23 | Complete |
| 25 | [Repository-wide improvement audit](25_repository_wide_improvement_audit.md) | 24 | Complete |
| 26 | [Interaction semantics and accessibility](26_interaction_semantics_and_accessibility.md) | 25 | Complete |
| 27 | [Locale persistence and interface language](27_locale_persistence_and_interface_language.md) | 26 | Complete |
| 28 | [Metadata, contracts, and repository hygiene](28_metadata_contracts_and_repository_hygiene.md) | 27 | Complete |
| 29 | [Final improvement verification](29_final_improvement_verification.md) | 28 | Complete |
| 30 | [Shareable profile-page copy design](30_shareable_profile_page_copy_design.md) | 29 | Complete |
| 31 | [Community and user profile positioning](31_community_and_user_profile_positioning.md) | 30 | Complete |
| 32 | [Dedicated user pages and social metadata](32_dedicated_user_pages_and_social_metadata.md) | 31 | Complete |
| 33 | [Profile-copy final verification](33_profile_copy_final_verification.md) | 32 | Complete |
| 34 | [Buffer Bold visual redesign](34_buffer_bold_visual_redesign.md) | 33 | Complete |
| 35 | [Buffer Bold foundations and primitives](35_buffer_bold_foundations_and_primitives.md) | 34 | Complete |
| 36 | [Quick filters and advanced-filter modal](36_quick_filters_and_advanced_filter_modal.md) | 35 | Complete |
| 37 | [Buffer Bold shell and navigation](37_buffer_bold_shell_and_navigation.md) | 35 | Complete |
| 38 | [Buffer Bold opportunity surfaces](38_buffer_bold_opportunity_surfaces.md) | 36, 37 | Complete |
| 39 | [Buffer Bold directories and documents](39_buffer_bold_directories_and_documents.md) | 37 | Complete |
| 40 | [Buffer Bold responsive and final verification](40_buffer_bold_responsive_and_final_verification.md) | 35–39 | Complete |

## Global invariants

- `output: "export"` remains enabled.
- The frontend continues to read only public remote Openings data.
- Established routes, query parameters, compatibility redirects, locale behavior, accessibility, and user interactions remain compatible; `/users/[handle]` is the approved canonical user-profile route from Spec 32.
- Visual implementation follows the approved Buffer Bold design in Specs 34–40; Specs 14–24 remain historical context rather than the active baseline.
- No local opportunity data, API route, authentication system, backend proxy, unrelated product feature, or test framework is added.
- Every ordinary component ends in its own kebab-case folder with `index.tsx`.
- Every stage passes its required validations before the next stage begins.

## Validation levels

- Source-only refactor: `npm run lint`
- Rendering, route, data, asset, or configuration refactor: `npm run lint && npm run build`
- Maintainer document changes: add `npm run test:outreach`
- Final stage: run all available commands separately and record their exit status

## Execution guidance

Each plan is designed for task-by-task execution. Check off steps in the active file, review its diff before committing, and use the listed commit boundary. Do not combine unrelated stages into a large commit.
