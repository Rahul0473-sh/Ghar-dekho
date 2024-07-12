import { Link } from 'react-router-dom';
import axios from "axios";
import './register.scss';
import { useState } from 'react';

function Register() {
  const [err, setErr] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
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
      console.log(error.message);
    }
  }
  
}

export default Register;