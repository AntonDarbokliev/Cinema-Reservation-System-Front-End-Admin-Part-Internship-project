import { RequestFactory } from "../../common/services/requester";
import { RegisterUser } from "../interfaces/RegisterUser";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const register = async (registerData: RegisterUser) => await request.post(`${baseUrl}/auth/register/admin`, registerData);
