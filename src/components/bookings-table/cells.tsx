import { parseISO, format } from "date-fns";
import { CellContext, HeaderContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

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
