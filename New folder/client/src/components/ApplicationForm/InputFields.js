import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function SmallInput({props}){
    // console.log(props.id) 
    return(
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={props.id}
            name={props.name}
            label={props.label}
            onChange={props.fc}
            {...props.validation}
            error={props.error}
            helperText={props.errorMsg}
            fullWidth
            margin="normal"
          />
        </Grid>
    )
}
export function LarglInput({props}){
  // console.log(props.value) 
  return(
      <Grid item xs={12} >
        <TextField
          required
          id={props.id}
          name={props.name}
          label={props.label}
          onChange={props.fc}
          {...props.validation}
          error={props.error}
          helperText={props.errorMsg}
          fullWidth
          margin="normal"
          multiline
          value={props.value.name}
          rows={props.rows}
          maxRows={props.maxRows}
        />
      </Grid>
  )
}