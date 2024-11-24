import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (firstName, lastName, email, password, gender) => {
    setIsLoading(true);
    setError(null);

    try {
      // Making the POST request using axios
      const response = await axios.post("/api/user/signup", {
        firstName,
        lastName,
        email,
        password,
        gender
      });

      const {user, token} = await response.data;
      //save user to local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user, token
        })
      );

      // Update auth context with the newly signed-up user
      dispatch({ type: "LOGIN", payload: {...user, token} });
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      // If the server provides a specific error message, use it, otherwise use a generic message
      setError(err.response?.data?.error || "Signup failed. Please try again.");
      return {
        success: false,
        error: err.response?.data?.error || "Signup failed. Please try again.",
      };
    }
  };
  return { signup, isLoading, error };
};
