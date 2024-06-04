import { Seat } from "../../features/HallsList/interfaces/hallInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SocketSeat extends Seat {
    projectionId: string;
}

export interface SocketState {
    isConnected: boolean;
    seats: SocketSeat[];
}

const initialState: SocketState = {
    isConnected: false,
    seats: [],
};

type SeatAction = PayloadAction<{
    seat: SocketSeat | null;
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
        selectSeat: (state, action: SeatAction) => {
            const doesExist = state.seats.some((seat) => seat._id === action.payload.seat?._id);
            if (action.payload.seat && !doesExist) state.seats.push(action.payload.seat);
        },
        unselectSeat: (state, action: SeatAction) => {
            if (action.payload.seat) state.seats = state.seats.filter((seat) => seat._id !== action.payload.seat!._id);
        },
    },
});

export const { connectionEstablished, connectionLost, initSocket, selectSeat, unselectSeat } = socketSlice.actions;

export default socketSlice.reducer;
