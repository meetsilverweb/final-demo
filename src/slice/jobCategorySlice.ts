import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Payload } from 'src/pages/details/job-category/index'
import { toast } from 'react-hot-toast'
export type JobCategory = [
  {
    id?: number
    categoryName?: string | undefined
  }
]
export type getJobCategory = {
  id?: number
  categoryName?: string | undefined
}
export interface JobCategoryState {
  JobCategories: Array<JobCategory>
  deleteJobCategory: []
  createSingleJobCategory: getJobCategory
  getSingleJobCategory: getJobCategory
  updateJobCategory: []
  isLoading: boolean
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: JobCategoryState = {
  JobCategories: [],
  deleteJobCategory: [],
  getSingleJobCategory: {},
  createSingleJobCategory: {},
  updateJobCategory: [],
  isLoading: false
}

// All api functions
export const getAllJobCategory = createAsyncThunk(
  'admin/getAllJobCategory',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/JobCategory/getAllCategory?page=${payload?.page}&limit=${payload?.limit}&search=${payload?.search}`
      )
      // console.log('getAllRole', res.data.data)
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const createJobCategory = createAsyncThunk(
  'admin/createJobCategory',
  async (payload: Payload, { rejectWithValue }) => {
    // console.log(payload)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/JobCategory/createCategory`, payload, {
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
export const getJobCategoryById = createAsyncThunk(
  'admin/getJobCategoryById',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/JobCategory/getCategoryById/${payload?.id}`, {
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
export const updateJobCategoryById = createAsyncThunk(
  'admin/updateJobCategoryById',
  async (payload: Payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/JobCategory/categoryUpdate/${payload?.id}`,
        payload,
        {
          headers: headers
        }
      )
      toast.success('Successfully updated!')
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const deleteJobCategoryById = createAsyncThunk(
  'admin/deleteJobCategoryById',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/JobCategory/categoryDeleteById/${payload?.id}`,
        {
          headers: headers
        }
      )
      toast.success('Successfully deleted!')
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)

// Role slice
export const jobCategorySlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllJobCategory.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllJobCategory.fulfilled, (state, action) => {
      state.isLoading = true
      state.JobCategories = action.payload
    })
    builder.addCase(getAllJobCategory.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createJobCategory.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createJobCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.createSingleJobCategory = action.payload
    })
    builder.addCase(createJobCategory.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getJobCategoryById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getJobCategoryById.fulfilled, (state, action) => {
      state.isLoading = false
      state.getSingleJobCategory = action.payload
    })
    builder.addCase(getJobCategoryById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateJobCategoryById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateJobCategoryById.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateJobCategory = action.payload
    })
    builder.addCase(updateJobCategoryById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteJobCategoryById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteJobCategoryById.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteJobCategory = action.payload
    })
    builder.addCase(deleteJobCategoryById.rejected, state => {
      state.isLoading = false
    })
  }
})

export default jobCategorySlice.reducer
