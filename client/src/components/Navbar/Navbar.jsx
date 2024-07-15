import React, { useContext, useState } from 'react'
import "./navbar.scss"
import {Link} from "react-router-dom"
import { AuthContext } from '../../Context/AuthContext';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png"></img>
          <span>Estate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Detail</a>
      </div>
      <div className="right">
        
        {currentUser ?
          <div className='user'>
            <img src={currentUser.avatar || "/noavatar.jpg"} alt='' />
            <span>{ currentUser.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          
       </div>:(<><a href="/login">SignIn</a>
        <a href="/register" className="register">  SignUp </a>
        </>)}
        <div className="menuIcon">
          <img src='/menu.png' onClick={()=>setOpen(!open)} alt='menu'/>
        </div>
        <div className={open ?"menu active" :"menu"}>
           <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Detail</a>
        <a href="/">Sign In</a>
        <a href="/">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}
