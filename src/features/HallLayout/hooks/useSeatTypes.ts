import { useParams } from "react-router-dom";
import { getSeatTypes } from "../service/hallLayoutService";
import { useEffect, useState } from "react";
import { SeatType } from "../../HallsList/interfaces/SeatType";

export const useSeatTypes = () => {
    const [seatTypes, setSeatTypes] = useState<SeatType[]>();
    const cinemaId = useParams().id;
    useEffect(() => {
        if (cinemaId) getSeatTypes(cinemaId).then((seatTypes) => setSeatTypes(seatTypes));
    }, []);

    return { seatTypes };
};
