import { Seat } from "../../features/HallsList/interfaces/hallInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reservation } from "../../features/MovieDetails/interfaces/Reservation";
import { Ticket } from "../../features/HallLayout/interfaces/Ticket";

interface SocketSeat extends Seat {
    projectionId: string;
}

export interface SocketState {
    isConnected: boolean;
    seats: SocketSeat[];
    reservations: Reservation[];
    tickets: Ticket[];
}

const initialState: SocketState = {
    isConnected: false,
    seats: [],
    reservations: [],
    tickets: [],
};

type SeatSelectAction = PayloadAction<{
    seat: SocketSeat | null;
    fromServer?: boolean;
}>;

type SeatReserveAction = PayloadAction<{
    reservation: Reservation;
    fromServer?: boolean;
}>;

type SeatBuyAction = PayloadAction<{
    ticket: Ticket;
    fromServer?: boolean;
}>;

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        initSocket: () => {
            // A function made just to trigger the middleware, thus initializing the socket.
            return;
        },
        connectionEstablished: (state) => {
            state.isConnected = true;
        },
        connectionLost: (state) => {
            state.isConnected = false;
        },
        selectSeat: (state, action: SeatSelectAction) => {
            const doesExist = state.seats.some((seat) => seat._id === action.payload.seat?._id);
            if (action.payload.seat && !doesExist) state.seats.push(action.payload.seat);
        },
        unselectSeat: (state, action: SeatSelectAction) => {
            if (action.payload.seat) state.seats = state.seats.filter((seat) => seat._id !== action.payload.seat!._id);
        },
        reserveSeat: (state, action: SeatReserveAction) => {
            if (action.payload.reservation) {
                state.reservations.push(action.payload.reservation);
                state.seats.filter((seat) => seat._id !== action.payload.reservation.seat);
            }
        },
        buySeat: (state, action: SeatBuyAction) => {
            if (action.payload.ticket) {
                state.tickets.push(action.payload.ticket);
                state.seats.filter((seat) => seat._id !== action.payload.ticket.seat);
            }
        },
    },
});

export const { connectionEstablished, connectionLost, initSocket, selectSeat, unselectSeat, buySeat, reserveSeat, } = socketSlice.actions;

export default socketSlice.reducer;
