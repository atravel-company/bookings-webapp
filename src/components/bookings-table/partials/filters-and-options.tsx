import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { BookingReport } from "@/types/BookingReport";
import { Table } from "@tanstack/react-table";
import { Share } from "lucide-react";
import React, { JSX } from "react";

interface FiltersAndOptionsProps {
  table: Table<BookingReport>;
}

export default function FiltersAndOptions({
  table,
}: FiltersAndOptionsProps): JSX.Element {
  return (
    <div className="flex items-center py-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Share />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Microsoft Excel (.xlsx)</DropdownMenuItem>
          <DropdownMenuItem>Link</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* --- Columns toggling --- */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
