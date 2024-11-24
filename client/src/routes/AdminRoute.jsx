import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Outlet } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import toast from "react-hot-toast";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axiosInstance.get("/user/admin-auth");
        response.data.ok ? setOk(true) : setOk(false);
        console.log(response.data);
      } catch (error) {        
        toast.error("You are not authorized to view this page.");
      }
    };

    authCheck();
  }, []);
  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
