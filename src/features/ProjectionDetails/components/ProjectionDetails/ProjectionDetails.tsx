import { useMovie } from "../../../MovieDetails/hooks/useMovie";
import { MovieOrProjectionDetails } from "../../../common/components/MovieOrProjectionDetails/MovieOrProjectionDetails";
import { useProjection } from "../../hooks/useProjection";

export const ProjectionDetails = () => {
    const { projection, setProjection } = useProjection();
    const { movie, setMovie } = useMovie(projection.movieId);

    return (
        <>
            {projection && movie && (
                <MovieOrProjectionDetails
                    movie={movie}
                    setMovie={setMovie}
                    setProjection={setProjection}
                    projection={projection}
                ></MovieOrProjectionDetails>
            )}
        </>
    );
};
