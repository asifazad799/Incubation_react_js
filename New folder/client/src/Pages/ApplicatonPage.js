import React ,{useEffect}from "react";
import Header from "../components/Header/Header";
import AddressForm from "../components/ApplicationForm/ApplicationFrom";
import StickyFooter from "../components/Footer/Fotter";
import {useNavigate} from 'react-router-dom'

function ApllicationPage(){

    const Navigate = useNavigate()
    
    useEffect(()=>{
      const user1 = JSON.parse(localStorage.getItem('userInfo'));

        if(!user1){
          Navigate('/')
        }

    },[]) 

    return (

        <div>
            <Header/>
            <AddressForm/>
            <StickyFooter/>
        </div>

    )
    
}

export default ApllicationPage