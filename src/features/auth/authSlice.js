import { customFetch } from 'src/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from 'src/utils/localStorage'
import { toast } from 'react-toastify'
const role = getUserFromLocalStorage()?.user?.roles[0].code
const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
}
export const loginUser = createAsyncThunk('auth/loginUser', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/admin/sign-in', user)
    console.log(resp.data.errorCode === -1)
    if (resp.data.errorCode === -1) {
      console.log(resp.data)
      toast.error(resp.data.message)
      throw new Error(resp.data.errorMessage)
    }
    return resp.data
  } catch (error) {
    const wrongPass = error.response.status === 400 ? true : false
    const message = wrongPass ? 'Please check your email and password' : error.message
    console.log(message)
    toast.error(message)
    return thunkAPI.rejectWithValue()
  }
})

// export const profileUser = createAsyncThunk('auth/profileUser', async (_, thunkAPI) => {
//   try {
//     const resp = await customFetch.get('/profile/my')
//     return resp.data
//   } catch (error) {}
// })

// export const updateProfile = createAsyncThunk('auth/updateProfile', async (user, thunkAPI) => {
//   try {
//     const resp = await customFetch.put('/profile', user)
//     return resp.data
//   } catch (error) {}
// })

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null
      removeUserFromLocalStorage()
    },
    refreshToken: (state, { payload }) => {
      state.user.tokens.accessToken = payload
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      const { data } = action.payload
      state.user = data
      addUserToLocalStorage(data)
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
  },
})
export const { logoutUser, refreshToken } = authSlice.actions
export default authSlice.reducer
