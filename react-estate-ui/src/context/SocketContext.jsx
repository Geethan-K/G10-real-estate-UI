import React,{ createContext,useContext,useEffect,useMemo,useState } from "react";
import {io} from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const socketContext = createContext();

export const SocketContextProvider = React.memo(({children}) => {
    const {currentUser} = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!socket) {
            const newSocket = io("http://localhost:4000");
            setSocket(newSocket);
        }
        return () => {
            newSocket.disconnect();
            setSocket(null); 
        };
    }, []);

    useEffect(() => {
        if (currentUser && socket) {
            socket.emit("newUser", currentUser.id);
        }
        alert('socket context invoked')
    }, [currentUser, socket]);

    const memoizedSocket = useMemo(() => ({
        socket
    }), [socket]);

    return (
        <socketContext.Provider value={memoizedSocket}>
            {children}
        </socketContext.Provider>
    );
});

