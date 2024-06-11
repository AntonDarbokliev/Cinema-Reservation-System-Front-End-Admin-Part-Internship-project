import { useEffect, useState } from "react";
import { FoodAndBeverage } from "../../FoodAndBeverages/interfaces/FoodAndBeverage";
import { getAllFoodAndBeverages } from "../../FoodAndBeverages/service/foodAndBeveragesService";
import { useParams } from "react-router-dom";

export const useFoodAndBeverages = (cinemaId?: string) => {
    const [foodAndBeverages, setFoodAndBeverages] = useState<FoodAndBeverage[]>([]);
    const cinemaIdParam = useParams().id;
    useEffect(() => {
        if (cinemaIdParam) getAllFoodAndBeverages(cinemaIdParam).then((data) => setFoodAndBeverages(data));
        else if (cinemaId) getAllFoodAndBeverages(cinemaId).then((data) => setFoodAndBeverages(data));
    }, []);

    return { foodAndBeverages };
};
