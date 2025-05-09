import { useState, useEffect } from "react";
import { Report } from "@/types/Report";

const endpoint = `${process.env.NEXT_PUBLIC_BOOKINGS_API_URL}/reports`;

interface UseReportResult {
  report: Report | null;
  loading: boolean;
  error: string | null;
}

export function useReport(): UseReportResult {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Report = await res.json();
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
