# Accessibility and Motion

> Make responsive behavior, semantics, focus, and reduced motion part of each component contract.

## Accessibility

- Keep one meaningful `h1` and a logical heading hierarchy per page.
- Use semantic landmarks, links for navigation, and buttons for actions.
- Keep persistent labels for form controls; placeholders do not replace labels.
- Keep visible focus on every interactive element and do not rely on color alone.
- Name icon-only actions and hide decorative graphics from assistive technology.
- Preserve 44 px primary touch targets.
- Announce meaningful result updates without creating a noisy live region.
- Keep clickable-card semantics predictable and avoid nested interactive elements.
- Ensure dialogs trap focus, close with Escape, isolate the background, and restore focus.
- Preserve high-contrast and forced-color usability.

## Responsive behavior

Review at 320, 390, 768, 1024, 1280, and 1440 px. Include long translated labels, long titles, missing avatars, many tags, no tags, high counts, zoom, and text enlargement.

The list/detail breakpoint and detail presentation must change together. Search becomes full width before secondary selects. Quick filters wrap or recompose without horizontal overflow. Mobile dialogs account for safe areas and the virtual keyboard.

## Motion

Use 140–220 ms feedback for controls and up to 320 ms for coherent overlay transitions. Prefer opacity and small transforms. Motion must explain orientation, feedback, or continuity; the shell remains static.

Reduced motion removes non-essential translation, stagger, parallax, and looping effects. Closing overlays returns focus to their trigger and interrupted animations do not leave stale visual state.
