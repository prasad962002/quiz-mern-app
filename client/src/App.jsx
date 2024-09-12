import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import FAQDropdown from "./components/FAQDropdown";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import UserDashboard from "./pages/user/userDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/faq" element={<FAQDropdown />} />
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
