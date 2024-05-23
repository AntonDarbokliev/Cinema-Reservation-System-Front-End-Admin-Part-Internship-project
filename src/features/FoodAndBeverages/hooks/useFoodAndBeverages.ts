import { useEffect, useState } from "react";
import { FoodAndBeverage } from "../interfaces/FoodAndBeverage";
import { getAllFoodAndBeverages } from "../service/foodAndBeveragesService";
import { useParams } from "react-router-dom";

export const useFoodAndBeverages = () => {
    const [foodBeverages, setFoodBeverages] = useState<FoodAndBeverage[]>([]);
    const cinemaId = useParams().id;
    useEffect(() => {
        if (cinemaId) getAllFoodAndBeverages(cinemaId).then((data) => setFoodBeverages(data));
    }, []);
    return { foodBeverages };
};
