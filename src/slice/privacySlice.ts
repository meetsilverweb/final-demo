import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export interface RoleState {
  privacyData: {}
  getPage: {}
  updatePage: {}
  isLoading: boolean
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: RoleState = {
  privacyData: {},
  getPage: {},
  updatePage: {},
  isLoading: false
}

// All api functions
export const getPageById = createAsyncThunk('admin/getPageById', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getPagesById/${payload?.id}`, {
      headers: headers
    })
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const updatePageById = createAsyncThunk('admin/updatePageById', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/pagesUpdate/${payload?.id}`, payload, {
      headers: headers
    })
    toast.success('Update successfully!')
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const PrivacyAndPolicyAPI = createAsyncThunk(
  'admin/PrivacyAndPolicyAPI',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/createPages/${payload}`, payload, {
        headers: headers
      })
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)

// privacy Slice
export const privacySlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPageById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getPageById.fulfilled, (state, action) => {
      state.isLoading = true
      state.getPage = action.payload
    })
    builder.addCase(getPageById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(PrivacyAndPolicyAPI.pending, state => {
      state.isLoading = true
    })
    builder.addCase(PrivacyAndPolicyAPI.fulfilled, (state, action) => {
      state.isLoading = false
      state.privacyData = action.payload
    })
    builder.addCase(PrivacyAndPolicyAPI.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updatePageById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updatePageById.fulfilled, (state, action) => {
      state.isLoading = false
      state.updatePage = action.payload
    })
    builder.addCase(updatePageById.rejected, state => {
      state.isLoading = false
    })
  }
})

export default privacySlice.reducer
