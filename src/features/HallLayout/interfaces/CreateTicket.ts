import { Seat } from "../../HallsList/interfaces/hallInterface";

export interface CreateTicket {
    projection: string;

    reservaton: string;

    seat: Seat;

    seatRow: number;

    seatNumber: number;
}
