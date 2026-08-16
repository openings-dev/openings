# Opportunity Details and Markdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn opportunity details into a focused, readable context surface on desktop and mobile.

**Architecture:** Overlay mechanics remain separate from content sections. Shared semantic type and surface tokens drive the details hierarchy and Markdown rhythm.

**Tech Stack:** React, Tailwind CSS, Framer Motion, React Markdown, Remark GFM, Lucide

---

### Task 1: Refine details surfaces

**Files:**
- Modify: `opportunity-drawer/index.tsx`, `drawer-mobile-sheet/index.tsx`, `drawer-header/**`

- [x] **Step 1:** Refine desktop context sheet width, border, shadow, backdrop, scroll, and responsive split behavior.
- [x] **Step 2:** Refine mobile bottom-sheet handle, safe-area spacing, height, scroll containment, and close affordance.
- [x] **Step 3:** Preserve escape, backdrop dismissal, focus behavior, URL selection, and motion reduction.

### Task 2: Refine content and actions

**Files:**
- Modify: `drawer-identities/**`, `drawer-metadata/**`, `drawer-tags/**`, `drawer-action/**`, `opportunity-markdown/**`

- [x] **Step 1:** Establish clear title, identity, metadata, taxonomy, description, and action sections.
- [x] **Step 2:** Refine the external primary action and share action while preserving targets and messages.
- [x] **Step 3:** Improve Markdown headings, paragraphs, lists, links, blockquotes, code, tables, and overflow in both themes.

### Task 3: Validate and commit

- [x] **Step 1:** Run `npm run lint` and `npm run build`; expect exit code 0.
- [x] **Step 2:** Review short/long descriptions, desktop/mobile details, focus/dismissal, and both themes.
- [x] **Step 3:** Commit with `feat: refine opportunity details`.
