import { Link } from 'react-router-dom';
import axios from "axios";
import './register.scss';
import { useState } from 'react';

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    
    const formData = new FormData(e.target);
    const username = formData.get("username")
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const userdata = await axios.post("http://localhost:8000/api/auth/register",
        {
          userName:username,
          email,password
        }
      ); 
      console.log(userdata);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  }
  return (
    <div className='register'>
      <div className="formContainer">
       <form onSubmit={handleSubmit} >
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button  >Register</button>
          {error && <span>{ error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src='/bg.png' alt=''/>
      </div>
    </div>
  );
}

export default Register;