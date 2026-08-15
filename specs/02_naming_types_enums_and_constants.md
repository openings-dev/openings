# Naming, Types, Enums, and Constants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize source structure and closed domain values before deeper feature refactors.

**Architecture:** Move component implementations into their required folders, separate component props from shared domain types, and replace repeated closed literal sets with concrete enums and typed constants. Preserve all serialized values and import behavior.

**Tech Stack:** TypeScript, React 19, Next.js App Router

---

### Task 1: Normalize shared component file structure

**Files:**
- Move: `components/ui/button.tsx` to `components/ui/button/index.tsx`
- Create: `components/ui/button/types.ts`, `components/ui/button/constants.ts`
- Move: `components/ui/select.tsx` to `components/ui/select/index.tsx`
- Create: component-owned folders and `types.ts` files for each exported Select subcomponent that remains independently named
- Move: `components/ui/sonner.tsx` to `components/ui/sonner/index.tsx`
- Move: `components/icons/github.tsx` to `components/icons/github/index.tsx`
- Modify: every importing source file

- [ ] **Step 1: Inventory exports and imports**

Search each source path and list its exported runtime symbols, types, and consumers. Preserve the same public symbols while imports migrate to component folders.

- [ ] **Step 2: Move Button responsibilities**

Keep the `Button` implementation in `index.tsx`, component props in `types.ts`, and genuine CVA variant configuration in `constants.ts`. Preserve `asChild`, every current size and variant value, focus behavior, and disabled behavior.

- [ ] **Step 3: Move Select responsibilities**

Keep each React component in a kebab-case folder when it is a separately named component. Keep Radix composition and ref behavior unchanged. Do not create a barrel-only `index.ts`.

- [ ] **Step 4: Move Toaster and GitHub icon**

Keep Toaster as a focused client component. Keep the custom GitHub mark because it is a brand icon; preserve SVG view box, accessible propagation, and visual dimensions.

- [ ] **Step 5: Update concrete imports**

Update all consumers to import component folders or concrete support files. Search the repository for old `.tsx` paths and expect zero matches.

### Task 2: Normalize route-shared component structure

**Files:**
- Refactor: `app/_components/directory/*.tsx`
- Refactor: `app/_components/location-filters/*.tsx`
- Refactor: `app/_components/document-page/create-project-document-page.tsx`
- Modify: all consumers under `app/community`, `app/users`, and `app/docs`

- [ ] **Step 1: Give every ordinary component a folder**

Move `directory-entity-card`, `directory-list-shell`, `directory-screen-layout`, `location-filters-panel`, and the document-page factory into kebab-case component or functional module boundaries. Use `index.tsx` only for React implementations.

- [ ] **Step 2: Remove route-shared barrels**

Replace `app/_components/directory/index.ts` and `app/_components/location-filters/index.ts` with concrete imports, then remove the barrel files. Expected: no `index.ts` remains solely to re-export symbols.

- [ ] **Step 3: Colocate props**

Move component-only props into each component's `types.ts`. Keep reusable directory item and location-filter domain shapes at the nearest shared feature boundary rather than importing one component's props from another.

### Task 3: Normalize closed values and shared types

**Files:**
- Refactor: `lib/constants/locales.ts`
- Split: `lib/opportunities/types.ts`
- Split: `lib/translations/types.ts` only when focused files reduce responsibility without creating barrels
- Modify: consumers under `app/`, `components/`, and `lib/`

- [ ] **Step 1: Introduce stable enums**

Represent locale codes, opportunity sort order, view mode, source type, and other repeated closed comparison sets as string enums. Preserve serialized values exactly: locale URL/data values remain `en`, `pt`, `es`, `it`, `fr`, and `de`; sort and view query values remain unchanged.

- [ ] **Step 2: Split opportunity domain types**

Create focused kebab-case files for opportunity items, people, communities, salary, facets, user summaries, and community summaries when each has independent consumers. Import the concrete type file; do not replace the original broad file with a barrel.

- [ ] **Step 3: Type constant mappings**

Use exhaustive module-level `Record` values for enum-to-label, enum-to-query, and enum-to-style mappings. Use `Partial<Record<...>>` only where missing keys have an explicit fallback.

- [ ] **Step 4: Verify naming**

Search ordinary source filenames for uppercase or space-containing names, barrel-only exports, raw comparisons against migrated closed strings, and `any`. Resolve matches inside this specification's scope.

### Task 4: Validate and commit

**Files:**
- Modify: all files changed above

- [ ] **Step 1: Run lint**

Run: `npm run lint`

Expected: exit code 0 with no unresolved imports or unsafe enum comparisons.

- [ ] **Step 2: Run build**

Run: `npm run build`

Expected: exit code 0 with the same route set recorded in Spec 01.

- [ ] **Step 3: Commit**

Run: `git add app components lib && git commit -m "refactor: normalize source conventions"`

Expected: one structural refactor commit with no documentation or visual changes.
