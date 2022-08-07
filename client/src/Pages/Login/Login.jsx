import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import img from "../../assets/img/bg-login.jpg";
import { ErrorAlert } from "../../Components/Alert/AlertMessage";
import { LoginUser } from "../../Authentication/LoginWorkFlow";
import { resetUser } from "../../Redux/slices/users/users";
import Footer from "../../Components/Footer/Footer";
import PigIcon from "../../assets/img/Pig.png";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    LoginUser(userCredentials.email, userCredentials.password)
      .then(() => {
        navigate("/overview");
      })
      .catch((error) => {
        if (error.code === "auth/internal-error") {
          ErrorAlert.fire({
            title: "Email Invalid",
            icon: "error",
          });
        }
        if (error.code === "auth/invalid-email") {
          ErrorAlert.fire({
            title: "Email is required",
            icon: "error",
          });
        }
        if (error.code === "auth/wrong-password") {
          ErrorAlert.fire({
            title: "Wrong password",
            icon: "error",
          });
        }
        if (error.code === "auth/too-many-requests") {
          ErrorAlert.fire({
            title: "Too many requests, sorry",
            icon: "error",
          });
        }
        if (error.code === "auth/user-not-found") {
          ErrorAlert.fire({
            title: "User not found",
            icon: "error",
          });
        }
        console.log(error.code);
      });
  };
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(resetUser());
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} elevation={6} square="true">
        <Box
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "70%",
          }}
        >
          <img src={PigIcon}></img>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs={12} sm={6}>
                <Link to="/reset-password">Forgot password?</Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link to="/register">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "30%",
          }}
        >
          <Footer />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
