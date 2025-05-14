import { DatePicker, DateRangePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { ClockPlus } from "lucide-react";
import { useRef } from "react";

export default function DateFilters() {
  const dateRangePickerTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center gap-4">
      <DatePicker />
      {/* Render the DateRangePicker with a hidden trigger */}
      <DateRangePicker triggerRef={dateRangePickerTriggerRef} />
      <Button
        onClick={() => dateRangePickerTriggerRef.current?.click()}
        variant="outline"
      >
        <ClockPlus />
        Add Period
      </Button>
    </div>
  );
}
