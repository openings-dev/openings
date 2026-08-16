# Opportunity Results and Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve opportunity comparison through purposeful list/grid density and clearer card hierarchy.

**Architecture:** The list owns lifecycle layout; card-owned children render identity, metadata, tags, and actions with stable semantic priority.

**Tech Stack:** React, Tailwind CSS, Framer Motion, Lucide

---

### Task 1: Refine results lifecycle

**Files:**
- Modify: `opportunities-list/**`, `styles/listing-styles.ts`

- [ ] **Step 1:** Define distinct list and grid spacing without changing result order or content.
- [ ] **Step 2:** Make skeletons mirror final card geometry in both display modes.
- [ ] **Step 3:** Refine empty, loading-more, exhausted, pagination, and count states with one consistent hierarchy.

### Task 2: Refine opportunity cards

**Files:**
- Modify: `opportunity-card/**`

- [ ] **Step 1:** Make title the dominant target and group community/author identity directly below it.
- [ ] **Step 2:** Reorder visual emphasis for salary, location, work mode, date, and taxonomy without changing semantic content.
- [ ] **Step 3:** Refine tags, hover, focus, selected state, external links, and action affordance without layout movement.
- [ ] **Step 4:** Preserve scoped identity hiding and stable card height under long localized or remote content.

### Task 3: Validate and commit

- [ ] **Step 1:** Run `npm run lint` and `npm run build`; expect 148 pages.
- [ ] **Step 2:** Review sparse/dense results, list/grid, selected card, long titles, and both themes.
- [ ] **Step 3:** Commit with `feat: refine opportunity result cards`.
