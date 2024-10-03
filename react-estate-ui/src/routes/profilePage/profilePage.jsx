import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import axios from "axios";
import "./profilePage.scss";
import { Suspense, useContext, useRef } from "react";
import { useLoaderData, Await, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const data = useLoaderData()
  const navigate = useNavigate()
  const chatRef = useRef()
  const { currentUser, updateUser } = useContext(AuthContext)
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await apiRequest.post("/auth/logout", { userId: currentUser.id })
      updateUser(null)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="flex left-container " style={{justifyContent:'space-between'}}>
            <div className="profile-img-container ">
              <span>
                <img src={currentUser.avatar || './noavatar.png'} alt="" className="profile-pic" />
              </span>
              <span className="flex-column profile-name">
                <h1 className="margin-sm" style={{ height: '2vh' }}>{currentUser.username}</h1>
                <h3 className="font-mute ">{currentUser.email}</h3>
                <div className="profile-info-container" >
                  <span className="flex-column posts-container">
                    <label className="count">200</label>
                    <label className="followers-lbl">Posts</label>
                  </span>
                  <span className="flex-column posts-container">
                    <label className="count">25K</label>
                    <label className="followers-lbl">Followers</label>
                  </span>
                  <span className="flex-column posts-container">
                    <label className="count">20K</label>
                    <label className="followers-lbl">Followings</label>
                  </span>
                </div>
                <div className="flex ">
                  <span className="padding-sm">
                    <Link to="/profile/update">
                      <button className="pointer btn flex">
                        <FontAwesomeIcon icon={faUser} />
                        <label>update Profile</label>
                      </button>
                    </Link>
                  </span>
                  <span className="padding-sm">
                    <Link to="/add " >
                      <button className="pointer btn flex" >
                        <FontAwesomeIcon icon={faHouse} className="" />
                        <label>Add Property</label>
                      </button>
                    </Link>
                  </span>

                </div>
              </span>
            </div>
            <div className="chatContainer margin-sm">
              <span className="title">
                <h1>Recent chats</h1>
              </span>
              <div>
                <Suspense fallback={<p>Loading ...</p>}>
                  <Await
                    resolve={data.chatResponse}
                    errorElement={<p>Error loading chats !</p>}
                  >
                    {(chatResponse) => <Chat chats={chatResponse.data} ref={chatRef} showLastMsgs={true} />}
                  </Await>
                </Suspense>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="list-container padding-sm margin-sm">
              <div className="title">
                <h1>My Lists</h1>
              </div>
              <Suspense fallback={<p>Loading ...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts !</p>}
                >
                  {(postResponse) => postResponse.data.userPosts && <List posts={postResponse.data.userPosts} />
                  }
                </Await>
              </Suspense>
            </div>
            <div className="list-container padding-sm margin-sm">
              <div className="title">
                <h1>Saved List</h1>
              </div>
              <Suspense fallback={<p>Loading ...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorLoading={<p>Error loading saved posts !</p>}
                >
                  {
                    (postResponse) => {
                      return <List posts={postResponse.data.saved} />
                    }
                  }
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="chatContainer">
        <div>
          <Suspense fallback={<p>Loading ...</p>}>
              <Await 
                resolve={data.chatResponse}
                errorElement={<p>Error loading chats !</p>}  
              >
                {(chatResponse)=><Chat chats={chatResponse.data} ref={chatRef} showLastMsgs={true}/>}
              </Await>
          </Suspense>
        </div>
      </div> */}
      
    </div>
  );
}

export default ProfilePage;
