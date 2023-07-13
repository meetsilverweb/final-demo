// ** React Imports
import { ChangeEvent, HtmlHTMLAttributes, useEffect, useState } from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// ** Types Imports
import Icon from 'src/@core/components/icon'
import { Box, Button, CardContent, Fab, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRoleById, getAllRole, createRole, updateRoleById, getRoleById } from 'src/slice/roleSlice'
import { NextPage } from 'next'
import { AppDispatch, RootState } from 'src/store/store'
import { Formik, Form, FormikProps } from 'formik'
import DeleteDialog from 'src/views/deletebox/DeleteDialog'
import * as yup from 'yup'

export interface Payload {
  id?: number
  roleName?: string
  search?: string
  page?: number
  limit?: number
}
interface ISignUpForm {
  roleName: string | undefined
}

const role: NextPage = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 10 })
  const [edit, setEdit] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [DeleteID, setDeleteID] = useState()
  const [open, setOpen] = useState<boolean>(false)

  const { roles, deleteRole, createSingleRole, updateRole, getSingleRole } = useSelector(
    (state: RootState) => state?.role
  )
  // console.log(search)
  const dispatch = useDispatch<AppDispatch>()
  // Validations
  const validationSchema = yup.object({
    roleName: yup.string().required('Role is required')
  })

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  // All handle events
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value)
    const payload: Payload = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: e?.target?.value ? e?.target?.value : ''
    }
    dispatch(getAllRole(payload))
  }

  const handleRole = (values: ISignUpForm, { resetForm }: any) => {
    // console.log(values)
    const payload: Payload = {
      roleName: values?.roleName?.trim()
    }
    const payloadEdit: Payload = {
      roleName: values?.roleName?.trim(),
      id: getSingleRole?.id
    }
    if (edit) {
      dispatch(updateRoleById(payloadEdit))
      resetForm()
    } else {
      dispatch(createRole(payload))
      resetForm()
    }
    setEdit(false)
  }

  const getAllRoles = () => {
    const payload: Payload = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: search ? search : ''
    }
    // console.log(payload, 'getAllRoles')
    dispatch(getAllRole(payload))
  }
  useEffect(() => {
    getAllRoles()
  }, [deleteRole, createSingleRole, updateRole, getSingleRole, paginationModel?.page, paginationModel?.pageSize])

  // Role table columns
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
      field: 'roleName',
      headerName: 'Role'
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
                  let payload: Payload = {
                    id: params?.row?.id
                  }
                  dispatch(getRoleById(payload))
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
        <CardHeader title={edit ? 'Update Role' : 'Add Role'} />
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={edit ? { roleName: getSingleRole?.roleName } : { roleName: '' }}
            validationSchema={validationSchema}
            onSubmit={(values: ISignUpForm, { resetForm }) => {
              handleRole(values, { resetForm })
            }}
          >
            {(props: FormikProps<ISignUpForm>) => {
              const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props

              return (
                <Form autoComplete='off' onSubmit={handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField
                        label='Role'
                        value={values?.roleName}
                        type='text'
                        helperText={errors?.roleName && touched?.roleName ? errors?.roleName : ''}
                        error={errors?.roleName && touched?.roleName ? true : false}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name='roleName'
                        placeholder={edit ? 'Update Role' : 'Add Role'}
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
      <Card>
        <CardHeader title='List of Roles' />
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
        {/* {console.log(roles, 'roles')} */}
        <DataGrid
          autoHeight
          rows={roles}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        type='role'
        id={DeleteID}
      />
    </>
  )
}

export default role
