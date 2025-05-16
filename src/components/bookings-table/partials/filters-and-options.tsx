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
      
    </div>
  );
}
