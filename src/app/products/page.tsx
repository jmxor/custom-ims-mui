'use client';

import {Add} from '@mui/icons-material';
import {Button, Stack} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

const rows = [
  {id: 1, sku: '11H-12462-00', description: '', quantity: 15, minQuantity: 5, price: 32.5, location: '35A'},
  {id: 2, sku: '1A0-26242-01', description: '', quantity: 6, minQuantity: 5, price: 10.5, location: '24F'},
  {id: 3, sku: '1RC-15411-01', description: '', quantity: 35, minQuantity: 5, price: 119, location: '64G'},
  {id: 4, sku: '1RC-27200-00', description: '', quantity: 0, minQuantity: 5, price: 70, location: '5'},
  {id: 5, sku: '29L-14451-00', description: '', quantity: 23, minQuantity: 5, price: 9.5, location: '5'},
  {id: 6, sku: '4L0-16111-00-YK', description: '', quantity: 4, minQuantity: 5, price: 32.5, location: '5'},
  {id: 7, sku: '4L0-21510-00-36', description: '', quantity: 2, minQuantity: 5, price: 10.5, location: '5'},
  {id: 8, sku: '4L0-23110-00', description: '', quantity: 5, minQuantity: 5, price: 119, location: '5'},
  {id: 9, sku: '4L026335-00', description: '', quantity: 0, minQuantity: 5, price: 70, location: '5'},
  {id: 10, sku: '4LO-83310-00', description: '', quantity: 0, minQuantity: 5, price: 9.5, location: '5'},

];

// TODO add different currencies
const priceFormatter: GridColDef['valueFormatter'] = (value: number) => `£${value.toFixed(2)}`;

const columns: GridColDef<(typeof rows)[number]>[] = [
  {field: 'sku', headerName: 'SKU', width: 128},
  {field: 'description', headerName: 'Description'},
  {field: 'quantity', headerName: 'Qty'},
  {field: 'minQuantity', headerName: 'Min Qty'},
  {field: 'price', headerName: 'Price', width: 112, align: 'right', headerAlign: 'right', valueFormatter: priceFormatter},
  {field: 'location', headerName: 'Location'},
  {field: 'tags', headerName: 'Tags'},
];

export default function ProductsPage() {
  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        useFlexGap
        justifyContent="end"
        sx={{mb: 1}}
      >
        <Button variant="outlined" sx={{gap: 1}}>
          <Add/>
          New Product
        </Button>
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        getRowClassName={(params) => {
          if (params.row.quantity === 0) return 'MuiDataGrid-rowError';
          if (params.row.quantity < params.row.minQuantity) return 'MuiDataGrid-rowWarning';
          return '';
        }}
      />
    </>

  );
}