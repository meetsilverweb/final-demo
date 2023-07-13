// ** Next Import
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
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
import { EmployeeType, getSingleEmployee, updateEmployeeById } from 'src/slice/allEmployeeSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import { useSelector } from 'react-redux'

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
const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
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

const UserView = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  // const [profileData, setProfileData] = useState<any>({})

  const { profileData, updateEmp } = useSelector((state: RootState) => state.employee)
  // console.log(profileData, 'profileData')
  const router = useRouter()
  const UID = router.query
  const dispatch = useDispatch<AppDispatch>()

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  // Validations
  // const FormValidation = Yup.object().shape({
  //   firstName: Yup.string().required('Required'),
  //   lastName: Yup.string().required('Required'),
  //   employeeEmail: Yup.string().email('Invalid email').required('Required'),
  //   employeePhone: Yup.string().required('Required')
  // })

  const updateEmployee = (values: EmployeeType, { resetForm }: any) => {
    const payload: EmployeeType = {
      id: profileData?.id,
      firstName: values?.firstName,
      lastName: values?.lastName,
      employeeEmail: values?.employeeEmail,
      employeePhone: values?.employeePhone
    }
    console.log(payload)
    dispatch(updateEmployeeById(payload))
    resetForm()
    handleEditClose()
  }

  useEffect(() => {
    const payload: EmployeeType = {
      id: UID?.userID
    }
    dispatch(getSingleEmployee(payload))
  }, [UID, updateEmp])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {profileData?.profilePicture ? (
                  <CustomAvatar
                    src={profileData?.profilePicture}
                    skin='light'
                    variant='rounded'
                    color={data.avatarColor as ThemeColor}
                    sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                  >
                    {profileData?.firstName}
                  </CustomAvatar>
                ) : (
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={data.avatarColor as ThemeColor}
                    sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                  >
                    {profileData?.firstName}
                  </CustomAvatar>
                )}
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {profileData?.firstName} {profileData?.lastName}
                </Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='small'
                  label={'Employee'}
                  // color={roleColors[data.role]}
                  sx={{ textTransform: 'capitalize' }}
                />
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
                  Personal Details
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Email:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.employeeEmail || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Employee ID:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.employee_id || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Role:</Typography>
                      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                        {profileData?.role || 'N/A'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}> Gender:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.gender || 'N/A'}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Description:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.roleDescription || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}> Martial Status:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.martialStatus || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}> DOB:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.dateOfBirth || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Contact:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.employeePhone || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Permanent Address:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.permanantAddress || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>PIN Code:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.pinCode || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Employee City:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.employeeCity || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Home Town:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.homeTown || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Country:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.nationality || 'N/A'}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ mt: 4, mb: 4, mx: 6 }} />

                <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Professional Details
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Current Company:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.currentCompany || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Job Type:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.jobType || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Expected Salary:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.expectedSalary || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Preferred Shift:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.preferredShift || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Join Early:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {profileData?.joinEarlyStageStartUps || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Six Days In Week:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.sixDaysInWeek || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Projects:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.projects || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Country:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.nationality || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Function:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.function || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Industry:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{profileData?.industry}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant='contained'
                  sx={{ mr: 2 }}
                  onClick={() => {
                    handleEditClickOpen()
                    const payload: EmployeeType = {
                      id: profileData?.id
                    }
                    dispatch(getSingleEmployee(payload))
                  }}
                >
                  Edit
                </Button>
                <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </CardActions>

              <Dialog
                open={openEdit}
                onClose={handleEditClose}
                aria-labelledby='user-view-edit'
                aria-describedby='user-view-edit-description'
                sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
              >
                <DialogTitle
                  id='user-view-edit'
                  sx={{
                    textAlign: 'center',
                    fontSize: '1.5rem !important',
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                  }}
                >
                  Edit User Information
                </DialogTitle>
                <Formik
                  enableReinitialize
                  // validationSchema={FormValidation}
                  initialValues={{
                    firstName: profileData?.firstName,
                    lastName: profileData?.lastName,
                    employeeEmail: profileData?.employeeEmail,
                    employee_id: profileData?.employee_id,
                    employeePhone: profileData?.employeePhone
                  }}
                  onSubmit={(values: EmployeeType, { resetForm }) => {
                    updateEmployee(values, { resetForm })
                    // console.log(values)
                  }}
                >
                  {(props: FormikProps<EmployeeType>) => {
                    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
                    return (
                      <>
                        <Form onSubmit={handleSubmit}>
                          <DialogContent
                            sx={{
                              pb: theme => `${theme.spacing(8)} !important`,
                              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                            }}
                          >
                            <DialogContentText
                              variant='body2'
                              id='user-view-edit-description'
                              sx={{ textAlign: 'center', mb: 7 }}
                            >
                              Updating user details will receive a privacy audit.
                            </DialogContentText>

                            <Grid container spacing={6}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  fullWidth
                                  label='First Name'
                                  value={values?.firstName}
                                  name='firstName'
                                  helperText={errors?.firstName && touched?.firstName ? errors?.firstName : ''}
                                  error={errors?.firstName && touched?.firstName ? true : false}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  fullWidth
                                  label='Last Name'
                                  value={values?.lastName}
                                  name='lastName'
                                  helperText={errors?.lastName && touched?.lastName ? errors?.lastName : ''}
                                  error={errors?.lastName && touched?.lastName ? true : false}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  onChange={handleChange}
                                  fullWidth
                                  type='email'
                                  label='Billing Email'
                                  value={values?.employeeEmail}
                                  name='employeeEmail'
                                  helperText={
                                    errors?.employeeEmail && touched?.employeeEmail ? errors?.employeeEmail : ''
                                  }
                                  error={errors?.employeeEmail && touched?.employeeEmail ? true : false}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  fullWidth
                                  label='Mobile No:'
                                  value={values?.employeePhone}
                                  name='employeePhone'
                                  helperText={
                                    errors?.employeePhone && touched?.employeePhone ? errors?.employeePhone : ''
                                  }
                                  error={errors?.employeePhone && touched?.employeePhone ? true : false}
                                />
                              </Grid>
                            </Grid>
                          </DialogContent>
                          <DialogActions
                            sx={{
                              justifyContent: 'center',
                              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                            }}
                          >
                            <Button type='submit' variant='contained' sx={{ mr: 2 }}>
                              Submit
                            </Button>
                            <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                              Cancel
                            </Button>
                          </DialogActions>
                        </Form>
                      </>
                    )
                  }}
                </Formik>
              </Dialog>

              <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
              <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

// export const getStaticPaths: any = async () => {
//   const router = useRouter()
//   console.log(router)
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getAllJobEmployee`)
//   const data = await res?.data?.data
//   const profileDataID = data?.map((item: any) => ({
//     params: { userID: `${item.id}` }
//   }))
//   console.log(profileDataID, 'profileDataID')

//   return {
//     profileDataID,
//     fallback: false
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
//   // console.log(params?.id, 'params')
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/Employee/getEmployeeById/${params?.userID}`)
//   const profileData = res?.data
//   console.log(profileData, 'profileData')
//   return {
//     props: {
//       profileData
//       // tab: params?.tab`
//     }
//   }
// }

export default UserView
