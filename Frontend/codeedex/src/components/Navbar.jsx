import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "12px 20px",
        backgroundColor: "#1f2937",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT */}
      <div>
        <Link
          to="/"
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          Access Control System
        </Link>
      </div>

      {/* CENTER */}
      <div>
        <Link
          to="/admin/users"
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          Users
        </Link>

        <Link
          to="/admin/roles"
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          Roles
        </Link>

        <Link
          to="/admin/audit"
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          Audit Logs
        </Link>
      </div>

      {/* RIGHT */}
      <div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ef4444",
            border: "none",
            color: "white",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
