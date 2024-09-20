import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import axios from "axios";
import "./profilePage.scss";
import { Suspense, useContext, useRef } from "react";
import { useLoaderData, Await, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";

function ProfilePage() {
  const data = useLoaderData()
  const navigate = useNavigate()
  const chatRef = useRef()
  const { currentUser, updateUser } = useContext(AuthContext)
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await apiRequest.post("/auth/logout")
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
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button className="btn">Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || './noavatar.png'}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout} className="btn">Log out</button>
          </div>
          <div className="title">
            <Link to="/add">
              <button className="btn">Create New Post</button>
            </Link>
          </div>
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
      <div className="chatContainer">
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
      </div>
    </div>
  );
}

export default ProfilePage;
