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

      const { user, token } = response.data;

      // Store user data in local storage and dispatch login action
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          token,
        })
      );

      dispatch({ type: "LOGIN", payload: { ...user, token } });

      setIsLoading(false);
      setError(null);
      return { success: true, role: user.role };
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
