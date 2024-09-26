import React,{ createContext,useEffect,useState } from "react";
import apiRequest from "../lib/apiRequest";
import { useSelector,useDispatch } from "react-redux";
 import {addSocket,addChats,addLastMsgs,addUser} from '../redux-store/shared-store'
 import App from '../App'
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const dispatch = useDispatch()  
    const[currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
      
    const [chatsInfo,updateChatsInfo] = useState(null);

    const updateUser = (data) =>{
        setCurrentUser(data)
    }
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser))
        dispatch(addUser({currentUser:currentUser}))
       getChatInfo()
    },[currentUser])
   

  
    const getChatInfo = async () =>{
        try{
            const res = await apiRequest.get('/chats')
            useDispatch(addChats({chats:chatsInfo}))
            updateChatsInfo(res.data)
        }catch(err){
            console.log("could'nt get chat info",err)
        }
       
    }
    return (
        <AuthContext.Provider value={{currentUser,updateUser,chatsInfo,updateChatsInfo}}>
            {children} 
        </AuthContext.Provider>
    )
} 