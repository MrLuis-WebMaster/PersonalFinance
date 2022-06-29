import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { config } from '../../../config/config'


export const transactionsSlice = createSlice({
    name:"transactions",
    initialState: {
        earning:{},
        expense:{},
        lastTransactions:[],
        allTransactions:[],
        deleteTransactions:{},
        updateEarning:{},
        updateExpense:{}
    },
    reducers: {
        postAddEarning: (state,action) => {state.earning = action.payload},
        postAddExpense: (state,action) => {state.earning = action.payload},
        getLastTransactions: (state,action) => {state.lastTransactions = action.payload},
        getAllTransactions: (state,action) => {state.allTransactions = action.payload},
        sendDeleteTransaction: (state,action) => {state.deleteTransactions = action.payload},
        updateAddEarning: (state,action) => {state.updateEarning = action.payload},
        updateAddExpense: (state,action) => {state.updateExpense = action.payload},
    }
})

export const {  postAddEarning, postAddExpense, getLastTransactions, getAllTransactions,sendDeleteTransaction, updateAddEarning, updateAddExpense  } = transactionsSlice.actions;


export const sendEarning = ( transaction,id ) =>  async dispatch => {
    if (transaction) {
        try {
            const response = await axios.post(`${config.ENDPOINT}/addIncome`,{transaction,id})
            dispatch(postAddEarning(response.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const sendExpense = ( transaction,id ) =>  async dispatch => {
    if ( transaction ) {
        try {
            const response = await axios.post(`${config.ENDPOINT}/addExpense`,{transaction,id})
            dispatch(postAddExpense(response.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const lastTransactions = ( id ) =>  async dispatch => {
    if ( id ) {
        try {
            const response = await axios.post(`${config.ENDPOINT}/lastTransactions`,{id})
            dispatch(getLastTransactions(response.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const allTransactions = ( id ) =>  async dispatch => {
    if ( id ) {
        try {
            const response = await axios.post(`${config.ENDPOINT}/allTransactions`,{id})
            dispatch(getAllTransactions(response.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteTransactions = ( transaction ) =>  async dispatch => {
    if ( transaction ) {
        try {
            const response = await axios.delete(`${config.ENDPOINT}/deleteTransactions`,{data:transaction})
            dispatch(sendDeleteTransaction(response.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const sendUpdateEarning = ( transaction ) =>  async dispatch => {
    if (transaction) {
        try {
            const response = await axios.put(`${config.ENDPOINT}/updateTransaction`,transaction)
            
            console.log(response.data)

            dispatch(updateAddEarning(response.data))

        } catch (error) {
            console.log(error)
        }
    }
}

export const sendUpdateExpense = ( transaction ) =>  async dispatch => {
    if ( transaction ) {
        try {
            const response = await axios.put(`${config.ENDPOINT}/updateTransaction`,transaction)
            dispatch(updateAddExpense(response.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export default transactionsSlice.reducer;