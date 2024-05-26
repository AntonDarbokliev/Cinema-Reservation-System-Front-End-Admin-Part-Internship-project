import { Seat } from "../../HallsList/interfaces/hallInterface";

export interface SelectedSeat {
  seat: Seat;
  seatRow: number;
  seatNumber: number;
}