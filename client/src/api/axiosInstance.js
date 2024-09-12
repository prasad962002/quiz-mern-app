// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // You can add Authorization header here if needed
    // Authorization: `Bearer ${your_token}`,
  },
  timeout: 1000, // Optional: Set a timeout for requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse the user object from local storage
    const token = user?.token; // Optional chaining in case user is null
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set the Authorization header
    }
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Handle the error
  }
);

export default axiosInstance;
