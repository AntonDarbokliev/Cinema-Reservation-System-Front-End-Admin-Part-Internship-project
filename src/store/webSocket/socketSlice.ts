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

type SharedStateAction = PayloadAction<SocketState>;

type SeatSelectAction = PayloadAction<{
    seat: SocketSeat | null;
    fromServer?: boolean;
}>;

type SeatReserveAction = PayloadAction<{
    reservation: Reservation;
    fromServer?: boolean;
}>;

type SeatUnreserveAction = PayloadAction<{
    id: string;
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
        connectionEstablished: (state, action: SharedStateAction) => {
            state.isConnected = true;

            state.seats = action.payload.seats;
            state.reservations = action.payload.reservations;
            state.tickets = action.payload.tickets;
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
            const doesExist = state.reservations.some((reservation) => reservation._id === action.payload.reservation._id);
            if (action.payload.reservation && !doesExist) {
                state.reservations.push(action.payload.reservation);
                state.seats.filter((seat) => seat._id !== action.payload.reservation.seat);
            }
        },
        unreserveSeat: (state, action: SeatUnreserveAction) => {
            if (action.payload.id) {
                console.log("Unreserving seat: ", action.payload.id);

                state.reservations = state.reservations.filter((res) => res._id !== action.payload.id);
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

export const { connectionEstablished, connectionLost, initSocket, selectSeat, unselectSeat, buySeat, reserveSeat, unreserveSeat } =
    socketSlice.actions;

export default socketSlice.reducer;
