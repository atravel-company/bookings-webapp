"use client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ExpandCell,
  DateCell,
  SortableHeader,
  NumberCell,
  CurrencyCell,
} from "./cells";
import type { BookingReport } from "@/types/BookingReport";

// 1️⃣ Expand
const expandColumn: ColumnDef<BookingReport, unknown> = {
  enableHiding: false,
  accessorKey: "expand",
  header: "",
  cell: ExpandCell,
};

// 2️⃣ Date (string)
const startDateColumn: ColumnDef<BookingReport, string> = {
  id: "Start Date",
  accessorKey: "startDate",
  header: SortableHeader<BookingReport>("Start Date"),
  cell: DateCell<BookingReport>("dd/MM/yyyy"),
};

// 3️⃣ Text columns are just unknown→string but don’t need a specialized cell
const textColumns: ColumnDef<BookingReport, string>[] = [
  { id: "Client", accessorKey: "clientName", header: "Client" },
  { id: "Operator", accessorKey: "operatorName", header: "Operator" },
  { id: "Supplier", accessorKey: "supplierName", header: "Supplier" },
];

// 4️⃣ Metrics (number)
const metricsColumns: ColumnDef<BookingReport, number>[] = [
  "rnts",
  "bednight",
  "players",
].map((key) => {
  const formattedKey =
    key === "rnts" ? "RNTs" : key[0].toUpperCase() + key.slice(1);
  return {
    id: formattedKey,
    accessorKey: `metrics.${key}` as const,
    header: formattedKey,
    cell: NumberCell<BookingReport>({
      style: "decimal",
      minimumFractionDigits: 0,
    }),
  } as ColumnDef<BookingReport, number>;
});

// 5️⃣ ADR (number)
const adrColumn: ColumnDef<BookingReport, number> = {
  id: "ADR",
  accessorKey: "metrics.adr",
  header: "ADR",
  cell: NumberCell<BookingReport>({
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }),
};

// 6️⃣ Totals (number | undefined)
const totalsColumns: ColumnDef<BookingReport, number | undefined>[] = [
  "quarto",
  "golf",
  "transfer",
  "extras",
].map(
  (key) =>
    ({
      id: key,
      accessorKey: `totals.${key}` as const,
      header: key[0].toUpperCase() + key.slice(1),
      cell: CurrencyCell<BookingReport>(),
    } as ColumnDef<BookingReport, number | undefined>)
);

// 7️⃣ Kickback & Sum
const otherTotals: ColumnDef<BookingReport, number>[] = [
  {
    id: "Kickback",
    accessorKey: "totals.kickback",
    header: "Kickback",
    cell: CurrencyCell<BookingReport>(),
  },
  {
    id: "Total",
    accessorKey: "totals.sum",
    header: "Total",
    cell: CurrencyCell<BookingReport>(),
  },
];

// Compose
export const columns: ColumnDef<BookingReport>[] = [
  expandColumn,
  startDateColumn,
  ...textColumns,
  ...metricsColumns,
  adrColumn,
  ...totalsColumns,
  ...otherTotals,
] as ColumnDef<BookingReport, unknown>[];
