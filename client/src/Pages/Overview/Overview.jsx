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
import { getUser, resetUser } from '../../Redux/slices/users/users'

const Overview = () => {
    const Dispatch = useDispatch();
    const auth = getAuth();
    const user = useSelector(state => state.users.infoUser.userInfo)
    console.log(user)
    useEffect(()=>{
        onAuthStateChanged(auth, currentUser => {
            if(currentUser) {
                Dispatch(getUser(currentUser))
            } else {
                Dispatch(resetUser())
            }
        })
        return () => {
            Dispatch(resetUser())
        }

    },[Dispatch])  

    if (!user) {
        return <Loading/>
    } else {
        return ( 
            <>
                <Dashboard 
                    Component = {
                        (
                            <div>
                                <h1>Welcome {user.fullName}</h1>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} md={6}>
                                        <LastTransactions/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
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