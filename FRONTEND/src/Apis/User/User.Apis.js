import axiosInstance from "../../utils/axios.instance";

class User {

  static async registerUser(data) {
    try {

      if (!data) throw new Error("No data provided for registration");
      if (!data.email) throw new Error("Email is required for registration");
      if (!data.password) throw new Error("Password is required for registration");
      if (!data.username) throw new Error("Username is required for registration");
      if (!data.full_name) throw new Error("Full name is required for registration");

      const response = await axiosInstance.post("/api/v1/users/register", data);

      console.log("Registration response: ", response);
      return response;

    } catch (error) {
      return error.response;
    }
  }

  static async loginUser(data) {

    try {
      const response = await axiosInstance.post("/api/v1/users/login", data);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async logoutUser() {
    try {
      const response = await axiosInstance.post("/api/v1/users/logout");
      return response;
    } catch (error) {
      return error.response;
    }
  }

}


export default User;