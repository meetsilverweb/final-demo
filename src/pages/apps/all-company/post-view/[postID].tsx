// ** Next Import
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Icon from 'src/@core/components/icon'
// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import { Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import { useSelector } from 'react-redux'
import { CompanyPostType, getSingleCompanyPost, updateSingleCompanyPost } from 'src/slice/allComopanySlice'

interface ColorsType {
  [key: string]: ThemeColor
}

export interface ProfileData {
  id?: number
  firstName?: string
  lastName?: string
  employeeEmail?: number
  employee_id?: string
  employeePhone?: number
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  fontSize: '1rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  fontSize: '1rem',
  alignSelf: 'flex-end',
  color: theme.palette.text.secondary
}))

const PostView = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const { singlePost } = useSelector((state: RootState) => state?.company)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const PID = router.query

  useEffect(() => {
    const payload: CompanyPostType = {
      id: PID?.postID
    }
    dispatch(getSingleCompanyPost(payload))
  }, [PID])

  const handleApprovalPost = () => {
    const payload: CompanyPostType = {
      id: PID?.postID,
      flag: true
    }
    dispatch(updateSingleCompanyPost(payload))
  }

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  Company Post
                </Typography>
              </CardContent>

              <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                      <Icon fontSize='1.75rem' icon='tabler:checkbox' />
                    </CustomAvatar>
                    <div>
                      <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>1.23k</Typography>
                      <Typography variant='body2'>Task Done</Typography>
                    </div>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                      <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                    </CustomAvatar>
                    <div>
                      <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>568</Typography>
                      <Typography variant='body2'>Project Done</Typography>
                    </div>
                  </Box>
                </Box>
              </CardContent>

              <Divider sx={{ my: '0 !important', mx: 6 }} />

              <CardContent sx={{ pb: 4 }}>
                <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Details
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Company Name:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.companyName || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Job Role:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.jobRole || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Department:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.department || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Categories:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.categories || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Type Of Job:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.typeOfJob || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Location:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.location || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Minimum Salary:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.minSalary || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Maximum Salary:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.maxSalary || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Job Location City:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.jobLocationCity || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Job Location State:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.jobLocationState || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Recieve Application From:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.recieveApplicationFrom || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Company Address Same Asinterview Address:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.companyAddressSameAsinterviewAddress || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Company City:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.companyCity || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Bond:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.bond || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Bond Type:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.bondType || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Periods Of Bond:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.periodsOfBond || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>minEducation:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.minEducation || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Gender:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.gender || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Age Criteria:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.ageCriteria || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Age Range</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.minAge || 'N/A'} Years to {singlePost?.maxAge || 'N/A'} Years
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Experiance Required:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.experianceRequired || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Connecting with Candidates:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.connectingWithCandidates || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Type of Interview:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.typeOfInterview || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>interview City:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.interviewCity || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Interview Complete Address</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.interviewCompleteAddress || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Interview City:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.interviewCity || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Candidate FromDept:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.candidateFromDept || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Experienced:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.experienced || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Only Department For Apply:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.onlyDepartmentForApply || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Role:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.multipleDepartmentForApply || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Candidates Industry Experianced:</Typography>
                      {/* <Typography sx={{ color: 'text.secondary' }}>{candidatesIndustryExperianced.map(item)=>{

                      }} </Typography> */}
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Multiple Department For Apply:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.multipleDepartmentForApply || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Candidates Industry Experianced:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {singlePost?.candidatesIndustryExperianced || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>English Level:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singlePost?.englishLevel || 'N/A'}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500 }}>Job Description:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{singlePost?.jobDescription || 'N/A'}</Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  color={singlePost?.flag === false ? 'warning' : 'success'}
                  onClick={handleApprovalPost}
                  variant='contained'
                  sx={{ mr: 2 }}
                >
                  {singlePost?.flag === false ? 'Approve' : 'Approved'}
                </Button>
                <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </CardActions>
              <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12} md={7} lg={8}>
        <UserViewRight profileData={profileData} />
      </Grid> */}
    </Grid>
  )
}

export default PostView
