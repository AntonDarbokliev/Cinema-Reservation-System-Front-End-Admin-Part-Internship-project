export enum SeatType {
    SEAT_COMMON = "Common",
    SEAT_VIP = "VIP",
    SEAT_COUPLES = "Couples",
    SEAT_BLANK = "blank",
}

export interface Seat {
    type: SeatType.SEAT_COMMON | SeatType.SEAT_VIP | SeatType.SEAT_COUPLES | SeatType.SEAT_BLANK;
    _id: string;
}

export interface Row {
    _id: string;
    seats: Seat[];
}

export interface CreateRow {
    seats: Seat[];
}

export interface CreateSeat {
    type: SeatType.SEAT_COMMON | SeatType.SEAT_VIP | SeatType.SEAT_COUPLES | SeatType.SEAT_BLANK;
}

export interface Hall {
    seatsLayout: Row[];
    _id: string;
    numberOfSeats: number;
    name: string;
}

export interface CreateHall {
    name: string;

    cinemaId: string;
}
