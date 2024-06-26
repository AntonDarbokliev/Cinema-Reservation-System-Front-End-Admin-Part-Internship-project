import { FoodAndBeverage } from "../../FoodAndBeverages/interfaces/FoodAndBeverage";

export interface CreateTicket {
    projection: string;

    reservaton?: string;

    seat: string;

    seatRow: number;

    seatNumber: number;

    price: number | string;

    foodAndBeverages?: FoodAndBeverage[];
}
