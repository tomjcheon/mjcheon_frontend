import '../App.css';
import React from 'react';

import {appAxios} from "../index";
import {ApiResponseCard} from "./App";

function ApiDataView() {
  const [apiData, setApiData] = React.useState("{}")

  const callApi = React.useCallback(() => {
    appAxios.get("http://localhost:48080/service/brand/lowest-price").then((res) => {
      setApiData(res.data.result)
    })
  }, [])

  React.useEffect(() => {
    callApi()
  }, [])

  return (
    <div style={{width: '100%'}}>
      <ApiResponseCard text={apiData}/>
    </div>
  );
}

export default function ApiView2() {
  return (
    <div className="App">
      <h3>API Call View</h3>
      <header className="App-header">
        <ApiDataView/>
      </header>
    </div>
  );
}