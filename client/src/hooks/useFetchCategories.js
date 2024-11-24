import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data.categories); // Assuming the response structure contains categories
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch categories.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, error, isLoading, fetchCategories };
};
