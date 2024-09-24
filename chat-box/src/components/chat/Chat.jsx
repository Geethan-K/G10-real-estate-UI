import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./chat.scss";
//import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import {format} from 'timeago.js'
//import { socketContext } from "../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
const SharedStore = React.lazy(()=>import('host/SharedStore'))
import {addChats,addSocket,addLastMsgs} from 'host/SharedStore';

const Chat = () =>
  {
    const chatRef = useRef() 
    const chats = useSelector((state)=>state.chat.chats)
    const showLastMsgs = useSelector((state)=>state.chat.showLastMsgs)
    const [chat, setChat] = useState(null);
    const {currentUser} = useSelector((state)=>state.user.currentUser);
    const {socket} = useSelector((state)=>state.chat.socket)
    const messageEndRef = useRef()
    const dispatch = useDispatch()

    console.log(currentUser)
    console.log(chat)
    console.log(showLastMsgs)

   // const {chats,showLastMsgs} = props
    useEffect(()=>{
      if (!socket) return;
    const read = async () => {
      try{
        await apiRequest.put("/chats/read"+chat.id)
        }catch(err){
        console.log(err)
      }
    }
    if((chat && socket)){
      socket.on("getMessage", (data)=>{
        if(chat.id==data.chatId){
          setChat((prev)=>({...prev,messages:[...prev.messages,data]}));
          dispatch(addChats(chat))
          read()
          console.log('new msg receved , chat state changed',chat);
        }
      })
    }
    return ()=>{
      socket.off("getMessage")
    }
   },[socket,chat])
  
   useEffect(()=>{
    messageEndRef.current?.scrollIntoView({behavior:"smooth"})
   },[chat])
  
    useImperativeHandle(chatRef,()=>{
      return {
        openChat
      }
    })


    const openChat = async (id,receiver) =>{
      try{
          const res = await apiRequest.get('/chats/'+id)
          setChat({...res.data,receiver})
          dispatch(addChats(chat))
     }catch(err){
        console.log(err)
      }
    }
    
  
    const handleSubmit =async (e) =>{
      e.preventDefault()
      const formData = new FormData(e.target)
      const text = formData.get("text")
      if(!text) return 
      try{
        const res = await apiRequest.post("/message/"+chat.id,{text,receiverId:chat.receiver.id})
        setChat((prev)=>({...prev,messages:[...prev.messages,res.data]}))
        e.target.reset()
       socket.emit("sendMessage",{
          receiverId:chat.receiver.id,
          data:res.data
         })
      }catch(res){
        console.log(res)
      }
    }

    const closeChatBox = () =>{
      setChat(null)
      dispatch(addChats(null))
    }
    return (
      <div className="chat">
        <div className="messages">
          <h1>Messages</h1>
          {
           showLastMsgs && chats?.map((c)=>{
            if(c.senderID!==currentUser.id){
               return (
                <div  className="message-container" style={{ backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id == c.id ? "green" : "#fecd514e" }}>
                <span
                   key={c.id}
                   onClick={() => openChat(c.id, c.receiver)}
                   style={{display:'flex',flexDirection:'column'}}
                 >
                   <img
                     src={c.receiver.avatar || "/noavatar.jpg"}
                     alt=""
                   />
                   <span>{c.receiver.username}</span>
                 </span>
                  <p className="message-txt">{c.lastMessage}</p>
                </div>
                 
               )
             }
           }
            )
          }
        </div>
        {chat && (
          <div className="chatBox">
            <div className="top" >
              <div className="user">
                <img
                  src={chat.receiver.avatar || "/noavatar.jpg"}
                  alt=""
                />
               {chat.receiver.username}
              </div>
              <span className="close" onClick={()=>closeChatBox()}>X</span>
            </div>
            <div className="center">
              {
                chat.messages?.map((message)=>(
                  <div 
                    className="chatMessage"
                    key={message.id}
                    style={{
                      alignSelf:message.userId===currentUser.id ? "flex-end" : "flex-start",
                      textAlign:message.userId===currentUser.id ? "right" : "left"
                    }}
                    >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
                ))
              }
              <div ref={messageEndRef}></div>
             
            </div>
            <form className="bottom" onSubmit={(e)=>handleSubmit(e)}>
              <textarea name="text"></textarea>
              <button>Send</button>
            </form>
          </div>
        )}
      </div>
    );
  }

export default Chat;
