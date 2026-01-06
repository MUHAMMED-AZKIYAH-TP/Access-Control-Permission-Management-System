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
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-xl mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Access Control System</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Your current permissions and system overview</p>
                        </div>

                        {/* Permissions Cards */}
                        <div className="mb-12">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800">Your Permissions</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Permissions.map((permission, index) => {
                                    // Define colors for different permission types
                                    const getPermissionStyle = (perm) => {
                                        if (perm.includes('create')) return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-800 hover:shadow-green-200/50';
                                        if (perm.includes('delete')) return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-800 hover:shadow-red-200/50';
                                        if (perm.includes('edit')) return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-800 hover:shadow-blue-200/50';
                                        if (perm.includes('assign')) return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-800 hover:shadow-purple-200/50';
                                        if (perm.includes('view')) return 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800 hover:shadow-indigo-200/50';
                                        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-800 hover:shadow-gray-200/50';
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
                                            className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm ${getPermissionStyle(permission)}`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="text-3xl">
                                                    {getPermissionIcon(permission)}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm mb-1">
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
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800">System Overview</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl shadow-xl text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold">Users</h3>
                                            <p className="text-blue-100 opacity-90">Manage system users</p>
                                        </div>
                                        <div className="text-5xl opacity-80">👥</div>
                                    </div>
                                    <div className="flex items-center text-blue-100">
                                        <span className="text-sm">Access user management</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-3xl shadow-xl text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold">Roles & Permissions</h3>
                                            <p className="text-green-100 opacity-90">Define access control</p>
                                        </div>
                                        <div className="text-5xl opacity-80">🔐</div>
                                    </div>
                                    <div className="flex items-center text-green-100">
                                        <span className="text-sm">Configure permissions</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-3xl shadow-xl text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold">Audit Logs</h3>
                                            <p className="text-purple-100 opacity-90">Monitor activities</p>
                                        </div>
                                        <div className="text-5xl opacity-80">📊</div>
                                    </div>
                                    <div className="flex items-center text-purple-100">
                                        <span className="text-sm">View system logs</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
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
