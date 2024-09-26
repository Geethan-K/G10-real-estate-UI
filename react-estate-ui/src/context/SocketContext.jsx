import { createContext,useContext,useEffect,useState } from "react";
import {io} from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { useSelector,useDispatch } from "react-redux";
import {addSocket,addChats,addLastMsgs,addUser} from '../redux-store/shared-store'
export const socketContext = createContext();

export const SocketContextProvider = ({children}) =>{
    const {currentUser} = useContext(AuthContext)
    const [socket,setSocket] = useState(null);
    const socketState = useSelector((state)=>state.chat.scoket)
    const chatsState = useSelector((state)=>state.chat.chats)
    const showLastMsgsState = useSelector((state)=>state.chat.showLastMsgs)
    const dispatch = useDispatch()

    useEffect(()=>{
        setSocket(io("http://localhost:4000"))
        dispatch(addSocket({'socket':socket}))
    },[])

    useEffect(()=>{
        currentUser && socket?.emit("newUser",currentUser.id)
       // dispatch(emitSocket({'userId':currentUser.id}))
    },[currentUser,socket])


    return(
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}
