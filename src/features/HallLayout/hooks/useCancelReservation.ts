import { cancelReservation } from "../service/hallLayoutService";

export const useCancelReservation = () => {
    const cancelReservationHandler = async (id: string) => {
        return await cancelReservation(id);
    };
    return {
        cancelReservationHandler,
    }
};
