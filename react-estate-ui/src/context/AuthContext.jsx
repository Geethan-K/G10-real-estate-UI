import React, { createContext,useEffect,useMemo,useState } from "react";
import apiRequest from "../lib/apiRequest";
import { useDispatch, useSelector } from 'react-redux';
export const AuthContext = createContext();

export const AuthContextProvider = React.memo(({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [chatsInfo, updateChatsInfo] = useState(null);
    const updateUser = (data) => {
        setCurrentUser(data);
    };

    useEffect(() => {
         if(currentUser){
            localStorage.setItem('user', JSON.stringify(currentUser));
        }
    }, [currentUser]);

    const memoizedValue = useMemo(() => ({
        currentUser, updateUser, chatsInfo, updateChatsInfo
    }), [currentUser, chatsInfo]);

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
});
