// ** React Imports
import { useState, ReactNode } from 'react'
// ** Next Imports
import Link from 'next/link'
// ** MUI Components
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Form, Formik } from 'formik'
import CustomButton from 'src/@core/components/custom-button'
import { InputAdornment } from '@mui/material'
// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
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
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings
  const { login, logout } = auth

  const handleLogin = (values: any) => {
    let email = values.email
    let password = values.password
    //@ts-ignore
    login({ email, password })
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

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
          <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} />
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
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={values => handleLogin(values)}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <TextField
                      autoFocus
                      name='email'
                      type='email'
                      label='Email'
                      value={values?.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // error={Boolean(errors.email)}
                      placeholder='admin@gmail.com'
                      InputProps={{
                        startAdornment: (
                          //@ts-ignore
                          <InputAdornment position='start'>
                            <Icon icon={'ic:outline-mail'} />
                            {/* @ts-ignore */}
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 1.5 }}>
                    <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>

                    <OutlinedInput
                      value={values.password}
                      onBlur={handleBlur}
                      name='password'
                      label='Password'
                      onChange={handleChange}
                      id='auth-login-v2-password'
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
                  </FormControl>

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
                    Login
                  </CustomButton>
                  <Box>
                    <Box sx={{ padding: '0.5rem 2rem' }}>
                      <Typography
                        gutterBottom
                        sx={{ padding: '0 1rem', textDecoration: 'none', color: 'red' }}
                        align='center'
                        variant='body2'
                      >
                        <LinkStyled href='/forgot-password'>Forgot Password ?</LinkStyled>
                      </Typography>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
