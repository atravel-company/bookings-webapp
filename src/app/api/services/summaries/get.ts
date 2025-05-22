import { appRoute } from "@/lib/routes-provider";
import { Service, ServicesSummary } from "./types";
import type { SearchParams } from "next/dist/server/request/search-params";

export async function getServicesSummariesData(
  searchParams: Promise<SearchParams>
): Promise<(ServicesSummary | Service)[]> {
  const params = await searchParams;
  const route = appRoute("SERVICES_SUMMARIES", params);
  const res = await fetch(route);
  if (!res.ok) throw new Error("Failed to fetch services summaries data");
  return res.json();
}
