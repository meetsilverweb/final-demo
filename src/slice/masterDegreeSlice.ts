import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Payload } from 'src/pages/details/education/index'
import { toast } from 'react-hot-toast'
export interface Degree {
  id?: number
  degree?: string
}

type SingleDegree = {
  degree?: string
  id?: number
}
export interface RoleState {
  degrees: Array<Degree>
  deleteDegree: []
  createSingleDegree: []
  getSingleDegree: SingleDegree
  updateDegree: SingleDegree
  isLoading: boolean
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: RoleState = {
  degrees: [],
  deleteDegree: [],
  createSingleDegree: [],
  getSingleDegree: {},
  updateDegree: {},
  isLoading: false
}

// All api functions
export const getAllMasterDegree = createAsyncThunk(
  'admin/getAllMasterDegree',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/getAllDegree?page=${payload?.page}&limit=${payload?.limit}&search=${payload?.search}`
      )
      // console.log('getAllRole', res.data.data)
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const createMasterDegree = createAsyncThunk(
  'admin/createMasterDegree',
  async (payload: Payload, { rejectWithValue }) => {
    // console.log(payload)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/createMasterDegree`, payload, {
        headers: headers
      })
      toast.success('Successfully created!')
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const getMasterDegreeById = createAsyncThunk(
  'admin/getMasterDegreeById',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getDegreeById/${payload?.id}`, {
        headers: headers
      })
      // console.log(res.data.data)
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const updateMasterDegreeById = createAsyncThunk(
  'admin/updateMasterDegreeById',
  async (payload: Payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/degreeUpdate/${payload?.id}`, payload, {
        headers: headers
      })
      toast.success('Successfully updated!')
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const deleteMasterDegreeById = createAsyncThunk(
  'admin/deleteMasterDegreeById',
  async (payload: Payload, { rejectWithValue }) => {
    console.log(payload, 'delete api')
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/degreeDeleteById/${payload?.id}`, {
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

// Role slice
export const masterDegreeSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllMasterDegree.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllMasterDegree.fulfilled, (state, action) => {
      state.isLoading = true
      state.degrees = action.payload
    })
    builder.addCase(getAllMasterDegree.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createMasterDegree.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createMasterDegree.fulfilled, (state, action) => {
      state.isLoading = false
      state.createSingleDegree = action.payload
    })
    builder.addCase(createMasterDegree.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getMasterDegreeById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMasterDegreeById.fulfilled, (state, action) => {
      state.isLoading = false
      state.getSingleDegree = action.payload
    })
    builder.addCase(getMasterDegreeById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateMasterDegreeById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateMasterDegreeById.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateDegree = action.payload
    })
    builder.addCase(updateMasterDegreeById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteMasterDegreeById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteMasterDegreeById.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteDegree = action.payload
    })
    builder.addCase(deleteMasterDegreeById.rejected, state => {
      state.isLoading = false
    })
  }
})

export default masterDegreeSlice.reducer
