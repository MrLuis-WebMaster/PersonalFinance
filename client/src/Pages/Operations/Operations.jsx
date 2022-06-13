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
import ListOperations from '../../Components/ListOperations/ListOperations';

const Operations = () => {
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
                    <title> Operations | { user ? user.fullName : "user"} </title>
                </Helmet>
                <Dashboard 
                    Component = {
                        (
                            <ListOperations/>
                        )
                    }
                />

                
            </>       
        )
    }
}

export default Operations