import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { config } from '../../../config/config'


export const countriesSlice = createSlice({
  name: 'users',
  initialState:{
    countries: []
  },
  reducers: {
    getcountriesInfo: (state, action) => {
        state.countries = action.payload
    }
  },
})

export const { getcountriesInfo } = countriesSlice.actions

export default countriesSlice.reducer;

export const getCountries = () => async (dispatch) => {
    try {
        const response = await axios.get(`${config.ENDPOINT}/countries`);
        dispatch(getcountriesInfo(response.data))
    } catch (error) {
        console.log(error)
    }
}


