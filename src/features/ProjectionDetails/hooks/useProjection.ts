import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Projection } from "../../MovieDetails/interfaces/Projection";
import { getProjection } from "../service/ProjectionDetailsService";

export const useProjection = () => {
    const params = useParams();
    const [projection, setProjection] = useState<Projection>();
    useEffect(() => {
        if (params.projectionId) {
            getProjection(params.projectionId).then((data) => setProjection(data));
        }
    }, []);
    return {
        projection,
    };
};
