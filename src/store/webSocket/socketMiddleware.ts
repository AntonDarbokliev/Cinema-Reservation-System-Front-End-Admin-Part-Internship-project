import { Middleware } from "redux";
import { buySeat, connectionEstablished, connectionLost, initSocket, reserveSeat, selectSeat, unselectSeat } from "./socketSlice";
import SocketFactory, { SocketInterface } from "./SocketFactory";
import { addToast } from "../toast/toastSlice";
import { v4 as uuidv4 } from "uuid";

export enum SocketEvent {
    CONNECT = "establishConnection",
    DISCONNECT = "disconnectSocket",
    SET_SEAT = "setSeat",
    UNSET_SEAT = "unsetSeat",
    RESERVE_SEAT = "reserveSeat",
    BUY_SEAT = "buySeat",
    ERROR = "err",
}

const socketMiddleware: Middleware = (store) => {
    let socket: SocketInterface | null = null;

    return (next) => (action) => {
        if (initSocket.match(action)) {
            if (!socket && typeof window !== "undefined") {
                console.log("socket before creating: ", socket);

                socket = SocketFactory.create();
                console.log("connection socket");

                socket.socket.on(SocketEvent.CONNECT, () => {
                    store.dispatch(connectionEstablished());
                });

                socket.socket.on(SocketEvent.DISCONNECT, () => {
                    store.dispatch(connectionLost());
                });

                socket.socket.on(SocketEvent.SET_SEAT, (seat) => {
                    store.dispatch(selectSeat({ seat, fromServer: true }));
                });

                socket.socket.on(SocketEvent.RESERVE_SEAT, (reservation) => {
                    store.dispatch(reserveSeat({ reservation, fromServer: true }));
                });

                socket.socket.on(SocketEvent.BUY_SEAT, (ticket) => {
                    store.dispatch(buySeat({ ticket, fromServer: true }));
                });

                socket.socket.on(SocketEvent.UNSET_SEAT, (seat) => {
                    store.dispatch(unselectSeat({ seat, fromServer: true }));
                });

                socket.socket.on(SocketEvent.ERROR, (message) => {
                    store.dispatch(addToast({ text: message, type: "danger", id: uuidv4() }));
                });
            }
        }

        if (connectionLost.match(action)) {
            if (socket) {
                socket.socket.disconnect();
                socket = null;
            }

            next(action);
        }

        if (selectSeat.match(action) && socket && !action.payload.fromServer) {
            const seat = action.payload.seat;
            socket.socket.emit(SocketEvent.SET_SEAT, seat);

            next(action);
        }

        if (unselectSeat.match(action) && socket && !action.payload.fromServer) {
            const seat = action.payload.seat;
            socket.socket.emit(SocketEvent.UNSET_SEAT, seat);

            next(action);
        }

        if (reserveSeat.match(action) && socket && !action.payload.fromServer) {
            const reservation = action.payload.reservation;
            socket.socket.emit(SocketEvent.RESERVE_SEAT, reservation);

            next(action);
        }

        if (buySeat.match(action) && socket && !action.payload.fromServer) {
            const ticket = action.payload.ticket;
            socket.socket.emit(SocketEvent.BUY_SEAT, ticket);

            next(action);
        }

        next(action);
    };
};

export default socketMiddleware;
