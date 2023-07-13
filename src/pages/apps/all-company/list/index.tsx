// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Select, { SelectChangeEvent } from '@mui/material/Select'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports

import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import { useSelector } from 'react-redux'
import { deleteJobCompany, getAllJobCompany } from 'src/slice/allComopanySlice'
import { Button } from '@mui/material'
import DeleteDialog from 'src/views/deletebox/DeleteDialog'

export type Payload = {
  id?: number
  search?: string
  page?: number
  limit?: number
}
const defaultColumns: GridColDef[] = []

const allCompany = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 10 })
  const [search, setSearch] = useState<string>('')
  const [DeleteID, setDeleteID] = useState()
  const [open, setOpen] = useState<boolean>(false)
  const { deleteCmp, allCompany } = useSelector((state: RootState) => state?.company)
  const dispatch = useDispatch<AppDispatch>()
  // console.log(allCompany, 'allCompany')
  // ** Hooks
  useEffect(() => {
    const payload: Payload = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: search ? search : ''
    }
    dispatch(getAllJobCompany(payload))
  }, [dispatch, deleteCmp])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleCompanyDelete = (id: number) => {
    const payload: Payload = {
      id: id
    }
    dispatch(deleteJobCompany(payload))
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value)
    const payload: Payload = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: e?.target?.value ? e?.target?.value : ''
    }
    // console.log(payload)
    dispatch(getAllJobCompany(payload))
  }
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID'
    },
    {
      flex: 0.25,
      field: 'name',
      minWidth: 320,
      headerName: 'Company',
      renderCell: ({ row }: any) => {
        const { companyEmail, companyName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {companyName}
              </Typography>
              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {companyEmail}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'companyPhone',
      headerName: 'Company Phone'
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: any) => {
        return (
          <Button
            sx={{ fontSize: '11px' }}
            size='small'
            variant='contained'
            color={row?.isApproval === false ? 'warning' : 'success'}
          >
            {row?.isApproval === false ? 'Pending' : 'Approved'}
          </Button>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete'>
            <IconButton
              onClick={() => {
                handleClickOpen()
                setDeleteID(row?.id)
              }}
              size='small'
              sx={{ color: 'text.secondary' }}
            >
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <IconButton
              size='small'
              component={Link}
              sx={{ color: 'text.secondary' }}
              href={`/apps/all-company/view/${row?.id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='All Companies' />
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
            pagination
            rowHeight={62}
            rows={allCompany}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowSelectionModelChange={rows => setSelectedRows(rows)}
          />
          <DeleteDialog
            open={open}
            setOpen={setOpen}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            type='company'
            id={DeleteID}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/getAllJobCompany`)
//   const companyData: any = res?.data
//   // console.log(tokenData)
//   return {
//     props: {
//       allComapny: companyData
//     }
//   }
// }
export default allCompany
