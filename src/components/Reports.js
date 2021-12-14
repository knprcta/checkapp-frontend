import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import RefreshIcon from '@mui/icons-material/Refresh';
import MrcnIcon from './MrcnIcon';
import Rating from '@mui/material/Rating';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import Copyright from './Copyright';
import MenuPopupState from './MenuPopupState';

function Reports({ rows, user, onSignout, onEmailClick, onRefresh, loading }) {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: 'date',
      type: 'date',
      headerName: 'Дата',
      headerAlign: 'center',
      align: 'center',
      width: 100,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: 'object',
      headerName: 'Объект',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Адрес',
      flex: 1,
    },
    {
      field: 'owner',
      headerName: 'Проверяющий',
      valueGetter: (params) => params.value.name,
      flex: 1,
    },
    {
      field: 'rating',
      headerName: 'Рейтинг',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      width: 120,
      renderCell: (params) => (
        <Rating value={params.value} readOnly size="small" />
      ),
    },
    {
      field: 'reportURL',
      headerName: 'Отчёт',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton href={params.value} target="_blank" color="primary">
          <FileOpenIcon />
        </IconButton>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <LoadingButton
          size="small"
          sx={{ justifySelf: 'flex-start', ml: 'auto' }}
          endIcon={<RefreshIcon />}
          loadingPosition="end"
          loading={loading}
          onClick={refresh}
        >
          Обновить
        </LoadingButton>
      </GridToolbarContainer>
    );
  }

  function refresh() {
    const local = localStorage.getItem('jwt');
    const session = sessionStorage.getItem('jwt');
    const jwt = local ? local : session;
    onRefresh(jwt);
  }

  return (
    <Box component="section" sx={{ height: '100vh' }}>
      <Paper elevation={3} square>
        <Container
          component="header"
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              ml: 2,
            }}
          >
            <MrcnIcon sx={{ fontSize: 60 }} color="primary" />
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: 'Major Mono Display' }}
              color="primary"
            >
              CheckApp
            </Typography>
          </Box>
          <MenuPopupState
            user={user}
            signout={onSignout}
            copyEmail={onEmailClick}
          />
        </Container>
      </Paper>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 60px)',
        }}
      >
        <Paper
          elevation={3}
          sx={{ height: '100%', p: 2, mt: { xs: 2, sm: 3 } }}
        >
          <DataGrid
            components={{
              Toolbar: CustomToolbar,
            }}
            disableColumnMenu
            rows={rows}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            autoPageSize
          />
        </Paper>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}

export default Reports;
