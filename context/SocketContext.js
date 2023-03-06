import io from "socket.io-client";
import { SOCKET_URL } from "../config/env";
import { createContext } from "react";

export const socket = io.connect(SOCKET_URL, {
  transports: ["websocket"],
});
export const SocketContext = createContext();
