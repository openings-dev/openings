"use client";

import * as React from "react";

interface UseResponsiveFilterPanelParams {
  desktopQuery?: string;
}

function subscribe(query: string, onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSnapshot(query: string) {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(query).matches;
}

export function useResponsiveFilterPanel({
  desktopQuery = "(min-width: 768px)",
}: UseResponsiveFilterPanelParams = {}) {
  const isDefaultExpanded = React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => subscribe(desktopQuery, onStoreChange),
      [desktopQuery],
    ),
    React.useCallback(() => getSnapshot(desktopQuery), [desktopQuery]),
    () => false,
  );
  const [expandedOverride, setExpandedOverride] = React.useState<boolean | null>(null);

  return [
    expandedOverride ?? isDefaultExpanded,
    setExpandedOverride,
  ] as const;
}
