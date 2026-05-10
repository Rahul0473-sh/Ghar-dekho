import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [unseenCount, setUnseenCount] = useState(0);

  const decrease = () => setUnseenCount((prev) => Math.max(0, prev - 1));

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      socket.emit("newUser", currentUser.id);
    }
  }, [currentUser, socket]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = () => {
      setUnseenCount((prev) => prev + 1);
    };

    socket.on("getMessage", handleMessage);
    return () => socket.off("getMessage", handleMessage);
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, unseenCount, setUnseenCount, decrease }}>
      {children}
    </SocketContext.Provider>
  );
};

