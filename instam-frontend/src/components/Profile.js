import React, { useState, useEffect } from 'react';
import "./Profile.css";
import PostDetail from './PostDetail';
import ProfilePic from './ProfilePic';

export default function Profile() {

  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([])
  const [wov, setWov] = useState(false)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState("")
  const [changePic, setChangePic] = useState(false)

  // to wov and hide comments
  const toglDetails = (posts) => {
      if(wov) {
        setWov(false);
      } else {
        setWov(true);
        setPosts(posts);
      }
  }

  const changeprofile = () => {
    if(changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }


  useEffect(() => {
    fetch(`http://localhost:3333/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      setPic(result.post)
      setUser(result.user)
      console.log(pic)
    })
  }, [])

  
  return (
    <div className="Profile">

      {/* profil ram,la */}
      <div className="profile-ramka">
        {/* profile img */}
        <div className="profile-image">
        <img 
        onClick={changeprofile}
        src={user.Photo? user.Photo : picLink}
        alt="" />
        </div>  

       {/*  profile data*/}
       <div className="profile-data">
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
        {/* profile info */}
        <div className="pro-info">
          <p>{pic ? pic.length : "0"} posts</p>
          <p>{user.followers ? user.followers.length : "0" }followers</p>
          <p>{user.following ? user.following.length : "0" }following</p>
        </div>
       </div>
      </div> 

      <hr className="hr"/>
      {/* profile galary */}
      <div className="gallary">
        {pic.map((pics)=>{
          return <img key={pics._id} src={ pics.photo }
          onClick={() => {
            toglDetails(pics)
          }}
           className="item"></img>
        })}
      </div>
      {wov && 
         <PostDetail item={posts} toglDetails={toglDetails} /> 
      }
      {
        changePic &&
        <ProfilePic changeprofile={changeprofile} />
      }
    </div>
  )
}
