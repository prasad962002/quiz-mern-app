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
      return {...state, user: action.payload };
    case LOGOUT:
      return {...state,  user: null };
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
      const parsedUser = JSON.parse(storedUser);
      const {token, ...userData} = parsedUser;
      dispatch({ type: LOGIN, payload: {...userData, token} });
    }
  }, []);

  return (
    <AuthContext.Provider value={{user : state.user, token : state.user?.token, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
