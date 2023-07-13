// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Types Imports
import Icon from 'src/@core/components/icon'
import { Box, Button, CardContent, Fab, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { createSkill, deleteSkillById, getAllSkill, getSkillById, updateSkillById } from 'src/slice/skillSlice'
import { AppDispatch, RootState } from 'src/store/store'
import { Formik, Form, FormikProps } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { NextPage } from 'next'
import DeleteDialog from 'src/views/deletebox/DeleteDialog'
export interface Payload {
  id?: number
  skillName?: string
  page?: number
  limit?: number
  search?: string
}
interface ISignUpForm {
  skillName: string | undefined
}
const skills: NextPage = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 10 })
  const [search, setSearch] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [DeleteID, setDeleteID] = useState()
  const [open, setOpen] = useState<boolean>(false)
  const { skills, deleteSkill, createSingleSkill, getSingleSkill, updateSkill } = useSelector(
    (state: RootState) => state?.skill
  )
  const dispatch = useDispatch<AppDispatch>()

  const validationSchema = yup.object({
    skillName: yup.string().required('Skill is required')
  })

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value)
    let payload: Payload = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: e?.target?.value ? e?.target?.value : ''
    }
    // console.log(payload)
    dispatch(getAllSkill(payload))
  }

  const handleSkill = (values: ISignUpForm, { resetForm }: any) => {
    // console.log(values)
    let payload: Payload = {
      skillName: values?.skillName?.trim()
    }
    let editPayload: Payload = {
      skillName: values?.skillName?.trim(),
      id: getSingleSkill?.id
    }
    if (edit) {
      dispatch(updateSkillById(editPayload))
      resetForm()
    } else {
      dispatch(createSkill(payload))
      resetForm()
    }
    setEdit(false)
  }

  useEffect(() => {
    let payload: Payload = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: ''
    }
    dispatch(getAllSkill(payload))
  }, [deleteSkill, updateSkill, createSingleSkill, getSingleSkill, paginationModel?.page, paginationModel?.pageSize])

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
      field: 'skillName',
      headerName: 'Skill'
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
                  dispatch(getSkillById(payload))
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
        <CardHeader title={edit ? 'Update Skill' : 'Add Skill'} />
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={edit ? { skillName: getSingleSkill?.skillName } : { skillName: '' }}
            validationSchema={validationSchema}
            onSubmit={(values: ISignUpForm, { resetForm }) => {
              handleSkill(values, { resetForm })
            }}
          >
            {(props: FormikProps<ISignUpForm>) => {
              const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
              return (
                <Form onSubmit={handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField
                        label='Skill'
                        value={values?.skillName}
                        type='text'
                        helperText={errors?.skillName && touched?.skillName ? errors?.skillName : ''}
                        error={errors?.skillName && touched?.skillName ? true : false}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name='skillName'
                        placeholder={edit ? 'Update Skill' : 'Add Skill'}
                      />
                      <Button sx={{ marginTop: '10px' }} type='submit' variant='contained' size='large'>
                        save
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
        <CardHeader title='List of Skills' />
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
          rows={skills}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        type='skill'
        id={DeleteID}
      />
    </>
  )
}

export default skills
