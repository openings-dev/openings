# Calm Professional Visual Refinement Design

> Define the approved visual direction for the Openings interface before implementation specifications are written.

**Status:** Approved direction; pending written-spec review  
**Date:** 2026-08-16

## Objective

Make Openings feel like a polished, trustworthy, modern product for discovering
technology opportunities. The redesign must improve scanability, focus,
readability, perceived quality, and consistency without changing routes, remote
data, filtering behavior, localization, or product capabilities.

## Audience and desired behavior

The primary user is a technology professional who wants to evaluate many public
opportunities quickly. The interface should help this user:

1. understand the available result set immediately;
2. narrow it with minimal visual friction;
3. compare roles, communities, locations, and metadata efficiently;
4. open and read an opportunity without losing list context;
5. trust the freshness and provenance of the public data.

The current visual system is structurally sound but distributes emphasis across
too many bordered and translucent surfaces. Typography, spacing, card hierarchy,
and control treatment do not yet create a sufficiently distinctive product
rhythm.

## Benchmark synthesis

The direction takes principles rather than branded appearance from four current
product systems:

- Linear: calm navigation, reduced chrome, consistent headers and controls,
  information density, and strong focus on the active content surface.
- Notion: typography-led hierarchy, readable content width, simple blocks, and
  editorial long-form reading.
- Buffer: approachable color, warmth, and friendly product personality.
- Vercel Geist: precise type scales, disciplined grid, crisp borders, layered
  elevation, high contrast, and compact interface controls.

Openings must not reproduce another product's shell, logo treatment, sidebar, or
proprietary visual signature. The result should remain recognizably Openings.

## Chosen direction: Calm Professional

The interface uses quiet neutral foundations, precise typography, restrained
accent color, and deliberate information density. Content is visually dominant;
navigation and secondary metadata recede. Polish comes from proportion,
alignment, contrast, and interaction details rather than decoration.

### Alternatives not selected

- **Glass Tech:** stronger translucency, glow, and gradient effects. It creates
  immediate novelty but adds noise to dense result and filter screens and is
  more likely to age quickly.
- **Editorial Workspace:** larger whitespace, expressive type, and document-like
  layouts. It improves reading but reduces comparison efficiency in the core job
  discovery flow.

## Visual foundations

### Typography

- Use Manrope for display headings and key page titles.
- Keep Geist Sans for body copy, controls, navigation, and dense product text.
- Keep Geist Mono for counts, dates, compact status values, and technical
  identifiers where tabular rhythm improves scanning.
- Define a small, explicit scale for display, page title, section title, card
  title, body, label, metadata, and microcopy.
- Use tighter tracking for large headings and neutral tracking for body copy.
- Limit body and description line length rather than increasing font size to
  compensate for weak hierarchy.
- Keep mobile text inputs at least 16 pixels to avoid platform zoom behavior.

### Color and theme

- Shift the light theme toward quiet cool-neutral surfaces with a subtle warm
  undertone so the product does not feel sterile.
- Use graphite text and a controlled blue-violet primary accent unique to
  Openings.
- Reserve primary color for active filters, key links, focus, selected state,
  and the principal action.
- Use semantic positive, warning, and destructive colors only for actual states.
- Deepen the dark theme background and separate elevation through surface value,
  border alpha, and shadow rather than multiple unrelated hues.
- Reduce the current page-level radial gradients. A very restrained ambient
  accent may remain near the page header.

### Spacing, grid, and density

- Use one application content grid with consistent horizontal gutters and
  maximum widths across header, main pages, documents, and footer.
- Establish a 4-pixel base rhythm expressed through a limited set of recurring
  gaps and paddings.
- Keep opportunity discovery moderately dense; keep documents and explanatory
  sections more spacious.
- Align titles, toolbar controls, cards, and sidebar edges to shared grid lines.
- Use whitespace as the default grouping tool before adding containers or
  separators.

### Surfaces, borders, and elevation

- Reduce nested card-on-card presentation.
- Use subtle translucent borders for edge definition and layered two-part
  shadows only where elevation communicates interaction or hierarchy.
- Keep nested radii concentric: child radii never exceed parent radii.
- Use flatter default cards and increase contrast on hover, focus, open, or
  selected states.
- Preserve semantic theme tokens in `app/globals.css`; extend that system rather
  than creating a second token layer.

### Icons and motion

- Continue using Lucide for generic interface actions and existing custom assets
  for brand-specific marks and locale flags.
- Normalize icon optical size and stroke presence by context.
- Use motion for orientation: filter expansion, list updates, drawer entry, and
  selected-state transitions.
- Keep transitions short and restrained and honor reduced-motion preferences.

## Screen and component direction

### Application shell and header

- Make the header visually lighter and slightly more compact.
- Strengthen the Openings brand lockup without increasing its footprint.
- Present primary navigation as one coherent group with a clear active state.
- Give theme and locale controls consistent hit areas, borders, and focus states.
- Maintain the current responsive navigation behavior and route set.

### Opportunity page header

