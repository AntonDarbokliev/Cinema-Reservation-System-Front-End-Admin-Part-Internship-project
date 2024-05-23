import { RequestFactory } from "../../common/services/requester";
import { FoodAndBeverage } from "../interfaces/FoodAndBeverage";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllFoodAndBeverages = async (cinemaId: string): Promise<FoodAndBeverage[]> =>
    await request.get(`${baseUrl}/food-and-beverages/${cinemaId}`);

export const createFoodAndBeverage = async (foodAndBeverage: FormData): Promise<FoodAndBeverage> =>
    await request.post(`${baseUrl}/food-and-beverages`, foodAndBeverage);
