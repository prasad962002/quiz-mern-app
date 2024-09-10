import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuthContext();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If the user doesn't have the required role, redirect to a forbidden page
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default ProtectedRoute;
