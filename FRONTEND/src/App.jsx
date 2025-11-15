import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RegisterPage, LoginPage, HomePage } from "./Pages";


export default function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}
