import React from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import Home from "../Pages/Home.jsx";
import MyLists from "../Pages/MyLists.jsx";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mylists" element={<MyLists />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
