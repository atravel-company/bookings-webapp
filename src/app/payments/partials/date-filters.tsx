"use client";
import { DatePicker, PeriodPicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { ClockPlus, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultFilters, usePaymentsFilters } from "../filters";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const FormSchema = z.object({
  dates: z.union([
    z.date({
      required_error: "A date is required.",
    }),
    z.object({
      from: z.date({
        required_error: "A start date is required.",
      }),
      to: z.date({
        required_error: "An end date is required.",
      }),
    }),
  ]),
});

export default function DateFilters() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultFilters,
  });

  const { setFilters } = usePaymentsFilters();

  return (
    <Form {...form}>
      <form
        className="flex items-center gap-4"
        onSubmit={form.handleSubmit(setFilters)}
      >
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <>
              {/* 
                  TODO: return to DatePicker when both dates in
                        PeriodPicker are equal

                  TODO: sync both PeriodPicker selected values
                        (inline and button)
              */}
              {field.value &&
              typeof field.value === "object" &&
              "from" in field.value ? (
                <PeriodPicker
                  selected={field.value}
                  onSelect={field.onChange}
                />
              ) : (
                <DatePicker selected={field.value} onSelect={field.onChange} />
              )}
              <PeriodPicker
                selected={
                  field.value && "from" in field.value ? field.value : undefined
                }
                onSelect={field.onChange}
              >
                <Button
                  id="date"
                  className={cn("justify-start text-left font-normal")}
                >
                  <ClockPlus />
                  Add Period
                </Button>
              </PeriodPicker>
            </>
          )}
        />
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
