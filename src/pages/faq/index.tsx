// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
// ** Types Imports
import Icon from 'src/@core/components/icon'
import { Box, Button, CardContent, Fab, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { createFaqAPI } from 'src/slice/faqSlice'
import { Field, FieldArray, Form, Formik, FormikProps } from 'formik'
import { useSelector } from 'react-redux'
const faq: NextPage = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const { getFaq, createFaq } = useSelector((state: RootState) => state?.faqdata)
  const dispatch = useDispatch<AppDispatch>()
  const handleFaq = ({ values }: any) => {
    const payload: any = {
      questionAndAnswer: values?.questionAndAnswer
    }
    console.log(values, 'payloadpayload')
    dispatch(createFaqAPI(payload))
  }
  return (
    <>
      <Card>
        <CardHeader title='FAQ' />
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={{
              questionAndAnswer: [
                {
                  question: '',
                  answer: ''
                }
              ]
            }}
            onSubmit={(values: any) => handleFaq(values)}
          >
            {(props: FormikProps<any>) => {
              const { values, handleChange } = props
              return (
                <Form>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      {/* <FieldArray
                        name='questionAndAnswer'
                        render={arrayHelpers => (
                          <div>
                            {values?.questionAndAnswer &&
                              values?.questionAndAnswer?.map((item: any, index: any) => (
                                <Box sx={{ display: 'flex' }} key={index}>
                                  <Grid md={12}>
                                    <Grid item md={11}>
                                      <Field fullWidth name={`questionAndAnswer[${index}].question`} />
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                      <Typography>Answer:</Typography>
                                      <Field sx={{ marginTop: '10px' }} name={`questionAndAnswer[${index}]answer`}>
                                        {({ field }: any) => (
                                          <ReactQuill value={field.value} onChange={field.onChange(field.name)} />
                                        )}
                                      </Field>
                                    </Grid>
                                  </Grid>
                                  <Grid md={1}>
                                    <Button
                                      variant='contained'
                                      color='error'
                                      type='button'
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      Delete
                                    </Button>
                                  </Grid>
                                </Box>
                              ))}
                            <Button
                              variant='contained'
                              color='success'
                              type='button'
                              onClick={() => arrayHelpers.push({ question: '', answer: '' })}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      /> */}
                    </Grid>
                    <Grid item>
                      {' '}
                      <Button type='submit' variant='contained' sx={{ mr: 1 }}>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </CardContent>
      </Card>
    </>
  )
}

export default faq
