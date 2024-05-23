import { Cinema } from "../../CinemasList/interfaces/cinemaInterface";
import { RequestFactory } from "../../common/services/requester";
import { CreateHall, Hall } from "../interfaces/hallInterface";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getHalls = async (cinemaId: string): Promise<Hall[]> => {
    const cinema: Cinema = await request.get(`${baseUrl}/cinemas/${cinemaId}`);
    return cinema.halls;
};

export const createHall = (hallData: CreateHall): Promise<Hall> => request.post(`${baseUrl}/halls`, hallData);
