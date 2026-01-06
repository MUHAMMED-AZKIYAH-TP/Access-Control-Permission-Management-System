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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50  ml-64">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b border-indigo-200 px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">User Management</h1>
                            <p className="text-sm text-blue-100">Manage system users and their accounts</p>
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

                        {/* Create User Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New User</h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={createUser}
                                    disabled={loading}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                                >
                                    {loading ? "Creating..." : "Create User"}
                                </button>
                            </div>
                        </div>

                        {/* Users List */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Users</h3>
                            {users.length === 0 ? (
                                <p className="text-gray-600">No users found</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-2 text-gray-600">ID</th>
                                                <th className="px-4 py-2 text-gray-600">Username</th>
                                                <th className="px-4 py-2 text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(u => (
                                                <tr key={u.id} className="border-t hover:bg-gray-50">
                                                    <td className="px-4 py-2">{u.id}</td>
                                                    <td className="px-4 py-2">
                                                        {editingUser === u.id ? (
                                                            <input
                                                                type="text"
                                                                value={editUsername}
                                                                onChange={(e) => setEditUsername(e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                        ) : (
                                                            u.username
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {editingUser === u.id ? (
                                                            <div className="flex space-x-2 justify-center">
                                                                <button
                                                                    onClick={updateUser}
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
                                                                    onClick={() => startEdit(u)}
                                                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteUser(u.id)}
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
        </div>
    );
};
export default Users;
