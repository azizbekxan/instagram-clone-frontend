import React, { useState, useEffect } from 'react';
import "./Profile.css";
import PostDetail from './PostDetail';
import { useParams } from 'react-router-dom';
import "./UserProfile.css"

export default function UserProfile() {

  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const { userid}  = useParams()
  const [isFollow, setIsFollow] = useState(false)
  const [user, setUser] = useState("")
  const [posts, setPosts] = useState([])

  // const toglDetails = (posts) => {
  //   if (wov) {
  //     setWov(false);
  //   } else {
  //     setWov(true);
  //     setPosts(posts)
  //   }
  // };

  // to follow user
  const followUser = (userId) => {
      fetch("http://localhost:3333/follow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsFollow(true);
        });
  };

  // to unfollow user
  const unfollowUser = (userId) => {
      fetch("http://localhost:3333/unfollow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log(data);
          setIsFollow(false);
        });
    };

  useEffect(() => {

    fetch(`http://localhost:3333/user/${userid}`, {
      headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result)
        setUser(result.user)
        setPosts(result.post);
        if(
          result.user.followers.includes
          (JSON.parse(localStorage.getItem("user"))  ._id)){
            setIsFollow(true)
          }
    })
  }, [isFollow])

  
  return (
    <div className="Profile">

      {/* profil ram,la */}
      <div className="profile-ramka">
        {/* profile img */}
        <div className="profile-image">
        <img src={user.Photo? user.Photo : picLink}
        alt="" />
        </div>  

       {/*  profile data*/}
       <div className="profile-data">
        <div className="followBtn">
        <h1>{user.name}</h1>
        <button className="followBtnn"
         onClick={() => {
          if(isFollow){
            unfollowUser(user._id)
          } else {
            followUser(user._id)
          }
         }}>
          
          {isFollow ? "Unfollow" : "Follow"}folllow
        </button>
        </div>
        
        {/* profile info */}
        <div className="pro-info">
          <p>{posts.length} posts</p>
          <p>{user.followers ? user.followers.length : "0"} followers</p>
          <p>{user.following ? user.following.length : "0"} following</p>
        </div>
       </div>
      </div> 

      <hr className="hr"/>
      {/* profile galary */}
      <div className="gallary">
        {posts.map((pics)=>{
          return <img key={pics._id} src={ pics.photo }
          // onClick={() => {
          //   toglDetails(pics)
          // }}
           className="item"></img>
        })}
      </div>
      {/* {wov && 
         <PostDetail item={posts} toglDetails={toglDetails} /> 
      } */}
    </div>
  )
}
