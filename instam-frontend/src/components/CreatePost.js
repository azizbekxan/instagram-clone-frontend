import React, { useState, useEffect } from 'react';
import "./CreatePost.css";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function CreatePost() {

  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

  const navigate = useNavigate();


    //toast
    const notifyGo = (massage) => toast.error(massage);
    const notifyNo = (massage) => toast.success(massage);


  useEffect(() => {

     //sav post to mongodb
    if(url) {
    
     fetch("http://localhost:3333/createPost", {
      method:"post",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        body,
        pic: url
      })
    }).then( res => res.json())
    .then( data => {if(data.error){
      notifyGo(data.error)
    }else {
      notifyNo("Succesfully Posted")
      navigate("/")
    }})
    .catch( err => console.log(err))
    }
  },[url])



  //post image to cloudinary
  const postDetails = () => {
    console.log(body, image)
    const data = new FormData()
    data.append("file",image);
    data.append("upload_preset", "instam-clone");
    data.append("cloud_name", "alrizocloud");
    fetch("https://api.cloudinary.com/v1_1/alrizocloud/image/upload",
    {
      method:"post",
      body:data
    }).then(res => res.json())
    .then(data => setUrl(data.url))
    .catch(err => console.log(err))
    console.log(url)


  }
 

  const downloadFile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  return (
    <div className="CreatePost">

       <div className="post-head">
           <h4> Create New Post</h4>
           <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
       </div>

       <div className="main-div">
        <img id="output" src="https://cdn.pixabay.com/photo/2013/04/01/21/30/photo-99135__480.png" />
        <input type="file" accept="image/*" onChange={(event) =>{
          downloadFile(event);
          setImage(event.target.files[0])
        }}/>
       </div>

       <div className="details">
          <div className="carta-head">
          <div className="carta-pictur">
            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80https://media.istockphoto.com/id/1291318636/photo/put-more-in-get-more-out.jpg?s=612x612&w=0&k=20&c=KRvn1x6r9x9GmYMLpW6AVZzkvOA0bmn14fKle-O6CVc=" alt="" />
          </div>
          <h5>Aziz</h5>
          </div>

          <textarea value={body} onChange={(e) => {
            setBody(e.target.value)
          }} type="text" placeholder="Write a caption...">

          </textarea>
       </div>

  </div>
 );
}
