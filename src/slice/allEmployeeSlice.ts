import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
export interface AllEmployee {
  id?: number
  firstName?: string
  lastName?: string
  employeeEmail?: string
  employee_id?: string
  employeePhone?: number
}

export type DeleteEmp = [
  {
    id: number
  }
]
export type EmployeeType = {
  id?: any
  firstName?: string
  lastName?: string
  employeeEmail?: string
  employee_id?: string
  employeePhone?: number | string
  page?: number
  limit?: number
  search?: string
  gender?: string
  role?: string
  profilePicture?: any
  roleDescription?: string
  martialStatus?: string
  dateOfBirth?: string
  permanantAddress?: string
  pinCode?: number
  employeeCity?: string
  homeTown?: string
  nationality?: string
  currentCompany?: string
  joinEarlyStageStartUps?: string
  sixDaysInWeek?: string
  projects?: string
  function?: string
  industry?: string
  jobType?: string
  expectedSalary?: string
  preferredShift?: string
}
export interface AllEmployeeState {
  allEmployee: Array<AllEmployee>
  profileData: EmployeeType
  deleteEmp: Array<DeleteEmp>
  updateEmp: EmployeeType
  isLoading: boolean
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: AllEmployeeState = {
  allEmployee: [],
  profileData: {},
  deleteEmp: [],
  //   createSingleJobCategory: {},
  updateEmp: {},
  isLoading: false
}

// All api functions
export const getAllEmployee = createAsyncThunk(
  'admin/getAllEmployee',
  async (payload: EmployeeType, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/Employee/getAllJobEmployee?page=${payload?.page}&limit=${payload?.limit}&search=${payload?.search}`
      )
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
// export const createJobCategory = createAsyncThunk(
//   'admin/createJobCategory',
//   async (payload: Payload, { rejectWithValue }) => {
//     // console.log(payload)
//     try {
//       const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/JobCategory/createCategory`, payload, {
//         headers: headers
//       })
//       toast.success('Successfully created!')
//       return res?.data?.data
//     } catch (err: any) {
//       toast.error('Something went wrong!')
//       return rejectWithValue(err?.response?.data)
//     }
//   }
// )
export const getSingleEmployee = createAsyncThunk(
  'admin/getSingleEmployee',
  async (payload: EmployeeType, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/Employee/getEmployeeById/${payload?.id}`, {
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

export const updateEmployeeById = createAsyncThunk(
  'admin/updateJobCategoryById',
  async (payload: EmployeeType, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/Employee/employeeUpdate/${payload?.id}`,
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

export const deleteEmployee = createAsyncThunk('admin/deleteEmployee', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/Employee/employeeDelete/${payload?.id}`, {
      headers: headers
    })
    toast.success('Successfully deleted!')
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

// Role slice
export const allEmployeeSlice = createSlice({
  name: 'allEmpoyeeSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllEmployee.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllEmployee.fulfilled, (state, action) => {
      state.isLoading = true
      state.allEmployee = action.payload
    })
    builder.addCase(getAllEmployee.rejected, state => {
      state.isLoading = false
    })
    // builder.addCase(createJobCategory.pending, state => {
    //   state.isLoading = true
    // })
    // builder.addCase(createJobCategory.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.createSingleJobCategory = action.payload
    // })
    // builder.addCase(createJobCategory.rejected, state => {
    //   state.isLoading = false
    // })
    builder.addCase(getSingleEmployee.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getSingleEmployee.fulfilled, (state, action) => {
      state.isLoading = false
      state.profileData = action.payload
    })
    builder.addCase(getSingleEmployee.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateEmployeeById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateEmployeeById.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateEmp = action.payload
    })
    builder.addCase(updateEmployeeById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteEmployee.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteEmp = action.payload
    })
    builder.addCase(deleteEmployee.rejected, state => {
      state.isLoading = false
    })
  }
})

export default allEmployeeSlice.reducer
