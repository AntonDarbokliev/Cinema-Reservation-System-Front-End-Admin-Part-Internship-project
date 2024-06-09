import { RequestFactory } from "../../common/services/requester";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const addSeatType = (data: FormData) => request.post(`${baseUrl}/seat-types`, data);
export const editSeatType = (data: FormData, seatTypeId: string) => request.patch(`${baseUrl}/seat-types/${seatTypeId}`, data);
export const deleteSeatType = (seatTypeId: string) => request.delete(`${baseUrl}/seat-types/${seatTypeId}`);
