import { useNavigate, useParams } from "react-router-dom";
import { deleteMovie } from "../service/movieDetailsService";
import { removeMovieFromCinema } from "../../../store/cinema/cinemaSlice";
import { useDispatch } from "react-redux";

export const useDeleteMovie = () => {
    const cinemaId = useParams().id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteMovieHandler = async (id: string) => {
        await deleteMovie(id);
        if (cinemaId) {
            navigate(`/cinema/${cinemaId}/movies`);
        }
        dispatch(removeMovieFromCinema(id));
        return;
    };
    return {
        deleteMovieHandler,
    };
};
