import "./profileUpdatePage.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../../components/upload widget/uploadwidget";
import { useState } from "react";
function ProfileUpdatePage() {
  const [err, setErr] = useState("")
  const { currentUser, updateCurrentUser } = useContext(AuthContext)
  const [avatar, setAvatar] = useState([])
  const navigate = useNavigate();
  const handleUpdateSubmit = async (e) => {
    const formData = new FormData(document.getElementById('user-form'))
    const { username, email, password } = Object.fromEntries(formData)
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`,
        {
          username,
          email,
          password,
          avatar: avatar[0]
        })
      if (res.status == 200) {
        updateCurrentUser(res.data);
        navigate('/profile')
      }
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message)
    }
  }

  //const {currentUser} = useContext(AuthContext)
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form id="user-form">
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text" defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email" defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button onClick={(e) => handleUpdateSubmit(e)}>Update</button>
          {err && <span>{err}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.png"} alt="" className="avatar" />
        <CloudinaryUploadWidget
          uwConfig={{
            cloudName: 'dynvtl13s',
            uploadPreset: 'real-estate',
            multiple: false,
            maxImageFileSize: 2000000,
            folder: 'avatars'
          }}
          setState={setAvatar}
        ></CloudinaryUploadWidget>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
