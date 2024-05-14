import { RequestFactory } from "../../common/services/requester"
import { Hall } from "../interfaces/hallInterface";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getHalls = (): Promise<Hall[]> => request.get(`${baseUrl}/halls`);

