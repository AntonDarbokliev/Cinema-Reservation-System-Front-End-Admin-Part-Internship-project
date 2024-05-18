import { RequestFactory } from "../../common/services/requester";
import { LoginUser } from "../interfaces/loginUserInterface";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;


export const login = async (loginData: LoginUser) => await request.post(`${baseUrl}/auth/login/admin`, loginData);
