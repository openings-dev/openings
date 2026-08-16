import * as React from "react";
import { fetchOpportunityById } from "@/lib/opportunities/api";
import type { OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";

export function useSelectedOpportunity(params: {
  loadedOpportunity: OpportunityItem | null;
  selectedIdFromUrl: string | null;
}) {
  const [selectedId, setSelectedId] = React.useState(params.selectedIdFromUrl);
  const [directOpportunity, setDirectOpportunity] = React.useState<OpportunityItem | null>(null);

  React.useEffect(() => {
    let current = true;
    queueMicrotask(() => {
      if (current) setSelectedId((previous) => previous === params.selectedIdFromUrl ? previous : params.selectedIdFromUrl);
    });
    return () => { current = false; };
  }, [params.selectedIdFromUrl]);

  React.useEffect(() => {
    if (!selectedId || params.loadedOpportunity?.id === selectedId) return;
    let cancelled = false;
    fetchOpportunityById(selectedId)
      .then((item) => { if (!cancelled) setDirectOpportunity(item); })
      .catch(() => { if (!cancelled) setDirectOpportunity(null); });
    return () => { cancelled = true; };
  }, [params.loadedOpportunity?.id, selectedId]);

  const selectedOpportunity = params.loadedOpportunity ??
    (directOpportunity?.id === selectedId ? directOpportunity : null);

  return { selectedOpportunity, selectedOpportunityId: selectedId, setSelectedOpportunityId: setSelectedId };
}
