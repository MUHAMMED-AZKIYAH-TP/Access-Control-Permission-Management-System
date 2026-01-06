import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { apiAccounts } from "../api/axiosAccounts";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editUsername, setEditUsername] = useState("");

    useEffect(() => {
        apiAccounts.get("users/").then(res => setUsers(res.data));
    }, []);

    const createUser = async () => {
        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            setLoading(true);
            await apiAccounts.post("users/", { username, password });
            alert("User created");
            setUsername("");
            setPassword("");
            // Refresh list
            const res = await apiAccounts.get("users/");
            setUsers(res.data);
        } catch (error) {
            alert("Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await apiAccounts.delete(`users/${userId}/`);
            alert("User deleted successfully");
            // Refresh list
            const res = await apiAccounts.get("users/");
            setUsers(res.data);
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    const startEdit = (user) => {
        setEditingUser(user.id);
        setEditUsername(user.username);
    };

    const cancelEdit = () => {
        setEditingUser(null);
        setEditUsername("");
    };

    const updateUser = async () => {
        if (!editUsername) {
            alert("Username is required");
            return;
        }
        try {
            setLoading(true);
            const updateData = { username: editUsername };
            await apiAccounts.put(`users/${editingUser}/`, updateData);
            alert("User updated successfully");
            cancelEdit();
            // Refresh list
            const res = await apiAccounts.get("users/");
            setUsers(res.data);
        } catch (error) {
            alert("Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 lg:ml-64">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b border-indigo-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">User Management</h1>
                            <p className="text-sm text-blue-100">Manage system users and their accounts</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 lg:space-x-4">
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
                    <div className="max-w-6xl mx-auto">

                        {/* Stats Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 mb-6 lg:mb-8 hover:shadow-2xl transition-all duration-300">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800">{users.length}</h4>
                                    <p className="text-gray-600 text-sm sm:text-base">Total Users</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800">{users.filter(u => u.is_active !== false).length}</h4>
                                    <p className="text-gray-600 text-sm sm:text-base">Active Users</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800">0</h4>
                                    <p className="text-gray-600 text-sm sm:text-base">Pending Actions</p>
                                </div>
                            </div>
                        </div>

                        {/* Create User Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-white/20 mb-6 lg:mb-8 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center space-x-2 lg:space-x-3 mb-4 lg:mb-6">
                                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Create New User</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                    />
                                    <div className="absolute left-4 top-11 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                    />
                                    <div className="absolute left-4 top-11 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                                <button
                                    onClick={createUser}
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
                                                <span>Creating User...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                <span>Create User</span>
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Users List */}
                        <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center space-x-2 lg:space-x-3 mb-4 lg:mb-6">
                                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Existing Users</h3>
                            </div>
                            {users.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                    <p className="text-gray-500 text-lg">No users found</p>
                                    <p className="text-gray-400 text-sm">Create your first user above</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-200">
                                    <table className="w-full min-w-full">
                                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <tr>
                                                <th className="px-3 sm:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                                <th className="px-3 sm:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
                                                <th className="px-3 sm:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {users.map((u, index) => (
                                                <tr key={u.id} className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                    <td className="px-3 sm:px-6 py-3 lg:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.id}</td>
                                                    <td className="px-3 sm:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                        {editingUser === u.id ? (
                                                            <input
                                                                type="text"
                                                                value={editUsername}
                                                                onChange={(e) => setEditUsername(e.target.value)}
                                                                className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                                                            />
                                                        ) : (
                                                            <span className="text-sm font-semibold text-gray-800">{u.username}</span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-3 lg:py-4 whitespace-nowrap text-sm font-medium">
                                                        {editingUser === u.id ? (
                                                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-3 justify-center">
                                                                <button
                                                                    onClick={updateUser}
                                                                    disabled={loading}
                                                                    className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-md"
                                                                >
                                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    Save
                                                                </button>
                                                                <button
                                                                    onClick={cancelEdit}
                                                                    className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                                                                >
                                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-3 justify-center">
                                                                <button
                                                                    onClick={() => startEdit(u)}
                                                                    className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                                                                >
                                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteUser(u.id)}
                                                                    className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                                                                >
                                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
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
        </div>
    );
};
export default Users;
