import { appRoute } from "@/lib/routes-provider";
import { searchParamsToObject } from "@/utils/searchParamsToObject";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = searchParamsToObject(request.nextUrl.searchParams);

  // const endpoint = apiRoute("INDEX_REPORTS", params);
  const endpoint = appRoute("MOCK_SERVICES_SUMMARIES", params);
  
  const res = await fetch(endpoint);

  if (!res.ok) {
    console.error(
      `Error fetching endpoint:\n${endpoint}\n${res.status} ${res.statusText}`
    );
    return NextResponse.json(
      { message: "Failed to fetch data from external source" },
      { status: res.status }
    );
  }

  return NextResponse.json(await res.json());
}
