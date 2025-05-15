import { useState, useEffect } from "react";
import { BookingReport } from "@/types/BookingReport";
import { route } from "@/services/api/routes";
interface UseBookingReportResult {
  report: BookingReport[] | null;
  loading: boolean;
  error: string | null;
}

export function useReport(): UseBookingReportResult {
  const [report, setReport] = useState<BookingReport[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(route("INDEX_REPORTS"));
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
  }, []);

  return { report, loading, error };
}
