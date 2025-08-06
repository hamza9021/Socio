// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios.instance";

export default function Settings() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    bio: "",
    password: "",
    profile_pic_url: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/api/v1/users/profile");
        console.log(response.data.data);
        setFormData((prev) => ({
          ...prev,
          ...response.data.data,
          password: "", 
        }));
        if (response.data.data.profile_pic_url) {
          setPreviewImage(response.data.data.profile_pic_url);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_pic_url" && files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        profile_pic_url: files[0],
      }));

      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("full_name", formData.full_name);
    data.append("bio", formData.bio);
    if (formData.password) {
      data.append("password", formData.password);
    }
    if (formData.profile_pic_url instanceof File) {
      data.append("profile_pic_url", formData.profile_pic_url);
    }

    try {
      const response = await axiosInstance.put(
        "/api/v1/users/update",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert(
        "Failed to update profile: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Settings
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-4">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <img
                src="/default-avatar.png"
                alt="Default"
                className="w-24 h-24 rounded-full object-cover"
              />
            )}

            <input
              type="file"
              name="profile_pic_url"
              onChange={handleChange}
              accept="image/*"
              className="mt-2"
            />
          </div>

          {/* Full Name */}
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.full_name || ""}
            onChange={handleChange}
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.username || ""}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Your bio"
            rows="3"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.bio || ""}
            onChange={handleChange}
          ></textarea>

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="New Password (leave blank to keep current)"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
