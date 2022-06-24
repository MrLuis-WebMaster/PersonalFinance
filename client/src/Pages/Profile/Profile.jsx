import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Avatar from "@mui/material/Avatar";
import Loading from "../../Components/Loading/Loading";
import { getUser, resetUser } from "../../Redux/slices/users/users";

const Profile = () => {
  const Dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        Dispatch(getUser(currentUser));
      } else {
        Dispatch(resetUser());
      }
    });
  }, [Dispatch]);

  const user = useSelector((state) => state.users.infoUser.userInfo);
  if (!user) {
    return <Loading />;
  } else {
    return (
      <Dashboard
        Component={
          <div>
            <Box
              style={{
                background:
                  "linear-gradient(92.74deg, rgb(26, 172, 240) 4.89%, rgb(253, 119, 121) 100%)",
              }}
              sx={{
                position: "absolute",
                top: "0",
                right: "0",
                left: "0",
                zIndex: "-1",
                height: "250px",
                width: "100%",
              }}
            ></Box>
            <Grid container spacing={4} sx={{ paddingTop: "5rem" }}>
              <Grid item xs={12} md={3}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar sx={{ width: 60, height: 60 }}>
                      {" "}
                      {user ? user.fullName[0] : ""}{" "}
                    </Avatar>
                    <Typography variant="h4" component="h2">
                      {user.fullName}
                    </Typography>
                    <Typography>{user.email}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Box>
                      <Typography variant="h5" component="div">
                        Country
                        <Typography variant="h6" component="h6">
                          {user.country}
                        </Typography>
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Edit Profile</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        }
      />
    );
  }
};

export default Profile;
