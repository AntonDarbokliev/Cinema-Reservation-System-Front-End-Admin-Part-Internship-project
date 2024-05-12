import { Outlet } from "react-router-dom";
import { CinemaNavigation } from "../Navigation/CinemaNavigation";
import { useCinema } from "../../../CinemaInfo/hooks/useCinema";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCinema } from "../../../../store/cinema/cinemaSlice";

export const CinemaPage = () => {
    const { cinema } = useCinema();
    const dispatch = useDispatch();
    useEffect(() => {
        if (cinema) dispatch(addCinema(cinema));
    });
    return (
        <div>
            <CinemaNavigation />
            <Outlet />
        </div>
    );
};
