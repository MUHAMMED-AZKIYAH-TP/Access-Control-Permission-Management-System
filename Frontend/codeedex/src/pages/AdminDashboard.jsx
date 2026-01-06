import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <Link to="/admin/users">Users</Link> |{" "}
        <Link to="/admin/roles">Roles</Link> |{" "}
        <Link to="/admin/audit">Audit Logs</Link>
      </nav>
    </div>
  );
};

export default AdminDashboard;
