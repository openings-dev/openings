# Shared Controls and States Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give shared buttons, selects, inputs, feedback, and status treatments one polished interaction language.

**Architecture:** Shared primitives own hit targets, focus, elevation, and finite variants. Feature components compose them without duplicating primitive state styling.

**Tech Stack:** React, Tailwind CSS, Radix Select, CVA, Lucide, Sonner

---

### Task 1: Refine buttons and select primitives

**Files:**
- Modify: `components/ui/button/**`, `components/ui/select/**`

- [x] **Step 1:** Normalize 36/40/44-pixel control heights, nested radii, icon gaps, disabled opacity, active compression, and visible focus rings.
- [x] **Step 2:** Refine primary, secondary, outline, ghost, and destructive button variants without changing their API.
- [x] **Step 3:** Refine select trigger, viewport, items, labels, separators, checkmarks, scroll buttons, and open-state contrast in both themes.

### Task 2: Normalize shared field and feedback states

**Files:**
- Modify: `app/_components/location-filters/**`, `components/ui/sonner/index.tsx`
- Inspect: opportunity search and filter field components

- [x] **Step 1:** Apply one field treatment to search, select, and grouped controls: surface, border, placeholder, hover, focus-within, and disabled states.
- [x] **Step 2:** Refine toast surface, icon alignment, copy hierarchy, and action/close contrast without changing messages or timing.
- [x] **Step 3:** Keep mobile inputs at 16 pixels and practical touch targets at 44 pixels.

### Task 3: Validate and commit

- [x] **Step 1:** Run `npm run lint` and `npm run build`; expect exit code 0.
- [x] **Step 2:** Review keyboard focus, open/closed selects, disabled fields, and both themes.
- [x] **Step 3:** Commit with `feat: refine shared control states`.
