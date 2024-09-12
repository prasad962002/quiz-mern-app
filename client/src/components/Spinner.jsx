import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevalue) => prevalue - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count == 0) {
      navigate(`/${path}`, { state: location.pathname });
    }
  }, [count, navigate, location, path]);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center text-xl font-semibold">
        Redirecting you in {count} second{count !== 1 ? "s" : ""}
      </h1>

      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
