# Opportunity Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize opportunity screen components around explicit props, shared primitives, and component-owned children.

**Architecture:** OpportunitiesScreen consumes the controller facade and composes focused filter, toolbar, list, card, and drawer subtrees. Presentation components contain no remote URL construction or duplicated domain state.

**Tech Stack:** React, Tailwind CSS, Radix UI, Framer Motion, Lucide React, React Markdown

---

### Task 1: Refactor screen composition

**Files:**
- Refactor: `app/opportunities/_components/opportunities-page/**`
- Refactor: `app/opportunities/_components/opportunities-screen/index.tsx`
- Refactor: `opportunities-screen-content/**`, `opportunities-screen-header/**`, `opportunities-toolbar/**`, `opportunities-quick-filters/**`, `view-mode-toggle/**`, `snapshot-status/**`

- [x] **Step 1: Keep route loading and screen interaction separate**

Preserve OpportunitiesPage suspense or loading composition and keep OpportunitiesScreen as the client facade consumer. Do not move build-time data or route APIs into presentation.

- [x] **Step 2: Pass cohesive prop groups**

Replace long unrelated prop lists with narrow component-specific contracts only where grouping has domain meaning. Do not pass the complete controller object to every descendant.

- [x] **Step 3: Normalize generic icons**

Use Lucide icons already present in the dependency for generic actions and preserve size, placement, motion, labels, and `aria-hidden` values. Keep domain/brand imagery where Lucide has no equivalent.

### Task 2: Refactor filter presentation

**Files:**
- Refactor: `opportunities-filters/**`

- [x] **Step 1: Give every named child a folder**

Move `tag-category-picker.tsx` and any remaining named implementation file into a kebab-case component folder with `index.tsx` and colocated props.

- [x] **Step 2: Keep fields controlled**

FilterSearch, FilterSelect, location, taxonomy, scope, display, selected chips, and panel header receive values and intent commands. They do not own duplicate copies of canonical filters.

- [x] **Step 3: Preserve accessibility and responsive behavior**

Keep labels, expanded state, reset behavior, disabled options, keyboard interaction, selected-chip removal, mobile panel behavior, and current responsive layout.

### Task 3: Refactor list and card presentation

**Files:**
- Refactor: `opportunities-list/**`
- Refactor: `opportunity-card/**`

- [x] **Step 1: Keep list state explicit**

OpportunitiesList composes loading skeletons, results, empty state, and list footer from explicit lifecycle props. Preserve result order, stable keys, grid/list behavior, load-more affordance, and counts.

- [x] **Step 2: Keep card children owned**

Card header, meta, tags, and footer stay directly inside the card folder. Move reusable cross-card UI upward only after a second verified consumer exists.

- [x] **Step 3: Preserve semantic content**

Keep heading hierarchy, repository and author links, salary/date/location formatting, tags, external-link behavior, and open-drawer command unchanged.

### Task 4: Refactor drawer presentation

**Files:**
- Refactor: `opportunity-drawer/**`

- [x] **Step 1: Separate overlay mechanics from content**

Keep desktop drawer and mobile sheet mechanics focused, while header, identities, metadata, tags, Markdown, and action sections remain owned presentation children.

- [x] **Step 2: Preserve focus and dismissal**

Keep escape, backdrop, close button, focus behavior, scroll containment, responsive breakpoint, and selected opportunity lifecycle equivalent.

- [x] **Step 3: Preserve Markdown and external actions**

Keep job description GFM rendering, safe links, visible content, source link, and action labeling unchanged.

### Task 5: Validate and commit

**Files:**
- Modify: opportunity presentation files

- [x] **Step 1: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0 and all opportunity-related static output succeeds.

- [x] **Step 2: Review visual equivalence**

Compare light/dark, mobile/desktop, grid/list, empty/loading/results, open drawer, filters expanded/collapsed, hover, focus, and reduced-motion behavior. Expected: no intentional visual difference.

- [x] **Step 3: Commit**

Run: `git add app/opportunities && git commit -m "refactor: align opportunity presentation"`

Expected: one presentation-only commit.
