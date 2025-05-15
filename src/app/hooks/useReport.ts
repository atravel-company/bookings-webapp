// NEEDS TO BE REFACTORED
// is overriding default config from filter context

"use client";
import { useState, useEffect } from "react";
import { BookingReport } from "@/types/BookingReport";
import { route } from "@/services/api/routes";
import { useSearchParams } from "next/navigation";

interface UseBookingReportResult {
  report: BookingReport[] | null;
  loading: boolean;
  error: string | null;
}

export function useReport(): UseBookingReportResult {
  const [report, setReport] = useState<BookingReport[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const datesParam = searchParams?.get("dates");

  useEffect(() => {
    async function fetchReport() {
      try {
        // Build the API url, including the "dates" query parameter if present
        const url = datesParam
          ? route("INDEX_REPORTS", { dates: datesParam })
          : route("INDEX_REPORTS");
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: BookingReport[] = await res.json();
        setReport(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [datesParam]);

  return { report, loading, error };
}
