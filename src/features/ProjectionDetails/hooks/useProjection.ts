import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Projection, ProjectionType } from "../../MovieDetails/interfaces/Projection";
import { getProjection } from "../service/ProjectionDetailsService";
import { Rating } from "../../MoviesList/interfaces/Rating";

export const useProjection = () => {
    const params = useParams();
    const [projection, setProjection] = useState<Projection>({
        _id: "",
        baseTicketPrice: 12,
        cinema: { _id: "", address: "", halls: [], menu: [], movies: [], name: "", numberOfHalls: "0", projections: [] },
        hall: { _id: "", numberOfSeats: 0, seatsLayout: [], name: "" },
        movie: {
            _id: "",
            actors: [],
            director: "",
            description: "",
            genres: [],
            language: "",
            length: "",
            name: "",
            poster: "",
            production: "",
            rating: Rating.RATING_G,
            subtitles: [],
            projections: [],
        },
        projectionType: ProjectionType.PROJECTION_2D,
        startDate: "",
        startTime: "",
        reservations: [],
    });
    useEffect(() => {
        if (params.projectionId) {
            getProjection(params.projectionId).then((data) => setProjection(data));
        }
    }, []);
    return {
        projection,
        setProjection,
    };
};
