import Layout from "../../components/layout/Layout";
import { useAuthContext } from "../../hooks/useAuthContext";


const AdminDashboard = () => {
  const {user} = useAuthContext();  
  return (
    <Layout role="admin">
      <div className="mt-20 text-2xl font-semibold text-center">   
        <h1>Admin Dashboard</h1>
        <p>Welcome {user.name} !</p>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
