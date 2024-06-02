import { RequestFactory } from "../../common/services/requester";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getProjection = (id:string) => request.get(`${baseUrl}/projections/${id}`);
