"use client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ExpandCell,
  DateCell,
  SortableHeader,
  NumberCell,
  CurrencyCell,
  CurrencyFooter,
  SumFooter,
  SettingsHeader,
} from "./cells";
import { ServicesSummary } from "@/app/api/services/summaries/types";

// 1️⃣ Expand
const expandColumn: ColumnDef<ServicesSummary, unknown> = {
  enableHiding: false,
  accessorKey: "expand",
  header: SettingsHeader<ServicesSummary>(),
  cell: ExpandCell,
};

// 2️⃣ Date (string)
const startDateColumn: ColumnDef<ServicesSummary, string> = {
  id: "Start Date",
  accessorKey: "startDate",
  header: SortableHeader<ServicesSummary>("Start Date"),
  cell: DateCell<ServicesSummary>("dd/MM/yyyy"),
};

// 3️⃣ Text columns are just unknown→string but don’t need a specialized cell
const textColumns: ColumnDef<ServicesSummary, string>[] = [
  { id: "Client", accessorKey: "clientName", header: "Client" },
  { id: "Operator", accessorKey: "operatorName", header: "Operator" },
  { id: "Supplier", accessorKey: "supplierName", header: "Supplier" },
];

// 4️⃣ Metrics (number)
const metricsColumns: ColumnDef<ServicesSummary, number>[] = [
  "rnts",
  "bednight",
  "players",
].map((key) => {
  const formattedKey =
    key === "rnts" ? "RNTs" : key[0].toUpperCase() + key.slice(1);
  return {
    id: formattedKey,
    accessorKey: `metrics.${key}` as const,
    header: SortableHeader<ServicesSummary>(formattedKey),
    cell: NumberCell<ServicesSummary>({
      style: "decimal",
      minimumFractionDigits: 0,
    }),
    footer: SumFooter<ServicesSummary, number>(),
  } as ColumnDef<ServicesSummary, number>;
});

// 5️⃣ ADR (number)
const adrColumn: ColumnDef<ServicesSummary, number> = {
  id: "ADR",
  accessorKey: "metrics.adr",
  header: SortableHeader<ServicesSummary>("ADR"),
  cell: NumberCell<ServicesSummary>({
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }),
};

// TODO: sorting desc is showing n/a as highest
// 6️⃣ Totals (number | undefined)
const totalsColumns: ColumnDef<ServicesSummary, number | undefined>[] = [
  "quarto",
  "golf",
  "transfer",
  "extras",
].map(
  (key) =>
    ({
      id: key,
      accessorKey: `totals.${key}` as const,
      header: SortableHeader<ServicesSummary>(
        key[0].toUpperCase() + key.slice(1)
      ),
      cell: CurrencyCell<ServicesSummary>(),
      footer: CurrencyFooter<ServicesSummary, number>(),
    } as ColumnDef<ServicesSummary, number | undefined>)
);

// 7️⃣ Kickback & Sum
const otherTotals: ColumnDef<ServicesSummary, number>[] = [
  {
    id: "Kickback",
    accessorKey: "totals.kickback",
    header: SortableHeader<ServicesSummary>("Kickback"),
    cell: CurrencyCell<ServicesSummary>(),
    footer: CurrencyFooter<ServicesSummary, number>(),
  },
  {
    id: "Total",
    accessorKey: "totals.sum",
    header: SortableHeader<ServicesSummary>("Total"),
    cell: CurrencyCell<ServicesSummary>(),
    footer: CurrencyFooter<ServicesSummary, number>(),
  },
];

// Compose
export const columns: ColumnDef<ServicesSummary>[] = [
  expandColumn,
  startDateColumn,
  ...textColumns,
  ...metricsColumns,
  adrColumn,
  ...totalsColumns,
  ...otherTotals,
] as ColumnDef<ServicesSummary, unknown>[];
