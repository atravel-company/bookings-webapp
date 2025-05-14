"use client";

import { useRef } from "react";
import { useReport } from "./hooks/useReport";
import { columns } from "./reports/columns";
import { BookingsTable } from "@/components/bookings-table";
import LoadingScreen from "@/pages/loading-screen";
import { Button } from "@/components/ui/button";
import { ClockPlus } from "lucide-react";
import { DatePicker, DateRangePicker } from "@/components/date-picker";

export default function Home() {
    const { report, loading, error } = useReport();
    const dateRangePickerTriggerRef = useRef<HTMLButtonElement>(null);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Error loading report: {error}</p>;
    if (!report) return <p>No report available.</p>;

    return (
        <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-16 font-[family-name:var(--font-inter)]">
            <header className="flex justify-between items-center gap-4">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
                    Payments
                </h1>
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
            </header>
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <BookingsTable columns={columns} data={report} />
            </main>
        </div>
    );
}
