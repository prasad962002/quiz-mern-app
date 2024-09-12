import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      const response = await axiosInstance.get("/user/admin-auth");
      response.data.ok ? setOk(true) : setOk(false);
    };

    authCheck();
  });
  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
