import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.02)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          backgroundColor: 'transparent',
          '& .MuiDataGrid-cell': {
            borderColor: 'rgba(255, 255, 255, 0.06)',
            color: 'rgba(255, 255, 255, 0.8)',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.06)',
            color: 'rgba(255, 255, 255, 0.9)',
          },
          '& .MuiDataGrid-footerContainer': {
            borderColor: 'rgba(255, 255, 255, 0.06)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
            },
          },
          '& .MuiCheckbox-root': {
            color: 'rgba(255, 255, 255, 0.3)',
            '&.Mui-checked': {
              color: '#8b5cf6',
            },
          },
          '& .MuiTablePagination-root': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
          '& .MuiIconButton-root': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
          '& .MuiDataGrid-toolbarContainer': {
            padding: '16px',
            gap: '12px',
            '& .MuiButton-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
              },
            },
          },
        },
      },
    },
  },
});

export default function DataTable(props) {
  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          autoHeight
          rows={props.rows}
          pageSize={25}
          columns={props.columns}
          checkboxSelection={props.checkboxSelection ? false : true}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
