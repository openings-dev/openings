export interface OpportunityDetailsElementIds {
  dialog: string;
}

function detailsIdBase(opportunityId: string): string {
  return `opportunity-details-${encodeURIComponent(opportunityId)}`;
}

export function getOpportunityDetailsElementIds(
  opportunityId: string,
): OpportunityDetailsElementIds {
  const base = detailsIdBase(opportunityId);
  return {
    dialog: `${base}-dialog`,
  };
}

export function findOpportunityTrigger(
  opportunityId: string,
): HTMLElement | null {
  const triggers = document.querySelectorAll<HTMLElement>(
    "[data-opportunity-trigger]",
  );

  return Array.from(triggers).find(
    (trigger) => trigger.dataset.opportunityTrigger === opportunityId,
  ) ?? null;
}

export function restoreOpportunityTriggerFocus(opportunityId: string): void {
  window.requestAnimationFrame(() => {
    const trigger = findOpportunityTrigger(opportunityId);
    if (trigger) {
      trigger.focus();
      return;
    }
    focusOpportunityResults();
  });
}

export function focusOpportunityResults(): void {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const target = document.getElementById("opportunity-quick-search") ??
        document.getElementById("opportunity-results-heading");
      if (!(target instanceof HTMLElement)) return;
      if (!target.hasAttribute("tabindex") && target.id === "opportunity-results-heading") {
        target.tabIndex = -1;
      }
      target.focus();
    });
  });
}
