import { useEffect, useState } from "react";
import { Projection } from "../interfaces/Projection";
import { useParams } from "react-router-dom";
import { getProjections } from "../service/movieDetailsService";

export const useProjections = () => {
    const [projections, setProjections] = useState<Projection[]>([]);
    const cinemaId = useParams().id;

    useEffect(() => {
        if (cinemaId) getProjections(cinemaId).then((data) => setProjections(data));
    }, [cinemaId]);

    return {
        projections,
        setProjections
    };
};
