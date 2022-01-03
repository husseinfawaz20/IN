import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Comments from "./Comments";
 
ReactDOM.render(
  <BrowserRouter>
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="app" element={<App />}>
        <Route path="db" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </>
  </BrowserRouter>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
