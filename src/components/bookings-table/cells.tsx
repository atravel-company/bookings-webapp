import { parseISO, format } from "date-fns";
import { CellContext, HeaderContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings2 } from "lucide-react";
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
    <Button size="icon" variant="ghost" className="w-6 h-6 rounded-full" onClick={() => row.toggleExpanded()}>
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
            className="rounded-full w-6 h-6"
            variant="ghost"
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
        className="px-0 w-full font-bold hover:cursor-pointer text-[length:inherit]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {title}
      </Button>
    );
  }
  _SortableHeader.displayName = `SortableHeader(${title})`;
  return _SortableHeader;
}

type AlignOptions = 'left' | 'center' | 'right';

interface NumberCellOptions extends Intl.NumberFormatOptions {
  align?: AlignOptions;
}

export function NumberCell<TData>({ align = 'center', ...opts }: NumberCellOptions) {
  function _NumberCell({ getValue }: CellContext<TData, number | undefined>) {
    const v = getValue();
    // Only format real numbers; otherwise show "n/a"
    const content =
      typeof v === 'number'
        ? v.toLocaleString('pt-PT', opts)
        : 'n/a';

    return (
      <div style={{ textAlign: align, width: '100%' }}>
        {content}
      </div>
    );
  }
  _NumberCell.displayName = `NumberCell(${JSON.stringify({ ...opts, align })})`;
  return _NumberCell;
}


export function CurrencyCell<TData>(
  formatOpts: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "EUR",
  },
  align: AlignOptions = "right"
) {
  // Force style: currency, but allow overriding currency code via formatOpts
  return NumberCell<TData>({
    style: "currency",
    currency: formatOpts.currency,
    ...formatOpts,
    align,
  });
}

/**
 * Creates a footer renderer that sums up all the cells in a column
 * and then runs your `formatter` on the final total.
 */
export function MakeSumFooter<TData, TValue = unknown>(
  formatter: (total: number) => string | number
) {
  return (info: HeaderContext<TData, TValue>) => {
    const total = info.table
      .getRowModel()
      .rows.reduce((sum, row) => {
        const val = row.getValue(info.column.id);
        const n =
          typeof val === 'number' ? val : parseFloat(val as string) || 0;
        return sum + n;
      }, 0);

    return formatter(total);
  };
}

/**
 * A “plain” summing footer:
 * • Integers → rendered as-is
 * • Floats   → two decimals
 *
 * @param align  How to align the footer cell (default: "center")
 */
export function SumFooter<TData, TValue = unknown>(
  align: AlignOptions = 'center'
) {
  const rawFooter = MakeSumFooter<TData, TValue>((total) =>
    Number.isInteger(total) ? total : total.toFixed(2)
  );

  function _SumFooter(info: HeaderContext<TData, TValue>) {
    return (
      <div style={{ textAlign: align, width: '100%' }}>
        {rawFooter(info)}
      </div>
    );
  }
  _SumFooter.displayName = `SumFooter(align="${align}")`;
  return _SumFooter;
}

/**
 * A currency‐style summing footer (EUR, pt-PT locale),
 * aligned right by default.
 *
 * @param align  How to align the footer cell (default: "right")
 */
export function CurrencyFooter<TData, TValue = unknown>(
  align: AlignOptions = 'right'
) {
  const rawFooter = MakeSumFooter<TData, TValue>((total) =>
    total.toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    })
  );

  function _CurrencyFooter(info: HeaderContext<TData, TValue>) {
    return (
      <div style={{ textAlign: align, width: '100%' }}>
        {rawFooter(info)}
      </div>
    );
  }
  _CurrencyFooter.displayName = `CurrencyFooter(align="${align}")`;
  return _CurrencyFooter;
}