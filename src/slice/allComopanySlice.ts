import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Payload } from 'src/pages/apps/all-company/list'
export interface AllCompany {
  id?: number
  company_id?: string
  companyName?: string
  companyEmail?: string
  companyPhone?: string
  password?: string
  otp?: number
  emailVerify?: number
  gstNo?: number
  website?: string
  pan?: string
  caffilateCode?: string
  fromCaff?: string
  fromEaff?: string
  linkedin?: string
  twitter?: string
  facebook?: string
  isApproval?: boolean
}

export type DeleteCmp = [
  {
    id: number
  }
]
export type getCompanyType = {
  id?: any
  company_id?: string
  companyName?: string
  companyEmail?: string
  companyPhone?: string
  password?: string
  address?: string
  description?: string
  zipCode?: number
  state?: string
  otp?: number
  emailVerify?: number
  gstNo?: number
  website?: string
  pan?: string
  caffilateCode?: string
  fromCaff?: string
  fromEaff?: string
  linkedin?: string
  twitter?: string
  facebook?: string
  isApproval?: boolean
}
export interface CompanyPostType {
  id?: any
  company_id?: string
  companyName?: string
  jobRole?: string
  department?: string
  categories?: string
  typeOfJob?: string
  location?: string
  minSalary?: string
  maxSalary?: string
  additionalperks?: any[]
  bond?: string
  bondType?: string
  periodsOfBond?: string
  minEducation?: string
  gender?: string
  ageCriteria?: string
  minAge?: string
  maxAge?: string
  experianceRequired?: string
  experienced?: string
  onlyDepartmentForApply?: string
  multipleDepartmentForApply?: string
  candidatesIndustryExperianced?: any[]
  englishLevel?: string
  skillPreferance?: any[]
  jobDescription?: string
  connectingWithCandidates?: string
  typeOfInterview?: string
  interviewCity?: string
  interviewArea?: string
  interviewCompleteAddress?: string
  companyAddressSameAsinterviewAddress?: string
  companyCity?: string
  companyArea?: string
  companyCompleteAddress?: string
  plan?: string
  candidateFromDept?: string
  recieveApplicationFrom?: string
  jobLocationCity?: string
  jobLocationState?: string
  stateCompany?: string
  isActive?: boolean
  flag?: boolean
  postStatus?: boolean
}
export interface AllCompanyState {
  allCompany: Array<AllCompany>
  companyProfile: getCompanyType
  allCompanyPost: Array<CompanyPostType>
  singlePost: CompanyPostType
  updateCom: getCompanyType
  deleteCmp: Array<DeleteCmp>
  deletePost: {}
  isLoading: boolean
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}

const initialState: AllCompanyState = {
  allCompany: [],
  companyProfile: {},
  deleteCmp: [],
  singlePost: {},
  allCompanyPost: [],
  updateCom: {},
  deletePost: {},
  isLoading: false
}

// All api functions
export const getAllJobCompany = createAsyncThunk(
  'admin/getAllJobCompany',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/getAllJobCompany?page=${payload?.page}&limit=${payload?.limit}&search=${payload?.search}`
      )
      // console.log('getAllRole', res.data.data)
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const getCompanyById = createAsyncThunk(
  'admin/getCompanyById',
  async (payload: getCompanyType, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getCompanyById/${payload?.id}`, {
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

export const getSingleCompanyPost = createAsyncThunk(
  'admin/getSingleCompanyPost',
  async (payload: CompanyPostType, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getJobPreferenceById/${payload?.id}`, {
        headers: headers
      })
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const updateSingleCompanyPost = createAsyncThunk(
  'admin/getSingleCompanyPost',
  async (payload: CompanyPostType, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/jobPreferenceUpdate/${payload?.id}`, payload, {
        headers: headers
      })
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something went wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const getAllCompanyPost = createAsyncThunk('admin/getAllCompanyPost', async (_, { rejectWithValue }) => {
  // console.log(payload)
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getAllJobPreference`, {
      headers: headers
    })
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const updateCompanyById = createAsyncThunk(
  'admin/updateJobCategoryById',
  async (payload: getCompanyType, { rejectWithValue }) => {
    console.log(payload)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/companyUpdate/${payload?.id}`, payload, {
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

export const deleteJobPost = createAsyncThunk('admin/deleteJobPost', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/jobPreferenceDelete/${payload?.id}`, {
      headers: headers
    })
    toast.success('Successfully deleted!')
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const deleteJobCompany = createAsyncThunk(
  'admin/deleteJobCompany',
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/companyDelete/${payload?.id}`, {
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

// Company slice
export const allCompanySlice = createSlice({
  name: 'allCompanySlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllJobCompany.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllJobCompany.fulfilled, (state, action) => {
      state.isLoading = true
      state.allCompany = action.payload
    })
    builder.addCase(getAllJobCompany.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getCompanyById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.isLoading = false
      state.companyProfile = action.payload
    })
    builder.addCase(getCompanyById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getSingleCompanyPost.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getSingleCompanyPost.fulfilled, (state, action) => {
      state.isLoading = false
      state.singlePost = action.payload
    })
    builder.addCase(getSingleCompanyPost.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getAllCompanyPost.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllCompanyPost.fulfilled, (state, action) => {
      state.isLoading = false
      state.allCompanyPost = action.payload
    })
    builder.addCase(getAllCompanyPost.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateCompanyById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateCompanyById.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateCom = action.payload
    })
    builder.addCase(updateCompanyById.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteJobCompany.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteJobCompany.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteCmp = action.payload
    })
    builder.addCase(deleteJobCompany.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteJobPost.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteJobPost.fulfilled, (state, action) => {
      state.isLoading = false
      state.deletePost = action.payload
    })
    builder.addCase(deleteJobPost.rejected, state => {
      state.isLoading = false
    })
  }
})

export default allCompanySlice.reducer
