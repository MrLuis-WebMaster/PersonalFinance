import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users/users'
import countries from './slices/countries/countries'
export const store = configureStore({
  reducer: {
      users,
      countries
  },
})