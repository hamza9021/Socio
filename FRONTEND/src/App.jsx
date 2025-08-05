import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
