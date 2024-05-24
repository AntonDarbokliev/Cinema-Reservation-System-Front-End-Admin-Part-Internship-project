import { useParams } from "react-router-dom";
import { CreateRow, Hall } from "../../HallsList/interfaces/hallInterface";
import { editHall } from "../service/hallLayoutService";

export const useEditHall = () => {
    const params = useParams();
    const editHallHandler = async (rows: CreateRow[]): Promise<Hall | undefined> => {
        console.log("Roles sent: ", rows);

        if (params.hallId) return await editHall(params.hallId, { seatsLayout: rows });
    };
    return {
        editHallHandler,
    };
};
