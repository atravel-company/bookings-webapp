import { parseISO, format } from "date-fns";
import { CellContext, HeaderContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ExpandCell<TData>({ row }: CellContext<TData, unknown>) {
  return row.getCanExpand() ? (
    <Button size="icon" variant="ghost" onClick={() => row.toggleExpanded()}>
      <ChevronDown />
    </Button>
  ) : null;
}
ExpandCell.displayName = "ExpandCell";

export function DateCell<TData>(formatStr = "dd/MM/yyyy") {
  function _DateCell({ getValue }: CellContext<TData, string>) {
    const iso = getValue();
    const date = parseISO(iso);
    return <div className="w-full text-center">{format(date, formatStr)}</div>;
  }
  _DateCell.displayName = `DateCell(${formatStr})`;
  return _DateCell;
}

export function SettingsHeader<TData>() {
  function _SettingsHeader({ table }: HeaderContext<TData, unknown>) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full"
            variant="secondary"
            size="icon"
            aria-label="Columns"
          >
            <Settings2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((col) => col.getCanHide())
            .map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize"
                checked={col.getIsVisible()}
                onCheckedChange={(visible) => col.toggleVisibility(!!visible)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  _SettingsHeader.displayName = `SettingsHeader`;
  return _SettingsHeader;
}

export function SortableHeader<TData>(title: string) {
  function _SortableHeader({ column }: HeaderContext<TData, unknown>) {
    return (
      <Button
        variant="ghost"
        className="font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {title}
        <ChevronsUpDown />
      </Button>
    );
  }
  _SortableHeader.displayName = `SortableHeader(${title})`;
  return _SortableHeader;
}

export function NumberCell<TData>(opts: Intl.NumberFormatOptions) {
  function _NumberCell({ getValue }: CellContext<TData, number>) {
    return getValue().toLocaleString("pt-PT", opts);
  }
  _NumberCell.displayName = `NumberCell(${JSON.stringify(opts)})`;
  return _NumberCell;
}

export function CurrencyCell<TData>(
  opts: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "EUR",
  }
) {
  function _CurrencyCell({ getValue }: CellContext<TData, number | undefined>) {
    const v = getValue();
    return typeof v === "number" ? v.toLocaleString("pt-PT", opts) : "n/a";
  }
  _CurrencyCell.displayName = `CurrencyCell`;
  return _CurrencyCell;
}

/**
 * Creates a footer renderer that sums up all the cells in a column
 * and then runs your `formatter` on the final total.
 */
export function MakeSumFooter<TData, TValue = unknown>(
  formatter: (total: number) => string | number
) {
  return (info: HeaderContext<TData, TValue>) => {
    const total = info.table.getRowModel().rows.reduce((sum, row) => {
      const val = row.getValue(info.column.id);
      const n = typeof val === "number" ? val : parseFloat(val as string) || 0;
      return sum + n;
    }, 0);

    return formatter(total);
  };
}

/**
 * A “plain” summing footer:
 * • Integers → rendered as-is
 * • Floats   → two decimals
 */
export function SumFooter<TData, TValue = unknown>() {
  return MakeSumFooter<TData, TValue>((total) =>
    Number.isInteger(total) ? total : total.toFixed(2)
  );
}

/**
 * A currency‐style summing footer (EUR, pt-PT locale)
 */
export function CurrencyFooter<TData, TValue = unknown>() {
  return MakeSumFooter<TData, TValue>((total) =>
    total.toLocaleString("pt-PT", {
      style: "currency",
      currency: "EUR",
    })
  );
}
