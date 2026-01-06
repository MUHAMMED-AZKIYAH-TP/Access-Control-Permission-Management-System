import { useEffect, useState } from "react";
import { apiAudit } from "../api/axiosAudits";
import Navbar from "../components/Navbar";

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        apiAudit.get("")
            .then(res => setLogs(res.data))
            .catch(() => alert("No permission"));
    }, []);

    return (
        <>
            <Navbar />

            {/* DASHBOARD WRAPPER */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ml-64">

                {/* HEADER */}
                <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-6 flex justify-between items-center shadow-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Audit Logs</h1>
                            <p className="text-sm text-blue-100">
                                Monitor system activities and user actions
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-2">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Admin User</p>
                            <p className="text-xs text-blue-100">Administrator</p>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md">

                            {logs.length === 0 ? (
                                <p className="text-gray-600">No audit logs available</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-2 ">ID</th>
                                                <th className="px-4 py-2 ">Action</th>
                                                <th className="px-4 py-2 ">Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {logs.map(log => (
                                                <tr key={log.id} className="border-t">
                                                    <td className="px-4 py-2">{log.id}</td>
                                                    <td className="px-4 py-2">{log.action}</td>
                                                    <td className="px-4 py-2">{log.created_at}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AuditLogs;
