import { useParams } from "react-router-dom";
import { createFoodAndBeverage } from "../service/foodAndBeveragesService";
import { FoodAndBeverage } from "../interfaces/FoodAndBeverage";
import { makeFormData } from "../../common/utils/makeFormData";

interface FoodBeverageData {
    name: string;
    description: string;
    price: number;
    image: File;
}

export const useCreateFoodAndBeverage = (stateSetter?: React.Dispatch<React.SetStateAction<FoodAndBeverage[]>>) => {
    const cinemaId = useParams().id;
    const createFoodAndBeverageHandler = async (data: FoodBeverageData) => {
        if (cinemaId) {
            const formData = makeFormData(data);
            formData.append("cinemaId", cinemaId);
            const foodAndBeverage = await createFoodAndBeverage(formData);
            if (stateSetter) {
                stateSetter((state) => [...state, foodAndBeverage]);
            }
        }
    };
    return {
        createFoodAndBeverageHandler,
    };
};
