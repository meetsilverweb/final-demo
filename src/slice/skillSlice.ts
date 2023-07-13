import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Payload } from 'src/pages/details/skills/index'
import { toast } from 'react-hot-toast'
export interface Skill {
  id?: number
  skillName?: string
}

export type SingleSkill = {
  skillName?: string
  id?: number
}
export interface SkillState {
  skills: Array<Skill>
  deleteSkill: []
  createSingleSkill: []
  getSingleSkill: SingleSkill
  updateSkill: SingleSkill
  isLoading: boolean
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: SkillState = {
  skills: [],
  deleteSkill: [],
  createSingleSkill: [],
  getSingleSkill: {},
  updateSkill: {},
  isLoading: false
}

// All api functions
export const getAllSkill = createAsyncThunk('admin/getAllSkill', async (payload: Payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/getAllSkill?page=${payload?.page}&limit=${payload?.limit}&search=${payload?.search}`
    )
    // console.log('getAllRole', res.data.data)
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const createSkill = createAsyncThunk('admin/createSkill', async (payload: Payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/createMasterSkill`, payload, {
      headers: headers
    })
    toast.success('Successfully created!')
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})
export const getSkillById = createAsyncThunk('admin/getSingleRole', async (payload: Payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getSkillById/${payload?.id}`, {
      headers: headers
    })
    // console.log(res.data.data)
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})
export const updateSkillById = createAsyncThunk(
  'admin/updateSkillById',
  async (payload: Payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/skillUpdate/${payload?.id}`, payload, {
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
export const deleteSkillById = createAsyncThunk(
  'admin/deleteSkillById',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/skillDeleteById/${payload?.id}`, {
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
export const skillSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllSkill.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllSkill.fulfilled, (state, action) => {
      state.isLoading = true
      state.skills = action.payload
    })
    builder.addCase(getAllSkill.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createSkill.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createSkill.fulfilled, (state, action) => {
      state.isLoading = false
      state.createSingleSkill = action.payload
    })
    builder.addCase(createSkill.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getSkillById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getSkillById.fulfilled, (state, action) => {
      state.isLoading = false
      state.getSingleSkill = action.payload
    })
    builder.addCase(getSkillById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateSkillById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateSkillById.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateSkill = action.payload
    })
    builder.addCase(updateSkillById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteSkillById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteSkillById.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteSkill = action.payload
    })
    builder.addCase(deleteSkillById.rejected, state => {
      state.isLoading = false
    })
  }
})

export default skillSlice.reducer
