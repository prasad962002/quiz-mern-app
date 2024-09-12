import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const UserDashboard = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>User Dashboard</h1>
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
