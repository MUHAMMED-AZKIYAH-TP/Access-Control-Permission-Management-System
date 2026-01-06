import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiAccesscontrol } from "../api/axiosAccesscontrol";

const Permissions = () => {
    const [code, setCode] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPermissions = async () => {
        try {
            const res = await apiAccesscontrol.get("permissions/list/");
            setPermissions(res.data);
        } catch {
            setError("You don't have permission to view permissions");
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    const createPermission = async () => {
        if (!code.trim()) return alert("Permission code is required");
        try {
            setLoading(true);
            await apiAccesscontrol.post("permissions/", { code });
            setCode("");
            fetchPermissions();
        } finally {
            setLoading(false);
        }
    };

    const deletePermission = async (permissionId) => {
        if (!confirm("Are you sure you want to delete this permission?")) return;
        try {
            await apiAccesscontrol.delete(`permissions/list/${permissionId}/`);
            alert("Permission deleted successfully");
            fetchPermissions();
        } catch (error) {
            alert("Failed to delete permission");
        }
    };


    return (
        <>
            <Navbar />

            {/* DASHBOARD WRAPPER */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ml-64">

                {/* HEADER */}
                <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-6 flex justify-between items-center shadow-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl font-bold">🔐</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Permission Management
                            </h1>
                            <p className="text-sm text-blue-100">
                                Define and manage system permissions
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-2">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                A
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Admin User</p>
                                <p className="text-xs text-blue-100">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="p-8">
                    <div className="max-w-4xl mx-auto">

                        {error && (
                            <p className="text-red-500 bg-red-50 p-4 rounded-md mb-6">
                                {error}
                            </p>
                        )}

                        {/* CREATE PERMISSION */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-xl font-semibold mb-4">
                                Create New Permission
                            </h3>

                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="permission_code"
                                className="w-full mb-4 px-4 py-2 border rounded-md"
                            />

                            <button
                                onClick={createPermission}
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                {loading ? "Creating..." : "Create Permission"}
                            </button>
                        </div>

                        {/* PERMISSIONS LIST */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">
                                Existing Permissions
                            </h3>

                            {permissions.length === 0 ? (
                                <p className="text-gray-500">No permissions found</p>
                            ) : (
                                <table className="w-full border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-2 text-left">ID</th>
                                            <th className="p-2 text-left">Code</th>
                                            <th className="p-2 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permissions.map((p) => (
                                            <tr key={p.id} className="border-t hover:bg-gray-50">
                                                <td className="p-2">{p.id}</td>
                                                <td className="p-2">
                                                    <span className="font-medium">{p.code}</span>
                                                </td>
                                                <td className="p-2">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => deletePermission(p.id)}
                                                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
};

export default Permissions;
