// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, ChangeEvent } from 'react'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import { CardStatsHorizontalWithDetailsProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Import
import { TextField, Tooltip } from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { EmployeeType, deleteEmployee, getAllEmployee } from 'src/slice/allEmployeeSlice'
import DeleteDialog from 'src/views/deletebox/DeleteDialog'

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** renders client column
// const renderClient = (row: any) => {
//   if (row.avatar.length) {
//     return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={row.avatarColor}
//         sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}
//       >
//         {getInitials(row.fullName ? row.fullName : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

const UserList = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 10 })
  const [search, setSearch] = useState<string>('')
  const [DeleteID, setDeleteID] = useState()
  const [open, setOpen] = useState<boolean>(false)
  const { allEmployee, deleteEmp } = useSelector((state: RootState) => state.employee)

  const dispatch = useDispatch<AppDispatch>()
  // console.log(allEmployee)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  useEffect(() => {
    const payload: EmployeeType = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: search ? search : ''
    }
    dispatch(getAllEmployee(payload))
  }, [dispatch, deleteEmp])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value)
    const payload: EmployeeType = {
      page: paginationModel?.page ? paginationModel?.page : 1,
      limit: paginationModel?.pageSize ? paginationModel?.pageSize : 10,
      search: e?.target?.value ? e?.target?.value : ''
    }
    dispatch(getAllEmployee(payload))
  }

  const handleDelete = (id: number) => {
    let payload = {
      id: id
    }
    dispatch(deleteEmployee(payload))
  }

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'name',
      headerName: 'User',
      renderCell: ({ row }: any) => {
        const { firstName, lastName } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {firstName}
              </Typography>
              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {lastName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    // {
    //   flex: 0.15,
    //   field: 'role',
    //   minWidth: 170,
    //   headerName: 'Role',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         <CustomAvatar
    //           skin='light'
    //           sx={{ mr: 4, width: 30, height: 30 }}
    //           color={(userRoleObj[row.role].color as ThemeColor) || 'primary'}
    //         >
    //           <Icon icon={userRoleObj[row.role].icon} />
    //         </CustomAvatar>
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {row.role}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'employeeEmail',
      field: 'employeeEmail',
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.employeeEmail}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 190,
      field: 'employeePhone',
      headerName: 'Employee Mobile',
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.employeePhone}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row.status}
            color={userStatusObj[row.status]}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
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
              href={`/apps/user/view/${row?.id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
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
          <Divider sx={{ m: '0 !important' }} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={allEmployee}
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
            type='user'
            id={DeleteID}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
