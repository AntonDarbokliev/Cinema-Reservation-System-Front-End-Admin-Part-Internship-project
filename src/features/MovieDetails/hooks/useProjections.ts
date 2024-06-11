import { useEffect, useState } from "react";
import { Projection } from "../interfaces/Projection";
import { useParams } from "react-router-dom";
import { getProjections } from "../service/movieDetailsService";

export const useProjections = () => {
    const [projections, setProjections] = useState<Projection[]>([]);
    const movieId = useParams().movieId;

    useEffect(() => {
        if (movieId) getProjections(movieId).then((data) => setProjections(data));
    }, [movieId]);

    return {
        projections,
        setProjections,
    };
};
