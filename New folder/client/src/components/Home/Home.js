import React ,{useContext,useEffect, useState}from "react";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import { formSuccessMessage } from '../../store/formData';
import CustomizedSnackbars from "../Alerts/SuccessAlert";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { width } from "@mui/system";


function Home(){
    const Navigate = useNavigate()
    const {successMessage,setSuccessMessage} = useContext(formSuccessMessage)
    const [status,setStatus] = useState('');
    const [error,setError] = useState('')
    
    
    useEffect( async()=>{
        const userToken = JSON.parse(localStorage.getItem('userInfo'));
        console.log(userToken.token)
        let m = userToken.token

        try{

           
            const {data} = await axios.get(
                `/users/getStatus?userId=${userToken.user._id}`,
                {
                    headers:{
                        token:m
                    }
                }
            )

            setStatus(data.status)
            
        }catch(error){

            setError(error.response.data.message)
            console.log(error.response.data.message)

        }

    },[])

    return(
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Container disableGutters maxWidth="xs" component="main" sx={{ pt: 8,mt:18, pb: 6 ,boxShadow: 7  }}>
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Winter 2022
                    {successMessage!==''?<CustomizedSnackbars/>:''}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                Welcome to Incubator <br></br>Click this button to book your slot

                <Box sx={{ width:'100%',display:'flex',justifyContent:'center',mt:3}}>

                    <Stack  sx={{ width: 'auto' }} spacing={2}>
                        <Grid item xs={12}  style={{color:'red',fontSize:"14px"}}>
                            
                            {
                                status=='pending'? <Alert severity="info">
                                                    <AlertTitle style={{textAlign:'start'}}>Apllication Status</AlertTitle>
                                                       Your application in <strong>pending</strong>
                                                    </Alert>:null
                            }
                            {
                                status=='rejected'?<Alert severity="error">
                                                    <AlertTitle style={{textAlign:'start'}}>Apllication Status</AlertTitle>
                                                        Sorry your application is <strong>rejected</strong>
                                                    </Alert>:null
                            }
                            {
                                status=='approved'?<Alert severity="success" style={{textAlign:'start'}}>
                                                    <AlertTitle >Apllication Status</AlertTitle>
                                                        Congrats your application is <strong>accepted</strong>
                                                        <br></br>
                                                        Your slot <strong>: 20</strong>
                                                    </Alert>:null
                            }
                            

                        </Grid>
                    </Stack>

                </Box>

                    <CardActions style={{justifyContent:'center'}} sx={{mt:3}}>

                    
                        <Button onClick={()=>{
                            Navigate('/application')
                        }}   variant={'outlined'}>
                        Book Your Slot
                        </Button>
                    </CardActions>
                </Typography>
            </Container>
        </React.Fragment>
    )

}

export default Home