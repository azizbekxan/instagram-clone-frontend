import React, { useEffect, useState } from 'react'; 
import "./Home.css";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Home() {


  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [wov, setWov] = useState(false);
  const [item, setItem] = useState([]);


    //toast
    const notifyGo = (massage) => toast.error(massage);
    const notifyNo = (massage) => toast.success(massage);


  useEffect(() => {

    const token = localStorage.getItem("jwt")
    if(!token) {
      navigate("./signup")
    }

    // Fetching all posts
    fetch("http://localhost:3333/allposts", {
      headers:{
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => { 
      console.log(result);
      setData(result)})
    .catch(err => console.log(err))

  }, [])


  // to wov and hide comments
  const toglComment = (posts) => {
    if(wov) {
      setWov(false);
    } else {
      setWov(true);
      setItem(posts);
    }
  }



  const lkPost = (id) => {
    fetch("http://localhost:3333/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      },

      body:JSON.stringify({
        postId: id
      })
    })
    .then( res => res.json())
    .then((result) => { 

      const newDta = data.map((posts) => {
        if(posts._id == result._id){
          return result;
        }else {
          return posts;
        };
      });
      setData(newDta);
      console.log(result); 
    })
  }


  const NolkPost = (id) => {
    fetch("http://localhost:3333/nolike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      },

      body:JSON.stringify({
        postId: id
      })
    }).then( res => res.json())
    .then((result) => {
      const newDta = data.map((posts) => {
        if(posts._id == result._id){
          return result;
        }else {
          return posts;
        };
      });
      setData(newDta);
      console.log(result);
     })
  }


  //function to make comment
  const commentMake = ( text, id) => {

    fetch("http://localhost:3333/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      },

      body:JSON.stringify({
        text: text,
        postId: id,
      }),
    })
    .then( res => res.json())
    .then((result) => { 

      const newDta = data.map((posts) => {
        if(posts._id == result._id){
          return result;
        }else {
          return posts;
        };
      });
      setData(newDta);

      setComment("")
      notifyNo("Comment posted");
      console.log(result); 
    })
  }


  return (
    <div className="Home">

      {/* karta */}
      {data.map((posts) => {
        // return (
        //   <div className="carta">

        //   {/* kartani bowi */}
        //   <div className="carta-head">
        //     <div className="carta-pictur">
        //       <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80https://media.istockphoto.com/id/1291318636/photo/put-more-in-get-more-out.jpg?s=612x612&w=0&k=20&c=KRvn1x6r9x9GmYMLpW6AVZzkvOA0bmn14fKle-O6CVc=" alt="" />
        //     </div>
        //     <h5>{posts.postedBy.name}</h5>
        //   </div>
  
        //    {/* karta rasm */}
        //   <div className="carta-image">
        //     <img src="https://media-cdn.tripadvisor.com/media/photo-s/1c/ac/77/f1/golcuk-tabiat-parki.jpg" alt=""/>
        //   </div>
  
        //   {/* kartani izohi */}
        //   <div className="carta-content">
        //   <span className="material-symbols-outlined">favorite</span>
        //   <p>1 Like</p>
        //   <p>bu rasm ckjrflhjfgjk</p>
        //   </div>
  
        //   {/* coment qowiw */}
        //   <div className="comment-add">
        //    <span className="material-symbols-outlined">
        //       sentiment_satisfied
        //    </span>
        //   <input className="input" type="text" placeholder="add a comment" />
  
        //   <div className="text-left">
        //     <button className="comment" type="button">Post</button>
        //   </div>
  
        //   </div>
        // </div>
        // )
        return (
          <div className="carta">

          {/* kartani bowi */}
          <div className="carta-head">
            <div className="carta-pictur">
              <img src={posts.postedBy.Photo? posts.postedBy.Photo :
              picLink }
              alt="" />
            </div>
            <h5>
              <Link to={`/profile/${posts.postedBy._id}`}>
              {posts.postedBy.name}
              </Link>
            </h5>
          </div>
  
           {/* karta rasm */}
          <div className="carta-image">
            <img src={posts.photo} alt=""/>
          </div>
  
          {/* kartani izohi(comennt) */}
          <div className="carta-content">

            {
              posts.like.includes(JSON.parse(localStorage.getItem("user"))._id)
              ?(<span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { NolkPost(posts._id) }}>favorite</span>)
              :(<span className="material-symbols-outlined" onClick={() => { lkPost(posts._id) }}>favorite</span>)

            }

          <p>{posts.like.length} Likes</p>
          <p>{posts.body}</p>
          <p className="ptextView" onClick={() => { toglComment(posts) }}>View all comments</p>
          </div>
  
          {/* coment qowiw */}
          <div className="comment-add">
           <span className="material-symbols-outlined">
              sentiment_satisfied
           </span>
          <input className="input" type="text" placeholder="add a comment" 
           value={ comment } onChange={(e) => {setComment(e.target.value)}}
          />
  
          <div className="text-left">
            <button className="comment" type="button" onClick={() => {commentMake(comment, posts._id)}}>
              Post
              </button>
          </div>
  
          </div>

        </div> 
        )
      })}
 


     {/* wov comment */}
     {wov && (
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
            value={ comment } onChange={(e) => {setComment(e.target.value)}}
           />
  
          
            <button className="comment" type="button"
             onClick={() => {
              commentMake(comment, item._id);
              toglComment();
            }}
             >
              Post
            </button>  
          </div>
          
          </div>
          </div>

          <div className="closeComment" onClick={() => { toglComment() }}>
            <span className="material-symbols-outlined material-symbols-outlined-comment">
                close
            </span>
          </div>
     </div> 
     )}  

    </div>


    
  )
}



