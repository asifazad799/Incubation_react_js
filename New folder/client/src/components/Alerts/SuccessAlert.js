import React,{useContext,useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// import { formSuccessMessage } from '../../store/formData';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert severity="success" elevation={3} ref={ref}  {...props} />;
});

export default function CustomizedSnackbars() {
    const [open, setOpen] = React.useState(false);
//   const {successMessage,setSuccessMessage} = useContext(formSuccessMessage)
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'left',
    });
    const { vertical, horizontal } = state;

useEffect(()=>{
    handleClick()
},[])


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar  style={{marginTop:'57px'}} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your application submitted successfully
        </Alert>
      </Snackbar>
    </Stack>
  );
}