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

import React, { useMemo } from "react";
import { BookingReport } from "@/types/BookingReport";
import FiltersAndOptions from "./partials/filters-and-options";

interface BookingsTableProps<TValue> {
  columns: ColumnDef<BookingReport, TValue>[];
  data: BookingReport[];
}

export function BookingsTable<TValue>({
  columns: userColumns,
  data,
}: BookingsTableProps<TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [sorting, setSorting] = React.useState<SortingState>([])


    // TODO: should be placed inside columns.tsx
    //       with proper formatting
    const columns = useMemo<ColumnDef<BookingReport, TValue>[]>(
      () =>
        userColumns.map((col) => ({
          ...col,
          footer: (info) => {
            // Sum over the *actual* column ID that TanStack assigned
            const total = info.table
              .getRowModel()
              .rows.reduce((sum, row) => {
                const val = row.getValue(info.column.id);
                return sum + (typeof val === "number"
                  ? val
                  : parseFloat(val as string) || 0);
              }, 0);
    
            // Pick your formatting:
            // • integers show as-is
            // • floats with two decimals
            return Number.isInteger(total)
              ? total
              : total.toFixed(2);
          },
        })),
      [userColumns]
    );

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
      sorting
    },
  });

  return (
    <div className="w-full">
      <FiltersAndOptions table={table} />
      <div className="rounded-md border overflow-hidden w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="font-bold" key={header.id}>
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            {table.getFooterGroups().map((fg) => (
              <TableRow key={fg.id}>
                {fg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder && flexRender(header.column.columnDef.footer, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
