import { listStaticOpportunityIds } from "@/lib/opportunities/static-api";
import { JobDetailsScreen } from "./job-details-screen";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const ids = await listStaticOpportunityIds();
    return ids.length > 0
      ? ids.map((id) => ({ id }))
      : [{ id: "__placeholder__" }];
  } catch (error) {
    console.error("Failed to generate static params for /jobs", error);
    return [{ id: "__placeholder__" }];
  }
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const resolvedParams = await params;
  return <JobDetailsScreen id={decodeURIComponent(resolvedParams.id ?? "")} />;
}
