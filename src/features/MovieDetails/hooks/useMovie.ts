import { useParams } from "react-router-dom";
import { Movie } from "../../MoviesList/interfaces/Movie";
import { useEffect, useState } from "react";
import { getMovie } from "../service/movieDetailsService";

export const useMovie = (movieId?: string) => {
    const movieIdParam = useParams().movieId;
    const [movie, setMovie] = useState<Movie>();
    useEffect(() => {
        if (movieId) getMovie(movieId).then((data) => setMovie(data));
        else if (movieIdParam) getMovie(movieIdParam).then((data) => setMovie(data));
    }, [movieId]);

    return {
        movie,
        setMovie,
    };
};
