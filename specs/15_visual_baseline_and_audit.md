# Visual Baseline and Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Record the current visual system and protect product behavior before the Calm Professional redesign.

**Architecture:** Evidence documents capture tokens, routes, component surfaces, responsive states, and invariants. No production source changes belong in this stage.

**Tech Stack:** Markdown, Git, Next.js static export

---

### Task 1: Inventory visual foundations

**Files:**
- Inspect: `app/globals.css`, `app/layout.tsx`, `components/**`, `app/**/_components/**`
- Create: `specs/evidence/15_visual_baseline.md`

- [x] **Step 1:** Record current font families, type sizes, semantic colors, radii, shadows, gradients, widths, gutters, and breakpoints.
- [x] **Step 2:** Record light/dark treatment and every shared interactive state: hover, focus, active, selected, disabled, loading, empty, and error.
- [x] **Step 3:** Map each route to its shell, page header, filters, primary content, details surface, and footer.

### Task 2: Record behavior and content invariants

**Files:**
- Compare: `specs/evidence/01_baseline.md`, `specs/evidence/13_final_verification.md`
- Modify: `specs/evidence/15_visual_baseline.md`

- [x] **Step 1:** Preserve 148 generated pages, public-data contracts, six locales, themes, query keys, drawer behavior, filters, sorting, pagination, and redirects.
- [x] **Step 2:** Record required responsive review states at 375, 768, 1024, and 1440 CSS pixels.
- [x] **Step 3:** Run `npm run lint`; expect exit code 0.
- [x] **Step 4:** Commit with `docs: record visual refinement baseline`.
