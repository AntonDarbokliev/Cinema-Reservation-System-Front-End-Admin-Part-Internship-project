import { makeFormData } from "../../common/utils/makeFormData";
import { EditFoodAndBeverage } from "../interfaces/EditFoodAndBeverage";
import { FoodAndBeverage } from "../interfaces/FoodAndBeverage";
import { editFoodAndBeverage } from "../service/foodAndBeveragesService";

export const useEditFoodAndBeverage = (stateSetter?: React.Dispatch<React.SetStateAction<FoodAndBeverage[]>>) => {
    const editFoodAndBeverageHandler = async (data: EditFoodAndBeverage, foodAndBeverageId: string) => {
        const formData = makeFormData(data);
        const foodAndBeverage = await editFoodAndBeverage(formData, foodAndBeverageId);
        if (stateSetter) {
            stateSetter((state) => {
                const stateCopy = state.slice();
                const index = state.findIndex((foodAndBeverage) => foodAndBeverage._id === foodAndBeverageId);
                stateCopy[index] = foodAndBeverage;
                return stateCopy;
            });
        }
    };

    return {
        editFoodAndBeverageHandler,
    };
};
