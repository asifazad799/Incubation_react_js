import React,{useState,useContext,useEffect} from "react"; 
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
import { useNavigate }  from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { userContext } from "../../store/userContext";


const theme = createTheme();


function Login(){
    const Navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState('')
    const [error,setError] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {user,setUser} = useContext(userContext)

    useEffect(()=>{
      const user1 = JSON.parse(localStorage.getItem('userInfo'));

        if(user1){
          Navigate('/home')
        }else{
          Navigate('/login')
        }

    },[])

   
    
    const Login = async (e) => {
        // event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // // eslint-disable-next-line no-console
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
        // console.log(e)
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
            "/users/login",{
              email,
              password
            },
            config
          );
          localStorage.setItem('userInfo',JSON.stringify(data))
          setLoading(false)
          setUser(email)
          Navigate('/home')

        }catch(error){
          setError(error.response.data.message)
          // console.log(error.response.data.message)
          setLoading(false)
        }
    };
    return (

        
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs"  sx={{mt: 9,boxShadow: 7 }} >
            <CssBaseline />
            <Box
              sx={{
                pt:2,
                pb:3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography sx={{mt:1}} component="h1" variant="h5">
                Sign in
              </Typography>
                <Box component="form" onSubmit={handleSubmit((e)=>{
                  Login(e)
                })} noValidate sx={{ mt: 1 }}>
                  
                { loading && <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'}}><CircularProgress color="success"/></Box>}

                { error?  <Grid item xs={12}  style={{color:'red',fontSize:"14px"}}><Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                      Entered value is wrong <strong>check it out!</strong>
                    </Alert></Grid>:''
                }
                <Grid container spacing={2}>
                <Grid item xs={12} sm={12}  >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                onChange={(e)=>{
                  setEmail(e.target.value);
                  setError(false);
                  errors.email=false
                }}
                error={errors.email}
                />
                { errors.email?  <Grid item xs={12}  style={{color:'red',fontSize:"14px"}}>{errors.email.message}</Grid>:''}
                </Grid>
                <Grid item xs={12} >
                <Grid item xs={12}  >
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    {...register("password",
                        {   
                            required:"This field can't be empty",
                            minLength:{
                                value:3,
                                message:"Minimun 3 charecters"
                            }
                        }
                    )}
                    value={password}
                    onChange={(e)=>{
                      setPassword(e.target.value);
                      setError(false);
                      errors.password=false
                    }}
                    type="password"
                    id="password"
                    
                    error={errors.password}
                    />
                { errors.password?  <Grid item xs={12} sm={12} style={{color:'red',fontSize:"14px"}}>{errors.password.message}</Grid>:''}
                </Grid>
                <Grid item xs={12} sm={12} >
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
                    <Box sx={{ alignItems: 'center',display: 'flex',flexDirection: 'column',}}>

                        <Button
                            type="submit"
                           
                            variant="contained"
                            sx={{ mt: 3, mb: 2  }}
                            >
                                Sign In
                        </Button>
                    </Box>
                </Grid>
                </Grid>
                <Grid container sx={{mt:2, ml:2}}>
                  
                  <Grid item>
                    <Link onClick={()=>Navigate('/signup')} style={{cursor:"pointer",textDecoration:'none'}} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                </Grid>
              </Box>
            </Box>
           
          </Container>
        </ThemeProvider>

      );
}
export default Login