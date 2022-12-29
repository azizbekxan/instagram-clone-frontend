import React from 'react';
import "./PostDetail.css"
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';


export default function PostDetail({ item, toglDetails }) {

    const navigate = useNavigate()
    //toast
    const notifyGo = (massage) => toast.error(massage);
    const notifyNo = (massage) => toast.success(massage);


    const removePost = (postId) => {
    // console.log(postId)
        if(window.confirm("Do you really want to delete this post?")) 
        {
            fetch(`http://localhost:3333/deletePost/${postId}`, {
                method: "delete",
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("jwt")
                } , 
            })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                toglDetails();
                navigate("/");
                notifyNo("Succesfully deleted");
            })
        }

    }

  return (
    <div className="wovComment">
    <div className="containerrr">

       <div className="postPic">
         <img src={item.photo} alt="" />
       </div>




       <div className="details">
       {/* kartani bowi */}
       <div className="carta-head">
         <div className="carta-pictur">
           <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80https://media.istockphoto.com/id/1291318636/photo/put-more-in-get-more-out.jpg?s=612x612&w=0&k=20&c=KRvn1x6r9x9GmYMLpW6AVZzkvOA0bmn14fKle-O6CVc=" alt="" />
         </div>
         <h5>{item.postedBy.name}</h5>
         <div className="deletePost" onClick={() => {removePost(item._id)}}>
         <span className="material-symbols-outlined">
            delete
         </span>
         </div>
       </div>

       {/* comentSection */}
       <div className="commentSection">

         {
         item.comments.map((comment) => {

          return (
             <p className="com-ptext">
                <span className="commentarUser"> {comment.postedBy.name} {" "}  </span>
                <span className="commentarText">  {comment.comment}</span>
             </p>
           )

         })
         }

       </div>

       {/* kartani izohi(content) */}
       <div className="carta-content">
           <p>{item.like.length} Likes</p>
           <p>{item.body}</p>
       </div>

       

       {/* coment qowiw */}
       <div className="comment-add">
        <span className="material-symbols-outlined">
           sentiment_satisfied
        </span>
        <input className="inputnana" type="text" placeholder="add a comment" 
        //  value={ comment } onChange={(e) => {setComment(e.target.value)}}
        />

       
         <button className="comment" type="button"
        //   onClick={() => {
        //    commentMake(comment, item._id);
        //    toglComment();
        //  }}
          >
           Post
         </button>  
       </div>
       
       </div>
       </div>

       <div className="closeComment" 
       onClick={() => { toglDetails() }}
       >
         <span className="material-symbols-outlined material-symbols-outlined-comment">
             close
         </span>
       </div>
  </div>
  )
}
