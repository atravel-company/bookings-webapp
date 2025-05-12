export interface BookingReport {
  id: number;
  parentId?: number;
  type?: "quarto" | "golf" | "transfer";
  supplier?: string;
  clientName: string;
  operatorName: string;
  startDate: string; // ISO date string, e.g. "2025-05-09"
  totals: Totals;
  metrics: Metrics;
}

export interface Totals {
  quarto?: number;
  golf?: number;
  transfer?: number;
  extras: number;
  kickback: number;
  sum: number;
}

// Aggregated metrics
export interface Metrics {
  rnts: number;
  bednight: number;
  players: number;
  guests?: number;
  adr: number;
}
