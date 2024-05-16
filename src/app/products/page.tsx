'use client';

import {Add, Upload} from '@mui/icons-material';
import {Button} from '@mui/material';
import {DataGrid, GridColDef, GridRowModesModel, GridRowsProp, GridSlots, GridToolbarContainer} from '@mui/x-data-grid';
import {useState} from 'react';

const initialRows: GridRowsProp = [
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

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const {setRows, setRowModesModel} = props;

  const handleAddProduct = () => {
    setRows((oldRows) => [...oldRows,]);
    setRowModesModel((oldModel) => ({...oldModel,}));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<Add/>} onClick={handleAddProduct}>
        New product
      </Button>
      <Button color="primary" startIcon={<Upload/>} onClick={handleAddProduct}>
        Import products
      </Button>
    </GridToolbarContainer>
  );
}

export default function ProductsPage() {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // TODO add different currencies
  const priceFormatter: GridColDef['valueFormatter'] = (value: number) => `£${value.toFixed(2)}`;

  const columns: GridColDef[] = [
    {field: 'sku', headerName: 'SKU', width: 128},
    {field: 'description', headerName: 'Description', flex: 1},
    {field: 'quantity', headerName: 'Available Quantity', align: 'right', headerAlign: 'right'},
    {field: 'quantityOrdered', headerName: 'Ordered Quantity', align: 'right', headerAlign: 'right'},
    {field: 'minQuantity', headerName: 'Min Qty', align: 'right', headerAlign: 'right'},
    {field: 'price', headerName: 'Price', width: 112, align: 'right', headerAlign: 'right', valueFormatter: priceFormatter},
    {field: 'location', headerName: 'Location'},
    {field: 'tags', headerName: 'Tags'},
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      getRowClassName={(params) => {
        if (params.row.quantity === 0) return 'MuiDataGrid-rowError';
        if (params.row.quantity < params.row.minQuantity) return 'MuiDataGrid-rowWarning';
        return '';
      }}
      slots={{toolbar: EditToolbar as GridSlots['toolbar']}}
      slotProps={{toolbar: {setRows, setRowModesModel}}}
    />
  );
}