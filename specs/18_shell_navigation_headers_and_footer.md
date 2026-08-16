# Shell, Navigation, Headers, and Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a coherent application frame and product-level hierarchy across every route.

**Architecture:** The shell establishes one content grid. Header, page headers, and footer share alignment and surface rules while keeping their existing ownership and behavior.

**Tech Stack:** React, Next.js, Tailwind CSS, Framer Motion, Lucide

---

### Task 1: Refine shell and header

**Files:**
- Modify: `app/_components/app-shell/index.tsx`, `components/header/**`

- [ ] **Step 1:** Establish consistent maximum width and responsive gutters for header, main, and footer.
- [ ] **Step 2:** Refine header height, border, background, brand lockup, navigation grouping, active states, and motion.
- [ ] **Step 3:** Normalize theme and locale controls with shared hit areas and accessible focus; preserve all actions and responsive behavior.

### Task 2: Refine page headers and footer

**Files:**
- Modify: `app/opportunities/_components/opportunities-screen/opportunities-screen-header/index.tsx`, `app/_components/directory/directory-screen-layout/index.tsx`, `components/footer/**`

- [ ] **Step 1:** Create one compact product-header rhythm for opportunities and scoped profile contexts.
- [ ] **Step 2:** Align directory headings and descriptions to the same title scale and grid.
- [ ] **Step 3:** Reduce footer height and decoration while preserving brand, links, maintainer actions, and localized content.

### Task 3: Validate and commit

- [ ] **Step 1:** Run `npm run lint` and `npm run build`; expect 148 pages.
- [ ] **Step 2:** Review header/footer at 375, 768, 1024, and 1440 widths in both themes.
- [ ] **Step 3:** Commit with `feat: refine application frame`.
