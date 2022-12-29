import React, { useContext } from 'react';
import logo from "../img/instagram.png"
import "./Navbars.css";
import  { Link } from "react-router-dom";
import { LoginContext } from '../Context/LoginContext';

export default function  Navbars({ login }) {

  const {setmOdalOpen} = useContext(LoginContext)
  const loginStatus = () => {
  const token = localStorage.getItem("jwt")
  if(login || token) {
    return [
      <>
        <Link to="/profile">
        <li className="prop">Profile</li>
        </Link>

        <Link className="toto" to="/createPost">Create Post</Link>
        <Link style={{ marginLeft: "22px" }} to="/followingpost">My Following</Link>
        <Link to={""}>
          <button className="Bteen" onClick={() => 
            setmOdalOpen(true)
          }>Log Out
          </button>
        </Link>
      </>
    ]
   }else {
    return [
      <>
          <Link to="/signup">
          <li className="prop">SignUp</li>
           </Link>

          <Link to="/signin">
            <li className="prop">SignIn</li>
          </Link></>
    ]
   }
  };

  return (

    <div className="navbars">
      <a href='/'>
    <img src={logo} className="size-photo" alt="" />
      </a>
    <ul className="nav-menu">
      {loginStatus()}
    </ul>
    </div>
  )
}
