import { useEffect, useState } from "react";
import { apiAccesscontrol } from "../api/axiosAccesscontrol";
import Navbar from "../components/Navbar";

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editingRole, setEditingRole] = useState(null);
    const [editRoleName, setEditRoleName] = useState("");

    // -------------------------
    // Fetch roles
    // -------------------------
    const fetchRoles = async () => {
        try {
            const res = await apiAccesscontrol.get("roles/");
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
            await apiAccesscontrol.post("roles/", {
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
    // Delete role
    // -------------------------
    const deleteRole = async (roleId) => {
        if (!confirm("Are you sure you want to delete this role?")) return;
        try {
            await apiAccesscontrol.delete(`roles/${roleId}/`);
            alert("Role deleted successfully");
            fetchRoles();
        } catch (error) {
            alert("Failed to delete role");
        }
    };

    // -------------------------
    // Edit functions
    // -------------------------
    const startEdit = (role) => {
        setEditingRole(role.id);
        setEditRoleName(role.name);
    };

    const cancelEdit = () => {
        setEditingRole(null);
        setEditRoleName("");
    };

    const updateRole = async () => {
        if (!editRoleName.trim()) {
            alert("Role name is required");
            return;
        }
        try {
            setLoading(true);
            await apiAccesscontrol.put(`roles/${editingRole}/`, { name: editRoleName });
            alert("Role updated successfully");
            cancelEdit();
            fetchRoles();
        } catch (error) {
            alert("Failed to update role");
        } finally {
            setLoading(false);
        }
    };

    // -------------------------
    // UI
    // -------------------------
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
                            <h1 className="text-3xl font-bold text-white">Role Management</h1>
                            <p className="text-sm text-blue-100">Create and manage user roles</p>
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

                        {/* Error */}
                        {error && <p className="text-red-500 bg-red-50 p-4 rounded-md mb-6">{error}</p>}

                        {/* Create Role Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Role</h3>
                            <form onSubmit={createRole} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Role name"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                                >
                                    {loading ? "Creating..." : "Create Role"}
                                </button>
                            </form>
                        </div>

                        {/* Role List */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Roles</h3>
                            {roles.length === 0 ? (
                                <p className="text-gray-600">No roles found</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-2 text-gray-600">ID</th>
                                                <th className="px-4 py-2 text-gray-600">Name</th>
                                                <th className="px-4 py-2 text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roles.map((role) => (
                                                <tr key={role.id} className="border-t hover:bg-gray-50">
                                                    <td className="px-4 py-2">{role.id}</td>
                                                    <td className="px-4 py-2">
                                                        {editingRole === role.id ? (
                                                            <input
                                                                type="text"
                                                                value={editRoleName}
                                                                onChange={(e) => setEditRoleName(e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                        ) : (
                                                            <span className="font-semibold">{role.name}</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {editingRole === role.id ? (
                                                            <div className="flex space-x-2 justify-center">
                                                                <button
                                                                    onClick={updateRole}
                                                                    disabled={loading}
                                                                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:bg-green-400"
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    onClick={cancelEdit}
                                                                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex space-x-2 justify-center">
                                                                <button
                                                                    onClick={() => startEdit(role)}
                                                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteRole(role.id)}
                                                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Roles;
