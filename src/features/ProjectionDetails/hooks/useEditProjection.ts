import { useParams } from "react-router-dom";
import { editProjection } from "../service/ProjectionDetailsService";
import { EditProjection } from "../interfaces/EditProjection";

export const useEditProjection = (projectionId?: string) => {
    const projectionIdParam = useParams().projectionId;

    const editProjectionHandler = async (projectionData: EditProjection) => {
        if (projectionIdParam) {
            return await editProjection(projectionIdParam, projectionData);
        } else if (projectionId) {
            return await editProjection(projectionId, projectionData);
        }
    };
    return {
        editProjectionHandler,
    };
};
