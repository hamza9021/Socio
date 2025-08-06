// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios.instance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });

  function handleFormDataChange(event) {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log(userData);
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.full_name
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/api/v1/users/register",
        userData
      );
      console.log(response.data.data);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Failed to create account. Please try again.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign up
        </h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="full_name"
            value={userData.full_name}
            onChange={handleFormDataChange}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="username"
            value={userData.username}
            onChange={handleFormDataChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="email"
            value={userData.email}
            onChange={handleFormDataChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="password"
            value={userData.password}
            onChange={handleFormDataChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            onClick={handleFormSubmit}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
