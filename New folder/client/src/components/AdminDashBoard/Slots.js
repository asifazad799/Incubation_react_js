import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React,{useEffect,useState,useContext, Fragment} from 'react';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import axios from 'axios'



export default function Slot(){

    const [slotColor,setSlotColor] = useState('red')
    const [open, setOpen] = React.useState(false);
    const handleOpen = (key) =>{
        console.log(key)
        setSlotNumber(key)
        setOpen(true)
    };
    
    const handleClose = () => setOpen(false);
    const style = {

        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius:"4px",
        width:"50%"

    };
// console.log(open)  
    var Rows = [1,2,3,4,5,6,7,8,9,10,11,12];
    var columns = [1,2,3]
    let l= [1,2,3]
    let n = [1,2,3]

   

    const numslots = 12
   
    
    

    

    
   
    const [approvedApps,setApprovedApps] = useState([])
    const [seat,setSeat] = useState('')
    const [appId,setAppId] = useState('')
    const [slotNumber,setSlotNumber] = useState('')
    const [updated,setUpdated] = useState('')

    let array =  []

    useEffect(async()=>{
        
        const {data} = await axios.get('/admin/applicationTable')
        // console.log(data.data)
        await data.data.map((val)=>{
            if(val.status=='approved'){

                array.push(val)

            }
        })
        setApprovedApps(array)
        
    },[updated])

    console.log(array)

    let  apply= async()=>{
        
        try{

            setUpdated('updated')
            const {data} = await axios.post('/admin/slotAlocation',{
                slotNumber,
                appId
            })
            // console.lg(data)
            setUpdated('')
            setOpen(false)

        }catch(error){

            console.log(error.response.data.message)

        }

    }

    

    let slots = []
    
    for(let i = 1 ; i<=10 ; i++){
        slots.push({
            id: `A${i}`,
            booked:false,
            companyName:''
        })
    }
    

// console.log(slots)

    slots.map((val)=>{

        approvedApps.map((val1)=>{

            // console.log(val.slotNumber)
            if(val1.slotNumber==val.id){
                val.booked = true
                val.companyName = val1.companyName
            }


        })
        
    })


    return (
        <div>
            <Typography variant="h4" gutterBottom component="div">
                
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: 100,
                        height: 100,
                    },


                }}
                
            >

                {
                  
                    slots.map((val)=>{

                        // console.log(val)
                        return val.booked == false ? (

                            <div   style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" , marginLeft:'10px'}}
                            onClick={(e)=>handleOpen(`${val.id}`)} >
                                                    
                                     
                            </div>
                        ):(
                            <div title={`${val.companyName}`}   style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" ,  marginLeft:'10px'}} 
                             >
                                
                                    
                            </div>
                        )
                    })
                }
            </Box >
           
                

                {/* <div style={{display:'flex',justifyContent:'center',marginLeft:"105px"}}>

                <Box sx={{
                    height:500,
                    width:400,
                    
                }}>

                    {
                        columns.map((val)=>{

                            

                            return (
                                <div style={{display:'flex'}}>
                    
                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                val2.slotNumber == `E${val}` ?<div key={`E${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" , marginLeft:'10px'}} >
                                                    
                                                    E {val}
                                                </div> :<div key={`E${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" ,  marginLeft:'10px'}} 
                                                onClick={(e)=>handleOpen(`E${val}`)}>
                                                
                                                    E {val}
                                                </div>
                                            )
                                        })

                                    }
                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                val2.slotNumber == `F${val}` && val2.status=='approved'  ?<div key={`F${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" , marginLeft:'10px'}} >
                                                    
                                                    F {val}
                                                </div> :<div key={`F${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" , marginLeft:'10px'}} 
                                                onClick={(e)=>handleOpen(`F${val}`)}>
                                                
                                                    F {val}
                                                </div>
                                            )
                                        })

                                    }

                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                val2.slotNumber == `G${val}` && val2.status=='approved'  ?<div key={`G${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" , marginLeft:'10px'}} >
                                                    
                                                    G {val}
                                                </div> :<div key={`G${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" , marginLeft:'10px'}} 
                                                onClick={(e)=>handleOpen(`G${val}`)}>
                                                
                                                    G {val}
                                                </div>
                                            )
                                        })

                                    }
                    
                                </div>
                            )
                    
                        })
                    }
                    
                    

                </Box>
                <Box sx={{
                    height:500,
                    width:400,
                    
                }}>

                    {
                        l.map((val=>{

                            return(
                                <div style={{display:'flex'}}>
                    
                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                val2.slotNumber == `X${val}` && val2.status=='approved' ?<div key={`X${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" ,}} >
                                                    
                                                    X {val}
                                                </div> :<div key={`X${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" ,}} 
                                                onClick={(e)=>handleOpen(`X${val}`)}>
                                                
                                                    X {val}
                                                </div>
                                            )
                                        })

                                    }

                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                val2.slotNumber == `Y${val}` && val2.status=='approved' ?<div key={`Y${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} >
                                                
                                                Y {val}</div> :<div key={`Y${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} 
                                                    onClick={(e)=>handleOpen(`Y${val}`)}>
                                                        
                                                    Y {val}
                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                val2.slotNumber == `Z${val}` && val2.status=='approved' ?<div key={`Z${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} >
                                                
                                                    Z {val}</div> :<div key={`Z${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} 
                                                    onClick={(e)=>handleOpen(`Z${val}`)}>
                                                        
                                                    Z {val}
                                                </div>
                                            )
                                        })
                                    }
                                    
                                
                    
                                
                    
                                </div>
                            )
                    
                        }))
                    
                    }
                    
                    

                </Box>
                <Box sx={{
                    height:500,
                    width:400,
                    
                }}>

                    {
                         n.map((val)=>{

                            return(
                                <div style={{display:'flex'}}>

                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                val2.slotNumber == `L${val}` && val2.status=='approved' ?<div key={`Z${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} >
                                                
                                                    L {val}</div> :<div key={`L${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} 
                                                    onClick={(e)=>handleOpen(`L${val}`)}>
                                                        
                                                    L {val}
                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                val2.slotNumber == `M${val}` && val2.status=='approved' ?<div key={`Z${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} >
                                                
                                                    M {val}</div> :<div key={`M${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} 
                                                    onClick={(e)=>handleOpen(`M${val}`)}>
                                                        
                                                    M {val}
                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        approvedApps.map((val2)=>{
                                            console.log(val2.slotNumber)
                                            return(

                                                
                                                val2.slotNumber == `N${val}` && val2.status=='approved' ?<div key={`Z${val}`}  style={{backgroundColor:"red" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} >
                                                
                                                    N {val}</div> :<div key={`N${val}`}  style={{backgroundColor:"blue" ,width:"70px",height:"70px",marginTop:"10px" ,marginLeft:"10px"}} 
                                                    onClick={(e)=>handleOpen(`N${val}`)}>
                                                        
                                                    N {val}
                                                </div>
                                            )
                                        })
                                    }
                    
                                </div>
                            )
                    
                        })
                    }
                    
                    

                </Box>
                    </div> */}
                    

            
            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  
                >
                <Grid  >
                  <Box fullWidth  sx={style} style={{maxHeight:"500px",overflow:"scroll"}} >
                      <h2 style={{textAlign:"center"}}>Application</h2>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                     
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      
                        <dl>
                            {
                                approvedApps.map((val)=>{
                                    // console.log(val._id)
                                    if(val.status === 'approved')

                                    return(
                                        
                                        <Fragment>
                                        <label htmlFor={"check"}  style={{display:"flex"}}>

            
                                            <div  onClick={(e)=>setAppId(val._id)} style={{lineHeight:"0px"}}><input id={'check'} name="app" type="radio"/></div><div style={{lineHeight:"11px",marginLeft:"10px"}}><span >{val.companyName}</span></div>
                                        </label>
                                       
                                        </Fragment>
                                        
                                    )
                                })
                            }
                            
                        </dl>

                    </Typography>
                    <Stack spacing={2}>
                        <div  style={{marginLeft:"auto",marginTop:"20px" }}>
                            <Button variant="contained" color="success" onClick={apply}   sx={{mr:1}} >Apply</Button>
                            <Button variant="contained" onClick={handleClose} >Close</Button>
                        </div>
                    </Stack>
                  </Box>
                  </Grid>
                </Modal>
        </div>
    );

}