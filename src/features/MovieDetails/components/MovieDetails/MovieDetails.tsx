import { Movie } from "../../../MoviesList/interfaces/Movie";
import Container from "../../../common/components/Container/Container";
import { MovieOrProjectionDetails } from "../../../common/components/MovieOrProjectionDetails/MovieOrProjectionDetails";
import { useMovie } from "../../hooks/useMovie";

export const MovieDetails = () => {
    const { movie, setMovie } = useMovie();
    return (
        <Container>
            {movie && (
                <MovieOrProjectionDetails
                    setMovie={setMovie as React.Dispatch<React.SetStateAction<Movie>>}
                    movie={movie!}
                ></MovieOrProjectionDetails>
            )}
        </Container>
    );
};
