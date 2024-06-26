import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCinema } from "../service/cinemaService";
import { Cinema } from "../../CinemasList/interfaces/cinemaInterface";
export const useCinema = () => {
    const [cinema, setCinema] = useState<Cinema>();

    const params = useParams();

    useEffect(() => {
        if (params.id) getCinema(params.id).then((c) => setCinema(c));
    }, []);

    return {
        cinema,
    };
};
