// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(userData);
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.full_name
    ) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:8080/api/v1/users/register", userData)
      .then((response) => {
        console.log(response.data);
        alert("Registration successful!");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed. Please try again.");
      });
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
