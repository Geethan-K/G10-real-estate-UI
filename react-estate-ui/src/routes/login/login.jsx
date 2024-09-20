import "./login.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
function Login() {
  const [err, setErr] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const {updateUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    setErr("")
    const formData = new FormData(document.getElementById("login-form"))
    
    const username = formData.get("username")
    const password = formData.get("password")
    try {
      const res = await apiRequest.post("/auth/login", { username, password })
    ///  localStorage.setItem('user',JSON.stringify(res.data))
     updateUser(res.data)
      navigate('/profile')
    } catch (errorRes) {
      console.log(errorRes)
      setErr(errorRes.response.data.message)
    }finally{
      setIsLoading(false)
    }
}

return (
  <div className="login">
    <div className="formContainer">
      <form id="login-form">
        <h1>Welcome back</h1>
        <input name="username" required minLength={3}  type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={isLoading} className="login-btn" onClick={(e)=>handleSubmit(e)}>Login</button>
        {err && <span>{err}</span>}
        <Link to="/register">{"Don't"} you have an account?</Link>
      </form>
    </div>
    <div className="imgContainer">
      <img src="/bg.png" alt="" />
    </div>
  </div>
);
}

export default Login;
