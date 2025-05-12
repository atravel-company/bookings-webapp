import { BookingReport } from "@/types/BookingReport";
import { ColumnDef } from "@tanstack/react-table";
import { parseISO, format } from "date-fns";

export const columns: ColumnDef<BookingReport>[] = [
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ getValue }) => {
      const date = parseISO(getValue() as string);
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "clientName",
    header: "Client",
  },
  {
    accessorKey: "operatorName",
    header: "Operator",
  },
  {
    accessorKey: "metrics.rnts",
    header: "RNTs",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
  {
    accessorKey: "metrics.bednight",
    header: "Bednights",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
  {
    accessorKey: "metrics.players",
    header: "Players",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
  {
    accessorKey: "metrics.adr",
    header: "ADR",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
  {
    accessorKey: "totals.quarto",
    header: "Quarto",
    cell: ({ getValue }) => {
      const value = getValue();
      if (typeof value === "number") return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
      return "n/a"
    },
  },
  {
    accessorKey: "totals.golf",
    header: "Golf",
    cell: ({ getValue }) => {
      const value = getValue();
      if (typeof value === "number") return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
      return "n/a"
    },
  },
  {
    accessorKey: "totals.transfer",
    header: "Transfer",
    cell: ({ getValue }) => {
      const value = getValue();
      if (typeof value === "number") return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
      return "n/a"
    },
  },
  {
    accessorKey: "totals.extras",
    header: "Extras",
    cell: ({ getValue }) => {
      const value = getValue();
      if (typeof value === "number") return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
      return "n/a"
    },
  },
  {
    accessorKey: "totals.kickback",
    header: "Kickback",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
    },
  },
  {
    accessorKey: "totals.sum",
    header: "Total",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
    },
  },
];
