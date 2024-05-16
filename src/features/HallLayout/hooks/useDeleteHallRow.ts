import { useParams } from "react-router-dom";
import { deleteHallRow } from "../service/hallLayoutService";

export const useDeleteHallRow = () => {
    const params = useParams();

    const deleteHallRowHandler = async (rowId: string) => {
        const hallId = params.hallId;
        if(hallId)
        await deleteHallRow(hallId, rowId);
    };

    return {
      deleteHallRowHandler
    }
};
