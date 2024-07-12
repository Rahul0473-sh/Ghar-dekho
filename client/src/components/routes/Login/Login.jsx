import "./login1.scss";
import { Link } from "react-router-dom";
function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new formData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onClick={handleSubmit}> 
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
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