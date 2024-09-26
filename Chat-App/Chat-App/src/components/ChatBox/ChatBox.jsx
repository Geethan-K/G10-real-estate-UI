import React,{Suspense,lazy} from "react";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./ChatBox.scss";
import apiRequest from "host/ApiRequest";
import {format} from 'timeago.js'
import { AuthContext } from "host/AuthContext";
import { socketContext } from "host/SocketContext";
import { testValue } from 'host/TestValue';
//import {useSelector,useDispatch} from 'react-redux'
// const AuthContext = lazy(()=>import('host/AuthContext'))
// const socketContext = lazy(()=>import('host/SocketContext'))

const Chat = forwardRef((props,chatRef) =>
  {
    const authContext = useContext(AuthContext);
    const [chat, setChat] = useState(null);
    if (!authContext) {
      return <div>{testValue}</div>; // You can also provide a fallback UI
    }
   // const {currentUser} =authContext;
  
  //  const currentUser = useSelector((state) => state.user.currentUser);
  //  const socket = useSelector((state) => state.chat.socket)
  //  const showLastMsgs = useSelector((state) => state.chat.showLastMsgs)
  //  const chats = useSelector((state)=>state.chat.chats)
  //  const {socket} = useContext(socketContext);
    const messageEndRef = useRef()
    const {currentUser,socket,chats,showLastMsgs} = props
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
    return (
      <div className="chat">
        <div className="messages">
          <h1>Messages</h1>
          {
           showLastMsgs && chats?.map((c)=>{
            if(c.senderID!==currentUser?.id){
               return (
                <div  className="message-container" style={{ backgroundColor: c.seenBy.includes(currentUser?.id) || chat?.id == c.id ? "green" : "#fecd514e" }}>
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
              <span className="close" onClick={()=>setChat(null)}>X</span>
            </div>
            <div className="center">
              {
                chat.messages?.map((message)=>(
                  <div 
                    className="chatMessage"
                    key={message.id}
                    style={{
                      alignSelf:message.userId===currentUser?.id ? "flex-end" : "flex-start",
                      textAlign:message.userId===currentUser?.id ? "right" : "left"
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
  }) 

export default Chat;
