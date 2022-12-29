import React, { useState } from 'react'; 
import './SignUp.css';
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

export default function SignUp() {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const notifyGo = (massage) => toast.error(massage);
    const notifyNo = (massage) => toast.success(massage);

    const emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    const dayPost=()=>{

        //etst emaail regax
        if(!emailRegax.test(email)) {
            notifyGo("invalid email")
            return
        }else if(!passwordRegax.test(password)) {
            notifyGo("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
            return
        }
        //toats


        //server 
        fetch("http://localhost:3333/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name:name,
                userName:userName,
                email:email,
                password:password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                notifyGo(data.error)
            } else {
                notifyNo(data.massage)
                navigate("/signin")
            }
            
             console.log(data) 
            })
    }
    

    // const fetchData = async() => {
    //     const response = await fetch("http://localhost:3333/");
    //     const information = await response.json();
    //     console.log(information);
    // }

     
    // useEffect(() => {
    //     fetchData()
    // },[]);

  return (
    <div className="signUp">
        <div className="form-cont">
        <div className="form">
        <h1 className="insta">INSTAGRAM</h1>
        <p className="logoText">
            SignUp to see photosand videos <br /> from your friends
        </p>

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
            <input type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={((e) => { setName(e.target.value) })} />
        </div>

        <div>
            <input type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => { setUserName(e.target.value)}} />
        </div>

        <div>
            <input type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value)}} />
        </div>

        <p className="logoText" id="tam">
            By signing up, yopu agree to out Terms, <br />
            policy and cookies policy
        </p>
        <input className="inText" type="submit" id="submit" value="Sign Up"
        onClick={()=>{ dayPost() }} />
        </div>

        <div className="form2">
            Already have an account?
         <Link to="/signin" >
            <span id="spen"> Sign In </span>
         </Link>
        </div>

        </div>
    </div>
  )
}
