import { Projection } from "../../MovieDetails/interfaces/Projection";
import { CreateTicket } from "../interfaces/CreateTicket";
import { buyTicket } from "../service/hallLayoutService";

export const useBuyTicket = (setProjection?: React.Dispatch<React.SetStateAction<Projection>>) => {
    const buyTicketHandler = async (buyTicketData: CreateTicket) => {
        const newTicket = await buyTicket(buyTicketData);
        if (setProjection) setProjection((prev) => ({ ...prev, tickets: [...prev.tickets, newTicket] }));
        return newTicket;
    };
    return {
        buyTicketHandler,
    };
};
