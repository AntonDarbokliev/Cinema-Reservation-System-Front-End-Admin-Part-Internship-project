import { useNavigate, useParams } from "react-router-dom";
import { deleteProjection } from "../service/ProjectionDetailsService";

export const useDeleteProjectoin = (moveIdToRedirect?: string) => {
    const cinemaId = useParams().id;
    const navigate = useNavigate();
    const deleteProjectionHandler = async (id: string) => {
        await deleteProjection(id);
        if (moveIdToRedirect && cinemaId) {
            navigate(`/cinema/${cinemaId}/movies/${moveIdToRedirect}`);
        }
    };
    return { deleteProjectionHandler };
};
