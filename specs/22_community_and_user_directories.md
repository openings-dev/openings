# Community and User Directories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give community and user discovery the same polished visual grammar as opportunity discovery.

**Architecture:** Shared directory layout, filters, list shell, and entity card provide the system; route-owned components map domain-specific content without duplicating appearance.

**Tech Stack:** Next.js, React, Tailwind CSS, Lucide

---

### Task 1: Refine directory framework

**Files:**
- Modify: `app/_components/directory/**`, `app/_components/location-filters/**`

- [x] **Step 1:** Align title, description, count, filters, list grid, empty state, and content width with the application frame.
- [x] **Step 2:** Refine entity card surface, avatar, identity, location, metrics, hover, focus, and narrow-content behavior.
- [x] **Step 3:** Preserve semantic list markup, stable keys, filter logic, destinations, and empty states.

### Task 2: Apply domain presentation

**Files:**
- Modify: `app/community/_components/communities-screen/**`, `app/users/_components/users-screen/**`

- [x] **Step 1:** Make community repository identity and opportunity count scan clearly.
- [x] **Step 2:** Make user name/handle identity and opportunity count scan clearly.
- [x] **Step 3:** Preserve avatars, fallbacks, localized copy, locations, links, and server-owned data.

### Task 3: Validate and commit

- [x] **Step 1:** Run `npm run lint` and `npm run build`; expect 137 community details and 148 total pages.
- [x] **Step 2:** Review empty/dense lists, long identifiers, filter states, mobile/desktop, and both themes.
- [x] **Step 3:** Commit with `feat: refine entity directories`.
