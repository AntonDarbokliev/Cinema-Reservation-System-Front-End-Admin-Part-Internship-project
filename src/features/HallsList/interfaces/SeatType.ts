import { SeatTypeName } from "./hallInterface";

export interface SeatType {
    _id: string;
    name: SeatTypeName;
    price: number;
    cinema: string;
    image?: string;
}
