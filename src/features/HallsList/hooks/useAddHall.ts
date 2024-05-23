import { useParams } from "react-router-dom";
import { CreateHall, Hall } from "../interfaces/hallInterface";
import { createHall } from "../service/hallsListService";

export const useAddHall = (hallSetter?: React.Dispatch<React.SetStateAction<Hall[]>>) => {
    const params = useParams();
    const addHallHandler = async (name: string) => {
        if (params.id) {
            const hallData: CreateHall = {
                name,
                cinemaId: params.id,
            };
            const hall = await createHall(hallData);
            if (hallSetter) hallSetter((state) => [...state, hall]);
            return hall;
        }
    };
    return {
        addHallHandler,
    };
};
