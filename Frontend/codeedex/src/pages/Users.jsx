import { useEffect, useState } from "react";
import { apiAccounts } from "../api/axiosAccounts";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiAccounts.get("users/")
      .then(res => setUsers(res.data))
      .catch(() => alert("Access denied"));
  }, []);

  return (
    <div>
      <h3>Users</h3>
      {users.map(u => (
        <div key={u.id}>
          {u.username} ({u.team})
        </div>
      ))}
    </div>
  );
};

export default Users;
