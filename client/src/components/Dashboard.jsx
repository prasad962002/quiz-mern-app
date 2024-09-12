import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();

  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate(`/dashboard/${user.role}`) : navigate("/login");
  }, [navigate, user]);

  // If `user` is not available yet, render a loading or placeholder UI
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}! </h1>
    </div>
  );
};

export default Dashboard;
