import { Cinema } from "../../CinemasList/interfaces/cinemaInterface";
import { RequestFactory } from "../../common/services/requester";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;


export const getCinema = (id: string): Promise<Cinema> => request.get(`${baseUrl}/cinemas/${id}`); 
