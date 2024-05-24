import { CreateRow, Hall } from "../../HallsList/interfaces/hallInterface";
import { RequestFactory } from "../../common/services/requester";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getHall = (id: string): Promise<Hall> => request.get(`${baseUrl}/halls/${id}`);
export const editHall = (id: string, layout: { seatsLayout: CreateRow[] }): Promise<Hall> => request.patch(`${baseUrl}/halls/${id}`, layout);
