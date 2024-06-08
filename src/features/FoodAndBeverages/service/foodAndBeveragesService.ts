import { RequestFactory } from "../../common/services/requester";
import { FoodAndBeverage } from "../interfaces/FoodAndBeverage";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllFoodAndBeverages = async (cinemaId: string): Promise<FoodAndBeverage[]> =>
    await request.get(`${baseUrl}/food-and-beverages/${cinemaId}`);

export const createFoodAndBeverage = async (foodAndBeverage: FormData): Promise<FoodAndBeverage> =>
    await request.post(`${baseUrl}/food-and-beverages`, foodAndBeverage);

export const editFoodAndBeverage = async (foodAndBeverage: FormData, foodAndBeverageId: string): Promise<FoodAndBeverage> =>
    await request.patch(`${baseUrl}/food-and-beverages/${foodAndBeverageId}`, foodAndBeverage);

export const deleteFoodAndBeverage = async (foodAndBeverageId: string): Promise<FoodAndBeverage> =>
    await request.delete(`${baseUrl}/food-and-beverages/${foodAndBeverageId}`);
