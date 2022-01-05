import React,{useEffect} from "react";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import StickyFooter from "../components/Footer/Fotter";
import {useNavigate} from 'react-router-dom'

function HomePage(){

    const Navigate = useNavigate()
    
    useEffect(()=>{
      const user1 = JSON.parse(localStorage.getItem('userInfo'));

        if(user1){
          Navigate('/home')
        }else{
          Navigate('/')
        }

    },[])

    return(
        <div>
            <Header/>
            <Home/>
            <StickyFooter/>
        </div>
    )
}

export default HomePage