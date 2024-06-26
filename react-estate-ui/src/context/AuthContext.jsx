import { createContext,useEffect,useState } from "react";
import apiRequest from "../lib/apiRequest";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const[currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    const [chatsInfo,updateChatsInfo] = useState(null);

    const updateUser = (data) =>{
        setCurrentUser(data)
    }
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser))
      // getChatInfo()
    },[currentUser])
    
  
    const getChatInfo = async () =>{
        try{
            const res = await apiRequest.get('/chats')
            console.log('from auth context',res.data)
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