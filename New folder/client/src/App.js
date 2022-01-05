import React ,{useState,useEffect, useContext} from "react";
import {Routes,Route ,useNavigate} from 'react-router-dom'
import LandingPage from "./Pages/LandingPage";
import Login from "./components/LogIn/Login";
import SignUp from "./components/Sign_Up/SignUp";
import HomePage from "./Pages/HomePage";
import ApllicationPage from "./Pages/ApplicatonPage";
import SccessMessage from "./store/formData";
import './App.css'
import User from "./store/userContext";
import Dashboard from "./components/AdminDashBoard/dashBoard";
import UpdateTable1 from "./store/tableUpdate";
import AdminLogin from "./components/AdminLogin/Login";
import Slot from "./store/adminContext";
import Notification from "./store/notificationContext";

function App() {


  return (
    <User>
      <SccessMessage>
        <UpdateTable1>
          <Slot>
            <Notification>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/application" element={<ApllicationPage/>}/>
              <Route path="/admin/login" element={<AdminLogin/>}/>
              <Route path="/admin/dashboard" element={<Dashboard/>} />
            </Routes>
            </Notification>
          </Slot>
        </UpdateTable1>
      </SccessMessage>
    </User>
   
  );
}

export default App;
