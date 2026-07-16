import { io } from "socket.io-client";
import useAuthStore from "../features/auth/store/auth.store";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  auth: {
    token: useAuthStore.getState().token,
  },
});

export default socket;
