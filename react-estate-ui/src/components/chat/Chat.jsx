import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {format} from 'timeago.js';
import moment from 'moment';
import { socketContext } from "../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { format as dateFormat, isSameDay } from 'date-fns';

const Chat = forwardRef((props,chatRef) =>
  {
    const [chat, setChat] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const {socket} = useContext(socketContext);
    const messageEndRef = useRef()
    const {chats,showLastMsgs,receiverData} = props
    const today = new Date();
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
        
        //  groupChatsByDate()  
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
          console.log(chat)
         // groupChatsByDate()  
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
       // groupChatsByDate()
        e.target.reset()
       socket.emit("sendMessage",{
          receiverId:chat.receiver.id,
          data:res.data
         })
      }catch(res){
        console.log(res)
      }
    }
    const groupChatsByDate = () => {
      
      chat.messages.reduce((groups, message) => {
        const date = dateFormat(new Date(message.createdAt), 'yyyy-MM-dd');
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(message);
        //setChat(groups)
       // console.log('modified bit',chat)
       return groups;
     }, {});
    };
 

    return (
      <div className="chat">
        <div className="messages">   
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
          
          <>
          {/* {
            setChat(groupChatsByDate())
          } */}
            <h1 style={{color:'white',fontWeight:'300',marginBottom:'5vh'}}>Messages</h1>
            <div className="chatBox">
            <div className="top" >
                <div className="user pointer">
                  {
                    receiverData && <span>
                      <FontAwesomeIcon icon={faCircle} style={{ color: 'green', fontSize: '15px' }} />
                    </span>
                  }              
                <img
                  src={chat.receiver.avatar || "/noavatar.jpg"}
                  alt=""
                />
                <span className="">
                <p>{chat.receiver.username}</p>
                <p className="font-medium">Last seen at {format(receiverData.loginAt)}</p>
                </span>
                 
              </div>
              <span className="padding-sm close font-semiBold" onClick={()=>setChat(null)}>X</span>
            </div>
            <div className="center">
              {
             //   chat.messages.grou
                chat.messages?.map((message)=>(
                  <div 
                    className="chatMessage"
                    key={message.id}
                    style={{width:'fit-content',
                      alignSelf:message.userId===currentUser.id ? "flex-end" : "flex-start",
                      textAlign:message.userId===currentUser.id ? "right" : "left"
                    }}
                    >
                  <p className="msg-txt">{message.text} <span>{moment(message.createdAt).format('hh:mm A')}</span></p>
                  <span>{format(message.createdAt)}</span>
                </div>
                ))
              }
                {/* {
                  Object.keys(chat.message).map((date, index) => (
                    <div key={index}>
                      <div style={{ textAlign: 'center', margin: '10px 0' }}>
                        {isSameDay(new Date(date.createdAt), today)
                          ? 'Today'
                          : format(new Date(date.createdAt), 'MMMM dd, yyyy')}
                      </div>
                      {Object.keys(chat[date]).map((message) => (
                         <div 
                         className="chatMessage"
                         key={message.id}
                         style={{width:'fit-content',
                           alignSelf:message.userId===currentUser.id ? "flex-end" : "flex-start",
                           textAlign:message.userId===currentUser.id ? "right" : "left"
                         }}
                         >
                       <p className="msg-txt">{message.text} <span>{moment(message.createdAt).format('hh:mm A')}</span></p>
                     </div>
                      ))}
                    </div>
                  ))
                } */}
              <div ref={messageEndRef}></div>
             
            </div>
            <form className="bottom" onSubmit={(e)=>handleSubmit(e)}>
              <textarea name="text"></textarea>
              <button>
                <FontAwesomeIcon icon={faPaperPlane} style={{fontSize:'30px'}}/>
              </button>
            </form>
          </div>
          </>
         
        )}
      </div>
    );
  }) 

export default Chat;
