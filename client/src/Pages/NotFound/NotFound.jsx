import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PigDead from "../../assets/img/Pig-dead.png"

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1)
  }
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
        <img src={PigDead} alt="Pig dead" />  
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography component="h3">Oooops!!</Typography>
        <Typography component="p">
          THAT PAGE DOESN'T OR IS UNAVAILABLE
        </Typography>
        <Button onClick={handleClick} variant="contained" sx={{ mt: 3, mb: 2, color:"white"}}>
            Go Back
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
