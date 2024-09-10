import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();
  console.log(user);
  

  // If `user` is not available yet, render a loading or placeholder UI
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}! {JSON.stringify(user)} </h1>

      {user.role === "admin" && (
        <div>
          <h2>Admin Section</h2>
          <p>This content is only visible to admin users.</p>
        </div>
      )}

      {user.role === "user" && (
        <div>
          <h2>User Section</h2>
          <p>This content is only visible to normal users.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
