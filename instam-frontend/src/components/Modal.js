import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import "./Modal.css"
import { useNavigate } from 'react-router-dom';


export default function Modal({ setmOdalOpen }) {

  const navigate = useNavigate();

  return (
    <div className="opwi" onClick={() => setmOdalOpen(false)}>
    <div className="center">
            <div className="model">

            {/* model header */}
            <div className="modelHead">
                <h5 className="heading">Confirm</h5>
            </div>
            <button className="closeBtn" onClick={() => setmOdalOpen(false)}>
                <RiCloseLine></RiCloseLine>
            </button>

            {/* medel content */}
            <div className="modelContent">
                Are you really want to Log Out?
            </div>

            {/* model actions */}
            <div className="modelActions">
              <div className="actionsContainer">
                <button className="logOutBtn" onClick={() => {
                  setmOdalOpen(false);
                  localStorage.clear();
                  navigate("./signin")
                }}>Log Out</button>
                <button className="cancelBtn"  onClick={() => setmOdalOpen(false)}>cancel</button>
              </div>
            </div>
            </div>
    </div>
    </div>
  )
}
