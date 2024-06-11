import { useDispatch } from "react-redux";
import { Cinema, CreateCinema } from "../../interfaces/cinemaInterface";
import { createCinema } from "../../services/cinemasListService";
import { addCinema } from "../../../../store/cinema/cinemaSlice";

export const useAddCinema = (cinemaSetter?: React.Dispatch<React.SetStateAction<Cinema[]>>) => {
    const dispatch = useDispatch();
    const createCinemaHandler = async (cinemaData: CreateCinema): Promise<Cinema> => {
        const cinema = await createCinema(cinemaData);
        dispatch(addCinema(cinema));
        if (cinemaSetter) cinemaSetter((state) => [...state, cinema]);
        return cinema;
    };
    return {
        createCinemaHandler,
    };
};
