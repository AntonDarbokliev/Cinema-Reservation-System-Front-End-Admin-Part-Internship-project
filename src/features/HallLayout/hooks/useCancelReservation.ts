import { useDispatch, useSelector } from "react-redux";
import { cancelReservation } from "../service/hallLayoutService";
import { IRootState } from "../../../store/store";
import { unreserveSeat } from "../../../store/webSocket/socketSlice";

export const useCancelReservation = () => {
    const isConnected = useSelector((state: IRootState) => state.socket.isConnected);
    const dispatch = useDispatch();

    const cancelReservationHandler = async (id: string) => {
        if (isConnected) {
            dispatch(unreserveSeat({ id }));
        }
        return await cancelReservation(id);
    };
    return {
        cancelReservationHandler,
    };
};
