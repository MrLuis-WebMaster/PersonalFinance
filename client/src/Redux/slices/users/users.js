import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { config } from '../../../config/config'

export const userSlice = createSlice({
  name: 'users',
  initialState:{
      user:{},
      infoUser:{},

  },
  reducers: {
     postUser: (state,action) => {
        state.user = action.payload
     },
     getInfoUser: (state,action) => {
         state.infoUser = action.payload
     },
     resetUser: (state,action) => {
         state.infoUser = {}   
     }
  },
})

export const { postUser, getInfoUser, resetUser } = userSlice.actions

export default userSlice.reducer;

export const sendUser = ({fullName,email,country}) => async (dispatch) => {
    try {
        const response = await axios.post(`${config.ENDPOINT}/user`,{fullName,email,country});
        dispatch(postUser(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const getUser = (user) => async (dispatch) => {
    try {
        const response = await axios.get(`${config.ENDPOINT}/user?email=${user.email}`);
        dispatch(getInfoUser(response.data))
    } catch (error) {
        console.log(error)
    }
}
