"use client";
import { BookingReport } from "@/types/BookingReport";
import React, { createContext, ReactNode, useContext } from "react";

interface ReportContextType {
  reportPromise: Promise<BookingReport[]>;
}

const ReportContext = createContext<ReportContextType | null>(null);

export function ReportProvider({
  children,
  reportPromise,
}: ReportContextType & { children: ReactNode }) {
  return (
    <ReportContext.Provider value={{ reportPromise }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const context = useContext(ReportContext);
  if (context === null) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
}

export default ReportContext;
