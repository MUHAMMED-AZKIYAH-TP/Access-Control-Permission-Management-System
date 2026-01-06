import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiAccesscontrol } from "../api/axiosAccesscontrol";

const RolePermissions = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Load roles & permissions
    useEffect(() => {
        apiAccesscontrol.get("roles/")
            .then(res => setRoles(res.data))
            .catch(() => setError("Failed to load roles"));

        apiAccesscontrol.get("permissions/list/")
            .then(res => setPermissions(res.data))
            .catch(() => setError("Failed to load permissions"));
    }, []);

    // Load permissions assigned to role
    const fetchRolePermissions = async (roleId) => {
        try {
            const res = await apiAccesscontrol.get(
                `roles/${roleId}/permissions/`
            );
            setSelectedPermissions(res.data);
        } catch (err) {
            console.error(err.response);
            setError("Failed to load role permissions");
        }
    };

    // Toggle checkbox
    const togglePermission = (id) => {
        setSelectedPermissions((prev) =>
            prev.includes(id)
                ? prev.filter(pid => pid !== id)
                : [...prev, id]
        );
    };

    // Assign permissions
    const assignPermissions = async () => {
        if (!selectedRole) {
            alert("Select a role first");
            return;
        }

        try {
            setLoading(true);

            await apiAccesscontrol.post(
                `roles/${selectedRole}/permissions/`,
                { permission_ids: selectedPermissions }
            );

            await fetchRolePermissions(selectedRole); // refresh
            alert("✅ Permissions assigned");
        } catch (err) {
            alert("❌ Permission denied");
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
                            <h1 className="text-3xl font-bold text-white">Role Permissions</h1>
                            <p className="text-sm text-blue-100">Assign permissions to roles</p>
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

                        {/* Select Role */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Role</h3>
                            <select
                                value={selectedRole}
                                onChange={(e) => {
                                    const roleId = e.target.value;
                                    setSelectedRole(roleId);
                                    fetchRolePermissions(roleId);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Permissions */}
                        {selectedRole && (
                            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Permissions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {permissions.map(perm => (
                                        <div key={perm.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedPermissions.includes(perm.id)}
                                                onChange={() => togglePermission(perm.id)}
                                                className="mr-3"
                                            />
                                            <label className="text-gray-700">{perm.code}</label>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={assignPermissions}
                                    disabled={loading}
                                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                                >
                                    {loading ? "Assigning..." : "Assign Permissions"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RolePermissions;
