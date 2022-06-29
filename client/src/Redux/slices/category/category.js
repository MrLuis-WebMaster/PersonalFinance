import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { config } from '../../../config/config'

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState:{
    categories: []
  },
  reducers: {
    getCategoriesInfo: (state, action) => {
        state.categories = action.payload
    }
  },
})

export const { getCategoriesInfo } = categoriesSlice.actions

export default categoriesSlice.reducer;

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get(`${config.ENDPOINT}/category`);
        dispatch(getCategoriesInfo(response.data))
    } catch (error) {
        console.log(error)
    }
}
