import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./Chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from 'timeago.js';
import moment from 'moment';
import { socketContext } from "../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { format as dateFormat, isSameDay, isToday, isYesterday } from 'date-fns';

const Chat = forwardRef((props, ref) => {

  const [chat, setChat] = useState(null);
  const [Today, setToday] = useState(moment(new Date()).format("DD/MM/YYYY"))
  const [receiverStatus, setReceiverStatus] = useState(null)
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(socketContext);
  const messageEndRef = useRef()
  const { chats, showLastMsgs, receiverData } = props
  // console.log('current user',currentUser)
  // console.log('last recents',chats)
  // console.log('last recents',chat)
  const today = new Date();
  useEffect(() => {
    if (!socket || !chat) return;
    const read = async () => {
      try {
        const updateSeenBy = await apiRequest.put("/chats/read/" + chat.id);
        console.log('update seenby', updateSeenBy)
      } catch (err) {
        console.log(err);
      }
    };

    socket.on("getMessage", (data) => {
      if (chat.id === data.chatId) {
        setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
        read();
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);  // Include chat here

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])


  const read = async (chatId) => {
    try {
      const updateSeenBy = await apiRequest.put("/chats/read/" + chatId);
      console.log('update seenby', updateSeenBy)
    } catch (err) {
      console.log(err);
    }
  };


  const openChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get('/chats/' + id)
      read(id)
      const receiverStatus = await apiRequest.get('/chats/receiverStatus/' + receiver.id)
      setChat({ ...res.data, receiver })
      // alert(receiverStatus)
      if (receiverStatus.data) {
        setReceiverStatus(receiverStatus.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useImperativeHandle(ref, () => ({
    openChat
  }));


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const text = formData.get("text")
    if (!text) return
    try {
      const res = await apiRequest.post("/message/" + chat.id, { text, receiverId: chat.receiver.id })
      setChat((prev) => {
        const updatedMsgs = { ...prev.messages }
        if (updatedMsgs[Today]) {
          updatedMsgs[Today] = [...updatedMsgs[Today], res.data]
        } else {
          updatedMsgs[Today] = [res.data];
        }
        return {
          ...prev,
          messages: updatedMsgs,
        };
      })
      //   const res = await apiRequest.post("/message/" + chat.id, { text, receiverId: chat.receiver.id })
      //  setChat((prev)=>{
      //   if(prev.messages[Today]){
      //     prev.messages[Today].push(res.data)
      //   }else{
      //     prev.messages[Today]=res.data
      //   } 
      //  })
      e.target.reset()
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data
      })
    } catch (res) {
      console.log(res)
    }

    const searchInput = (e) => {
      let keyword = e.target.value.toLowerCase();
    }
  }

  return (
    <div className="chat">
      <div className="messages">
        <div className="searchbar-container">
          <input type="search" className="search-bar padding-sm pointer" placeholder="search user or text" onChange={(e)=>searchInput(e)} />
        </div>
        {
          showLastMsgs && chats?.map((c, index) => {
            return (
              <>
                <div onClick={() => openChat(c.id, c.sender)} key={c.id + index} className="message-container" style={{ backgroundColor: c.seenBy.includes(currentUser.id) ? "gray" : "green" }}>
                  <span
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <img
                      src={c.sender.avatar || "/noavatar.jpg"}
                      alt=""
                    />
                  </span>
                  <span className="flex-column" style={{ width: '90%' }}>
                    <p className="receiver-name">{c.sender.username}</p>
                    <p className="message-txt" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipses' }}>{c.lastMessage}</p>
                  </span>
                  <span style={{ backgroundColor: 'gainsboro', float: 'right' }}>
                    <img
                      src={c.receiver.avatar || "/noavatar.jpg"}
                      alt=""
                    />
                  </span>
                </div>
              </>
            )
          }
          )
        }
      </div>
      {chat && (
        <>
          <h1 style={{ color: 'white', fontWeight: '300', marginBottom: '5vh' }}>Messages</h1>
          <div className="chatBox">
            <div className="top" >
              <div className="user pointer">
                {
                  receiverStatus !== null && <span>
                    <FontAwesomeIcon icon={faCircle} style={{ color: 'green', fontSize: '15px' }} />
                  </span>
                }
                <img
                  src={chat.receiver.avatar || "/noavatar.jpg"}
                  alt=""
                />
                <span className="">
                  <p>{chat.receiver.username}</p>
                  {
                    receiverStatus !== null && <p className="font-medium">Last seen at {format(receiverStatus.loginAt)}</p>
                  }

                </span>
              </div>
              <span className="padding-sm close font-semiBold" onClick={() => setChat(null)}>X</span>
            </div>
            <div className="center">
              {/* {
                chat.messages?.map((message) => (
                  <div
                    className="chatMessage"
                    key={message.id}
                    style={{
                      width: 'fit-content',
                      alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                      textAlign: message.userId === currentUser.id ? "right" : "left"
                    }}
                  >
                    <p className="msg-txt">{message.text} <span>{moment(message.createdAt).format('hh:mm A')}</span></p>
                    <span>{format(message.createdAt)}</span>
                  </div>
                ))
              } */}
              {
                Object.keys(chat.messages).map((groupedDate, index) => (
                  <>
                    <div key={index} className="flex-center">
                      <span className="groupedDate chiplet padding-xs msg-txt font-bold">{groupedDate}</span>
                    </div>
                    {
                      chat.messages[groupedDate].map((message) => (
                        <div
                          className="chatMessage"
                          key={message.id}
                          style={{
                            display: 'flex',
                            justifyContent: message.userId === currentUser.id ? "flex-end" : "flex-start",
                            textAlign: message.userId === currentUser.id ? "right" : "left"
                          }}
                        >
                          <span className="msg-txt">{message.text}
                            {
                              message.userId === currentUser.id &&
                              <FontAwesomeIcon icon={message.seenBy.length < 2 ? faCheck : faCheckDouble} color="skyblue" style={{ fontSize: '15px', marginLeft: '5px' }} />
                            }
                            <p className="font-xs">{moment(message.createdAt).format('hh:mm A')}</p>
                          </span>
                          {/* <span>{format(message.createdAt)}</span> */}
                        </div>
                      ))
                    }

                  </>

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
            <form className="bottom" onSubmit={(e) => handleSubmit(e)}>
              <textarea name="text"  ></textarea>
              <button type="submit" >
                <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '30px' }} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
})

export default Chat;
