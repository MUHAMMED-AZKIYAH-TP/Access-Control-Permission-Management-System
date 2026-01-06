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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 lg:ml-64">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b border-indigo-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">Role Permissions</h1>
                            <p className="text-sm text-blue-100">Assign permissions to roles</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 lg:space-x-4">
                        <div className="flex items-center space-x-2 lg:space-x-3 bg-white/10 rounded-xl px-3 lg:px-4 py-2">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold shadow-md text-sm lg:text-base">
                                A
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-white">Admin User</p>
                                <p className="text-xs text-blue-100">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="max-w-4xl lg:max-w-6xl mx-auto">

                        {/* Error */}
                        {error && <p className="text-red-500 bg-red-50 p-4 rounded-md mb-6">{error}</p>}

                        {/* Select Role Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-white/20 mb-6 lg:mb-8 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center space-x-2 lg:space-x-3 mb-4 lg:mb-6">
                                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Select Role</h3>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Choose a Role
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => {
                                            const roleId = e.target.value;
                                            setSelectedRole(roleId);
                                            fetchRolePermissions(roleId);
                                        }}
                                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white appearance-none"
                                    >
                                        <option value="">Select Role</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Permissions Card */}
                        {selectedRole && (
                            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-white/20 mb-6 lg:mb-8 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center space-x-2 lg:space-x-3 mb-4 lg:mb-6">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Manage Permissions</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                                    {permissions.map(perm => (
                                        <div key={perm.id} className="flex items-center p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-all duration-200">
                                            <input
                                                type="checkbox"
                                                checked={selectedPermissions.includes(perm.id)}
                                                onChange={() => togglePermission(perm.id)}
                                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label className="ml-3 text-gray-700 font-medium cursor-pointer">
                                                {perm.code}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={assignPermissions}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg font-medium"
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Assigning Permissions...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                <span>Assign Permissions</span>
                                            </>
                                        )}
                                    </div>
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
