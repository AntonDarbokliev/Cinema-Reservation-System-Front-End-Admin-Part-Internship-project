import { RequestFactory } from "../../common/services/requester";
import { Cinema } from "../interfaces/cinemaInterface";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
 
export const getAllCinemas = (): Promise<Cinema[]> => request.get(`${baseUrl}/cinemas`) 