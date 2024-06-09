import { RequestFactory } from "../../common/services/requester";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const addSeatType = (data: FormData) => request.post(`${baseUrl}/seat-types`, data);
