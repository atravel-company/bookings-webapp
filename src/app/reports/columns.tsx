import { BookingReport } from "@/types/Bookings/BookingReport";
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
    accessorKey: "bookings.metrics.rnts",
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
    accessorKey: "bookings.metrics.bednight",
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
    accessorKey: "bookings.metrics.players",
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
    accessorKey: "bookings.metrics.adr",
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
    accessorKey: "bookings.totals.quarto",
    header: "Quarto",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
    },
  },
  {
    accessorKey: "bookings.totals.golf",
    header: "Golf",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
    },
  },
  {
    accessorKey: "bookings.totals.transfer",
    header: "Transfer",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
    },
  },
  {
    accessorKey: "bookings.totals.extras",
    header: "Extras",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      });
    },
  },
  {
    accessorKey: "bookings.totals.kickback",
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
    accessorKey: "bookings.totals.sum",
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
