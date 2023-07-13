// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { ErrorMessage, Form, Formik } from 'formik'
import axios from 'axios'

const ChangePasswordCard = () => {
  interface State {
    showNewPassword: boolean
    showCurrentPassword: boolean
    showConfirmNewPassword: boolean
  }
  const [values1, setValues1] = useState<State>({
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })
  const handleClickShowCurrentPassword = () => {
    setValues1({ ...values1, showCurrentPassword: !values1.showCurrentPassword })
  }

  const handleClickShowNewPassword = () => {
    setValues1({ ...values1, showNewPassword: !values1.showNewPassword })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues1({ ...values1, showConfirmNewPassword: !values1.showConfirmNewPassword })
  }
  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(8, 'Current password must be 8 charecters')
      .required('Current password is required'),
    newPassword: yup
      .string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
      )
      .required('New password is required'),
    confirmNewPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
  })

  const handleSubmit = async (values: any) => {
    // @ts-ignore
    let userData = JSON.parse(localStorage.getItem('userData') ? localStorage.getItem('userData') : '')
    let payload = {
      Email: userData?.Email,
      password: values?.currentPassword,
      newPassword: values?.confirmNewPassword
    }

    const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/changePassword`, payload, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    if (res.data) {
      toast.success('Password changed successfully')
    } else {
      toast.error('somthing went wrong please try again')
    }
  }
  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          }}
          validationSchema={schema}
          onSubmit={values => handleSubmit(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur, resetForm }: any) => (
            <Form>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor='input-current-password'
                      error={Boolean(errors.currentPassword && touched.currentPassword)}
                    >
                      Current Password
                    </InputLabel>

                    <OutlinedInput
                      name='currentPassword'
                      value={values.currentPassword}
                      label='Current Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id='input-current-password'
                      error={Boolean(errors.currentPassword && touched.currentPassword)}
                      type={values1.showCurrentPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowCurrentPassword}
                          >
                            <Icon icon={values1.showCurrentPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <ErrorMessage name='currentPassword' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={5} sx={{ mt: 0 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='input-new-password' error={Boolean(errors.newPassword && touched.newPassword)}>
                      New Password
                    </InputLabel>

                    <OutlinedInput
                      value={values.newPassword}
                      name='newPassword'
                      label='New Password'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id='input-new-password'
                      error={Boolean(errors.newPassword && touched.newPassword)}
                      type={values1.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <Icon icon={values1.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <ErrorMessage name='newPassword' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor='input-confirm-new-password'
                      error={Boolean(errors.confirmNewPassword && touched.confirmNewPassword)}
                    >
                      Confirm New Password
                    </InputLabel>

                    <OutlinedInput
                      name='confirmNewPassword'
                      value={values?.confirmNewPassword}
                      onBlur={handleBlur}
                      label='Confirm New Password'
                      onChange={handleChange}
                      id='input-confirm-new-password'
                      error={Boolean(errors.confirmNewPassword && touched.confirmNewPassword)}
                      type={values1.showConfirmNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowConfirmNewPassword}
                          >
                            <Icon icon={values1.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <ErrorMessage name='confirmNewPassword' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 500 }}>Password Requirements:</Typography>
                  <Box component='ul' sx={{ pl: 6, mb: 0, '& li': { mb: 1.5, color: 'text.secondary' } }}>
                    <li>Minimum 8 characters long - the more, the better</li>
                    <li>At least one lowercase & one uppercase character</li>
                    <li>At least one number, symbol, or whitespace character</li>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                    Save Changes
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary' onClick={() => resetForm()}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
