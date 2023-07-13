// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import * as yup from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import * as Yup from 'yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Card, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material'
import CustomButton from 'src/@core/components/custom-button'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const schema = yup.object().shape({
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: ''
}

// Styled Components
const CreatePasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: '1rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const CreatePassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const { replace, push, query } = useRouter()
  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const validationSchema = Yup.object({
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
      .required('Confirmed Password required')
  })
  const handleSubmit = async (values: any) => {
    let payload = {
      Email: query.emailId,
      password: values?.confirmPassword,
      newPassword: values?.confirmPassword
    }
    console.log('query.emailId', query.emailId)
    const res = await axios
      .post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/updatePassword`, payload, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      .then((response: any) => {
        if (response?.data?.status === 200) {
          push('/login')
        } else {
          if (response?.error?.code === 'ERR_NETWORK') {
            toast.error('internal server error')
            push('/500')
          }
        }
      })
      .catch((error: any) => {
        if (error?.code === 'ERR_NETWORK') {
          toast.error('internal server error')
          push('/500')
        }
      })
  }
  return (
    <Box position={'relative'}>
      <Box className='content-right' sx={{ background: 'linear-gradient(117.99deg, #C4C4C4 14.54%, #FFFFFF 42.75%)' }}>
        <RightWrapper>
          <Box
            sx={{
              p: [6, 12],
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant='h4' fontWeight={800} marginBottom={3}>
              Enter New Password
            </Typography>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                padding: '2rem 2rem',
                boxShadow: '8.32785px 8.32785px 24.9835px rgba(2, 2, 70, 0.15)',
                borderRadius: '1rem'
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Formik
                  initialValues={{
                    newPassword: '',
                    confirmPassword: ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={values => handleSubmit(values)}
                >
                  {({ values, handleChange, handleBlur }: any) => (
                    <Form>
                      <Stack spacing={3}>
                        <FormControl fullWidth sx={{ mb: 1.5 }}>
                          <InputLabel
                            htmlFor='auth-new-password'
                            // error={Boolean(errors.password)}
                          >
                            Enter New Password
                          </InputLabel>

                          <OutlinedInput
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='newPassword'
                            label='Enter New Password'
                            placeholder='Please enter new password'
                            id='auth-new-password'
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                              <InputAdornment position='start'>
                                <Icon icon={'solar:password-minimalistic-input-broken'} />
                              </InputAdornment>
                            }
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <ErrorMessage name='newPassword' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1.5 }}>
                          <InputLabel
                            htmlFor='auth-confirm-new-password'
                            // error={Boolean(errors.password)}
                          >
                            Confirm New Password
                          </InputLabel>

                          <OutlinedInput
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='confirmPassword'
                            label='Confirm New Password'
                            placeholder='Please confirm new password'
                            id='auth-confirm-new-password'
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                              <InputAdornment position='start'>
                                <Icon icon={'solar:password-minimalistic-input-broken'} />
                              </InputAdornment>
                            }
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <ErrorMessage
                            name='confirmPassword'
                            render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                          />
                        </FormControl>

                        <CustomButton fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                          <span style={{ marginRight: '0.5rem' }}>Change Password</span>{' '}
                          <Icon icon={'solar:settings-outline'} />
                        </CustomButton>
                      </Stack>
                    </Form>
                  )}
                </Formik>
                <Typography gutterBottom sx={{ marginTop: '1rem' }} align='center' variant='body2'>
                  Privacy Policy | Terms and conditions
                </Typography>
              </Box>
            </Card>
          </Box>
        </RightWrapper>
        {!hidden ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              borderRadius: '20px',
              justifyContent: 'center',
              margin: theme => theme.spacing(8, 0, 8, 8)
            }}
          >
            <CreatePasswordIllustration
              alt='forgot-password-illustration'
              // src={`/images/pages/auth-v2-forgot-password-illustration-${theme.palette.mode}.png`}
              src={`/images/pages/enter-new-password-page.png`}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

CreatePassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CreatePassword.guestGuard = true

export default CreatePassword
