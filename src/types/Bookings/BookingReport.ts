import { BookingsCollection } from "./BookingsCollection";

export interface BookingReport {
  id: number;
  clientName: string;
  operatorName: string;
  startDate: string;  // ISO date string, e.g. "2025-05-09"
  bookings: BookingsCollection;
}
