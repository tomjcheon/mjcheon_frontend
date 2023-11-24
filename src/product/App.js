import '../App.css';
import {Button} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React from 'react';
import BasicModal from './Modal';
import {appAxios} from "../index";

function DataTable() {
  const [rows, setRows] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [brands, setBrands] = React.useState([])

  const getAllProducts = React.useCallback(() => {
    appAxios.get("http://localhost:48080/admin/data").then((res) => {
      setRows(res.data.result.products)
      setCategories(res.data.result.categories)
      setBrands(res.data.result.brands)
    })
  }, [])

  React.useEffect(() => {
    getAllProducts()
  }, [])

  const deleteProduct = React.useCallback(async (productId) => {
    const {data, refetch} = await appAxios.delete(`http://localhost:48080/admin/product/${productId}`)
    console.log(productId, data)
    getAllProducts()
  }, [])


  const columns = [
    {field: 'productId', headerName: 'ID', width: 100},
    {field: 'categoryName', headerName: 'Category', width: 150},
    {field: 'brandName', headerName: 'Product', width: 150},
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return params.value.toLocaleString();
      },

    },
    {
      headerName: 'Action',
      sortable: false,
      width: 160,
      flex: 1,
      getActions: "",
      renderHeader: (params) => (<strong>
        <span>Actions</span>
        <BasicModal product={{
          productId: null,
          categoryId: "",
          brandId: "",
          price: 0,
        }} btnText={"ADD"} categories={categories} brands={brands} sync={getAllProducts}/>
      </strong>),
      renderCell: (params) => (
        <strong>
          <BasicModal product={params.row} categories={categories} brands={brands} sync={getAllProducts}
                      btnText={"EDIT"}/>
          <Button
            variant="contained"
            size="small"
            style={{marginLeft: 16}}
            onClick={() => {
              deleteProduct(params.row.productId)
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
          return v.productId
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

export default function Product() {
  return (
    <div className="App">
      <h3>Products</h3>
      <header className="App-header">
        <DataTable
        />
      </header>
    </div>
  );
}

