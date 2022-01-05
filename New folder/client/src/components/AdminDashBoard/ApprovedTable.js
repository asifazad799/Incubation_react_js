import React,{useEffect,useState,useContext} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { updateTable } from '../../store/tableUpdate'; 



const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

 function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


// let g = [{s:"sss",h:"uuuu"},{s:"jjj",h:"uuuu"}]





export default function ApprovedTable({props}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [apps,setApps] = useState([])
    const [review,setReview] = useState({})
    const rows = [
    //   createData('India', 'IN', 1324171354, 3287263)
    ];
    const [age, setAge] = React.useState('');
    const {update,setUpdate} = useContext(updateTable)
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    //finding particular appliction
    const [open, setOpen] = React.useState(false);
    const handleOpen = (appId) =>{ 
        setOpen(true);
        // console.log(appId)
        apps.map((val)=>{
            if(val._id==appId){
                // console.log(val.companyName);
                setReview(val)
            }
        })
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
    
    
    
    useEffect(async()=>{
        
        const {data} = await axios.get('/admin/applicationTable')
        // console.log(data.data)
        setApps(data.data)
        
    },[update])

    // console.log(update)
    apps.map((val)=>{
    
        if(val.status=='approved')
        rows.push(
    
            createData(
                val.name,
                val.address,
                
                <div>
                <Button variant="outlined" onClick={()=>handleOpen(val._id)}>View Application</Button>
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
                      {review.companyName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <strong>Name : </strong>{review.name}
                      <br></br>
                      <strong>Phone : </strong>{review.mobile}
                      <br></br>
                      <strong>Email : </strong>{review.email}
                      <br></br>
                      <strong>Address : </strong>{review.address}
                      <br></br>
                      <strong>City : </strong>{review.city}
                      <br></br>
                      <strong>State : </strong>{review.stateName}
                      <br></br>

                      <strong>Discribe your team and background</strong>
                      <br></br>
                      {review.teamDiscription}
                      <br></br>

                      <strong>Discribe your company and products</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>What is the problem you are trying to solve</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>What is unique about your solution?</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>What is your value proposition for the customer?</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>Who are your competitions and what is your competative advantage?</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>What is the potential market size of your product?</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>What is the potential market size of your product?</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>How do you market or plan to market your products and services</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>Type of incubation needed</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                      <strong>Bussiness Proposal</strong>
                      <br></br>
                      {review.productDiscription}
                      <br></br>

                    </Typography>
                    <Stack spacing={2}>
                        <div  style={{marginLeft:"auto",marginTop:"20px" }}>

                            <Button variant="contained" color="error" sx={{mr:1}}>Reject</Button>
                            <Button variant="contained" onClick={handleClose} >Close</Button>
                        </div>
                    </Stack>
                  </Box>
                  </Grid>
                </Modal>
              </div>
            )

        )
    })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' ,p:2}}>
      <h4 style={{textAlign:'center',position:'sticky'}}>{props.heading}</h4>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell  key={column.id} align='center'>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
