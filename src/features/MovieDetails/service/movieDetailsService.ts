import { RequestFactory } from "../../common/services/requester";
import { Projection } from "../interfaces/Projection";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getProjections = (cinemaId: string): Promise<Projection[]> => request.get(`${baseUrl}/projections/cinema/${cinemaId}`);
