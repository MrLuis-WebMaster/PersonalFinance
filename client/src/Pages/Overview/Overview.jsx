import React from 'react'
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { 
    getAuth,
    onAuthStateChanged 
  } from "firebase/auth";
import { Grid } from '@mui/material'
import Dashboard from '../../Components/Dashboard/Dashboard'
import Loading from '../../Components/Loading/Loading';
import LastTransactions from '../../Components/LastTransactions/LastTransactions';
import TotalBalance from '../../Components/TotalBalance/TotalBalance';
import { Helmet } from 'react-helmet';
import { getUser } from '../../Redux/slices/users/users'

const Overview = () => {
    const Dispatch = useDispatch();
    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, currentUser => {
            Dispatch(getUser(currentUser))
        })
    },[Dispatch])  

    const user = useSelector(state => state.users.infoUser.userInfo)

    if (!user) {
        return <Loading/>
    } else {
        return ( 
            <>
                <Helmet>
                    <title> Overview | { user ? user.fullName : "user"} </title>
                </Helmet>
                <Dashboard 
                    Component = {
                        (
                            <div>
                                <h1>Welcome {user.fullName}</h1>
                                <Grid container spacing={5}>
                                    <Grid item xs={6} md={6}>
                                        <LastTransactions/>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <TotalBalance/>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    }
                />

                
            </>       
        )
    }
}

export default Overview