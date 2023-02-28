import React from "react";
import { useSelector } from "react-redux";
import axios from "../util/api";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";

const AppContainer = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  if (user && token) {
    axios.defaults.headers.common.Authorization = "Bearer " + token;
  }

  return (
    <>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default AppContainer;
