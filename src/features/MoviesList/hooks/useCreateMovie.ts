import { useParams } from "react-router-dom";
import { createMovie } from "../service/moviesListService";
import { Genre } from "../interfaces/Genre";
import { Rating } from "../interfaces/Rating";
import { useDispatch } from "react-redux";
import { addMovieToCinema } from "../../../store/cinema/cinemaSlice";
import { makeFormData } from "../../common/utils/makeFormData";

interface MovieData {
    language: string;
    name: string;
    length: string;
    director: string;
    description: string;
    production: string;
    rating: Rating;
    poster: File;
    actors: string[];
    subtitles: string[];
    genres: Genre[];
}

export const useCreateMovie = () => {
    const cinemaId = useParams().id;
    const dispatch = useDispatch();

    const createMovieHandler = async (movieData: MovieData) => {
        if (cinemaId) {
            // File uploads (poster) need to be sent in FormData
            const formData = makeFormData(movieData);

            formData.append("cinemaId", cinemaId);
            const movie = await createMovie(formData);
            if (addMovieToCinema) {
                dispatch(addMovieToCinema(movie));
            }
            return movie;
        }
    };

    return { createMovieHandler };
};