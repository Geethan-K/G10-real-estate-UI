import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";


function Register() {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")
    const password = formData.get("password")
    const email = formData.get("email")
    try {
      const res = await apiRequest.post("/auth/register", { username, email, password })
      if(res.status==200){
        navigate('/login')
      }else{
        console.log('err res from reg page',res)
      }
      
    } catch (errorRes) {
      console.log(errorRes)
      setErr(errorRes.response.data.message)
    }

  }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button >Register</button>
          {err && <span>{err}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
