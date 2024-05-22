import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { useParams } from "react-router-dom";
import Container from "../../../common/components/Container/Container";
import { MovieOrProjectionDetails } from "../../../common/components/MovieOrProjectionDetails/MovieOrProjectionDetails";

export const MovieDetails = () => {
    const params = useParams();
    const movie = useSelector((state: IRootState) => state.cinema.movies.find((m) => m._id == params.movieId));

    return <Container>{movie && <MovieOrProjectionDetails movie={movie}></MovieOrProjectionDetails>}</Container>;
};
