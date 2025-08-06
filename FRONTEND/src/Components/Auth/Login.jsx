// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios.instance";
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();
  const [userData,setUserData] = useState({email:"",password:""});
  const changeHandler = (e)=>{
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleFormData = async (event)=>{
     event.preventDefault();
        try {
            const response = await axiosInstance.post(
                "/api/v1/users/login",
                userData
            );
            console.log(response.data.data);
            navigate("/settings");
        } catch (error) {
          console.log(error);
        } 
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Instagram
        </h2>
        <form onSubmit={handleFormData}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeHandler}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeHandler}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
