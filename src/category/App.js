import '../App.css';
import {Box, Button, Divider, Link, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React from 'react';
import BasicModal from './Modal';
import {appAxios} from "../index";

function DataTable() {
  const [rows, setRows] = React.useState([])

  const getAllProducts = React.useCallback(() => {
    appAxios.get("http://localhost:48080/admin/data").then((res) => {
      setRows(res.data.result.categories)
    })
  }, [])

  React.useEffect(() => {
    getAllProducts()
  }, [])

  const deleteCategory = React.useCallback(async (categoryId) => {
    const {data, refetch} = await appAxios.delete(`http://localhost:48080/admin/category/${categoryId}`)
    console.log(categoryId, data)
    getAllProducts()
  }, [])


  const columns = [{field: 'categoryId', headerName: 'ID', width: 100}, {
    field: 'categoryName', headerName: 'Name', width: 150
  }, {
    headerName: 'Action', sortable: false, width: 160, flex: 1, getActions: "",
    renderHeader: (params) => (<strong>
      <span>Actions</span>
      <BasicModal item={{
        categoryId: null, categoryName: "",
      }} btnText={"ADD"} sync={getAllProducts}/>
    </strong>),
    renderCell: (params) => (<strong>
      <BasicModal item={params.row} btnText={"EDIT"} sync={getAllProducts}/>
      <Button
        variant="contained"
        size="small"
        style={{marginLeft: 16}}
        onClick={() => {
          deleteCategory(params.row.categoryId)
        }}
      >
        Remove
      </Button>
    </strong>),
  },];

  return (<div style={{width: '100%'}}>
    <Box sx={{width: '100%', maxWidth: 360}}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>

            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText><p>dd</p></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider/>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <Link href="/" variant="body2">
              {'variant="body2"'}
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Drafts"/>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    <DataGrid
      getRowId={(v) => {
        return v.categoryId
      }}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {page: 0, pageSize: 10},
        },
      }}
      pageSizeOptions={[10, 10]}
    />
  </div>);
}

export default function Category() {
  return (<div className="App">
    <h3>Categories</h3>
    <header className="App-header">
      <DataTable
      />
    </header>
  </div>);
}