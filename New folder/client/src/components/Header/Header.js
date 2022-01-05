import React, { useState ,useContext} from "react";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { userContext } from "../../store/userContext";
import AccountMenu from "../profileIcon/ProfileIcon";


function Header(){
    const {user,setUser} = useContext(userContext)
    const user1 = JSON.parse(localStorage.getItem('userInfo'));
    if(user1){
        setUser(user1.user.email)
        // console.log(user1)
    }
    
    const Navigate = useNavigate()
    return(
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                elevation={3}
                
                >
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Incubator 
                        </Typography>
                         
                        {user?<AccountMenu/>:<Button  onClick={()=>{
                                    Navigate('/login')
                                }} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            Login
                        </Button>}
                        
                    </Toolbar>
            </AppBar>
        </React.Fragment>
    )

}

export default Header