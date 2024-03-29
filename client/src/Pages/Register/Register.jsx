import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { ErrorAlert } from "../../Components/Alert/AlertMessage";
import { sendUser } from "../../Redux/slices/users/users";
import { SignUp } from "../../Authentication/LoginWorkFlow";
import { getCountries } from "../../Redux/slices/countries/countries";
import PigIcon from "../../assets/img/Pig.png";
import Footer from "../../Components/Footer/Footer";

const Register = () => {
  const [userCredentials, setUserCredentials] = useState({
    fullName: "",
    email: "",
    country: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fecthPostPromise = async (userCredentials) => {
    try {
      await Promise.all([
        SignUp(userCredentials.email, userCredentials.password),
        dispatch(sendUser(userCredentials)),
      ]);
      navigate("/overview");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        ErrorAlert.fire({
          title: "Email already in use",
          icon: "error",
        });
      }

      if (error.code === "auth/invalid-email") {
        ErrorAlert.fire({
          title: "Email requerid",
          icon: "error",
        });
      }

      if (error.code === "auth/weak-password") {
        ErrorAlert.fire({
          title: "Weak Password",
          icon: "error",
        });
      }

      if (error.code === "auth/internal-error") {
        ErrorAlert.fire({
          title: "Email Invalid",
          icon: "error",
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { fullName, email, country, password } = userCredentials;
    if (!fullName || !email || !country || !password) {
      ErrorAlert.fire({
        title: "All fields are required",
        icon: "error",
      });
      return;
    }
    fecthPostPromise(userCredentials);
  };

  const countries = useSelector(
    (state) => state.countries.countries.AllCountries
  );

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleChange = ({ target: { name, value } }) => {
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80%",
        }}
      >
        <img src={PigIcon}></img>
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
              <FormControl fullWidth required>
                <InputLabel id="country">Country</InputLabel>
                <Select
                  label="Country"
                  name="country"
                  labelId="country"
                  id="country"
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                >
                  {countries
                    ? countries.map(({ name }) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
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
              <Link to="/">Already have an account? Sign in</Link>
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
          height: "20%",
        }}
      >
        <Footer />
      </Box>
    </Container>
  );
};

export default Register;
