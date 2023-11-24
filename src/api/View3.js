import '../App.css';
import React from 'react';

import {appAxios} from "../index";
import {ApiResponseCard} from "./App";
import {FormControl, Input, InputLabel} from "@mui/material";

function ApiDataView() {
  const [apiData, setApiData] = React.useState("{}")
  const [categoryName, setCategoryName] = React.useState("")

  const callApi = React.useCallback(() => {
    if (!!categoryName) {
      appAxios.get(`http://localhost:48080/service/category/brand-price/${categoryName}`).then((res) => {
        setApiData(res.data.result)
      }).catch(() => {
        console.log("No Result")
      })
    }
  }, [categoryName])

  React.useEffect(() => {
    callApi()
  }, [categoryName])

  return (
    <div style={{width: '100%'}}>
      <FormControl fullWidth style={{marginTop: "10px"}}>
        <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
        <Input
          label={"Category Name"}
          onChange={(e) => {
            let value = e.target.value?.trim()
            setCategoryName(value)
          }}
          value={categoryName}
        />
      </FormControl>
      <ApiResponseCard text={apiData}/>
    </div>
  );
}

export default function ApiView3() {
  return (
    <div className="App">
      <h3>API Call View</h3>
      <header className="App-header">
        <ApiDataView/>
      </header>
    </div>
  );
}