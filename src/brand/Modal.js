import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FormControl, Input, InputLabel} from '@mui/material';
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
    setItem(props.item)
    setOpen(false)
  };
  const {sync, btnText} = props

  const [item, setItem] = React.useState(props.item)

  const updateItem = React.useCallback(async () => {
    const {data, refetch} = await appAxios.post(`http://localhost:48080/admin/brand`, item)
    sync()
    setOpen(false)
  }, [item])

  React.useEffect(() => {
    if(item.brandId == null){
      setItem({
        ...item,
        brandId: uuidv4()
      })
    }
  }, [item])


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
      {!!item ? (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {item.brandId}
          </Typography>

          <FormControl fullWidth style={{marginTop: "10px"}}>
            <InputLabel id="demo-simple-select-label">Name</InputLabel>
            <Input
              onChange={(e) => {
                let value = e.target.value?.trim()
                setItem({
                  ...item,
                  brandName: value
                })
              }}
              value={item.brandName}
            />
          </FormControl>
          <Box>
            <Button
              onClick={updateItem}
            >Update</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>) : <></>}

    </>
  );
}