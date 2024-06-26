import { useParams } from "react-router-dom";
import { updateCinemaAwaitingStatusMargin } from "../service/sideNavService";

export const useUpdateAwaitingStatusMargin = (cinemaIdProp?: string) => {
    let cinemaId = useParams().id;

    if (cinemaIdProp) {
        cinemaId = cinemaIdProp;
    }
    const updateAwaitingStatusMarginHandler = async (minutesAwaitingStatusMargin: number) => {
        updateCinemaAwaitingStatusMargin(cinemaId!, { minutesAwaitingStatusMargin });
    };

    return {
        updateAwaitingStatusMarginHandler,
    };
};
