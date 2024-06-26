import { FoodAndBeverage } from "../interfaces/FoodAndBeverage";
import { deleteFoodAndBeverage } from "../service/foodAndBeveragesService";

export const useDeleteFoodAndBeverage = (stateSetter?: React.Dispatch<React.SetStateAction<FoodAndBeverage[]>>) => {
    const deleteFoodAndBeverageHandler = async (id: string) => {
        await deleteFoodAndBeverage(id);
        if (stateSetter) {
            stateSetter((state) => state.filter((foodAndBeverage) => foodAndBeverage._id !== id));
        }
    };
    return {
        deleteFoodAndBeverageHandler,
    };
};
