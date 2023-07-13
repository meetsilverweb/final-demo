// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { Box, Button, CardContent, Fab, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import { Formik, Form, FormikProps } from 'formik'
import * as yup from 'yup'
import {
  createJobCategory,
  getAllJobCategory,
  getJobCategoryById,
  updateJobCategoryById
} from 'src/slice/jobCategorySlice'
import DeleteDialog from 'src/views/deletebox/DeleteDialog'
export interface Payload {
  id?: number | undefined
  categoryName?: string
  status?: null | string
  search?: string
  page?: number
  limit?: number
}
interface ISignUpForm {
  categoryName: string | undefined
}

const jobCategory: NextPage = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 10 })
  const [search, setSearch] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [DeleteID, setDeleteID] = useState()
  const [open, setOpen] = useState<boolean>(false)
  const { JobCategories, deleteJobCategory, getSingleJobCategory, createSingleJobCategory, updateJobCategory } =
    useSelector((state: RootState) => state?.jobCategory)
  // console.log(search)
  const dispatch = useDispatch<AppDispatch>()

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const validationSchema = yup.object({
    categoryName: yup.string().required('Job Category is required')
  })
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value)
    const payload: Payload = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: e?.target?.value ? e?.target?.value : ''
    }

    dispatch(getAllJobCategory(payload))
  }

  const handleJobCategory = (values: ISignUpForm, { resetForm }: any) => {
    // console.log(values)
    const payload: Payload = {
      categoryName: values?.categoryName?.trim()
    }
    const payloadEdit: Payload = {
      categoryName: values?.categoryName?.trim(),
      id: getSingleJobCategory?.id
    }
    if (edit) {
      dispatch(updateJobCategoryById(payloadEdit))
      resetForm()
    } else {
      dispatch(createJobCategory(payload))
      resetForm()
    }
    setEdit(false)
  }

  const getAllJobCategories = () => {
    const payload: Payload = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: search ? search : ''
    }
    // console.log(payload, 'getAllRoles')
    dispatch(getAllJobCategory(payload))
  }
  useEffect(() => {
    getAllJobCategories()
  }, [
    deleteJobCategory,
    getSingleJobCategory,
    createSingleJobCategory,
    updateJobCategory,
    paginationModel?.page,
    paginationModel?.pageSize
  ])
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID'
    },
    {
      flex: 0.6,
      minWidth: 400,
      field: 'categoryName',
      headerName: 'Job Category'
    },
    {
      flex: 0.3,
      minWidth: 300,
      field: 'action',
      headerName: 'Action',
      renderCell: params => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Edit'>
              <IconButton
                onClick={() => {
                  let payload = {
                    id: params?.row?.id
                  }
                  dispatch(getJobCategoryById(payload))
                  setEdit(true)
                }}
                size='medium'
                sx={{ '&:hover': { color: 'green' } }}
              >
                <Icon icon='heroicons-outline:pencil-alt' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton
                onClick={() => {
                  handleClickOpen()
                  setDeleteID(params?.row?.id)
                }}
                size='medium'
                sx={{ '&:hover': { color: 'red' } }}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]
  return (
    <>
      <Card sx={{ marginBottom: '10px' }}>
        <CardHeader title={edit ? 'Update Job Category' : 'Add Job Category'} />
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={edit ? { categoryName: getSingleJobCategory?.categoryName } : { categoryName: '' }}
            validationSchema={validationSchema}
            onSubmit={(values: ISignUpForm, { resetForm }) => {
              handleJobCategory(values, { resetForm })
            }}
          >
            {(props: FormikProps<ISignUpForm>) => {
              const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
              return (
                <Form onSubmit={handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField
                        label='Job Category'
                        value={values?.categoryName}
                        type='text'
                        helperText={errors?.categoryName && touched?.categoryName ? errors?.categoryName : ''}
                        error={errors?.categoryName && touched?.categoryName ? true : false}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name='categoryName'
                        placeholder={edit ? 'Update Job Category' : 'Add Job Category'}
                      />
                      <Button sx={{ marginTop: '10px' }} type='submit' variant='contained' size='large'>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </CardContent>
      </Card>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        type='jobCategory'
        id={DeleteID}
      />
      <Card>
        <CardHeader title='List of Job Categories' />
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: theme => theme.spacing(2, 5, 4, 5)
          }}
        >
          <TextField
            size='small'
            value={search}
            onChange={handleSearch}
            placeholder='Search…'
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='tabler:search' fontSize={20} />
                </Box>
              ),
              endAdornment: (
                <IconButton size='small' title='Clear' aria-label='Clear'>
                  <Icon icon='tabler:x' fontSize={20} />
                </IconButton>
              )
            }}
            sx={{
              width: {
                xs: 1,
                sm: 'auto'
              },
              '& .MuiInputBase-root > svg': {
                mr: 2
              }
            }}
          />
        </Box>
        <DataGrid
          autoHeight
          rows={JobCategories}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
    </>
  )
}

export default jobCategory
