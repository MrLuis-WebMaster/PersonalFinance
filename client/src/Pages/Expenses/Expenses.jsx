import React from 'react'
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { 
    getAuth,
    onAuthStateChanged 
  } from "firebase/auth";
import Dashboard from '../../Components/Dashboard/Dashboard'
import Loading from '../../Components/Loading/Loading';
import { getUser,resetUser } from '../../Redux/slices/users/users'
import ListOperations from '../../Components/ListOperations/ListOperations';

const Operations = () => {
    const Dispatch = useDispatch();
    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, currentUser => {
            if(currentUser) {
                Dispatch(getUser(currentUser))
            } else {
                Dispatch(resetUser())
            }
        })
    },[Dispatch])  

    const user = useSelector(state => state.users.infoUser.userInfo)

    if (!user) {
        return <Loading/>
    } else {
        return ( 
            <>
                <Dashboard 
                    Component = {
                        (
                            <ListOperations user={user} title="Expenses"/>
                        )
                    }
                />

                
            </>       
        )
    }
}

export default Operations