import { useEffect, useState } from "react";
import  { apiAccounts } from "../api/axiosAccounts";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    apiAccounts.get("audit/")
      .then(res => setLogs(res.data))
      .catch(() => alert("No permission"));
  }, []);

  return (
    <div>
      <h3>Audit Logs</h3>
      {logs.map(log => (
        <p key={log.id}>
          {log.actor} - {log.action} - {log.created_at}
        </p>
      ))}
    </div>
  );
};

export default AuditLogs;
