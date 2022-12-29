import React, { useState, useContext } from 'react'
import "./SignIn.css";
import "./SignUp.js"
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { LoginContext } from '../Context/LoginContext';

export default function SignIn() {

  const {setUserLogin} = useContext(LoginContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //toast
  const notifyGo = (massage) => toast.error(massage);
  const notifyNo = (massage) => toast.success(massage);

  const emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  const dayPost=()=>{

    //etst emaail regax
    if(!emailRegax.test(email)) {
        notifyGo("invalid email")
        return
    }



    //server 
    fetch("http://localhost:3333/signin", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    }).then(res => res.json())
    .then(data => {
        if(data.error) {
            notifyGo(data.error)
        } else {
            notifyNo("Signed In succesfully")
            console.log(data)

            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            setUserLogin(true)
            navigate("/")
        }
        
         console.log(data) 
        })
}


  return (
    <div className="const">
    <div className="signin">
        <div className="signinForm">
        <h1 className="insta">INSTAGRAM</h1>
        

        <div>
          <input type="email" 
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => { setEmail(e.target.value)
            }} />
        </div>

        <div>
        <input type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value)}} />
        </div>
        <input className="inText" type="submit" onClick={() => {dayPost() }} value="Sign In" />
        </div>

        <div className="loginForm2">
            Don't have an accaunt?
            <Link to="/signup" >
              <span id="spen">  Sign Up</span>
            </Link>
        </div>
        
    </div>
    </div>

  )
}
