//@ts-nocheck
// ** MUI Imports
import dynamic from 'next/dynamic'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Styled Component Import
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Source code imports
import { Field, Form, Formik, FormikProps } from 'formik'
import { Button, Card, TextField } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPageById, updatePageById } from 'src/slice/privacySlice'

import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const Editors = () => {
  const { privacyData, getPage } = useSelector((state: RootState) => state.privacyPolicy)
  //   console.log(getPage, 'getPage')
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const payload: any = {
      id: 1
    }
    dispatch(getPageById(payload))
  }, [])

  const handlePrivcy = (values: any) => {
    const payload: any = {
      id: 1,
      description: values?.description,
      title: values?.title,
      keywords: values?.keywords
    }
    dispatch(updatePageById(payload))
  }
  return (
    <EditorWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader title={<Typography variant='h5'>Privacy and Policy</Typography>} />
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={{
                  description: getPage?.description ? getPage?.description : '',
                  title: getPage?.title ? getPage?.title : '',
                  keywords: getPage?.keywords ? getPage?.keywords : ''
                }}
                onSubmit={(values: any) => {
                  handlePrivcy(values)
                }}
              >
                {(props: FormikProps<any>) => {
                  const { values, handleChange } = props
                  return (
                    <Form>
                      <Grid spacing={5}>
                        <Grid item xs={12}>
                          <TextField
                            sx={{ marginTop: '10px' }}
                            label='Page Title'
                            value={values?.title}
                            type='text'
                            onChange={handleChange}
                            fullWidth
                            name='title'
                            placeholder={'Page tile'}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            sx={{ margin: '10px 0' }}
                            label='Page Keywords'
                            value={values?.keywords}
                            type='text'
                            onChange={handleChange}
                            fullWidth
                            name='keywords'
                            placeholder={'Page keywords'}
                          />
                        </Grid>
                      </Grid>
                      <Field sx={{ marginTop: '10px' }} name='description'>
                        {({ field }: any) => <ReactQuill value={field.value} onChange={field.onChange(field.name)} />}
                      </Field>
                      {/* <Button sx={{ mt: 3 }} variant='contained' type='submit'>
                        Submit
                      </Button> */}
                    </Form>
                  )
                }}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </EditorWrapper>
  )
}

export default Editors
