"use client";
import { route } from "@/services/api/routes";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { DateRange } from "react-day-picker";

export type PaymentsFiltersState = {
  searchTerm: string;
  dates?: Date | DateRange;
};

export type PaymentsFiltersContextType = {
  filters: PaymentsFiltersState;
  setFilters: (filters: Partial<PaymentsFiltersState>) => void;
  resetFilters: () => void;
};

export const defaultFilters: PaymentsFiltersState = {
  searchTerm: "",
};

const PaymentsFiltersContext = createContext<
  PaymentsFiltersContextType | undefined
>(undefined);

export const PaymentsFiltersProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filters, setFiltersState] =
    useState<PaymentsFiltersState>(defaultFilters);

  const setFilters = (newFilters: Partial<PaymentsFiltersState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };

  const router = useRouter();

  useEffect(() => {
    if (!filters.dates) return;

    const getDateParam = (dates: Date | DateRange) => {
      if (dates instanceof Date) {
        return format(dates, "yyyy-MM-dd");
      }
      if (dates.from && dates.to) {
        return [
          format(dates.from, "yyyy-MM-dd"),
          format(dates.to, "yyyy-MM-dd"),
        ].join(",");
      }
      return "";
    };

    const param = getDateParam(filters.dates);
    if (param) router.push(route("LIST_PAYMENTS", { dates: param }, false));
  }, [filters, router]);

  return (
    <PaymentsFiltersContext.Provider
      value={{ filters, setFilters, resetFilters }}
    >
      {children}
    </PaymentsFiltersContext.Provider>
  );
};

export const usePaymentsFilters = (): PaymentsFiltersContextType => {
  const context = useContext(PaymentsFiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
