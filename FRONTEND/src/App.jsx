import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login, Signup, Settings } from "./Components";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
