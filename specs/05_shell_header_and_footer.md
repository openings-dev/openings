# Application Shell, Header, and Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor global chrome into focused server-compatible composition with narrow interactive children.

**Architecture:** The root layout and static shell compose shared presentation. Theme, language, clipboard, and animated interactions remain isolated client boundaries. Header and footer children own their props and fixed Tailwind utilities.

**Tech Stack:** Next.js, React, Tailwind CSS, Framer Motion, Lucide React

---

### Task 1: Refactor the application shell

**Files:**
- Refactor: `app/_components/app-shell/index.tsx`
- Create or modify: `app/_components/app-shell/types.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Audit client requirements**

Identify every hook, browser API, and client-only import used by AppShell. If AppShell only composes children, Header, Footer, and Toaster, remove its client directive and let interactive descendants own theirs.

- [ ] **Step 2: Preserve document composition**

Keep header, growing main content, footer, toaster placement, font variables, metadata, and body classes equivalent. Use `PropsWithChildren` when no other shell prop exists.

### Task 2: Refactor the header tree

**Files:**
- Refactor: `components/header/**`
- Split: `components/header/language-switcher/flags.tsx` into one folder per retained custom flag component or a verified data-driven asset boundary
- Modify: `components/header/types.ts` by moving props to owners

- [ ] **Step 1: Move props to owners**

Move Header, BrandLogo, ThemeToggle, and LanguageSwitcher props out of the shared header type file into their component folders. Keep only genuinely shared header domain types at the nearest common boundary.

- [ ] **Step 2: Minimize the Header client boundary**

Keep static brand and navigation composition server-compatible when Framer Motion behavior can live in focused animated children without changing animation. Do not remove motion as part of this refactor.

- [ ] **Step 3: Normalize icons and accessibility**

Use Lucide for external-link, theme, and other generic UI icons. Preserve the custom GitHub brand icon and locale flags. Confirm navigation landmarks, active semantics where present, icon labels, and decorative `aria-hidden` values.

### Task 3: Refactor the footer tree

**Files:**
- Refactor: `components/footer/**`
- Move props from: `components/footer/types.ts`
- Modify: consumers under `app/`

- [ ] **Step 1: Separate static and interactive children**

Keep FooterBrand and FooterLinks server-compatible unless their exact motion implementation requires a client boundary. Isolate clipboard behavior in FooterBottom or a smaller owned child and preserve toast feedback.

- [ ] **Step 2: Colocate contracts and styles**

Move props to each component folder and inline fixed Tailwind utilities according to Spec 03. Keep only shared footer data shapes at the footer boundary.

- [ ] **Step 3: Preserve all destinations**

Compare every navigation, social, support, legal, and signature link before and after. Preserve external-link attributes, images, localized labels, and responsive layout.

### Task 4: Validate and commit

**Files:**
- Modify: all files changed above

- [ ] **Step 1: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0 and all baseline routes.

- [ ] **Step 2: Review accessibility structure**

Inspect rendered source or browser output for one main landmark, labeled navigation, keyboard-operable controls, meaningful image alternatives, and named icon-only actions.

- [ ] **Step 3: Commit**

Run: `git add app components && git commit -m "refactor: decompose application chrome"`

Expected: one shell refactor commit.
