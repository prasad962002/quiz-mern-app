import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // Making the POST request using axios
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });

      const json = response.data;

      // Store user data in local storage and dispatch login action      
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: json.user.name,
          email: json.user.email,
          role: json.user.role,
          token: json.token,
        })
      );

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      setError(null);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      // If the server provides a specific error message, use it, otherwise use a generic message
      setError(err.response?.data?.error || "Login failed. Please try again.");
      return {
        success: false,
        error: err.response?.data?.error || "Login failed. Please try again.",
      };
    }
  };

  return { login, isLoading, error };
};
