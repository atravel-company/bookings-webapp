import { columns } from "../../components/bookings-table/columns";
import { BookingsTable } from "@/components/bookings-table";
import DateFilters from "./partials/date-filters";
import { PaymentsFiltersProvider } from "./filters";
import { Suspense } from "react";
import LoadingScreen from "@/pages/loading-screen";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getServicesSummariesData } from "../api/services/summaries/get";
import type { SearchParams } from "next/dist/server/request/search-params";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const summaries = await getServicesSummariesData(searchParams);

  return (
    <PaymentsFiltersProvider>
      <div className="flex flex-col h-screen p-8 !pb-0 gap-8 sm:p-16 font-[family-name:var(--font-inter)]">
        <header className="flex justify-between items-center gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
            Payments
          </h1>
          <DateFilters />
        </header>
        <ScrollArea
          className="rounded-t-xl border flex-1 overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <BookingsTable columns={columns} data={summaries} />
          </Suspense>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </PaymentsFiltersProvider>
  );
}
