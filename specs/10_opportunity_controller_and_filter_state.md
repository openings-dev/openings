# Opportunity Controller and Filter State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the oversized opportunity controller with cohesive URL, remote-page, filter, derivation, and command boundaries.

**Architecture:** One feature facade composes focused hooks and pure controller modules. URL state remains the shareable source of truth; remote pagination remains cancellable; presentation receives a stable explicit view model and commands rather than internal setters.

**Tech Stack:** React 19 hooks, Next.js navigation, TypeScript, native fetch

---

### Task 1: Define the controller facade contract

**Files:**
- Refactor: `app/opportunities/_components/opportunities-screen/controller/use-opportunities-screen-controller.ts`
- Refactor: `app/opportunities/_components/opportunities-screen/types/props-types.ts`
- Refactor: `app/opportunities/_components/opportunities-screen/types/filter-types.ts`

- [x] **Step 1: Inventory controller consumers**

List every field consumed by OpportunitiesScreen and its descendants. Classify each as remote data, URL filter, ephemeral UI state, derived view data, or command.

- [x] **Step 2: Define explicit grouped outputs**

Return cohesive typed groups such as result state, filter state, panel/drawer state, and commands. Preserve every consumed capability while removing pass-through values no consumer uses.

- [x] **Step 3: Keep domain types outside prop modules**

Move shared filter and query types to the controller/domain boundary. Keep only component props in component `types.ts` files.

### Task 2: Normalize URL filter parsing and serialization

**Files:**
- Refactor: `controller/url-filters.ts`
- Refactor: `controller/server-filters.ts`
- Refactor: `controller/normalize-filters.ts`
- Refactor: `controller/normalize-forced-author.ts`
- Refactor: `controller/use-url-sync.ts`

- [x] **Step 1: Establish one query-key map**

Represent every supported query parameter in one typed constant. Preserve names, repeated-value encoding, default omission, sort/view serialization, forced-author behavior, and unknown-value rejection.

- [x] **Step 2: Separate pure codec functions**

Keep parsing and serialization as pure functions accepting `URLSearchParams` or the typed filter model. Keep router/history synchronization in `use-url-sync.ts` and preserve back, forward, and direct-link behavior.

- [x] **Step 3: Prevent feedback loops**

Keep URL synchronization effects exhaustive and ensure a normalized URL does not trigger repeated equivalent writes. Do not silence lint or use mutable module state.

### Task 3: Normalize filter dependencies and options

**Files:**
- Refactor: `controller/active-filters.ts`
- Refactor: `controller/build-filter-options.ts`
- Refactor: `controller/filter-dependencies.ts`
- Refactor: `controller/filter-option-helpers.ts`
- Refactor: `controller/filtering.ts`
- Refactor: `controller/repository-filter-registry.ts`
- Refactor: `controller/tag-categories.ts`, `tag-labels.ts`, `tag-normalization.ts`, `range-label.ts`

- [x] **Step 1: Map pure dependency flow**

Document inputs and outputs for option building, dependency pruning, active chips, tag categorization, tag labels, salary/range labels, and client-side filtering. Remove circular imports before changing behavior.

- [x] **Step 2: Consolidate identical normalization**

Choose one owner for case folding, whitespace handling, tag key normalization, and repository-filter identity where semantics match. Preserve display labels separately from stable filter values.

- [x] **Step 3: Use closed values consistently**

Replace migrated raw sort, view, source, and filter-scope comparisons with enum members. Type complete maps with `Record` and retain explicit fallback behavior for partial remote facets.

### Task 4: Refactor remote pagination hooks

**Files:**
- Refactor: `controller/use-remote-opportunities.ts`
- Refactor: `controller/use-ensure-page-loaded.ts`
- Refactor: `controller/use-load-more-handler.ts`
- Refactor: `controller/use-forced-author-autoload.ts`

- [x] **Step 1: Define remote lifecycle states**

Keep initial loading, success, empty, error, incremental loading, exhaustion, retry, and cancellation distinguishable. Preserve deduplication and result ordering.

- [x] **Step 2: Preserve stale-request protection**

Abort or ignore responses for superseded filters. Effects include every reactive dependency; callbacks are stabilized only where their identity controls synchronization.

- [x] **Step 3: Keep load commands idempotent**

Prevent duplicate page requests for the same active query and preserve forced-author auto-loading limits and termination rules.

### Task 5: Compose the smaller facade

**Files:**
- Refactor: `controller/use-filters-state.ts`
- Refactor: `controller/use-derived-opportunities.ts`
- Refactor: `controller/use-opportunities-screen-controller.ts`

- [x] **Step 1: Keep ephemeral UI state local**

Drawer selection, filter-panel visibility, and temporary notices remain local to the nearest owner. Share only state required by distant opportunity descendants.

- [x] **Step 2: Compose without duplicating state**

The facade reads each state source once, derives display values, and exposes intent-named commands. It must not mirror URL filters or remote results into a second state store.

- [x] **Step 3: Enforce size and responsibility**

After extraction, the facade coordinates modules and contains no large parsing, filtering, request, or formatting implementation. Every remaining function in the controller directory has one describable responsibility and no barrel file is introduced.

### Task 6: Validate and commit

**Files:**
- Modify: controller, types, and direct consumers

- [x] **Step 1: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0 and static export succeeds against remote data.

- [x] **Step 2: Manually verify filter invariants**

Check direct query links, adding/removing each filter family, reset, sort, view mode, forced author, browser back/forward, load more, empty results, and error retry. Expected: behavior and visible state match the baseline.

- [x] **Step 3: Commit**

Run: `git add app/opportunities && git commit -m "refactor: decompose opportunity controller"`

Expected: one controller-only commit.
