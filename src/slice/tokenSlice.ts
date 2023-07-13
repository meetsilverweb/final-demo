import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { TokenType } from 'src/pages/token'
export interface Token {
  id?: number | undefined
  tokenName?: string | undefined
  tokens?: string | undefined
}
export interface TokenState {
  allToken: Array<Token>
  deleteToken: []
  createSingleToken: []
  getToken: TokenType
  updateToken: TokenType
  isLoading: boolean
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: TokenState = {
  allToken: [],
  deleteToken: [],
  createSingleToken: [],
  getToken: {},
  updateToken: {},
  isLoading: false
}

export const getAllToken = createAsyncThunk('admin/getAllToken', async (payload: TokenType, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/token/getAllToken?page=${payload?.page}&limit=${payload?.limit}&search=${payload?.search}`
    )
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const createToken = createAsyncThunk('admin/createToken', async (payload: TokenType, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/token/createToken`, payload, {
      headers: headers
    })
    toast.success('Successfully created!')
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const getTokenById = createAsyncThunk('admin/getTokenById', async (payload: TokenType, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/token/getTokenById/${payload?.id}`, {
      headers: headers
    })
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const updateTokenById = createAsyncThunk(
  'admin/updateTokenById',
  async (payload: TokenType, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/token/tokenUpdate/${payload?.id}`, payload, {
        headers: headers
      })
      toast.success('Successfully updated !')
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const deleteTokenById = createAsyncThunk(
  'admin/deleteTokenById',
  async (payload: TokenType, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/token/tokenDeleteById/${payload?.id}`, {
        headers: headers
      })
      toast.success('Successfully deleted!')
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllToken.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllToken.fulfilled, (state, action) => {
      state.isLoading = true
      state.allToken = action.payload
    })
    builder.addCase(getAllToken.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createToken.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createToken.fulfilled, (state, action) => {
      state.isLoading = false
      state.createSingleToken = action.payload
    })
    builder.addCase(createToken.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getTokenById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getTokenById.fulfilled, (state, action) => {
      state.isLoading = false
      state.getToken = action.payload
    })
    builder.addCase(getTokenById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateTokenById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateTokenById.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateToken = action.payload
    })
    builder.addCase(updateTokenById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteTokenById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteTokenById.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteToken = action.payload
    })
    builder.addCase(deleteTokenById.rejected, state => {
      state.isLoading = false
    })
  }
})

export default tokenSlice.reducer
