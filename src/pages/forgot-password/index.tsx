// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import CustomButton from 'src/@core/components/custom-button'
import { Divider, InputAdornment } from '@mui/material'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-hot-toast'

// Styled Components
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
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

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const [viewEmailText, setViewEmailText] = useState(false)

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const handleSubmit = async (values: any) => {
    let payload = {
      Email: values.email
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/forgotPassword`, payload, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    if (res?.data?.status === 200) {
      setViewEmailText(true)
    } else {
      setViewEmailText(false)
      toast.error('Somthing went wrong please try again')
    }
  }
  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <ForgotPasswordIllustration
            alt='forgot-password-illustration'
            src={`/images/pages/auth-v2-forgot-password-illustration-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            {!viewEmailText ? (
              <Formik
                initialValues={{
                  email: ''
                }}
                onSubmit={values => {
                  handleSubmit(values)
                }}
              >
                {({ values, handleChange, handleBlur }) => (
                  <Form>
                    <TextField
                      fullWidth
                      autoFocus
                      type='email'
                      label='Email'
                      name='email'
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Enter Your Email'
                      sx={{ display: 'flex', mb: 4 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon={'ic:outline-mail'} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <Divider sx={{ margin: '1rem' }} variant='middle'>
                      or
                    </Divider>
                    <TextField
                      fullWidth
                      autoFocus
                      type='tel'
                      label='Mobile No'
                      placeholder='Enter Your Mobile No'
                      sx={{ display: 'flex', mb: 4 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon={'ic:baseline-send-to-mobile'} />
                          </InputAdornment>
                        )
                      }}
                    />

                    <CustomButton
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                      endIcon={
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                          <g transform='rotate(180 12 12)'>
                            <g
                              fill='none'
                              stroke='currentColor'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                            >
                              <path d='M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2' />
                              <path d='M20 12H7l3-3m0 6l-3-3' />
                            </g>
                          </g>
                        </svg>
                      }
                      sx={{ mb: 4 }}
                    >
                      Send Link to Email
                    </CustomButton>
                    <Typography
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}
                    >
                      <LinkStyled href='/login'>
                        <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                        <span>Back to login</span>
                      </LinkStyled>
                    </Typography>
                  </Form>
                )}
              </Formik>
            ) : (
              <Box sx={{ width: '100%', maxWidth: 500 }}>
                <h2> Link sended successfully on your eMAIL</h2>
              </Box>
            )}
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
