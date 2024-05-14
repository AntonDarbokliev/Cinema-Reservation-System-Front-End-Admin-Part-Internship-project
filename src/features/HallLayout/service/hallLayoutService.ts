import { Hall } from "../../HallsList/interfaces/hallInterface";
import { RequestFactory } from "../../common/services/requester";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getHall = (id: string): Promise<Hall> => request.get(`${baseUrl}/halls/${id}`);
