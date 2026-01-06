import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiAccesscontrol } from "../api/axiosAccesscontrol";
import { apiAccounts } from "../api/axiosAccounts";

const AssignRoleToUser = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userId, setUserId] = useState("");
    const [roleId, setRoleId] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        apiAccounts.get("users/").then(res => setUsers(res.data));
        apiAccesscontrol.get("roles/").then(res => setRoles(res.data));
    }, []);

    const assignRole = async () => {
        // 🔒 Basic validation
        if (!userId || !roleId) {
            alert("Please select both user and role");
            return;
        }

        try {
            setLoading(true);
            await apiAccesscontrol.post(
                `users/${userId}/roles/`,
                {
                    role_id: roleId,
                    start_at: startAt ? startAt : null,
                    end_at: endAt ? endAt : null,
                }
            );

            alert("✅ Role assigned successfully");

            // optional reset
            setUserId("");
            setRoleId("");
            setStartAt("");
            setEndAt("");

        } catch (error) {
            console.error("Assign role error:", error.response);

            if (error.response?.status === 403) {
                alert("❌ You don't have permission to assign roles");
            } else if (error.response?.status === 404) {
                alert("❌ User or role not found");
            } else {
                alert("❌ Server error while assigning role");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ml-64">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b border-indigo-200 px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Assign Role to User</h1>
                            <p className="text-sm text-blue-100">Assign roles and permissions to users</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-2">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold shadow-md">
                                A
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Admin User</p>
                                <p className="text-xs text-blue-100">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="p-8">
                    <div className="max-w-4xl mx-auto">

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Select User</label>
                                    <select
                                        value={userId}
                                        onChange={e => setUserId(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select User</option>
                                        {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Select Role</label>
                                    <select
                                        value={roleId}
                                        onChange={e => setRoleId(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Role</option>
                                        {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Start Date (optional)</label>
                                    <input
                                        type="datetime-local"
                                        value={startAt}
                                        onChange={e => setStartAt(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">End Date (optional)</label>
                                    <input
                                        type="datetime-local"
                                        value={endAt}
                                        onChange={e => setEndAt(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    onClick={assignRole}
                                    disabled={loading}
                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-400"
                                >
                                    {loading ? "Assigning..." : "Assign Role"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssignRoleToUser;
