import { SeatType } from "../../HallsList/interfaces/SeatType";
import { CreateRow, Hall } from "../../HallsList/interfaces/hallInterface";
import { Reservation } from "../../MovieDetails/interfaces/Reservation";
import { RequestFactory } from "../../common/services/requester";
import { CreateReservation } from "../interfaces/CreateReservation";
import { CreateTicket } from "../interfaces/CreateTicket";
import { Ticket } from "../interfaces/Ticket";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getHall = (id: string): Promise<Hall> => request.get(`${baseUrl}/halls/${id}`);
export const editHall = (id: string, layout: { seatsLayout: CreateRow[] }): Promise<Hall> => request.patch(`${baseUrl}/halls/${id}`, layout);
export const reserveSeat = (data: CreateReservation): Promise<Reservation> => request.post(`${baseUrl}/reservations`, data);
export const getFoodAndBeverages = (cinemaId: string) => request.get(`${baseUrl}/food-and-beverages/${cinemaId}`);
export const getSeatTypes = (cinemaId: string): Promise<SeatType[]> => request.get(`${baseUrl}/seat-types/${cinemaId}`);
export const buyTicket = (data: CreateTicket): Promise<Ticket> => request.post(`${baseUrl}/tickets`, data);
export const cancelReservation = (id: string) => request.post(`${baseUrl}/reservations/${id}/cancel`, { id });
