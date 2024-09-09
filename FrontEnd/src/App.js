import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
       <Router/>
    </BrowserRouter>
  );
}

export default App;
