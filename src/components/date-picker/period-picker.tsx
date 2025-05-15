"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";

interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  selected?: DateRange;
  onSelect: (date?: DateRange) => void;
  children?: React.ReactNode;
}

export function PeriodPicker({
  selected,
  onSelect,
  children,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  function triggerSelection(date: DateRange | undefined) {
    if (date?.from && date?.to) {
      setDate(date);
      onSelect(date);
    }
    return;
  }

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          {!children ? (
            <Button
              variant="outline"
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !selected && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selected?.from ? (
                selected.to ? (
                  <>
                    {format(selected.from, "LLL dd, y")} -{" "}
                    {format(selected.to, "LLL dd, y")}
                  </>
                ) : (
                  format(selected.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          ) : (
            children
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={triggerSelection}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
