import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Payload } from 'src/pages/details/role'
import { toast } from 'react-hot-toast'
export interface Role {
  id?: number
  roleName?: string | undefined
}

export type getSingleRole = {
  id?: number
  roleName?: string | undefined
}
export interface RoleState {
  roles: Array<Role>
  deleteRole: []
  createSingleRole: []
  getSingleRole: getSingleRole
  isLoading: boolean
  updateRole: getSingleRole
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: RoleState = {
  roles: [],
  deleteRole: [],
  getSingleRole: {},
  createSingleRole: [],
  updateRole: {},
  isLoading: false
}

// All api functions
export const getAllRole = createAsyncThunk('admin/getAllRole', async (payload: Payload, { rejectWithValue }) => {
  // console.log(payload, 'apiiiiiiii')
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/getAllRole?page=${payload?.page}&limit=${payload?.limit}&search=${payload?.search}`
    )
    // console.log('getAllRole', res.data.data)

    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})
export const createRole = createAsyncThunk('admin/createRole', async (payload: Payload, { rejectWithValue }) => {
  // console.log(payload)
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/createMasterRole`, payload, {
      headers: headers
    })
    toast.success('Successfully created!')
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})
export const getRoleById = createAsyncThunk('admin/getSingleRole', async (payload: Payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getRoleById/${payload?.id}`, {
      headers: headers
    })
    // console.log(res.data.data)
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})
export const updateRoleById = createAsyncThunk(
  'admin/updateRoleById',
  async (payload: Payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/roleUpdate/${payload?.id}`, payload, {
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
export const deleteRoleById = createAsyncThunk(
  'admin/deleteRoleById',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/DeleteBYId/${payload?.id}`, {
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
export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllRole.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllRole.fulfilled, (state, action) => {
      state.isLoading = true
      state.roles = action.payload
    })
    builder.addCase(getAllRole.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createRole.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createRole.fulfilled, (state, action) => {
      state.isLoading = false
      state.createSingleRole = action.payload
    })
    builder.addCase(createRole.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getRoleById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getRoleById.fulfilled, (state, action) => {
      state.isLoading = false
      state.getSingleRole = action.payload
    })
    builder.addCase(getRoleById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateRoleById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateRoleById.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateRole = action.payload
    })
    builder.addCase(updateRoleById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteRoleById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteRoleById.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteRole = action.payload
    })
    builder.addCase(deleteRoleById.rejected, state => {
      state.isLoading = false
    })
  }
})

export default roleSlice.reducer
