import { BookingEntry } from "./BookingEntry";

export interface BookingsCollection {
  totals: Totals;
  metrics: Metrics;
  array: BookingEntry[];  // array of individual booking line items
}
// Summed-up totals
export interface Totals {
  quarto: number;
  golf: number;
  transfer: number;
  extras: number;
  kickback: number;
  sum: number;
}

// Aggregated metrics
export interface Metrics {
  rnts: number;
  bednight: number;
  players: number;
  adr: number;
}
