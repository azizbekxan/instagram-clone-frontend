import './App.css';
import React, { createContext, useState } from 'react';
import Navbars from './components/Navbars';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './Context/LoginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './components/MyFollowingPost';

function App() {

  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setmOdalOpen] = useState(false)

  return (
    <BrowserRouter>
     <div className="App">
      <LoginContext.Provider value={{ setUserLogin, setmOdalOpen }}>
       <Navbars login={userLogin} />
       <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/createPost" element={<CreatePost />}></Route>
          <Route path="/profile/:userid" element={<UserProfile />}></Route>
          <Route path="/followingpost" element={<MyFollowingPost />}></Route>
       </Routes>
       <ToastContainer theme="dark" />
       {/* <Modal></Modal> */}
       {modalOpen && <Modal setmOdalOpen={setmOdalOpen}></Modal>}
       </LoginContext.Provider>
     </div>
    </BrowserRouter>
  );
}

export default App;
