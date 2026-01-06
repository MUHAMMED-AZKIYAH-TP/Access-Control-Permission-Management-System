import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiAccounts } from "../api/axiosAccounts";

const Home = () => {
    const [Permissions, setPermissions] = useState([]);


    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await apiAccounts.get("permissions_list/");
                setPermissions(response.data.permissions);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };

        fetchPermissions();
    }, []);
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50  ml-64">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b border-indigo-200 px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                            <p className="text-sm text-blue-100">Welcome back to your control panel</p>
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
                    <div className="max-w-7xl mx-auto">
                        {/* Welcome Section */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Access Control System</h2>
                            <p className="text-gray-600">Your current permissions and system overview</p>
                        </div>

                        {/* Permissions Cards */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Permissions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {Permissions.map((permission, index) => {
                                    // Define colors for different permission types
                                    const getPermissionStyle = (perm) => {
                                        if (perm.includes('create')) return 'bg-green-50 border-green-200 text-green-800';
                                        if (perm.includes('delete')) return 'bg-red-50 border-red-200 text-red-800';
                                        if (perm.includes('edit')) return 'bg-blue-50 border-blue-200 text-blue-800';
                                        if (perm.includes('assign')) return 'bg-purple-50 border-purple-200 text-purple-800';
                                        if (perm.includes('view')) return 'bg-indigo-50 border-indigo-200 text-indigo-800';
                                        return 'bg-gray-50 border-gray-200 text-gray-800';
                                    };

                                    const getPermissionIcon = (perm) => {
                                        if (perm.includes('create')) return '➕';
                                        if (perm.includes('delete')) return '🗑️';
                                        if (perm.includes('edit')) return '✏️';
                                        if (perm.includes('assign')) return '🔗';
                                        if (perm.includes('view')) return '👁️';
                                        return '🔐';
                                    };

                                    const formatPermissionName = (perm) => {
                                        return perm.split('_').map(word =>
                                            word.charAt(0).toUpperCase() + word.slice(1)
                                        ).join(' ');
                                    };

                                    return (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md hover:scale-105 ${getPermissionStyle(permission)}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="text-2xl">
                                                    {getPermissionIcon(permission)}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-sm">
                                                        {formatPermissionName(permission)}
                                                    </h4>
                                                    <p className="text-xs opacity-75">
                                                        {permission.replace(/_/g, ' ')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* System Overview Cards */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">System Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">Users</h3>
                                            <p className="text-blue-100">Manage system users</p>
                                        </div>
                                        <div className="text-3xl">👥</div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">Roles & Permissions</h3>
                                            <p className="text-green-100">Define access control</p>
                                        </div>
                                        <div className="text-3xl">🔐</div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">Audit Logs</h3>
                                            <p className="text-purple-100">Monitor activities</p>
                                        </div>
                                        <div className="text-3xl">📊</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
