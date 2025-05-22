export interface ServicesSummary {
  id: number;
  clientName: string;
  operatorName: string;
  startDate: string; // ISO date string, e.g. "2025-05-09"
  totals: Totals;
  metrics: Metrics;
  children: Service[];
}

export interface Service extends ServicesSummary {
  type: "quarto" | "golf" | "transfer";
  supplierName: string;
  children: [];
}

export interface Totals {
  quarto?: number;
  golf?: number;
  transfer?: number;
  extras: number;
  kickback: number;
  sum: number;
}

export interface Metrics {
  rnts: number;
  bednight: number;
  players: number;
  guests?: number;
  adr: number;
}
