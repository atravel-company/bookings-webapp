"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  VisibilityState,
  useReactTable,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { use } from "react";
import { BookingReport } from "@/types/BookingReport";
import { useReport } from "@/app/payments/report-context";

interface BookingsTableProps<TValue> {
  columns: ColumnDef<BookingReport, TValue>[];
}

export function BookingsTable<TValue>({ columns }: BookingsTableProps<TValue>) {
  const { reportPromise } = useReport();
  const data = use(reportPromise);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => (row.original.children && true)!,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility,
      sorting,
    },
  });

  return (
    <Table className="relative w-full overflow-x-auto">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead className="font-bold first:pr-0" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={
                (row.getIsSelected() && "selected") ||
                (row.getIsExpanded() && "expanded")
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="first:pr-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className="sticky bottom-0">
        {table.getFooterGroups().map((fg) => (
          <TableRow key={fg.id}>
            {fg.headers.map((header) => (
              <TableHead key={header.id}>
                {!header.isPlaceholder &&
                  flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableFooter>
    </Table>
  );
}
