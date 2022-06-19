import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const transactionsSlice = createSlice({
    name:"transactions",
    initialState: {
        earning:{},
        expense:{}
    },
    reducers: {
        postAddEarning: (state,action) => {state.earning = action.payload},
        postAddExpense: (state,action) => {state.earning = action.payload}
    }
})

export const {  postAddEarning, postAddExpense  } = transactionsSlice.actions;


export const sendEarning = ( transaction,id ) =>  async dispatch => {
    if (transaction) {
        try {
            const response = await axios.post("http://localhost:3001/addIncome",{transaction,id})
            
            console.log(response.data)

            dispatch(postAddEarning(response.data))

        } catch (error) {
            console.log(error)
        }
    }
}

export const sendExpense = ( transaction,id ) =>  async dispatch => {
    if ( transaction ) {
        try {
            const response = await axios.post("http://localhost:3001/addExpense",{transaction,id})
            dispatch(postAddExpense(response.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export default transactionsSlice.reducer;