import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Check if user is a string (and thus needs parsing)
      const newUser = typeof user === "string" ? JSON.parse(user) : user;

      console.log(newUser);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
