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
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
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
import { CompanyPostType, getCompanyById, getCompanyType, updateCompanyById } from 'src/slice/allComopanySlice'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { CardHeader, Fab, IconButton, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'

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

const CompanyDetail = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 10 })
  const [CompanyPost, setCompanyPost] = useState<Array<CompanyPostType>>([])
  const { companyProfile, updateCom } = useSelector((state: RootState) => state?.company)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const CID = router.query

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  // Validations
  // const FormValidation = Yup.object().shape({
  //   companyName: Yup.string().required('Required'),
  //   companyEmail: Yup.string().email('Invalid email').required('Required'),
  //   companyPhone: Yup.string().required('Required'),
  //   website: Yup.string().required('Required')
  // })

  const getAllCompanyPost = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getJobPreferenceByCompanyId/${CID?.companyID}`)
      const cmpPost = res?.data?.data
      setCompanyPost(cmpPost)
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }
  const updateCompany = (values: getCompanyType, { resetForm }: any) => {
    const payload: getCompanyType = {
      id: companyProfile?.id,
      companyName: values?.companyName,
      companyEmail: values?.companyEmail,
      companyPhone: values?.companyPhone,
      website: values?.website,
      address: values?.address,
      description: values?.description
    }
    // console.log(payload)
    dispatch(updateCompanyById(payload))
    resetForm()
    handleEditClose()
  }

  const handleApprovalCompany = () => {
    const payload: getCompanyType = {
      id: CID?.companyID,
      isApproval: true
    }
    dispatch(updateCompanyById(payload))
  }
  useEffect(() => {
    const payload: getCompanyType = {
      id: CID?.companyID
    }
    dispatch(getCompanyById(payload))
  }, [CID, updateCom])

  useEffect(() => {
    getAllCompanyPost()
  }, [CID])

  const columns: GridColDef[] = [
    {
      flex: 1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID'
    },
    {
      flex: 1,
      minWidth: 300,
      field: 'jobRole',
      headerName: 'Job Role'
    },
    {
      flex: 1,
      minWidth: 200,
      field: 'categories',
      headerName: 'Category'
    },
    {
      flex: 1,
      minWidth: 100,
      field: 'typeOfJob',
      headerName: 'Type of Job'
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: any) => {
        return (
          <Button
            sx={{ fontSize: '11px' }}
            size='small'
            variant='contained'
            color={row?.flag === false ? 'warning' : 'success'}
          >
            {row?.flag === false ? 'Pending' : 'Approved'}
          </Button>
        )
      }
    },
    {
      flex: 1,
      minWidth: 200,
      field: 'action',
      headerName: 'Action',
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='View'>
              <IconButton
                size='small'
                // component={Link}
                sx={{ color: 'text.secondary' }}
                href={`/apps/all-company/post-view/${row?.id}`}
              >
                <Icon icon='tabler:eye' />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {companyProfile?.companyName}
                </CustomAvatar>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {companyProfile?.companyName}
                </Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='small'
                  label={'Company'}
                  // color={roleColors[data.role]}
                  sx={{ textTransform: 'capitalize' }}
                />
              </CardContent>

              <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                      <Icon fontSize='1.75rem' icon='tabler:link' />
                    </CustomAvatar>
                    <div>
                      <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Website</Typography>
                      <Typography variant='body2'>{companyProfile?.website || 'N/A'}</Typography>
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
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Username:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>@UserName</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Email:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.companyEmail || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>GST No:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.gstNo || 'N/A'}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Description:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.description || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Address:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.address || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>PAN No:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.pan || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Contact:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.companyPhone || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Zip Code:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.zipCode || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>State:</Typography>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>{companyProfile?.state || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Linkedin:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.linkedin || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Twitter:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.twitter || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500 }}>Facebook:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{companyProfile?.facebook || 'N/A'}</Typography>
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
                    const payload: getCompanyType = {
                      id: companyProfile?.id
                    }
                    dispatch(getCompanyById(payload))
                  }}
                >
                  Edit
                </Button>
                <Button
                  color={companyProfile?.isApproval === false ? 'warning' : 'success'}
                  onClick={handleApprovalCompany}
                  variant='contained'
                  sx={{ mr: 2 }}
                >
                  {companyProfile?.isApproval === false ? 'Approve' : 'Approved'}
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
                    companyName: companyProfile?.companyName,
                    companyEmail: companyProfile?.companyEmail,
                    companyPhone: companyProfile?.companyPhone,
                    website: companyProfile?.website,
                    address: companyProfile?.address,
                    description: companyProfile?.description
                  }}
                  onSubmit={(values: getCompanyType, { resetForm }) => {
                    updateCompany(values, { resetForm })
                    // console.log(values)
                  }}
                >
                  {(props: FormikProps<getCompanyType>) => {
                    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
                    return (
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
                            Updating company details.
                          </DialogContentText>
                          <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                label='Company Name'
                                value={values?.companyName}
                                name='companyName'
                                helperText={errors?.companyName && touched?.companyName ? errors?.companyName : ''}
                                error={errors?.companyName && touched?.companyName ? true : false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                type='email'
                                label='Company Email'
                                value={values?.companyEmail}
                                name='companyEmail'
                                helperText={errors?.companyEmail && touched?.companyEmail ? errors?.companyEmail : ''}
                                error={errors?.companyEmail && touched?.companyEmail ? true : false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                label='Contact'
                                value={values?.companyPhone}
                                name='companyPhone'
                                helperText={errors?.companyPhone && touched?.companyPhone ? errors?.companyPhone : ''}
                                error={errors?.companyPhone && touched?.companyPhone ? true : false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                label='Website'
                                value={values?.website}
                                name='website'
                                helperText={errors?.website && touched?.website ? errors?.website : ''}
                                error={errors?.website && touched?.website ? true : false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                label='Address'
                                value={values?.address}
                                name='address'
                                helperText={errors?.address && touched?.address ? errors?.address : ''}
                                error={errors?.address && touched?.address ? true : false}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                label='Description'
                                value={values?.description}
                                name='description'
                                helperText={errors?.description && touched?.description ? errors?.description : ''}
                                error={errors?.description && touched?.description ? true : false}
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
                    )
                  }}
                </Formik>
              </Dialog>

              <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
              <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
            </Card>
            <Card sx={{ marginTop: '10px' }}>
              <CardHeader title='List of Posts' />
              <DataGrid
                autoHeight
                rows={CompanyPost}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CompanyDetail
