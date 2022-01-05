import React,{useState,useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const theme = createTheme();

function SignUp() {

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState('')
    const Navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(()=>{
        const user1 = JSON.parse(localStorage.getItem('userInfo'));
  
          if(user1){
            Navigate('/home')
          }else{
            Navigate('/signup')
          }
  
      },[])

    const SignUp = async(data) => {
        // event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // // eslint-disable-next-line no-console
        // console.log({
        // email: data.get('email'),
        // password: data.get('password'),
        // });
        // console.log(data)
        try{
            setError(false)
            const config = {
              headers:{
                "Content-type":"application/json"
              }
            }
            setLoading(true)
            // console.log(email)
            const {data} = await axios.post(
                "/users/signup",{
                    firstName,
                    lastName,
                    email,
                    password
                },
                config
            );
            setLoading(false)
            Navigate('/login')
        }catch(error){
            // console.log(error.response)
            setError(error.response.data.message)
            setLoading(false)
        }
    };

    return (
        <ThemeProvider theme={theme} >
        <Container className='card' sx={{mt: 9,boxShadow: 7 }} component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography sx={{mb:3 , }} component="h1" variant="h5">
                Sign up
            </Typography>
            
            
            <Box component="form" noValidate onSubmit={handleSubmit((e)=>{
                SignUp(e)
            })}>
                { loading && <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'}}><CircularProgress color="success"/></Box>}

                { error?  <Grid item xs={12}  style={{color:'red',fontSize:"14px"}}><Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                      Entered value is wrong <strong>check it out!</strong>
                    </Alert></Grid>:''
                }

                <Grid container spacing={2} sx={{pt:2}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    {...register('firstName',
                        {   
                            required:"This field can't be empty",
                            minLength:{
                                value:4,
                                message:"Minimun 4 charecters"
                            }
                        }
                    )}
                    value={firstName}
                    onChange={
                        (e)=>{
                        setFirstName(e.target.value)
                        errors.firstName = false
                    }}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error = {errors.firstName}
                    
                    />
                    { errors.firstName?  <Grid item xs={12} sm={12} style={{color:'red',fontSize:"14px"}}>{errors.firstName.message}</Grid>:''}
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    {...register('lastName',
                        {   
                            required:"This field can't be empty",
                            minLength:{
                                value:4,
                                message:"Minimun 4 charecters"
                            }
                        }
                    )}
                    value={lastName}
                    onChange={(e)=>{
                        setLastName(e.target.value)
                        errors.lastName = false
                    }}
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={errors.lastName}
                    />
                    { errors.lastName?  <Grid item xs={12} sm={12} style={{color:'red',fontSize:"14px"}}>{errors.lastName.message}</Grid>:''}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    {...register('email',
                        {   
                            required:"This field can't be empty",
                            pattern:{ 
                                value : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
                                message:'Enter a valid email'
                            }
                        }
                    )}
                    value={email}
                    onChange={
                        (e)=>{
                        setEmail(e.target.value)
                        setError(false)
                        
                        errors.email = false
                    }}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={errors.email}
                    />
                    { errors.email?  <Grid item xs={12} sm={12} style={{color:'red',fontSize:"14px"}}>{errors.email.message}</Grid>:''}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    
                    fullWidth
                    name="password"
                    label="Password"
                    {...register("password",
                        {   
                            required:"This field can't be empty",
                            minLength:{
                                value:4,
                                message:"Minimun 6 charecters"
                            }
                        }
                    )}
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                        errors.password = false
                    }}
                    type="password"
                    id="password"
                    
                    error={errors.password}
                    />
                    { errors.password?  <Grid item xs={12} sm={12} style={{color:'red',fontSize:"14px"}}>{errors.password.message}</Grid>:''}

                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>
                </Grid>
                <Box sx={{ alignItems: 'center',display: 'flex',flexDirection: 'column',}}>
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2  }}
                    >
                    Sign Up
                    </Button>
                </Box>
                <Grid container sx={{ mt: 1, mb: 2 }} justifyContent="flex-end">
                <Grid item>
                    <Link onClick={()=>Navigate('/login')} style={{cursor:"pointer",textDecoration:'none'}}  variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
           
            </Box>
        </Container>
        </ThemeProvider>
    );
}

export default SignUp