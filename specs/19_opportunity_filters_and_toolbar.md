# Opportunity Filters and Toolbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make opportunity discovery controls faster to scan and quieter than the result content.

**Architecture:** Quick filters form a command bar, the advanced panel groups related fields through spacing, and the toolbar owns result context and display controls. State and URL contracts remain unchanged.

**Tech Stack:** React, Tailwind CSS, Radix Select, Framer Motion, Lucide

---

### Task 1: Refine quick filters and advanced panel

**Files:**
- Modify: `app/opportunities/_components/opportunities-screen/opportunities-quick-filters/**`, `opportunities-filters/**`, `styles/filter-styles.ts`, `styles/layout-styles.ts`

- [x] **Step 1:** Make search the command bar's dominant field and align selects and advanced-filter action to one control grid.
- [x] **Step 2:** Reduce panel borders, strengthen group headings, improve group spacing, and preserve collapse behavior.
- [x] **Step 3:** Refine chips, taxonomy selectors, counts, reset, disabled options, focus, and mobile disclosure.

### Task 2: Refine toolbar and snapshot status

**Files:**
- Modify: `opportunities-toolbar/**`, `view-mode-toggle/**`, `snapshot-status/**`

- [x] **Step 1:** Balance range/count copy with sort and view controls and prevent localized labels from crowding.
- [x] **Step 2:** Use tabular or mono numeric styling for counts and range values.
- [x] **Step 3:** Make freshness status visibly secondary while retaining status meaning and timestamps.

### Task 3: Validate and commit

- [x] **Step 1:** Run `npm run lint` and `npm run build`; expect exit code 0.
- [x] **Step 2:** Review every filter family, selected/disabled states, expanded/collapsed layouts, and both themes.
- [x] **Step 3:** Commit with `feat: refine opportunity discovery controls`.
