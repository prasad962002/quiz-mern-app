import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Custom hook to access AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // Ensure the context is being used within the AuthContextProvider
  if (!context) {
    throw new Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
