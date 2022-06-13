import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
//MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import img from "../../assets/img/bg-login.jpg";
import {resetPassword} from "../../Authentication/LoginWorkFlow";
import { InfoAlert } from "../../Components/Alert/AlertMessage";

const ResetPassword = () => {

    const [userCredentials, setUserCredentials] = useState({
        email: "",
      })
    
      const navigate = useNavigate();
    
      const handleSubmit = (event) => {
    
        event.preventDefault();
        resetPassword(userCredentials.email).then(()=> {
            InfoAlert.fire({
                title:"We sent email",
                icon:"info"
            })
            navigate("/")
        }).catch((error)=>{
            console.log(error)
        })
      }

    
      const handleChange = ({target: {name,value}}) => {
        setUserCredentials({...userCredentials,[name]:value})
      }
    
    
      return (
          <Grid container component="main" sx={{ height: '90vh' }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${img})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Reset Password
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Send
                  </Button>
                  
                </Box>
              </Box>
            </Grid>
          </Grid>
          
      );
}

export default ResetPassword


