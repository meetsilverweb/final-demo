import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export interface RoleState {
  createFaq: []
  getFaq: []
  isLoading: boolean
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: RoleState = {
  createFaq: [],
  getFaq: [],
  isLoading: false
}

// All api functions
export const createFaqAPI = createAsyncThunk('admin/createFaq', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/createFaq`, payload, {
      headers: headers
    })
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const getFaqByID = createAsyncThunk('admin/getFaqById', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getFaqById/${payload?.id}`, {
      headers: headers
    })
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})
// FAQ Slice
export const faqSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createFaqAPI.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createFaqAPI.fulfilled, (state, action) => {
      state.isLoading = true
      state.createFaq = action.payload
    })
    builder.addCase(createFaqAPI.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getFaqByID.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getFaqByID.fulfilled, (state, action) => {
      state.isLoading = true
      state.getFaq = action.payload
    })
    builder.addCase(getFaqByID.rejected, state => {
      state.isLoading = false
    })
  }
})

export default faqSlice.reducer
