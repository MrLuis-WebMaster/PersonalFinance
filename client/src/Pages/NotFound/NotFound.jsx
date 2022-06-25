import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PigDead from "../../assets/img/Pig-dead.png"

const NotFound = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={PigDead} alt="" />  
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography component="h3">Oooops!!</Typography>
        <Typography component="p">
          THAT PAGE DOESN'T OR IS UNAVAILABLE
        </Typography>
        <Button variant="contained" sx={{ mt: 3, mb: 2, color:"white"}}>
          <Link style={{color:"#fff"}} to="/">Go Back to Home</Link>
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
