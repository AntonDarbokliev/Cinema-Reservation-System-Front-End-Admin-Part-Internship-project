import { reserveSeat } from "../service/hallLayoutService";
import { CreateReservation } from "../interfaces/CreateReservation";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { reserveSeat as reserveSeatAction } from "../../../store/webSocket/socketSlice";

export const useReserveSeat = () => {
    const isConnected = useSelector((state: IRootState) => state.socket.isConnected);
    const dispatch = useDispatch();

    const reserveSeatHandler = async (reserveData: CreateReservation) => {
        const reservation = await reserveSeat(reserveData);
        if (isConnected) {
            dispatch(reserveSeatAction({ reservation }));
        }
        return reservation;
    };

    return {
        reserveSeatHandler,
    };
};
