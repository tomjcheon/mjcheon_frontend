import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage, {DefaultPage} from './error';
import axios from "axios";
import Product from "./product/App";
import Category from "./category/App";
import Brand from "./brand/App";
import {Box, Divider, Link, List, ListItem} from "@mui/material";
import ApiView1 from "./api/View1";
import ApiView2 from "./api/View2";
import ApiView3 from "./api/View3";

export const appAxios = axios.create({
  baseURL: `http://localhost:48080`,
  timeout: 30000,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/product",
    element: <Product/>,
  },
  {
    path: "/category",
    element: <Category/>,
  },
  {
    path: "/brand",
    element: <Brand/>,
  },
  {
    path: "/api/1",
    element: <ApiView1/>,
  },
  {
    path: "/api/2",
    element: <ApiView2/>,
  },
  {
    path: "/api/3",
    element: <ApiView3/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Box sx={{width: '100%', maxWidth: 360}}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <h2>Admin</h2>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/product" variant="body2">
              <span>Product</span>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/category" variant="body2">
              <span>Category</span>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/brand" variant="body2">
              <span>Brand</span>
            </Link>
          </ListItem>
        </List>
      </nav>
      <Divider/>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <h2>Api</h2>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/api/1" variant="body2">
              <span>Api View 1</span>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/api/2" variant="body2">
              <span>Api View 2</span>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/api/3" variant="body2">
              <span>Api View 3</span>
            </Link>
          </ListItem>
        </List>
      </nav>
    </Box>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
