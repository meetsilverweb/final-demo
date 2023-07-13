// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
// ** Custom Components

// ** Types Imports
import { Button, CardContent, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Form, Formik, FormikProps } from 'formik'
import DeleteDialog from 'src/views/deletebox/DeleteDialog'
import * as yup from 'yup'
import { createToken, getAllToken, getTokenById, updateTokenById } from 'src/slice/tokenSlice'
export interface TokenType {
  id?: number
  tokenName?: string
  tokens?: string
  page?: number
  limit?: number
  search?: string
}

const token = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 10 })
  const [edit, setEdit] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [DeleteID, setDeleteID] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const { allToken, getToken, deleteToken, updateToken, createSingleToken } = useSelector(
    (state: RootState) => state?.token
  )
  // console.log(allToken, 'allToken')
  // console.log(search)
  const dispatch = useDispatch<AppDispatch>()

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleToken = (values: TokenType, { resetForm }: any) => {
    // console.log(values)
    const payload: TokenType = {
      tokenName: values?.tokenName?.trim(),
      tokens: values?.tokens
    }
    const payloadEdit: TokenType = {
      tokenName: values?.tokenName?.trim(),
      tokens: values?.tokens,
      id: getToken?.id
    }
    if (edit) {
      dispatch(updateTokenById(payloadEdit))
      resetForm()
    } else {
      dispatch(createToken(payload))
      resetForm()
    }
    setEdit(false)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value)
    const payload: TokenType = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: search ? search : ''
    }
    dispatch(getAllToken(payload))
  }

  useEffect(() => {
    const payload: TokenType = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: search ? search : ''
    }
    dispatch(getAllToken(payload))
  }, [
    dispatch,
    deleteToken,
    updateToken,
    getToken,
    createSingleToken,
    paginationModel?.page,
    paginationModel?.pageSize
  ])

  // Field validations
  const validationSchema = yup.object({
    tokenName: yup.string().required('Token Name is required'),
    tokens: yup.string().required(' Tokens is required')
  })

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
      field: 'tokenName',
      headerName: 'Token Name'
    },
    {
      flex: 0.6,
      minWidth: 400,
      field: 'tokens',
      headerName: 'Connections'
    },
    {
      flex: 0.3,
      minWidth: 300,
      field: 'action',
      headerName: 'Action',
      renderCell: params => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            <Tooltip title='Edit'>
              <IconButton
                onClick={() => {
                  let payload: TokenType = {
                    id: params?.row?.id
                  }
                  dispatch(getTokenById(payload))
                  setEdit(true)
                }}
                size='medium'
                sx={{ '&:hover': { color: 'green' } }}
              >
                <Icon icon='heroicons-outline:pencil-alt' />
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
        <CardHeader title={'Tokens and Connections'} />
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={
              edit ? { tokenName: getToken?.tokenName, tokens: getToken?.tokens } : { tokenName: '', tokens: '' }
            }
            validationSchema={validationSchema}
            onSubmit={(values: TokenType, { resetForm }) => {
              handleToken(values, { resetForm })
            }}
          >
            {(props: FormikProps<TokenType>) => {
              const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
              return (
                <Form onSubmit={handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField
                        label='Token Name'
                        value={values?.tokenName}
                        type='text'
                        helperText={errors?.tokenName && touched?.tokenName ? errors?.tokenName : ''}
                        error={errors?.tokenName && touched?.tokenName ? true : false}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name='tokenName'
                        placeholder={edit ? 'Update Token Name' : 'Add Token Name'}
                      />
                      <TextField
                        sx={{ marginTop: '10px' }}
                        label='Connections'
                        value={values?.tokens}
                        type='text'
                        helperText={errors?.tokens && touched?.tokens ? errors?.tokens : ''}
                        error={errors?.tokens && touched?.tokens ? true : false}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name='tokens'
                        placeholder={edit ? 'Update Connections' : 'Add Connections'}
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
        <CardHeader title='Quick Filter' />
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
          rows={allToken}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          type='token'
          id={DeleteID}
        />
      </Card>
    </>
  )
}

export default token
