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

                        {/* Stats Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 mb-8 hover:shadow-2xl transition-all duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-800">{logs.length}</h4>
                                    <p className="text-gray-600">Total Logs</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-800">{logs.filter(log => log.action && log.action.includes('success')).length}</h4>
                                    <p className="text-gray-600">Successful Actions</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-800">{logs.filter(log => log.action && log.action.includes('failed')).length}</h4>
                                    <p className="text-gray-600">Failed Actions</p>
                                </div>
                            </div>
                        </div>

                        {/* Audit Logs Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Audit Logs</h3>
                            </div>

                            {logs.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    <p className="text-gray-500 text-lg">No audit logs available</p>
                                    <p className="text-gray-400 text-sm">System activities will appear here</p>
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-xl border border-gray-200">
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {logs.map((log, index) => (
                                                <tr key={log.id} className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                            log.action && log.action.includes('success')
                                                                ? 'bg-green-100 text-green-800'
                                                                : log.action && log.action.includes('failed')
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {log.action}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {new Date(log.created_at).toLocaleString()}
                                                    </td>
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
