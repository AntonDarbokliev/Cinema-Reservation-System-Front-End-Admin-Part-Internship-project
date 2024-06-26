import { useDispatch, useSelector } from "react-redux";
import { Projection } from "../../MovieDetails/interfaces/Projection";
import { CreateTicket } from "../interfaces/CreateTicket";
import { buyTicket } from "../service/hallLayoutService";
import { IRootState } from "../../../store/store";
import { buySeat } from "../../../store/webSocket/socketSlice";

export const useBuyTicket = (setProjection?: React.Dispatch<React.SetStateAction<Projection>>) => {
    const isConnected = useSelector((state: IRootState) => state.socket.isConnected);
    const dispatch = useDispatch();

    const buyTicketHandler = async (buyTicketData: CreateTicket) => {
        const newTicket = await buyTicket(buyTicketData);
        if (setProjection) setProjection((prev) => ({ ...prev, tickets: [...prev.tickets, newTicket] }));
        if (isConnected) dispatch(buySeat({ ticket: newTicket }));
        return newTicket;
    };
    return {
        buyTicketHandler,
    };
};
