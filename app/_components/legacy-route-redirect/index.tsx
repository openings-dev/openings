"use client";

import { useEffect } from "react";
import { buildOpportunityPath } from "@/lib/opportunities/routing";

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function resolveLegacyRedirect(pathname: string): string | null {
  const [scope, ...rest] = pathname.split("/").filter(Boolean);
  if (scope === "jobs" && rest[0]) return buildOpportunityPath(safeDecode(rest[0]));
  return null;
}

export function LegacyRouteRedirect(): null {
  useEffect(() => {
    const destination = resolveLegacyRedirect(window.location.pathname);
    if (destination) window.location.replace(destination);
  }, []);
  return null;
}
