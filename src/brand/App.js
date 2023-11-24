import '../App.css';
import {Button} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React from 'react';
import BasicModal from './Modal';
import {appAxios} from "../index";

function DataTable() {
  const [rows, setRows] = React.useState([])

  const getAllProducts = React.useCallback(() => {
    appAxios.get("http://localhost:48080/admin/data").then((res) => {
      setRows(res.data.result.brands)
    })
  }, [])

  React.useEffect(() => {
    getAllProducts()
  }, [])

  const deleteBrand = React.useCallback(async (brandId) => {
    const {data, refetch} = await appAxios.delete(`http://localhost:48080/admin/brand/${brandId}`)
    console.log(brandId, data)
    getAllProducts()
  }, [])


  const columns = [
    {field: 'brandId', headerName: 'ID', width: 100},
    {field: 'brandName', headerName: 'Name', width: 150},
    {
      headerName: 'Action',
      sortable: false,
      width: 160,
      flex: 1,
      getActions: "",
      renderHeader: (params) => (<strong>
        <span>Actions</span>
        <BasicModal item={{
          brandId: null, brandName: "",
        }} btnText={"ADD"} sync={getAllProducts}/>
      </strong>),
      renderCell: (params) => (
        <strong>
          <BasicModal item={params.row} btnText={"EDIT"} sync={getAllProducts}/>
          <Button
            variant="contained"
            size="small"
            style={{marginLeft: 16}}
            onClick={() => {
              deleteBrand(params.row.brandId)
            }}
          >
            Remove
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <div style={{width: '100%'}}>
      <DataGrid
        getRowId={(v) => {
          return v.brandId
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
    </div>
  );
}

export default function Brand() {
  return (
    <div className="App">
      <h3>Brands</h3>
      <header className="App-header">
        <DataTable
        />
      </header>
    </div>
  );
}