import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import LandingPageBody from "../components/landinPage/landingPage";
import StickyFooter from "../components/Footer/Fotter";
import {useNavigate} from 'react-router-dom';

function LandingPage(){

    const Navigate = useNavigate()
    
    useEffect(()=>{
      const user1 = JSON.parse(localStorage.getItem('userInfo'));

        if(user1){
          Navigate('/home')
        }else{
          Navigate('/')
        }

    },[])

    return (
        <div>
            <Header/>
            <LandingPageBody/>
            <StickyFooter/>
        </div>
    )
    

}
export default LandingPage