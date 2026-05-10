import "./login1.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { apiRequest } from "../../../lib/apiRequest";
import { AuthContext } from "../../../Context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const userdata = await apiRequest.post("/auth/login", { username, password });
      updateUser(userdata.data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && <span>{error}</span>}
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
