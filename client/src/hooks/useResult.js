import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useResult = () => {
  const [results, setResults] = useState([]); //for multiple results
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllResults = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/result");
      setResults(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to fetch results.");
      toast.error("Failed to fetch results.")
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllResultsByUserId = async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/result/user/${userId}`);
      setResults(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to fetch results.");
      toast.error("Failed to fetch results.")
    } finally {
      setIsLoading(false);
    }
  };

  
  return {
    results,
    error,
    isLoading,
    fetchAllResults,
    fetchAllResultsByUserId
  };
};
