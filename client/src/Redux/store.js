import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users/users'
import countries from './slices/countries/countries'
import categories from './slices/category/category'
import transactions from './slices/transactions/transactions'
export const store = configureStore({
  reducer: {
      users,
      countries,
      categories,
      transactions,
  },
})