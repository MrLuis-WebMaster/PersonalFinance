import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
//MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { MenuItem } from "@mui/material";
import { ErrorAlert } from '../../Components/Alert/AlertMessage'
import Dashboard from "../../Components/Dashboard/Dashboard";
import Helmet from 'react-helmet'

const CreateTransactions = () => {

  const handleSubmit = (event) => {

    event.preventDefault();
    
  };

  const handleChange = (e) => {
      console.log(e)
  }

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
];

  return (
      <>
        <Helmet>
            <title> Transaction | { false ? "user.fullName" : "user"} </title>
       </Helmet>
      <Dashboard 
      Component={
          <Grid container component="main" sx={{ height: '100%' }}>
        <Grid item xs={12} sm={8} md={12} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5">
              Create Transaction
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Concept"
                label="Concept"
                name="Concept"
                autoComplete="Concept"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Amount"
                label="Amount"
                type="number"
                id="Amount"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Date"
                label="Date"
                type="date"
                id="Date"
                onChange={handleChange}
              />
              
            <TextField
                id="outlined-select-currency"
                select
                label="Select"
                // value={currency}
                onChange={handleChange}
                helperText="Please select your currency"
                >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
             </TextField>


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Add
              </Button>
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    }>
    </Dashboard>
        </>
      
  );
}



export default CreateTransactions