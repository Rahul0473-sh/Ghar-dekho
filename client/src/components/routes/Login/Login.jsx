import axios from "axios";
import "./login1.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { apiRequest } from "../../../lib/apiRequest";
import { AuthContext } from "../../../Context/AuthContext";
function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const userdata = await apiRequest.post("/auth/login", {
        username,
        password
      },);
      console.log(userdata.data);
      updateUser(userdata.data);
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