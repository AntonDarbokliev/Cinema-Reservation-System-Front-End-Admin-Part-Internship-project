import { reserveSeat } from "../service/hallLayoutService";
import { CreateReservation } from "../interfaces/CreateReservation";

export const useReserveSeat = () => {
    const reserveSeatHandler = async (reserveData: CreateReservation) => {
        return await reserveSeat(reserveData);
    };

    return {
        reserveSeatHandler,
    };
};
