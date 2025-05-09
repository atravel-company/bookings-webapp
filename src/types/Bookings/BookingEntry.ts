// One entry inside bookings.array
export interface BookingEntry {
  type: "quarto" | "golf" | "transfer"; 
  checkin: string; // ISO date string
  supplier: string;
  values: Values;
  metrics: EntryMetrics;
}

// Detailed cost breakdown per entry
export interface Values {
  service: number;
  extras: number;
  kickback: number;
  total: number;
}

// Metrics per entry
export interface EntryMetrics {
  rnts: number;
  bednight: number;
  players: number;
  guests: number;
  adr: number;
}
