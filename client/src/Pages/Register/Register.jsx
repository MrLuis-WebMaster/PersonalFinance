import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom"
//MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ErrorAlert } from '../../Components/Alert/AlertMessage'
import { sendUser } from "../../Redux/slices/users/users";
import {SignUp} from "../../Authentication/LoginWorkFlow";

const Register = () => {

  const [userCredentials, setUserCredentials] = useState({
    fullName:"",
    email: "",
    password:""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.user)


  const handleSubmit = (event) => {

    event.preventDefault();
    

    SignUp(userCredentials.email,userCredentials.password).then( (result)=> {
      console.log(result)
      dispatch(sendUser(userCredentials))
      navigate("/overview")    
    }).catch((error)=> {

      if (error.code === "auth/email-already-in-use" ) {
          ErrorAlert.fire({
            title:"Email already in use",
            icon:"error"
          })
      }

      if (error.code === "auth/weak-password") {
          ErrorAlert.fire({
            title:"Weak Password",
            icon:"error"
          })
      }

      if (error.code === "auth/internal-error") {
          ErrorAlert.fire({
            title:"Email Invalid",
            icon:"error"
          })
      }


    })

  };



  const handleChange = ({target: {name,value}}) => {
    setUserCredentials({...userCredentials,[name]:value})
  }

  return (
      <Container component="main" maxWidth="xs" sx={{ height: '80vh' }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Register;