import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useQuiz = () => {
  const [quizzes, setQuizzes] = useState([]); //for multiple quizzes
  const [quiz, setQuiz] = useState(null); //for single quiz
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllQuizzes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/quiz");
      setQuizzes(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to fetch quizzes.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuizById = async (quizId) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetchong quiz by Idhook");
      const response = await axiosInstance.get(`/quiz/${quizId}`);
      setQuiz(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
      setError(error.message || "Failed to fetch quiz details.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuizzesByCategory = async (categoryId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/quiz/category/${categoryId}`);
      setQuizzes(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch quizzes by category.");
      toast.error("Failed to fetch quizzes by category.")
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuizByCode = async (quizCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/quiz/code/${quizCode}`);
      setQuiz(response.data.quiz);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch quiz by code.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteQuizById = async (quizId) => {
    try {
      setIsLoading(true);
      setError(null);
      await axiosInstance.delete(`/quiz/${quizId}`);
      toast.success("Quiz deleted successfully!")
    } catch (error) {
      setError(error.response?.data?.error || "Failed to fetch quiz by code.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublishQuiz = async (quizId) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.put(`/quiz/toggle-publish/${quizId}`);
      const updatedQuiz = response.data.quiz;

      // Update quizzes state with the modified quiz
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((q) => (q._id === updatedQuiz._id ? updatedQuiz : q))
      );
    } catch (error) {
      setError(error.response?.data?.error || "Failed to toggle publish status.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    quizzes,
    quiz,
    error,
    isLoading,
    fetchAllQuizzes,
    fetchQuizById,
    fetchQuizzesByCategory,
    fetchQuizByCode,
    deleteQuizById,
    togglePublishQuiz
  };
};
