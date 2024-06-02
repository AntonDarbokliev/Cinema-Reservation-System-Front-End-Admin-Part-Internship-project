import { RequestFactory } from "../../common/services/requester";
import { Cinema, CreateCinema } from "../interfaces/cinemaInterface";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllCinemas = (): Promise<Cinema[]> => request.get(`${baseUrl}/cinemas`);
export const createCinema = (cinemaData: CreateCinema): Promise<Cinema> => request.post(`${baseUrl}/cinemas`, cinemaData);
