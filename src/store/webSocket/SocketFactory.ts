"use client";

import { io, Socket } from "socket.io-client";

export interface SocketInterface {
    socket: Socket;
}

class SocketConnection implements SocketInterface {
    public socket: Socket;
    public socketEndpoint = import.meta.env.VITE_API_BASE_URL;
    constructor() {
        this.socket = io(this.socketEndpoint);
        this.socket.on("disconnect", () => {
            socketConnection = undefined;
        });
    }
}

let socketConnection: SocketConnection | undefined;

class SocketFactory {
    public static create(): SocketConnection {
        if (!socketConnection) {
            socketConnection = new SocketConnection();
        }
        return socketConnection;
    }
}

export default SocketFactory;
