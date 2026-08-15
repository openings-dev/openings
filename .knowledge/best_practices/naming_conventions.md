# Naming Conventions

> Keep files, symbols, imports, and commits consistent across Openings.

## Language

Code, identifiers, comments, technical documentation, and commit messages are in English. User-facing copy belongs in the translation dictionaries or localized Markdown documents.

## Files and folders

- App Router special files retain framework names such as `page.tsx`, `layout.tsx`, and `not-found.tsx`.
- Route and component folders use kebab-case.
- Ordinary React components live in a kebab-case folder with `index.tsx`.
- Component props live in a colocated `types.ts` when props exist, except for a component accepting only `children` through `PropsWithChildren`.
- Source files outside component entry points use lowercase kebab-case.
- Knowledge and specification files use snake_case except conventional `README.md` files and numbered spec prefixes.
- Do not create barrel files that only re-export symbols. Component `index.tsx` files are implementations, not barrels.

## Symbols

- Components, types, and enum names: PascalCase
- Functions, props, handlers, and runtime values: camelCase
- Fixed semantic values and module-level configuration: SCREAMING_SNAKE_CASE
- Boolean values: affirmative names such as `open`, `enabled`, `selected`, or `isLoading`
- Event props: `on` plus intent; local handlers: `handle` plus intent

## Types and closed values

Use shared domain types at a domain boundary rather than importing another component's prop types. Use string enums for stable, named closed sets that participate in comparisons, mappings, persisted values, or component variants. Use unions for structural composition and genuinely open combinations, not duplicated domain value sets.

Prefer `import type` when the symbol is erased at runtime. Avoid `any`, unsafe assertions, magic status values, and repeated literal unions.

## Imports

The `@/*` alias maps to the project root. Use relative imports inside a tight ownership boundary and `@/` when crossing feature or top-level boundaries. Import concrete modules rather than barrels.

## Commits

Use concise English conventional commits. Each refactor commit should describe one coherent boundary and must not claim a visual or behavioral change.
