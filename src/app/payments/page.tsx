import { columns } from "../../components/bookings-table/columns";
import { BookingsTable } from "@/components/bookings-table";
import DateFilters from "./partials/date-filters";
import { PaymentsFiltersProvider } from "./filters";
import { route } from "@/services/api/routes";
import { BookingReport } from "@/types/BookingReport";
import { Suspense } from "react";
import { ReportProvider } from "./report-context";
import LoadingScreen from "@/pages/loading-screen";

type SearchParams = { [key: string]: string | number | boolean | string[] };

async function getData(searchParams: SearchParams) {
  const params = await searchParams;
  const path = route("INDEX_REPORTS", params ? params : {});
  const data = await fetch(path);
  return (await data.json()) as BookingReport[];
}

export default function Payments({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const dataPromise = getData(searchParams);

  return (
    <ReportProvider reportPromise={dataPromise}>
      <PaymentsFiltersProvider>
        <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-16 font-[family-name:var(--font-inter)]">
          <header className="flex justify-between items-center gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
              Payments
            </h1>
            <DateFilters />
          </header>
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <Suspense fallback={<LoadingScreen />}>
              <BookingsTable columns={columns} />
            </Suspense>
          </main>
        </div>
      </PaymentsFiltersProvider>
    </ReportProvider>
  );
}
