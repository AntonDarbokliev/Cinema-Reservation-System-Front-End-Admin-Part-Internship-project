import { editMovie } from "../service/moviesListService";
import { MovieFieldData } from "../interfaces/MovieFieldData";
import { makeFormData } from "../../common/utils/makeFormData";
import { useParams } from "react-router-dom";

export const useEditMovie = () => {
    const movieId = useParams().movieId;
    const editMovieHandler = async (movieData: MovieFieldData) => {
        const formData = makeFormData(movieData);
        if (movieId) return await editMovie(formData, movieId);
    };

    return {
        editMovieHandler,
    };
};
