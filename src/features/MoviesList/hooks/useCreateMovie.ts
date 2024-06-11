import { useParams } from "react-router-dom";
import { createMovie } from "../service/moviesListService";
import { useDispatch } from "react-redux";
import { addMovieToCinema } from "../../../store/cinema/cinemaSlice";
import { makeFormData } from "../../common/utils/makeFormData";
import { MovieFieldData } from "../interfaces/MovieFieldData";

export const useCreateMovie = () => {
    const cinemaId = useParams().id;
    const dispatch = useDispatch();

    const createMovieHandler = async (movieData: MovieFieldData) => {
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
