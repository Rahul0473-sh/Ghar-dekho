import axios from "axios";
import "./login1.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../../../lib/apiRequest";
function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("hey")
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const userdata = await apiRequest.post("/auth/login", {
        username,
        password
      },);
      console.log(userdata);  
      localStorage.setItem("user", JSON.stringify(userdata.data));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}> 
          <h1>Login</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
          {error && <span> { error.message}</span>}
          <Link to="/register">Create new Account</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;