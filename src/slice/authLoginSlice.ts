import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export interface LoginType {
  Email?: string
  name?: string
  password?: string
  status?: string
}

export interface AuthStateType {
  authState: Array<LoginType>
  isLoading: boolean
}

const initialState: AuthStateType = {
  authState: [],
  isLoading: false
}

// All api functions
export const authLogin = createAsyncThunk('admin/authLogin', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/adminLogin`)
    console.log('authhhhhh', res.data.data)
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

// Auth slice
export const authLoginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authLogin.pending, state => {
      state.isLoading = true
    })
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = true
      state.authState = action.payload
    })
    builder.addCase(authLogin.rejected, state => {
      state.isLoading = false
    })
  }
})

export default authLoginSlice.reducer
