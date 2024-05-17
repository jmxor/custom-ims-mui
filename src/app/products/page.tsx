'use client';

import ProductDetailsDialog from '@/components/ProductDetailsDialog';
import {Add} from '@mui/icons-material';
import {Button} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridSlots,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import {useState} from 'react';

export interface ProductData {
  sku: string,
  description: string
  quantityStock: number,
  quantityOrdered: number,
  quantityWarn: number,
  price: number
  location: string,
}

interface EditToolbarProps {
  setModalOpen: (state: boolean) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const {setModalOpen} = props;
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarFilterButton/>
      <GridToolbarDensitySelector/>

      <Button color="primary" size="small" startIcon={<Add/>} sx={{placeSelf: 'end'}}
              onClick={() => setModalOpen(true)}>
        New product
      </Button>
    </GridToolbarContainer>
  );
}

export default function ProductsPage() {
  const [rows, setRows] = useState<ProductData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // TODO add different currencies
  const priceFormatter: GridColDef['valueFormatter'] = (value: number) => `£${value.toFixed(2)}`;
  const quantityFormatter: GridColDef['valueFormatter'] = (value: number) => `£${value.toFixed(2)}`;

  const columns: GridColDef[] = [
    {field: 'sku', headerName: 'SKU', width: 128},
    {field: 'description', headerName: 'Description', flex: 1},
    {field: 'quantityStock', headerName: 'Quantity', width: 128, align: 'right', headerAlign: 'right'},
    {field: 'quantityWarn', headerName: 'Min Qty', align: 'right', headerAlign: 'right'},
    {field: 'price', headerName: 'Price', width: 112, align: 'right', headerAlign: 'right', valueFormatter: priceFormatter},
    {field: 'location', headerName: 'Location', align: 'right', headerAlign: 'right'},
    {field: 'tags', headerName: 'Tags'},
  ];

  return (
    <>
      <ProductDetailsDialog
        open={modalOpen}
        setOpen={setModalOpen}
        addProduct={(product: ProductData) => setRows(prevRows => [...prevRows, product])}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        getRowId={(row: ProductData) => row.sku}
        getRowClassName={(params) => {
          if (params.row.quantityStock === 0) return 'MuiDataGrid-rowError';
          if (params.row.quantityStock < params.row.quantityWarn) return 'MuiDataGrid-rowWarning';
          return '';
        }}
        slots={{toolbar: EditToolbar as GridSlots['toolbar']}}
        slotProps={{toolbar: {setModalOpen}}}
        autoHeight
        // loading
      />
    </>
  );
}