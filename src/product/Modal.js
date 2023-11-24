import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FormControl, Input, InputLabel, MenuItem, Select} from '@mui/material';
import {appAxios} from "../index";
import {v4 as uuidv4} from "uuid";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setProduct(props.product)
    setOpen(false)
  };
  const {categories, brands, sync, btnText} = props

  const [product, setProduct] = React.useState(props.product)

  const updateProduct = React.useCallback(async () => {
    const {data, refetch} = await appAxios.post(`http://localhost:48080/admin/product`, product)
    sync()
    setOpen(false)
  }, [product])

  React.useEffect(() => {
    if (product.productId == null) {
      setProduct({
        ...product,
        productId: uuidv4()
      })
    }
  }, [product])

  return (
    <>
      <Button
        variant="contained"
        size="small"
        style={{marginLeft: 16}}
        onClick={handleOpen}
      >
        {btnText}
      </Button>
      {!!product ? (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {product.productId}
          </Typography>
          <FormControl fullWidth style={{marginTop: "10px"}}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              value={product.categoryId}
              label="Category"
              onChange={(e) => {
                setProduct({
                  ...product,
                  categoryId: e.target.value
                })
              }

              }
            >{categories?.map((category) => {
              return <MenuItem value={category.categoryId}>{category.categoryName}</MenuItem>
            })}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{marginTop: "10px"}}>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              value={product.brandId}
              label="Brand"
              onChange={(e) => {
                setProduct({
                  ...product,
                  brandId: e.target.value
                })
              }}

            >
              {brands?.map((brand) => {
                return <MenuItem value={brand.brandId}>{brand.brandName}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{marginTop: "10px"}}>
            <InputLabel id="demo-simple-select-label">Price</InputLabel>
            <Input
              onChange={(e) => {
                let price = parseInt(e.target.value) || 0
                setProduct({
                  ...product,
                  price: price
                })
              }}
              value={product.price}
            />
          </FormControl>
          <Box>
            <Button
              onClick={updateProduct}
            >Update</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>) : <></>}

    </>
  );
}