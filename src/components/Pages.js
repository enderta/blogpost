import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import Landingpage from "./LandingPage";
import Login from "./Login";
import Read from "./Read"

function Pages() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/read/:id' element={<Read />} />
        {isAuthenticated && (
          <>
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default Pages;