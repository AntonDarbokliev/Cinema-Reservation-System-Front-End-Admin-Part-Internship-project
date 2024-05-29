import { useEffect, useState } from "react";
import { getProjectionTypes } from "../service/ProjectionDetailsService";
import { ProjectionType } from "../../MovieDetails/interfaces/Projection";

export const useProjectionTypes = () => {
    const [projectionTypes, setProjectionTypes] = useState<ProjectionType[]>([]);
    useEffect(() => {
        getProjectionTypes().then((types) => setProjectionTypes(types));
    }, []);
    return {
        projectionTypes,
    };
};
