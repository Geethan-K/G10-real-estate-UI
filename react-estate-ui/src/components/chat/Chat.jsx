import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from 'timeago.js';
import moment from 'moment';
import { socketContext } from "../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { format as dateFormat, isSameDay, isToday, isYesterday } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

const Chat = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const [chat, setChat] = useState(null);
  const [Today, setToday] = useState(moment(new Date()).format("DD/MM/YYYY"))
  const [receiverStatus, setReceiverStatus] = useState(null)
  const [searchTerm, setSearchTerm] = useState(null);
  const [debounceTerm, setDebounceTerm] = useState(null);
  const [matchingProfile,setMatchingProfile] = useState(null);
  const [matchKeyword,setMatchKeyword] = useState(null);
  const [updatedProfiles, setUpdatedProfiles] = useState([]);

  const { currentUser } = useContext(AuthContext);
 // const { socket } = useContext(socketContext);
 const socket = useSelector((state) => state.socket.socket);
  const messageEndRef = useRef()
  const { chats, showLastMsgs, receiverData } = props
  // console.log('current user',currentUser)
  // console.log('last recents',chats)
  // console.log('last recents',chat)
  const today = new Date();
  useEffect(() => {
    if (!socket || !chat) return;
    const read = async () => {
      updateSeenBy()
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
    //  console.log('receiver',receiver)
      const receiverStatus = await apiRequest.get('/chats/receiverStatus/' + receiver.id)
      setChat({ ...res.data, receiver })
     // setSearchTerm(null)
      // alert(receiverStatus)
      if (receiverStatus.data) {
        setReceiverStatus(receiverStatus.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updateSeenBy = async () =>{
    try {
      const updateSeenBy = await apiRequest.put("/chats/read/" + chat.id);
      console.log('update seenby', updateSeenBy)
    } catch (err) {
      console.log(err);
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
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if(searchTerm){
        setDebounceTerm(searchTerm)
      }else{
        setSearchTerm(null)
      }
    }, 2000)
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm])

  // useEffect(()=>{
  //   if(matchingProfile){
  //     const updateProfile = matchingProfile.map((user)=>{
         
  //         const chatsList = chats.find((chat)=>chat.userIDs.includes(Object.keys(user).id))
  //         console.log(chats)
  //       return {
  //         ...user,
  //         chatInfo:chatsList ? chatsList : null
  //       }
  //     })
  //     if (JSON.stringify(updateProfile) !== JSON.stringify(updatedProfiles)) {
  //       setUpdatedProfiles(updateProfile);
  //     }
  //   }
  //   console.log('updated profiles',updatedProfiles)
  
  // },[matchingProfile])

  useEffect(() => {
    async function searchKeyword(){
      if (debounceTerm) {
        if(debounceTerm!==null){
          let res = await apiRequest.post('/message/search/'+ currentUser.id, { keyword:searchTerm })
          if(res.data){
            if(Object.keys(res.data).includes('matchingUsers')){
              setMatchingProfile(res.data.matchingUsers)
              console.log('matches',res.data.matchingUsers)
            }
           if(Object.keys(res.data).includes('searchResults')){
              setMatchKeyword(res.data.searchResults)
              console.log(res.data.searchResults)
           }
           
          }
        }
      }
    }
    searchKeyword()
  }, [debounceTerm])

 

  return (
    <div className="chat" >
      <div className="messages">
        <div className="searchbar-container" style={{position:'sticky'}} >
          <input type="search" className="search-bar padding-sm pointer" placeholder="search user or text" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
        </div>
        {
          searchTerm==null && showLastMsgs && chats?.map((c, index) => {
            return (
                <div onClick={() => openChat(c.id, c.sender)} key={c.createdAt} className="message-container" style={{ backgroundColor: c.seenBy.includes(currentUser.id) ? "gray" : "green" }}>
                  <span className="flex-column"
                  >
                    <img
                      src={c.sender.avatar || "/noavatar.jpg"}
                      alt=""
                    />
                  </span>
                  <span className="flex-column" style={{ width: '90%' }}>
                    <p className="receiver-name">{c.sender.username}</p>
                    <p className="message-txt" style={{ whiteSpace: 'wrap', textOverflow: 'hidden',width:'80%' }}>{c.lastMessage}</p>
                  </span>
                  <span style={{ backgroundColor: 'gainsboro'}}>
                    <img
                      src={c.receiver.avatar || "/noavatar.jpg"}
                      alt=""
                    />
                  </span>
                </div>
            )
          }
          )
        }
       {
        searchTerm!==null && matchingProfile && matchingProfile.map((user)=>{
           const getHighlightedText = (text, highlight) => {
            if (!highlight) return text;
            const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
            return parts.map((part, index) =>
              part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} className="receiver-name" style={{ backgroundColor: 'orange' }}>
                  {part}
                </span>
              ) : (
                part
              )
            );
          };
          return (
            <div className="message-container bg-gray" key={user.id} onClick={()=>openChat(user.chatDetail.id,user)}>
              <span className="flex-column ">
                <img src={user.avatar || "/noavatar.jpg"} alt="" className="src" />
              </span>
              <span className="flex-column  " style={{ width: '50%' }}>
                <p className="receiver-name">{getHighlightedText(user.username,searchTerm)}</p>
                <p className="font-xs message-txt font-mute">{user.chatDetail.lastMessage}</p>
              </span>
            </div>
          )
        }
        )
        }
         {
        searchTerm!==null && matchKeyword && matchKeyword.map((result)=>{
          const getHighlightedText = (text, highlight) => {
            if (!highlight) return text;
            const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
            return parts.map((part, index) =>
              part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: 'orange' }}>
                  {part}
                </span>
              ) : (
                part
              )
            );
          };
          return (
            <div className="message-container bg-gray" key={result.id} onClick={()=>openChat(result.chatId,result.chatUserDetails)}>
              <span className="flex-column ">
                <img src={result.chatUserDetails.avatar || "/noavatar.jpg"} alt="" className="src" />
              </span>
              <span className="flex-column " style={{width:'80%'}}>
                <p className="receiver-name">{result.chatUserDetails.username}</p>
                <p className="font-xs message-txt padding-sm" style={{width:'fit-content'}}>
                {getHighlightedText(result.text, searchTerm)}
                </p>
              </span>
            </div>
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
                    <div key={index+groupedDate} className="flex flex-center">
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
