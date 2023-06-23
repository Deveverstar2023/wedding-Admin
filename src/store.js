import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
