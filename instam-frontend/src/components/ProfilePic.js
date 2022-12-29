import React, { useEffect, useState, useRef } from 'react';


export default function ProfilePic({ changeprofile }) {

    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

  //post image to cloudinary
  const postDetails = () => {
      
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
    .catch(err => console.log(err));
    console.log(url)


  }

  const postPic = () => {
    //sav post to mongodb
       {
        fetch("http://localhost:3333/uploadProfilePic", {
            method:"put",
            headers:{
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              pic: url
            })
           }).then( res => res.json())
           .then( data => {
            console.log(data)
            changeprofile();
            window.location.reload();
           })
           .catch( err => console.log(err))
        }
    }

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    useEffect(() => {
        if (image) {
            postDetails();
        }
        
    }, [image])
    
    useEffect(() => {
        if (url) {
            postPic()
        }
    }, [url])

  return (
  <div className="profilePic opwi">
    <div className="changePic ">
        <div>
            <h2>Change Profile Photo</h2>
        </div>
        <hr />
        <div>
            <button className="upload-btn" 
        
            style={{
                 color: "#1EA1F7"
                  }} onClick={handleClick} >
                    Upload Photo
            </button>
            <input 
              type="file" accept="image/*" 
              ref={hiddenFileInput}
              style={{ display: "none" }}
              onChange={(e) => {
                setImage(e.target.files[0])
              }}
              />
        </div>
        <hr />
        <div>
            <button className="upload-btn" onClick={() => {
                setUrl(null)
                postPic()
            }} style={{ color: "#ED4956" }}> Remove Current Photo</button>
        </div>
        <hr />
        <div>
            <button 
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "15px"
                 }} onClick={changeprofile} >
                Cancel
            </button>
        </div>
    </div>
  </div>
  )
}
