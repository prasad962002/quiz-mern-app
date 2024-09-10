import { createContext, useReducer, useEffect, useMemo } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Define action types as constants
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Reducer function
export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.payload };
    case LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

// AuthContext Provider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: LOGIN, payload: JSON.parse(storedUser) });
    }
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
