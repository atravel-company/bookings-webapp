"use client";

import Image from "next/image";
import { useReport } from "./hooks/useReport";
import { columns } from "./reports/columns";
import { DataTable } from "@/components/ui/data-table";

export default function Home() {
  const { report, loading, error } = useReport();

  if (loading) return <p>Loading report…</p>;
  if (error) return <p>Error loading report: {error}</p>;
  if (!report) return <p>No report available.</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
          Payments
        </h1>
        <DataTable columns={columns} data={report} />
      </main>
    </div>
  );
}
