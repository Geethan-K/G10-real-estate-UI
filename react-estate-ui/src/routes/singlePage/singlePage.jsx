import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate,Await } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState,Suspense, useRef } from "react";
import apiRequest from '../../lib/apiRequest'
import Chat from "../../components/chat/Chat";
function SinglePage() {

  const post = useLoaderData();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(post.isSaved)
  const { currentUser } = useContext(AuthContext);
  const chatRef = useRef()
  
  const handleSave = async () => {

    setSaved((prev) => !prev)
    if (!currentUser) {
      navigate("/login")
    }
    try {
      await apiRequest.post('/users/save', { postId: post.id })
    } catch (err) {
      setSaved((prev) => !prev)
      console.log(err)
    }
  }

  const  openChatBox = async () =>{
    const receiverId = post?.userId;
    const chatsInfo = await apiRequest.get('/chats')
    let receiverDetails = chatsInfo.data.find((chat)=>{
      chat.userIDs.includes(receiverId)
    })
    if(receiverDetails){
      let chatID = receiverDetails.id
      chatRef.current?.openChat(chatID,receiverId);
    }else{
         try{
          const res = await apiRequest.post('/chats',{receiverId})
          let receiverData = res.data
          let chatID = res.data?.id;
       //  updateChatsInfo((prev)=>({...prev,receiverData}));
        if(chatID){
            chatRef.current?.openChat(chatID,receiverId);
          }
        }catch(err){
          console.log(err)  
        }
      
     
      
    }
  }

 
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.postDetail.desc) }}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <span>
                  {post.postDetail.utilities === "owner" ?
                    (<p>Owner is responsible</p>) : (<p>Tenant is responsible</p>)
                  }
                </span>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <span>{post.postDetail.pet === "allowed" ? (<p>Pets are allowed</p>) : (<p>Pets are not allowed</p>)}</span>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <span>{post.postDetail.income}</span>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school > 1000 ? post.postDetail.school / 1000 + "km" : post.postDetail.school + "m"} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="chatContainer">
            <div className="wrapper">
              <Suspense fallback={<p>Loading ...</p>}>
                <Await
                  resolve={post.chatResponse}
                  errorElement={<p>Error loading chats !</p>}
                >
                  {(chatResponse) => <Chat chats={chatResponse} ref={chatRef} />}
                </Await>
              </Suspense>
            </div>
          </div>
          <div className="buttons">
            <button onClick={openChatBox}>
              <img src="/chat.png" alt="" style={{ width: "70%" }} />
              <span style={{ color: "black" }} >Send a Message</span>
            </button>
            <button onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : "white", color: "black" }}>
              <img src="/save.png" alt="" />
              {saved == true ? "place saved " : "save the place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