- Replace the oversized decorative hero feeling with a compact product header.
- Give the title one dominant line of emphasis and constrain the description.
- Treat community and user profile variants as the same page-header system with
  identity-specific content.
- Keep freshness and result information visually available but secondary.

### Quick filters and filter panel

- Treat quick filters as a command bar: aligned input heights, clear search
  dominance, compact selects, and an explicit advanced-filter affordance.
- Make the desktop filter panel quieter than the results column.
- Separate filter groups through spacing and headings before borders.
- Improve selected chips, counts, disabled options, reset affordance, keyboard
  focus, and collapsed mobile presentation.
- Preserve every query key, filter dependency, and URL synchronization rule.

### Toolbar, results, and pagination

- Combine result count, range, sort, and view controls into a balanced toolbar.
- Use tabular or mono treatment for counts and page ranges.
- Give grid and list modes purpose-built density while preserving identical
  opportunity content and ordering.
- Make loading, empty, fetching-more, and exhausted states feel part of the same
  visual system.

### Opportunity cards

- Make the role title the primary scan target.
- Group community, author, location, work mode, salary, and date by semantic
  importance rather than giving every datum equal weight.
- Limit visible tag emphasis and use quiet pills for taxonomy.
- Use a precise hover/selected treatment that does not move layout.
- Preserve link targets, drawer selection, external actions, and identity hiding
  on scoped profile pages.

### Opportunity details

- Present the desktop details surface as a focused context sheet and mobile as a
  bottom sheet with the same content hierarchy.
- Keep identity, role metadata, tags, description, and actions in distinct
  reading sections.
- Make the principal external action visible without overwhelming the content.
- Improve Markdown rhythm, link contrast, lists, code, and long-line behavior.
- Preserve dismissal, focus, scroll containment, and selected-opportunity URL
  behavior.

### Community and user directories

- Use one shared directory visual grammar for page header, location filters,
  result count, cards, metrics, and empty state.
- Let avatar, entity name, and primary identity lead; keep location and counts
  secondary.
- Improve dense and narrow-screen wrapping without changing destinations or
  server-owned data.

### Documents, legal pages, and long-form content

- Use a narrower editorial reading column with a stronger title block.
- Improve heading cadence, paragraph measure, lists, links, tables, inline code,
  code blocks, and blockquotes.
- Keep Markdown sources, document lookup, routes, and localization unchanged.

### Footer

- Reduce height and decoration.
- Keep brand, project links, maintainer information, and utility actions easy to
  find without competing with page content.
- Align footer content with the same application grid.

## Responsive behavior

- Mobile prioritizes search, result scanning, and filter access with 44-pixel
  interaction targets where practical.
- Tablet layouts avoid an intermediate cramped desktop sidebar; filters may use
  the existing responsive disclosure until adequate width is available.
- Desktop uses stable aligned columns and prevents the details surface from
  collapsing the result list below a useful comparison width.
- Long localized labels, repository names, user handles, and tags must wrap or
  truncate intentionally without clipping controls.

## Accessibility and interaction quality

- Maintain semantic links, buttons, labels, headings, and list structures.
- Every interactive state has visible hover, active, focus-visible, disabled,
  selected, loading, and error treatment where applicable.
- Never communicate selection, freshness, or error through color alone.
- Preserve keyboard behavior, focus return, drawer escape dismissal, and screen
  reader labels.
- Validate contrast in both themes and avoid low-opacity text for essential
  content.

## Implementation boundaries

- No route, remote schema, environment variable, query parameter, locale,
  behavior, or product capability changes.
- No local data, API route, backend, authentication, or new state system.
- Use Tailwind utilities, semantic CSS variables, CVA only for real variants,
  Lucide, Radix, and the existing motion layer.
- Prefer refining existing components over importing a new component library.
- Add a font dependency only if required by the final font delivery method and
  verify build-time/static-export behavior.
- Implement in small ordered specs with light/dark and responsive review at each
  stage.

## Success criteria

- The main opportunity screen is easier to scan within the first second.
- The visual hierarchy clearly distinguishes page context, controls, results,
  metadata, and actions.
- Typography and spacing feel consistent across every route.
- Light and dark themes feel equally intentional.
- Components share one recognizable Openings visual language.
- Dense data remains efficient, while documents remain comfortable to read.
- All existing routes, data contracts, interactions, localization, and static
  export behavior continue to work.

## Planned specification decomposition

After approval of this document, the design will be decomposed into ordered
implementation specs covering:

1. visual baseline and comparison evidence;
2. typography, color, spacing, radius, shadow, and motion foundations;
3. shared primitives and interaction states;
4. shell, navigation, page headers, and footer;
5. opportunity filters and toolbar;
6. opportunity results, cards, loading, and empty states;
7. opportunity detail surfaces and Markdown;
8. community and user directories;
9. document and legal pages;
10. responsive, accessibility, theme, and final visual consistency audit.

These execution specs will include exact files, ordered tasks, preservation
constraints, review states, and commit boundaries.
