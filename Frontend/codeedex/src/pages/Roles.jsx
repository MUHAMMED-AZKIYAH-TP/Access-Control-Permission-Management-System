import { useEffect, useState } from "react";
import { apiAccesscontrol } from "../api/axiosAccesscontrol";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------------------------
  // Fetch roles
  // -------------------------
  const fetchRoles = async () => {
    try {
      const res = await apiAccesscontrol.get("access/roles/");
      setRoles(res.data);
    } catch (err) {
      setError("You do not have permission to view roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // -------------------------
  // Create role
  // -------------------------
  const createRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("access/roles/", {
        name: roleName,
      });
      setRoleName("");
      fetchRoles();
    } catch (err) {
      setError("You do not have permission to create role");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h2>Role Management</h2>

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* CREATE ROLE */}
      <form onSubmit={createRole} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Role"}
        </button>
      </form>

      {/* ROLE LIST */}
      <h3>Existing Roles</h3>
      {roles.length === 0 ? (
        <p>No roles found</p>
      ) : (
        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              <strong>{role.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Roles;
