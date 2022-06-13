import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"


export const userSlice = createSlice({
  name: 'users',
  initialState:{
      user:{},
      infoUser:{}
  },
  reducers: {
     postUser: (state,action) => {
        state.user = action.payload
     },
     getInfoUser: (state,action) => {
         state.infoUser = action.payload
     }
  },
})

export const { postUser, getInfoUser } = userSlice.actions

export default userSlice.reducer;

export const sendUser = ({fullName,email}) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:3001/user",{fullName,email});
        dispatch(postUser(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const getUser = ({email}) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/user?email=${email}`);
        dispatch(getInfoUser(response.data))
    } catch (error) {
        console.log(error)
    }
}
