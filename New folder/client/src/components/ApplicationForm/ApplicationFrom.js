import React ,{useState,useContext} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SmallInput from './InputFields';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import {LarglInput} from './InputFields'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios'
import { formSuccessMessage } from '../../store/formData';
import { useNavigate }  from 'react-router-dom'



export default function AddressForm() {

  const Navigate = useNavigate()
  const [ name,setName] = useState('')
  const [ address,setAddress] = useState('')
  const [ city,setCityName] = useState('')
  const [ stateName,setStateName] = useState('')
  const [ email,setEmail] = useState('')
  const [ mobile,setMobile] = useState('')
  const [ companyName,setCompanyName] = useState('')
  const [ teamDiscription,setTeamDiscription] = useState('')
  const [ productDiscription,setProductDiscription] = useState('')
  const [ problemDiscription,setProblemDiscription] = useState('')
  const [ uniqueSolution,setUniqueSolution] = useState('')
  const [ proposition,setProposition] = useState('')
  const [ competativeData,setCompetativeData] = useState('')
  const [ revenue,setRevenue] = useState('')
  const [ marketSize,setMarketSize] = useState('')
  const [ marketing,setMarketing] = useState('')
  const [ bussinessProposal,setBussinessProposal] = useState('')
  const [ incubationType,setIncubatoinType] = useState('')
  const [ radioErr,setRadioErr] = useState('')
  const [ loading,setLoading] = useState('')
  const [ error,setError] = useState('')
  const {successMessage,setSuccessMessage} = useContext(formSuccessMessage)

  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // let dataObj = {marketing1:''}
  
  const applicationSubmit = async (data) =>{
    
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    let m = userToken.token
    try{
      //console.log(userToken.token)

      

          setLoading(true)
          const config = {
            headers:{
              "token":m
            },
          }

          const {data} = await axios.post(
            "/users/submitapp",{
              marketing,
              incubationType,
              bussinessProposal,
              competativeData,
              revenue,
              marketSize,
              proposition,
              uniqueSolution,
              problemDiscription,
              productDiscription,
              teamDiscription,
              companyName,
              mobile,
              email,
              stateName,
              city,
              address,
              name,
              userToken
            },
            config
          );
          
          // console.log(data)
          setSuccessMessage(data.message)
          setLoading(false)
          Navigate('/home')

    }catch(error){

      setError(error.response.data.message)
      console.log(error.response.data.message)
      setLoading(false)

    }

  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{mt:14,textAlign:'center'}}>
        Application
      </Typography>
      <Box component="form" 
        onSubmit={handleSubmit((e)=>{
          e.incubationType=incubationType
          //console.log(e)
          if(!radioErr)
          applicationSubmit(e)
        })} noValidate sx={{ mt: 1 }}>
      <Grid container 
        xs={12} 
        sm={10} lg={6} spacing={3} 
        sx={{mt:3,width:'90%',ml:'auto',mr:'auto',boxShadow:7,pr:3,pb:3,borderRadius:"4px",pt:2}}>
       
        <Grid item xs={12} sm={6} >
          <TextField
            required
            fullWidth
            name="name"
            label="Name"
            {...register("name",
                {   
                  required:"This field required",
                  minLength:{
                    value:5,
                    message:"Minimun 5 charecters"
                  }
                 
                }
            )}
            value={name}
            onChange={(e)=>{
              setName(e.target.value);
              errors.name=false
            }}
            type="text"
            id="name"
            helperText={errors.name?errors.name.message:''}
            error={errors.name}
          />
          </Grid>

        <Grid item xs={12} sm={6} >
          <TextField
            required
            fullWidth
            name="address"
            label="Address"
            {...register("address",
                {   
                  required:"This field required",
                  minLength:{
                    value:5,
                    message:"Minimun 5 charecters"
                  }
                 
                }
            )}
            value={address}
            onChange={(e)=>{
              setAddress(e.target.value);
              errors.address=false
            }}
            type="text"
            id="address"
            helperText={errors.address?errors.address.message:''}
            error={errors.address}
          />
          </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            required
            fullWidth
            name="city"
            label="City"
            {...register("city",
                {   
                  required:"This field required",
                  minLength:{
                    value:5,
                    message:"Minimun 5 charecters"
                  }
                 
                }
            )}
            value={city}
            onChange={(e)=>{
              setCityName(e.target.value);
              errors.email=false
            }}
            type="text"
            id="city"
            helperText={errors.city?errors.city.message:''}
            error={errors.city}
          />
          </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            required
            fullWidth
            name="state"
            label="State"
            {...register("state",
                {   
                  required:"This field required",
                  minLength:{
                    value:5,
                    message:"Minimun 5 charecters"
                  }
                 
                }
            )}
            value={stateName}
            onChange={(e)=>{
              setStateName(e.target.value);
              errors.state=false
            }}
            type="text"
            id="state"
            helperText={errors.state?errors.state.message:''}
            error={errors.state}
          />
          </Grid>

          

        <Grid item xs={12} sm={6} >
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            {...register("email",
                {   
                  required:"This field required",
                  pattern:{ 
                    value : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
                    message:'Enter a valid email'
                  }
                }
            )}
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value);
              errors.email=false
            }}
            type="text"
            id="email"
            helperText={errors.email?errors.email.message:''}
            error={errors.email}
          />
          </Grid>
          <Grid item xs={12} sm={6} >
          <TextField
            required
            fullWidth
            name="mobile"
            label="mobile"
            {...register("mobile",
                {   
                  required:"This field required",
                  pattern:{ 
                    value : /^[0-9]*$/,
                    message:'Invalid mobile number'
                  },
                  minLength:{
                    value:10,
                    message:'10 digits atleast'
                  },
                  maxLength:{
                    value:10,
                    message:'10 digits maximum'
                  }
                }
            )}
            value={mobile}
            onChange={(e)=>{
              setMobile(e.target.value);
              errors.mobile=false
            }}
            type="text"
            id="mobile"
            helperText={errors.mobile?errors.mobile.message:''}
            error={errors.mobile}
          />
          </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            required
            fullWidth
            name="companyName"
            label="Company Name"
            {...register("companyName",
                {   
                    required:"This field can't be empty",
                    minLength:{
                        value:3,
                        message:"Minimun 3 charecters"
                    }
                }
            )}
            value={companyName}
            onChange={(e)=>{
              setCompanyName(e.target.value);
              errors.companyName=false
            }}
            type="text"
            id="companyName"
            helperText={errors.companyName?errors.companyName.message:''}
            error={errors.companyName}
            
          />
          </Grid>
         <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            
            fullWidth
            autoComplete="shipping country"
            margin="normal"
            type={'file'}
          />
        </Grid>
         
          <Grid item xs={12} >
          <TextField
            required
            fullWidth
            name="teamDiscription"
            label="Discribe your team and background"
            {...register("teamDiscription",
                {   
                    required:"This field can't be empty",
                    minLength:{
                        value:10,
                        message:"Minimun 10 charecters"
                    }
                }
            )}
            value={teamDiscription}
            onChange={(e)=>{
              setTeamDiscription(e.target.value);
              errors.teamDiscription=false
            }}
            type="text"
            id="productDiscription"
            helperText={errors.teamDiscription?errors.teamDiscription.message:''}
            error={errors.teamDiscription}
            multiline
            rows={4}
          />
          </Grid>
         <Grid item xs={12} >
          <TextField
            required
            fullWidth
            name="productDiscription"
            label="Discribe your company and products"
            {...register("productDiscription",
                {   
                    required:"This field can't be empty",
                    minLength:{
                        value:10,
                        message:"Minimun 10 charecters"
                    }
                }
            )}
            value={productDiscription}
            onChange={(e)=>{
              setProductDiscription(e.target.value);
              errors.productDiscription=false
            }}
            type="text"
            id="productDiscription"
            helperText={errors.productDiscription?errors.productDiscription.message:''}
            error={errors.productDiscription}
            multiline
            rows={4}
          />
        </Grid>
         <Grid item xs={12} >
          <TextField
            required
            fullWidth
            name="problemDiscription"
            label="What is the problem you are trying to solve"
            {...register("problemDiscription",
                {   
                    required:"This field can't be empty",
                    minLength:{
                        value:10,
                        message:"Minimun 10 charecters"
                    }
                }
            )}
            value={problemDiscription}
            onChange={(e)=>{
              setProblemDiscription(e.target.value);
              errors.problemDiscription=false
            }}
            type="text"
            id="problemDiscription"
            helperText={errors.problemDiscription?errors.problemDiscription.message:''}
            error={errors.problemDiscription}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            fullWidth
            name="uniqueSolution"
            label="What is unique about your solution?"
            {...register("uniqueSolution",
                {   
                    required:"This field can't be empty",
                    minLength:{
                        value:10,
                        message:"Minimun 10 charecters"
                    }
                }
            )}
            value={uniqueSolution}
            onChange={(e)=>{
              setUniqueSolution(e.target.value);
              errors.uniqueSolution=false
            }}
            type="text"
            id="uniqueSolution"
            helperText={errors.uniqueSolution?errors.uniqueSolution.message:''}
            error={errors.uniqueSolution}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            fullWidth
            name="proposition"
            label="What is your value proposition for the customer?"
            {...register("proposition",
                {   
                    required:"This field can't be empty",
                    minLength:{
                        value:10,
                        message:"Minimun 10 charecters"
                    }
                }
            )}
            value={proposition}
            onChange={(e)=>{
              setProposition(e.target.value);
              errors.proposition=false
            }}
            type="text"
            id="proposition"
            helperText={errors.proposition?errors.proposition.message:''}
            error={errors.proposition}
            multiline
            rows={4}
          />
        </Grid>
        
        <Grid item xs={12} >
          <TextField
            required
            fullWidth
            name="competativeData"
            label="Who are your competitions and what is your competative advantage?"
            {...register("competativeData",
                {   
                    required:"This field can't be empty",
                    minLength:{
                        value:10,
                        message:"Minimun 10 charecters"
                    }
                }
            )}
            value={competativeData}
            onChange={(e)=>{
              setCompetativeData(e.target.value);
              errors.competativeData=false
            }}
            type="text"
            id="competativeData"
            helperText={errors.competativeData?errors.competativeData.message:''}
            error={errors.competativeData}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} >
        <TextField
         required
         fullWidth
         name="revenue"
         label="What is the potential market size of your product?"
         {...register("revenue",
             {   
                 required:"This field can't be empty",
                 minLength:{
                     value:10,
                     message:"Minimun 10 charecters"
                 }
             }
         )}
         value={revenue}
         onChange={(e)=>{
          setRevenue(e.target.value);
           errors.revenue=false
         }}
         type="text"
         id="marketSize"
         helperText={errors.revenue?errors.revenue.message:''}
         error={errors.revenue}
         multiline
         rows={4}
        />
      </Grid>
        <Grid item xs={12} >
        <TextField
         required
         fullWidth
         name="marketSize"
         label="What is the potential market size of your product?"
         {...register("marketSize",
             {   
                 required:"This field can't be empty",
                 minLength:{
                     value:10,
                     message:"Minimun 10 charecters"
                 }
             }
         )}
         value={marketSize}
         onChange={(e)=>{
          setMarketSize(e.target.value);
           errors.marketSize=false
         }}
         type="text"
         id="marketSize"
         helperText={errors.marketSize?errors.marketSize.message:''}
         error={errors.marketSize}
         multiline
         rows={4}
        />
      </Grid>
        <Grid item xs={12} >
        <TextField
         required
         fullWidth
         name="marketing"
         label="How do you market or plan to market your products and services"
         {...register("marketing",
             {   
                 required:"This field can't be empty",
                 minLength:{
                     value:3,
                     message:"Minimun 3 charecters"
                 }
             }
         )}
         value={marketing}
         onChange={(e)=>{
          setMarketing(e.target.value);
           errors.marketing=false
         }}
         type="text"
         id="marketing"
         helperText={errors.marketing?errors.marketing.message:''}
         error={errors.marketing}
         multiline
         rows={4}
        />
      </Grid>
        <Grid sx={{pl:3.5,mt:2}}>

          <FormLabel component="legend">Type of incubation needed</FormLabel>
          { radioErr?  <Grid item xs={12} sm={12} style={{color:'red',fontSize:"12px"}}>Please select one</Grid>:''}
          <RadioGroup
            aria-label="typeOfIncubation"
            name="radio-buttons-group"
          >
            <FormControlLabel    value="physicalIncubation" 

              control={<Radio 

                onChange={(e)=>{
                  setIncubatoinType(e.target.value)
                  setRadioErr(false)

              }}/>} 
              
              label="Physical Incubation" />
            <FormControlLabel  value="virtualIncubation" 
              control={<Radio 

                onChange={(e)=>{
                  setIncubatoinType(e.target.value)
                  setRadioErr(false)

                }} 
                
                />} 
              label="Virtual Incubation" />
          </RadioGroup>

        </Grid>
        {/* <LarglInput 
          props={
            {
              name:"bussinessProposal",
              id:"bussinessProposal",
              label:"Upload a detailed bussiness proposal",
              fc:(e)=>{
                setBussinessProposal(e.target.value);
              },
              validation:{
                ...register("bussinessProposal",
                {
                  required:"This field required",
                  minLength:{
                    value:20,
                    message:"Please Enter Atleast 20 characters"
                  }
                  
                })
                
              },
              value:bussinessProposal,
              error:errors.bussinessProposal,
              errorMsg:errors.bussinessProposal ? errors.bussinessProposal.message : "",
              rows:2,
              rowsMax:4
            }
          }
        /> */}
        <Grid item xs={12} >
        <TextField
         required
         fullWidth
         name="bussinessProposal"
         label="Bussiness Proposal"
         {...register("bussinessProposal",
             {   
                 required:"This field can't be empty",
                 minLength:{
                     value:10,
                     message:"Minimun 10 charecters"
                 }
             }
         )}
         value={bussinessProposal}
         onChange={(e)=>{
          setBussinessProposal(e.target.value);
           errors.bussinessProposal=false
         }}
         type="text"
         id="bussinessProposal"
         helperText={errors.bussinessProposal?errors.bussinessProposal.message:''}
         error={errors.bussinessProposal}
         multiline
         rows={4}
        />
      </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
        <Box sx={{ alignItems: 'center',display: 'flex',flexDirection: 'column',}}>
            <Button
            type="submit"
            variant="contained"
            
            sx={{ mt: 3, mb: 2 ,p:1.3,px:3,backgroundColor:'blue',":hover":{backgroundColor:'green'}}}
            onClick={(e)=>{
              if(incubationType==''){
                //console.log('i empty')
                return setRadioErr(true)
              }
            }}
            >
            Apply
            </Button>
        </Box>
        </Box>
    </React.Fragment>
  );
}