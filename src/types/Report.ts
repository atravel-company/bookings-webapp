import { BookingsCollection } from "./Bookings/BookingsCollection";

export interface Report {
  id: number;
  clientName: string;
  operatorName: string;
  startDate: string;  // ISO date string, e.g. "2025-05-09"
  bookings: BookingsCollection;
}
