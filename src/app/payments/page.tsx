"use client";

import { useReport } from "../hooks/useReport";
import { columns } from "../../components/bookings-table/columns";
import { BookingsTable } from "@/components/bookings-table";
import LoadingScreen from "@/pages/loading-screen";
import DateFilters from "./partials/date-filters";
import { PaymentsFiltersProvider } from "./filters";

export default function Payments() {
  const { report, loading, error } = useReport();

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error loading report: {error}</p>;
  if (!report) return <p>No report available.</p>;

  return (
    <PaymentsFiltersProvider>
      <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-16 font-[family-name:var(--font-inter)]">
        <header className="flex justify-between items-center gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
            Payments
          </h1>
          <DateFilters />
        </header>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <BookingsTable columns={columns} data={report} />
        </main>
      </div>
    </PaymentsFiltersProvider>
  );
}
