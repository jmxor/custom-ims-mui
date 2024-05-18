import {ProductData} from '@/app/products/page';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField
} from '@mui/material';
import {Dispatch, SetStateAction, useState} from 'react';

export default function ProductDetailsDialog({open, setOpen, addProduct}: {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
  addProduct: (product: ProductData) => void,
}) {

  const [formData, setFormData] = useState({
    sku: '',
    description: '',
    quantityStock: '',
    quantityOrdered: '',
    quantityWarn: '',
    price: '',
    location: ''
  });
  const [formErrors, setFormErrors] = useState({
    sku: Array<string>(),
    description: Array<string>(),
    quantityStock: Array<string>(),
    quantityOrdered: Array<string>(),
    quantityWarn: Array<string>(),
    price: Array<string>(),
    location: Array<string>(),
  });

  const validateField = (field: string, value: string): string[] => {
    if (field == 'sku' && !value.match('^.+$')) return ['An SKU is required.'];
    if (field == 'description' && !value.match('^.+$')) return ['A description is required.'];
    if (field == 'quantityStock' && !value.match('^\\d+$')) return ['A positive integer stock quantity is required'];
    if (field == 'quantityOrdered' && !value.match('^\\d+$')) return ['A positive integer ordered quantity is required'];
    if (field == 'quantityWarn' && !value.match('^[+]?\\d+$')) return ['A positive integer low stock level is required'];
    if (field == 'price' && !value.match('^\\d+[.]?(\\d{1,2})?$')) return ['A price is required with up to 2dp'];
    // if (field == 'location' && !value.match('^$')) return [];
    return [];
  };

  const clearData = () => {
    const keys = Object.keys(formData);
    let emptyFormData = {...formData};
    let emptyFormErrors = {...formErrors};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      emptyFormData = {...emptyFormData, [key as keyof typeof formData]: ''};
      emptyFormErrors = {...emptyFormErrors, [key as keyof typeof formErrors]: []};
    }
    setFormData(emptyFormData);
    setFormErrors(emptyFormErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name as keyof typeof formData]: value});
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormErrors({...formErrors, [name as keyof typeof formData]: validateField(name, value)});
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    clearData();
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const isValid = Object.values(formErrors).every(x => x.length == 0);
    if (isValid) {
      addProduct({
        sku: formData.sku,
        description: formData.description,
        quantityStock: parseInt(formData.quantityStock),
        quantityOrdered: parseInt(formData.quantityOrdered),
        quantityWarn: parseInt(formData.quantityWarn),
        price: parseInt(formData.price),
        location: formData.location
      });
      clearData();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} disableRestoreFocus fullWidth>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <DialogTitle>New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DialogContentText>
                Description
              </DialogContentText>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                id="sku"
                name="sku"
                label="SKU"
                value={formData.sku}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.sku.length > 0}
                helperText={formErrors.sku}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                multiline
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.description.length > 0}
                helperText={formErrors.description}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="quantityStock"
                name="quantityStock"
                label="Quantity In-Stock"
                value={formData.quantityStock}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.quantityStock.length > 0}
                helperText={formErrors.quantityStock}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="quantityOrdered"
                name="quantityOrdered"
                label="Quantity On Order"
                value={formData.quantityOrdered}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.quantityOrdered.length > 0}
                helperText={formErrors.quantityOrdered}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="quantityWarn"
                name="quantityWarn"
                label="Low Stock Warning Level"
                value={formData.quantityWarn}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.quantityWarn.length > 0}
                helperText={formErrors.quantityWarn}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                name="price"
                label="Price"
                InputProps={{startAdornment: <InputAdornment position="start">£</InputAdornment>,}}
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.price.length > 0}
                helperText={formErrors.price}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location Code"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.location.length > 0}
                helperText={formErrors.location}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error">Discard</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}