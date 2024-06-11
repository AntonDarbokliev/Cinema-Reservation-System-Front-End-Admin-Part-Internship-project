import { CreateProjection } from "../../MovieDetails/interfaces/CreateProjection";
import { createProjection } from "../service/ProjectionDetailsService";

export const useCreateProjection = () => {
    const createProjectionHandler = async (projectionData: CreateProjection) => {
        return await createProjection(projectionData);
    };
    return {
        createProjectionHandler,
    };
};
