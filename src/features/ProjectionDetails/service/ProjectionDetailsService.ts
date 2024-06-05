import { RequestFactory } from "../../common/services/requester";
import { CreateProjection } from "../interfaces/CreateProjection";
import { EditProjection } from "../interfaces/EditProjection";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getProjection = (id: string) => request.get(`${baseUrl}/projections/${id}`);
export const getProjectionTypes = () => request.get(`${baseUrl}/projections/types`);
export const createProjection = (projectionData: CreateProjection) => request.post(`${baseUrl}/projections`, projectionData);
export const editProjection = (id: string, projectionData: EditProjection) => request.patch(`${baseUrl}/projections/${id}`, projectionData);
export const deleteProjection = (id: string) => request.delete(`${baseUrl}/projections/${id}`);
